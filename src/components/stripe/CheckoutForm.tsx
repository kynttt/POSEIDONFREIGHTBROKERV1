import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBookQuote, createInvoice, getCurrentUser } from "../../lib/apiCalls";
import { PaymentRequest } from "@stripe/stripe-js";
import { Booking, BookingData, Quote } from "../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../state/useAuthStore";

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
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null); // Add state for stripeCustomerId
  const { isAuthenticated, userId: authUserId } = useAuthStore(); // Extract userId
  const navigate = useNavigate();

  const mutation = useMutation<Booking, Error, BookingData>({
    mutationFn: createBookQuote,
    onSuccess: async () => {
      if (!stripe || !elements) {
        console.error("Stripe or elements are not available.");
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await getCurrentUser();
        const user = response.data; // Assuming the data is nested in `response.data`
        console.log("Fetched user data:", user);
        setStripeCustomerId(user.stripeCustomerId); // Ensure you're accessing it correctly
        console.log("Stripe Customer ID:", user.stripeCustomerId);
      } catch (error) {
        console.error("Error fetching current user:", error);
        notifications.show({
          title: "Error",
          message: "Unable to fetch user data.",
          color: "red",
        });
      }
    };


    fetchCurrentUser();
  }, [isAuthenticated]);

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!stripe || !elements || mutation.isPending || !isAuthenticated || !authUserId || !stripeCustomerId) {
      console.error("Stripe, elements, or other necessary data is missing.");
      return;
    }
  
    const priceInCents = Math.round(price * 100);
    console.log("Price in cents:", priceInCents);
  
    try {
      const invoiceResponse = await createInvoice({
        customerId: stripeCustomerId,
        price: priceInCents,
        currency: 'usd',
      });
  
      if (!invoiceResponse) {
        throw new Error('Failed to create invoice');
      }
  
      console.log("Invoice created successfully:", invoiceResponse);
  
      mutation.mutate({
        quote: _id!,
        origin,
        destination,
        pickupDate: typeof pickupDate === "string" ? pickupDate : pickupDate.toISOString(),
        trailerType,
        companyName,
        commodity,
        price,
      });
    } catch (error) {
      console.error("Invoice creation failed:", error);
      notifications.show({
        title: "Invoice Creation Failed",
        message: error.message,
        color: "red",
      });
    }
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
        disabled={!stripe || !elements || mutation.isPending}
        className="mt-4 py-4 px-16 bg-primary text-white rounded"
      >
        {mutation.isPending ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
