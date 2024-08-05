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
  
  // Extract price from URL parameters
  const query = new URLSearchParams(location.search);
  const price = query.get('price') ? parseInt(query.get('price')!, 10) : 2000; // Default to 2000 if price is not provided
  
  useEffect(() => {
    if (price <= 0) {
      console.error('Invalid price.');
      return;
    }
    
    const currency = 'usd'; // Example currency

    // Fetch the client secret from your server with dynamic price
    createPaymentIntent({ amount: price, currency })
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
          Price: ${price / 100} {/* Assuming price is in cents */}
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm price={price} />
        </Elements>
      </div>
    )
  );
}
