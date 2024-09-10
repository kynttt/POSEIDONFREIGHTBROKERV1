import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBookQuote, createInvoice } from "../../lib/apiCalls";
import { PaymentRequest } from "@stripe/stripe-js";
import { BookingData, Quote } from "../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

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
  },
  userId,
}: {
  quote: Quote;
  userId: string; // User ID should be passed as a prop
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const navigate = useNavigate();

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const booking = await createBookQuote(bookingData);

      const invoiceData = {
        invoiceNumber: `INV-${Date.now()}`,
        dateIssued: new Date().toISOString(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), // 30 days due
        amountDue: Math.round(bookingData.price),
        status: 'Unpaid',
        bookingId: booking._id,
        createdBy: userId, // Use the actual user ID
      };

      const invoice = await createInvoice(invoiceData);
      return { booking, invoice };
    },
    onSuccess: async ({  }) => {
      notifications.show({
        title: "Booking and Invoice created successfully",
        message: "Payment will be processed.",
        color: "green",
      });

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
          title: "Payment Failed",
          message: result.error.message,
          color: "red",
        });
      } else {
        navigate("/booking-successful");
      }
    },
    onError: (error) => {
      notifications.show({
        title: "Booking failed, payment will not be processed.",
        message: error.message,
        color: "red",
      });
    },
  });

  useEffect(() => {
    const initializePaymentRequest = async () => {
      if (!stripe) return;

      const priceInCents = Math.round(price);

      const newPaymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
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
        console.error("Error checking payment request availability:", error);
      }
    };

    initializePaymentRequest();
  }, [stripe, price]);

  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!stripe || !elements || bookingMutation.isPending) return;

    const bookingData: BookingData = {
      quote: _id!,
      origin,
      destination,
      pickupDate:
        typeof pickupDate === "string" ? pickupDate : pickupDate.toISOString(),
      trailerType,
      companyName,
      commodity,
      price,
    };

    bookingMutation.mutate(bookingData);
  };

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="p-4 md:p-8 rounded-lg shadow-md bg-white"
    >
      <h3 className="text-xl mb-4">Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || bookingMutation.isPending}
        className="mt-4 py-4 px-16 bg-primary text-white rounded"
      >
        {bookingMutation.isPending ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
