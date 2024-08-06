import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { createPaymentIntent } from '../../lib/apiCalls';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export default function Stripe() {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined); // No default price

  useEffect(() => {
    // Extract price from location.state
    const statePrice = location.state?.price;

    if (statePrice !== undefined) {
      // Parse and validate the price
      const parsedPrice = parseFloat(statePrice);
      if (!isNaN(parsedPrice) && parsedPrice > 0) {
        setPrice(parsedPrice);
      } else {
        console.error('Invalid price provided');
      }
    } else {
      console.error('Price not provided');
    }
  }, [location.state]);

  useEffect(() => {
    if (price === undefined || price <= 0) {
      console.error('Invalid price.');
      return;
    }

    const currency = 'usd'; // Example currency

    // Fetch the client secret from your server with dynamic price in dollars
    createPaymentIntent({ amount: price * 100, currency }) // Convert dollars to cents for Stripe
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error fetching client secret:', error);
      });
  }, [price]);

  const options = {
    // Passing the client secret obtained from the server
    clientSecret,
  };

  return (
    clientSecret && (
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 text-lg font-semibold">
          Price: ${price!.toFixed(2)} {/* Display price in dollars */}
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm price={price!} />
        </Elements>
      </div>
    )
  );
}
