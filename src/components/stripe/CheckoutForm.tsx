import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, PaymentRequestButtonElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { createBookQuote, createInvoice } from '../../lib/apiCalls'; // Import createInvoice
import { PaymentRequest } from '@stripe/stripe-js';
import { Booking, BookingData, Quote, User } from '../../utils/types'; // Ensure User type is imported
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

const CheckoutForm = ({
  quote: {
    _id,
    price,
    origin,
    destination,
    pickupDate,
    trailerType,
    companyName,
    commodity,
    createdBy, // Accessing createdBy field
  },
}: {
  quote: Quote;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [createdByUser, setCreatedByUser] = useState<User | null>(null); // Local state to store createdBy
  const navigate = useNavigate();

  const mutation = useMutation<Booking, Error, BookingData>({
    mutationFn: createBookQuote,
    onSuccess: async (booking) => {
      console.log('Booking successfully created:', booking); // Log successful booking creation

      if (!stripe || !elements) return;

      const returnUrl = `${window.location.origin}/booking-successful`;
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      if (result.error) {
        notifications.show({
          title: 'Payment Failed',
          message: result.error.message,
          color: 'red',
        });
      } else {
        // Payment succeeded, now create the invoice
        const invoiceData = {
          bookingId: booking._id!,
          user: createdByUser!, // Ensure createdByUser is set properly
          quote: {
            _id: _id!,
            price,
            origin,
            destination,
            pickupDate: typeof pickupDate === 'string' ? pickupDate : pickupDate.toISOString(),
            trailerType,
            companyName,
            commodity,
            createdBy, // Include createdBy if required by backend
          },
        };

        try {
          await createInvoice(invoiceData);
          console.log('Invoice successfully created:', invoiceData); // Log successful invoice creation
          notifications.show({
            title: 'Invoice Created',
            message: 'Your invoice has been successfully created.',
            color: 'green',
          });
          navigate('/booking-successful');
        } catch (error) {
          console.error('Error creating invoice:', error); // Log the error
          notifications.show({
            title: 'Invoice Creation Failed',
            message: error.message,
            color: 'red',
          });
        }
      }
    },
    onError: (error) => {
      notifications.show({
        title: 'Booking failed, payment will not be processed.',
        message: error.message,
        color: 'red',
      });
    },
  });

  useEffect(() => {
    const initializePaymentRequest = async () => {
      if (!stripe) return;

      const priceInCents = Math.round(price);

      const newPaymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: priceInCents,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      try {
        const result = await newPaymentRequest.canMakePayment();
        if (result) {
          setPaymentRequest(newPaymentRequest);
        }
      } catch (error) {
        console.error('Error checking payment request availability:', error);
      }
    };

    initializePaymentRequest();
  }, [stripe, price]);

  useEffect(() => {
    if (createdBy && typeof createdBy === 'object') {
      setCreatedByUser(createdBy); // Store createdBy as User object
    } else {
      setCreatedByUser(null); // Handle case where createdBy is a string or undefined
    }
    console.log('CreatedBy User Data:', createdBy); // Log the createdBy data
  }, [createdBy]);

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || mutation.isPending) return;

    const bookingData: BookingData = {
      quote: _id!,
      origin,
      destination,
      pickupDate: typeof pickupDate === 'string' ? pickupDate : pickupDate.toISOString(),
      trailerType,
      companyName,
      commodity,
      price,
    };

    mutation.mutate(bookingData);
  };

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="p-4 md:p-8 rounded-lg shadow-md bg-white"
    >
      <h3 className="text-xl mb-4">Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}
      <button
        type="submit"
        disabled={!stripe || !elements || mutation.isPending}
        className="mt-4 py-4 px-16 bg-primary text-white rounded"
      >
        {mutation.isPending ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
