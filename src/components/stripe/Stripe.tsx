import { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  createBookingPaymentIntent,
  fetchQuoteDetails,
} from "../../lib/apiCalls";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BookingData,
  BookingPaymentIntentParams,
  StripeClientSecret,
} from "../../utils/types";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export default function Stripe() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [newBookingId, setNewBookingId] = useState<string | undefined>();
  const quoteId = searchParams.get("quoteId");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const fetchedClientSecret = useRef(false); // Ref to track if client secret has been fetched

  const {
    data,
    isLoading: isQueryLoading,
    isError: isQueryError,
  } = useQuery({
    queryKey: ["bookingDetails", quoteId],
    queryFn: () => fetchQuoteDetails(quoteId),
    refetchOnWindowFocus: false,
    staleTime: 600000, // 10 minutes
    gcTime: 1800000, // 30 minutes
  });

  // Define useMutation for creating payment intent
  const mutation = useMutation<
    StripeClientSecret,
    Error,
    BookingPaymentIntentParams
  >({
    mutationFn: createBookingPaymentIntent,
    onSuccess: (data) => {
      // console.log("Client secret:", data.clientSecret);
      setClientSecret(data.clientSecret);
      setNewBookingId(data.bookingId);
    },
    onError: (error) => {
      console.error("Error creating payment intent:", error);
    },
  });

  useEffect(() => {
    if (!data || fetchedClientSecret.current) return;
    const {
      id,
      price,
      origin,
      destination,
      pickupDate,
      trailerType,
      companyName,
      commodity,
    } = data;

    if (price && price > 0) {
      setPrice(price);

      setOrigin(origin.length > 15 ? `${origin.substring(0, 17)}...` : origin);
      setDestination(
        destination.length > 15
          ? `${destination.substring(0, 17)}...`
          : destination
      );

      const currency = "usd";

      // Set ref to true before the async call to prevent multiple fetches
      fetchedClientSecret.current = true;

      const bookingData: BookingData = {
        quote: id!,
        origin,
        destination,
        pickupDate:
          typeof pickupDate === "string"
            ? pickupDate
            : pickupDate.toISOString(),
        trailerType,
        // trailerSize, ! This field is not include in Booking Schema
        companyName,
        commodity,

        price,
      };
      mutation.mutate({
        amount: Math.round(price * 100),
        currency,
        booking: bookingData,
      });
    } else {
      console.error("Invalid price or missing details.");
    }
  }, [data, mutation, fetchedClientSecret]);
  // useEffect(() => {
  //   const state = location.state as {
  //     price?: string;
  //     origin?: string;
  //     destination?: string;
  //   };

  //   let validPrice = false;
  //   let parsedPrice: number | undefined;

  //   if (state) {
  //     const statePrice = state.price;
  //     if (statePrice !== undefined) {
  //       parsedPrice = parseFloat(statePrice);
  //       if (!isNaN(parsedPrice) && parsedPrice > 0) {
  //         setPrice(parsedPrice);
  //         validPrice = true;
  //       } else {
  //         console.error("Invalid price provided");
  //       }
  //     } else {
  //       console.error("Price not provided");
  //     }

  //     const stateOrigin = state.origin;
  //     if (stateOrigin) {
  //       setOrigin(
  //         stateOrigin.length > 15
  //           ? `${stateOrigin.substring(0, 17)}...`
  //           : stateOrigin
  //       );
  //     } else {
  //       console.error("Origin not provided");
  //     }

  //     const stateDestination = state.destination;
  //     if (stateDestination) {
  //       setDestination(
  //         stateDestination.length > 15
  //           ? `${stateDestination.substring(0, 17)}...`
  //           : stateDestination
  //       );
  //     } else {
  //       console.error("Destination not provided");
  //     }
  //   }

  //   if (
  //     validPrice &&
  //     parsedPrice !== undefined &&
  //     !fetchedClientSecret.current
  //   ) {
  //     const currency = "usd";

  //     fetchedClientSecret.current = true; // Set ref to true before the async call to prevent multiple fetches
  //     createPaymentIntent({ amount: Math.round(parsedPrice * 100), currency })
  //       .then((data) => {
  //         setClientSecret(data.clientSecret);
  //         // console.log('Client secret:', data.clientSecret);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching client secret:", error);
  //       });
  //   } else if (!validPrice) {
  //     console.error("Invalid price.");
  //   }
  // }, [location.state]);
  // Loading and Error Handling

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No Quote linked found</p>
      </div>
    );
  }
  if (isQueryLoading || (mutation.isPending && !clientSecret)) {
    // console.log(
    //   `isQueryLoading: ${isQueryLoading} mutation.isPending: ${mutation.isPending}`
    // );
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isQueryError || mutation.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
  const options = {
    clientSecret,
  };

  return (
    clientSecret && (
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-white text-primary min-h-screen justify-center items-center w-full p-4 md:p-0">
        <div className="mb-4  text-lg font-semibold text-primary w-full md:w-1/4 bg-light-grey h-auto md:h-1/2 rounded-lg p-8">
          <div className="flex justify-between text-gray-500 my-4 border-b border-secondary pb-8">
            <p>{origin}</p>
            <FontAwesomeIcon icon={faTruckFast} className="text-2xl" />
            <p>{destination}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-secondary text-base font-normal">Subtotal</h1>
            <p>${price!.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b border-secondary pb-12">
            <h1 className="text-secondary text-base font-normal">
              Taxes and Other Fees
            </h1>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="text-secondary text-lg font-medium">Total</h1>
            <p>${price!.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm bookingId={newBookingId!} quote={data} />
          </Elements>
        </div>
      </div>
    )
  );
}
