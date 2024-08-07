import { useStripe, useElements, PaymentElement, AddressElement, PaymentRequestButtonElement, LinkAuthenticationElement, ExpressCheckoutElement } from '@stripe/react-stripe-js';
// import { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

interface CheckoutFormProps {
  price: number; // Price passed from the previous page in cents
}

const CheckoutForm = ({ price }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null); // Use any or a more specific type if available
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    const initializePaymentRequest = async () => {
      if (!stripe) return;

      // Ensure price is an integer and in cents
      const priceInCents = Math.round(price); 

      // Create Payment Request with dynamic price
      const newPaymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: priceInCents, // Use dynamic price in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      try {
        // Check if payment request can be made
        const result = await newPaymentRequest.canMakePayment();
        if (result) {
          setPaymentRequest(newPaymentRequest);
        }
      } catch (error) {
        console.error('Error checking payment request availability:', error);
      }
    };

    initializePaymentRequest();
  }, [stripe, price]); // Add price to dependencies

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || loading) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/booking-successful",
      },
    });

    setLoading(false);

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Handle successful payment
    }
  };

  const paymentRequestButtonOptions = paymentRequest
    ? {
        paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'buy', // Use a valid type value
            theme: 'dark', // or 'light'
          },
        },
      }
    : undefined; // Ensure this is undefined if no paymentRequest

  return (
    <form onSubmit={handleSubmit} className='p-4 md:p-8 rounded-lg shadow-md bg-white'>
      <h3 className='text-xl mb-4'>Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      <AddressElement options={{ mode: 'billing' }} />
      {/* <CardElement /> */}

      {/* Render ExpressCheckoutElement if available */}
      {paymentRequest && (
        <ExpressCheckoutElement options={paymentRequestButtonOptions as any} onConfirm={() => {
          // Implement the confirm handler
        }} />
      )}

      {/* Render PaymentRequestButtonElement always */}
      {paymentRequest && (
        <PaymentRequestButtonElement options={paymentRequestButtonOptions as any} />
      )}

      <button type="submit" disabled={!stripe || loading} className='mt-4 py-4 px-16 bg-primary text-white rounded'>
        {loading ? 'Processing...' : 'Book'}
      </button>
    </form>
  );
};

export default CheckoutForm;
