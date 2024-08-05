import { useStripe, useElements, PaymentElement, AddressElement, PaymentRequestButtonElement, LinkAuthenticationElement, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

interface CheckoutFormProps {
  price: number; // Price passed from the previous page in cents
}

const CheckoutForm = ({ price }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null); // Use any or a more specific type if available

  useEffect(() => {
    const initializePaymentRequest = async () => {
      if (!stripe) return;

      // Verify that the price is a positive integer and in cents
      if (price <= 0 || !Number.isInteger(price)) {
        console.error('Invalid amount. Price should be a positive integer in cents.');
        return;
      }

      // Create Payment Request with dynamic price
      const newPaymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: price, // Use dynamic price
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      try {
        // Check if payment request can be made
        const result = await newPaymentRequest.canMakePayment();
        if (result?.canMakePayment) {
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

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/booking-successful",
      },
    });

    if (result.error) {
      console.log(result.error.message);
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
    <form onSubmit={handleSubmit} className='bg-white p-4 rounded shadow-md'>
      <h3 className='text-xl mb-4'>Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      <AddressElement options={{ mode: 'billing' }} />
      {/* <CardElement /> */}

      {/* Render ExpressCheckoutElement if available */}
      {paymentRequest && (
        <ExpressCheckoutElement options={paymentRequestButtonOptions as any} onConfirm={function (event: StripeExpressCheckoutElementConfirmEvent) {
                  throw new Error('Function not implemented.');
              } } />
      )}

      {/* Render PaymentRequestButtonElement always */}
      {paymentRequest && (
        <PaymentRequestButtonElement options={paymentRequestButtonOptions as any} />
      )}

      <button type="submit" disabled={!stripe} className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
