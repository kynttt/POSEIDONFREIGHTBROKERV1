import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { format } from "date-fns";

interface CardProps {
  id: string;
  status: string;
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
  drop,
  price = 0, // Provide a default value of 0
  pickupDate,
}) => {
  const navigate = useNavigate();

  const formattedPickupDate = format(pickupDate, "MM/dd/yyyy");
  const truncatedPickUp =
    pickUp.length > 25 ? `${pickUp.slice(0, 25)}...` : pickUp;
  const truncatedDrop = drop.length > 25 ? `${drop.slice(0, 25)}...` : drop;
  const formattedLoadPrice = price.toFixed(2);

  const handleBookLoadClick = useCallback(() => {
    navigate(`/a/editBooking/${id}`);
  }, [navigate, id]);

  return (
    <div className="w-full px-4">
      <div className="bg-light-grey text-primary shadow-xl rounded-lg py-4 mb-4 text-sm my-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4 sm:px-8 md:px-14">
          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Load Price</p>
            </div>
            <div>
              <p className="font-normal text-2xl text-price">
                ${formattedLoadPrice}
              </p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Status</p>
            </div>
            <div>
              <p className="font-normal">{status}</p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Pickup Date</p>
            </div>
            <div>
              <p className="font-normal">{formattedPickupDate}</p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Pick</p>
            </div>
            <div>
              <p className="font-normal">{truncatedPickUp}</p>
            </div>
          </div>

          <div className="flex items-left flex-col col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Drop</p>
            </div>
            <div>
              <p className="font-normal">{truncatedDrop}</p>
            </div>
          </div>

          <div className="flex items-center justify-end col-span-2 sm:col-span-2 md:col-span-1">
            <Button
              label="Check Load"
              size="medium"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleBookLoadClick}
              className="extra-class-for-medium-button w-full"
              type={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoadCard);
