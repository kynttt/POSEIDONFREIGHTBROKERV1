import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBookQuote } from "../../lib/apiCalls";
import { PaymentRequest } from "@stripe/stripe-js";
import { Booking, BookingData, Quote } from "../../utils/types";
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
}: {
  quote: Quote;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const mutation = useMutation<Booking, Error, BookingData>({
    mutationFn: createBookQuote,
    onSuccess: () => {
      notifications.show({
        title: "Booking successful",
        message: "Payment will be processed.",
        color: "green",
      });

      navigate("/booking-successful");
      // if (!bookingSuccessful) {
      //   // If booking failed, exit early and do not proceed to payment
      //   console.error("Booking failed, payment will not be processed.");
      //   return;
      // }
      // const returnUrl = `${window.location.origin}/booking-successful`;
      // const result = await stripe.confirmPayment({
      //   elements,
      //   confirmParams: {
      //     return_url: returnUrl,
      //   },
      // });
      // if (result.error) {
      //   console.error("Payment error:", result.error.message);
      //   setLoading(false);
      // } else {
      //   setLoading(false);
      //   navigate("/booking-successful"); // Navigate to the success page after payment
      // }
    },
    onError: (error) => {
      notifications.show({
        title: "Booking failed, payment will not be processed.",
        message: error.message,
        color: "red",
      });
    },
  });

  const navigate = useNavigate();

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

    if (!stripe || !elements || mutation.isPending) return;

    const bookingData: BookingData = {
      quote: _id!,
      origin,
      destination,
      pickupDate:
        typeof pickupDate === "string" ? pickupDate : pickupDate.toISOString(),
      trailerType,
      // trailerSize, ! This field is not include in Booking Schema
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
      <AddressElement options={{ mode: "billing" }} />

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
