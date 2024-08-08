import { useEffect, useState, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { createPaymentIntent } from '../../lib/apiCalls';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export default function Stripe() {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const fetchedClientSecret = useRef(false); // Ref to track if client secret has been fetched

  useEffect(() => {
    const state = location.state as { price?: string, origin?: string, destination?: string };

    let validPrice = false;
    let parsedPrice: number | undefined;

    if (state) {
      const statePrice = state.price;
      if (statePrice !== undefined) {
        parsedPrice = parseFloat(statePrice);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          setPrice(parsedPrice);
          validPrice = true;
        } else {
          console.error('Invalid price provided');
        }
      } else {
        console.error('Price not provided');
      }

      const stateOrigin = state.origin;
      if (stateOrigin) {
        setOrigin(stateOrigin.length > 15 ? `${stateOrigin.substring(0, 17)}...` : stateOrigin);
      } else {
        console.error('Origin not provided');
      }

      const stateDestination = state.destination;
      if (stateDestination) {
        setDestination(stateDestination.length > 15 ? `${stateDestination.substring(0, 17)}...` : stateDestination);
      } else {
        console.error('Destination not provided');
      }
    }

    if (validPrice && parsedPrice !== undefined && !fetchedClientSecret.current) {
      const currency = 'usd';

      fetchedClientSecret.current = true; // Set ref to true before the async call to prevent multiple fetches
      createPaymentIntent({ amount: Math.round(parsedPrice * 100), currency })
        .then((data) => {
          setClientSecret(data.clientSecret);
          // console.log('Client secret:', data.clientSecret);
        })
        .catch((error) => {
          console.error('Error fetching client secret:', error);
        });
    } else if (!validPrice) {
      console.error('Invalid price.');
    }
  }, [location.state]);

  const options = {
    clientSecret,
  };

  return (
    clientSecret && (
      <div className="flex items-center space-x-8 bg-white text-primary h-screen justify-center">
        <div className="mb-4 text-lg font-semibold text-primary w-1/4 bg-light-grey h-1/2 rounded-lg p-8">
          <div className='flex justify-between text-gray-500 my-4 border-b border-secondary pb-8'>
            <p>{origin}</p>
            <FontAwesomeIcon icon={faTruckFast} className='text-2xl'/>
            <p>{destination}</p>
          </div>
          <div className='flex justify-between'>
            <h1 className='text-secondary text-base font-normal'>Subtotal</h1>
            <p>${price!.toFixed(2)}</p>
          </div>
          <div className='flex justify-between border-b border-secondary pb-12'>
            <h1 className='text-secondary text-base font-normal'>Taxes and Other Fees</h1>
            <p>$0.00</p>
          </div>
          <div className='flex justify-between mt-4'>
            <h1 className='text-secondary text-lg font-medium'>Total</h1>
            <p>${price!.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-1/4">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm price={price!} />
          </Elements>
        </div>
      </div>
    )
  );
}
