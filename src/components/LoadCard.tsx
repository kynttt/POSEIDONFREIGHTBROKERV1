import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "./Button";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { toBookPaymentStatus, toBookStatusTitle } from "./googleMap/utils";
import { BookingPaymentStatus, BookingStatus } from "../utils/types";

interface CardProps {
  id: string;
  status: string;
  paymentStatus: BookingPaymentStatus;
  pickUp: string;
  drop: string;
  maxWeight: number;
  companyName: string;
  trailerType: string;
  distance: number;
  trailerSize: string;
  price?: number;
  commodity: string;
  pickupDate: Date;
  onBookLoadClick?: () => void;
}

const LoadCard: React.FC<CardProps> = ({
  id,
  status,
  pickUp,
  paymentStatus,
  drop,
  price = 0, // Provide a default value of 0
  pickupDate,
}) => {
  const navigate = useNavigate();

  const formattedPickupDate = format(pickupDate, "MM/dd/yyyy");
  const truncatedPickUp =
    pickUp.length > 25 ? `${pickUp.slice(0, 25)}...` : pickUp;
  const truncatedDrop = drop.length > 25 ? `${drop.slice(0, 35)}...` : drop;
  const formattedLoadPrice = price.toFixed(2);

  const handleBookLoadClick = useCallback(() => {
    navigate(`/a/editBooking/${id}`);
  }, [navigate, id]);

  return (
    <div className="w-full px-4">
      <button
        onClick={handleBookLoadClick}
        className="bg-white hover:bg-gray-100 text-primary w-full rounded-lg py-4 mb-2 text-sm  transform transition-transform duration-500 hover:scale-105 shadow-md"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4 sm:px-8 md:px-14">
          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Load Price</p>
            </div>
            <div>
              <p className="flex items-center font-medium text-lg ">
                ${formattedLoadPrice}
              </p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Status</p>
            </div>
            <div>
              <p className="flex items-center font-normal">
                {toBookStatusTitle(status as BookingStatus)}{" "}
                {(paymentStatus === "paid" || paymentStatus === "refunded") && (
                  <span className="text-red-500">
                    ({toBookPaymentStatus(paymentStatus)})
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Pickup Date</p>
            </div>
            <div>
              <p className="flex items-center font-normal">
                {formattedPickupDate}
              </p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Pick</p>
            </div>
            <div>
              <p className="flex items-center text-left font-normal">
                {truncatedPickUp}
              </p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Drop</p>
            </div>
            <div>
              <p className="flex items-center text-left font-normal">
                {truncatedDrop}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end col-span-2 sm:col-span-2 md:col-span-1">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default memo(LoadCard);
