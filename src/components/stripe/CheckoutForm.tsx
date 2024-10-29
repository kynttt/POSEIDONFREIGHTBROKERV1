import {
  useStripe,
  useElements,
  PaymentElement,
  // AddressElement,
  // PaymentRequestButtonElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentRequest,
  Stripe,
  StripeElements,
  StripeError,
} from "@stripe/stripe-js";
import { Booking } from "../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface ConfirmPaymentParams {
  stripe: Stripe;
  elements: StripeElements;
  returnUrl: string;
}

interface ConfirmPaymentResult {
  error: StripeError;
}

const CheckoutForm = ({ booking }: { booking: Booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation<
    ConfirmPaymentResult,
    Error,
    ConfirmPaymentParams
  >({
    mutationFn: async ({ stripe, elements, returnUrl }) => {
      const result = await stripe!.confirmPayment({
        elements: elements!,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      return result;
    },
    onSuccess: (result) => {
      if (result.error) {
        console.error("Error confirming payment:", result.error);
        notifications.show({
          title: "Failed to confirm payment",
          message: "Please try again later.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Payment Confirmed",
          message: "Your payment was successful.",
          color: "green",
        });
        navigate("/booking-successful");
      }
    },
  });

  useEffect(() => {
    const initializePaymentRequest = async () => {
      if (!stripe) return;

      const priceInCents = Math.round(booking.quote!.price * 100);

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
  }, [stripe, booking.quote]);

  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!stripe || !elements || mutation.isPending) return;

    // const bookingData: BookingData = {
    //   quote: id!,
    //   origin,
    //   destination,
    //   pickupDate:
    //     typeof pickupDate === "string" ? pickupDate : pickupDate.toISOString(),
    //   trailerType,
    //   // trailerSize, ! This field is not include in Booking Schema
    //   companyName,
    //   commodity,

    //   price,
    // };

    mutation.mutate({
      stripe,
      elements,
      returnUrl: `${window.location.origin}/booking-successful`,
    });
  };

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="p-4 md:p-8 rounded-lg shadow-md bg-white"
    >
      <h3 className="text-xl mb-4">Payment Details</h3>
      <LinkAuthenticationElement />
      <PaymentElement />
      {/* <AddressElement options={{ mode: "billing" }} /> */}

      {/* {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )} */}

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
