import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookQuote } from '../../lib/apiCalls';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { price, origin, destination, pickupDate, trailerType, trailerSize, companyName, commodity, bolLink, packaging, quote } = location.state;

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


  const handleBookQuote = async () => {
    const token = localStorage.getItem('authToken');
    
  
    if (!token || !quote) {
      console.error('Missing quoteId or token');
      return false; // Return false to indicate failure
    }
  
    try {
      const bookingData = {
        quote,
        origin,
        destination,
        pickupDate,
        trailerType,
        trailerSize,
        companyName,
        commodity,
        bolLink,
        packaging,
        price,
      };
  
  
      await bookQuote(bookingData, token);
      
      return true; // Return true to indicate success
    } catch (error) {
      console.error('Error creating booking:', error);
      return false; // Return false to indicate failure
    }
  };
  
  
  

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!stripe || !elements || loading) return;
  
    setLoading(true);
  
    try {
      
      const bookingSuccessful = await handleBookQuote();
  
      if (!bookingSuccessful) {
        // If booking failed, exit early and do not proceed to payment
        console.error('Booking failed, payment will not be processed.');
        setLoading(false);
        return;
      }
  
  
      const returnUrl = `${window.location.origin}/booking-successful`;
  
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

  
      if (result.error) {
        console.error('Payment error:', result.error.message);
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/booking-successful'); // Navigate to the success page after payment
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      setLoading(false);
    }
  };
  
  
  

  

  return (
    <form onSubmit={handlePaymentSubmit} className='p-4 md:p-8 rounded-lg shadow-md bg-white'>
      <h3 className='text-xl mb-4'>Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      <AddressElement options={{ mode: 'billing' }} />

      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}

      <button type="submit" disabled={!stripe || loading} className='mt-4 py-4 px-16 bg-primary text-white rounded'>
        {loading ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
