/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { createBookingPaymentIntent } from "../../lib/apiCalls";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import {
  BookingPaymentIntentParams,
  BookingPaymentIntentResponse,
} from "../../utils/types";
import { notifications } from "@mantine/notifications";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export default function Stripe() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get("bookingId");

  // Define useMutation for creating payment intent
  const mutation = useMutation<
    BookingPaymentIntentResponse,
    Error,
    BookingPaymentIntentParams
  >({
    mutationFn: createBookingPaymentIntent,

    onError: (error) => {
      console.error("Error creating payment intent:", error);
      notifications.show({
        title: "Failed to create payment intent",
        message: "Please try again later.",
        color: "red",
      });
    },
  });

  useEffect(() => {
    console.log("bookingId: ", bookingId);
    if (bookingId) {
      mutation.mutate({ bookingId });
    }
  }, [bookingId]);

  if (mutation.isPending) {
    // console.log(
    //   `isQueryLoading: ${isQueryLoading} mutation.isPending: ${mutation.isPending}`
    // );
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    mutation.data?.secret && (
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-white text-primary min-h-screen justify-center items-center w-full p-4 md:p-0">
        <div className="mb-4  text-lg font-semibold text-primary w-full md:w-1/4 bg-light-grey h-auto md:h-1/2 rounded-lg p-8">
          <div className="flex justify-between text-gray-500 my-4 border-b border-secondary pb-8">
            <p>{mutation.data?.booking.quote?.origin}</p>
            <FontAwesomeIcon icon={faTruckFast} className="text-2xl" />
            <p>{mutation.data!.booking.quote!.destination}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-secondary text-base font-normal">Subtotal</h1>
            <p>${mutation.data?.booking.quote!.price!.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b border-secondary pb-12">
            <h1 className="text-secondary text-base font-normal">
              Taxes and Other Fees
            </h1>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="text-secondary text-lg font-medium">Total</h1>
            <p>${mutation.data?.booking.quote!.price!.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: mutation.data!.secret }}
          >
            <CheckoutForm booking={mutation.data!.booking} />
          </Elements>
        </div>
      </div>
    )
  );
}
