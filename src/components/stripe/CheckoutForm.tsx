import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { createBookQuote, savePaymentMethod, fetchSavedPaymentMethods, updateUserDefaultPaymentMethod } from '../../lib/apiCalls';
import { Booking, BookingData, Quote } from '../../utils/types';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '../../state/useAuthStore';

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
}: {
  quote: Quote;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<typeof PaymentRequestButtonElement | null>(null);
  const [savePayment, setSavePayment] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<any[]>([]);
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<string | null>(null);
  const { userId } = useAuthStore(state => ({ userId: state.userId }));
  const navigate = useNavigate();

  const mutation = useMutation<Booking, Error, BookingData>({
    mutationFn: createBookQuote,
    onSuccess: async () => {
      notifications.show({
        title: 'Booking successful',
        message: 'Payment will be processed.',
        color: 'green',
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
          title: 'Payment Failed',
          message: result.error.message,
          color: 'red',
        });
      } else {
        const { paymentIntent } = result as { paymentIntent?: Stripe.PaymentIntent | undefined };
      
        if (savePayment ) {
          try {
            const paymentMethodId = paymentIntent.payment_method || '';
            await savePaymentMethod(paymentMethodId, userId || '');
            notifications.show({
              title: 'Payment Method Saved',
              message: 'Your payment method has been saved successfully.',
              color: 'green',
            });
            console.log('Payment method saved successfully');
            console.log('Saved Payment Details:', {
              paymentMethodId,
              userId,
            });

            // Update user with default payment method ID
            await updateUserDefaultPaymentMethod(userId || '', paymentMethodId);
            console.log('User updated with default payment method ID');

            // Fetch saved payment methods after saving
            const response = await fetchSavedPaymentMethods(userId);
            console.log('Fetched Payment Methods After Saving:', response);
            const methods = response?.paymentMethods?.data || [];
            setSavedPaymentMethods(methods);
            if (methods.length > 0) {
              setDefaultPaymentMethodId(methods[0].id); // Set the first method as default
            }
          } catch (error) {
            notifications.show({
              title: 'Error Saving Payment Method',
              message: 'There was an error saving your payment method. Please try again.',
              color: 'red',
            });
            console.error('Error saving payment method:', error);
          }
        }
        navigate('/booking-successful');
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

      const priceInCents = Math.round(price * 100); // Convert dollars to cents

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
    const fetchPaymentMethods = async () => {
      if (userId) {
        try {
          const response = await fetchSavedPaymentMethods(userId);
          console.log('API Response:', response);

          // Adjust based on the actual structure of the response
          const methods = response?.paymentMethods?.data || [];
          console.log('Parsed Payment Methods:', methods);

          setSavedPaymentMethods(methods);
          if (methods.length > 0) {
            setDefaultPaymentMethodId(methods[0].id); // Set the first method as default
          }
        } catch (error) {
          console.error('Error fetching payment methods:', error);
        }
      }
    };

    fetchPaymentMethods();
  }, [userId]);

  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
    <form onSubmit={handlePaymentSubmit} className="p-4 md:p-8 rounded-lg shadow-md bg-white">
      <h3 className="text-xl mb-4">Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      {paymentRequest && <PaymentRequestButtonElement paymentRequest={paymentRequest} />}

      {/* Display saved payment methods */}
      {savedPaymentMethods.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-lg mb-2">Saved Payment Methods</h4>
          <ul>
            {savedPaymentMethods.map((method) => (
              <li key={method.id}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={method.id === defaultPaymentMethodId}
                  onChange={() => setDefaultPaymentMethodId(method.id)}
                />
                {method.card.brand} ending in {method.card.last4}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4">No saved payment methods found.</div>
      )}

      <div className="mt-4">
        <label>
          <input
            type="checkbox"
            checked={savePayment}
            onChange={(e) => {
              setSavePayment(e.target.checked);
              console.log(`Save payment details for future use: ${e.target.checked}`);
            }}
            className="mr-2"
          />
          Save my payment details for future use
        </label>
      </div>

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