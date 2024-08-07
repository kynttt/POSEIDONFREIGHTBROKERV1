import React, { useState, useCallback, memo } from "react";
import Button from "./Button";
import DispatchDetailsModal from "./DispatchDetailsModal";

interface CardProps {
  id: string;
  pickUp: string;
  drop: string;
  maxWeight: number;
  companyName: string;
  trailerType: string;
  distance: number;
  trailerSize: string;
  loadPrice: number;
  commodity: string;
  pickupDate: Date;
  onBookLoadClick?: () => void;
}

const LoadCard: React.FC<CardProps> = ({
  id,
  pickUp,
  drop,
  maxWeight,
  companyName,
  trailerType,
  distance,
  trailerSize,
  commodity,
  loadPrice,
  pickupDate,
  onBookLoadClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookLoadClick = useCallback(() => {
    if (onBookLoadClick) {
      onBookLoadClick();
    }
    setIsModalOpen(true);
  }, [onBookLoadClick]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="">
      <div className="bg-light-grey text-primary shadow-xl rounded-lg py-8 mb-4 text-xs my-8">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex items-center flex-col col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Load Price</p>
            </div>
            <div>
              <p className="font-normal text-2xl text-price">${loadPrice}</p>
            </div>
          </div>
          <div className="flex items-left flex-col col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Post ID:</p>
            </div>
            <div>
              <p className="font-normal">{id}</p>
            </div>
          </div>
          <div className="flex items-left flex-col col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Pick</p>
            </div>
            <div>
              <p className="font-normal">{pickUp}</p>
            </div>
          </div>
          <div className="flex items-left flex-col col-span-2 md:col-span-1">
            <div className="flex items-center">
              <p className="font-bold">Drop</p>
            </div>
            <div>
              <p className="font-normal">{drop}</p>
            </div>
          </div>

          <div className="flex items-center justify-center col-span-2 md:col-span-1">
            <Button
              label="Book Load"
              size="medium"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleBookLoadClick}
              className="extra-class-for-medium-button"
              type={""}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DispatchDetailsModal
          id={id}
          pickUp={pickUp}
          drop={drop}
          maxWeight={maxWeight}
          trailerType={trailerType}
          trailerSize={trailerSize}
          distance={distance}
          companyName={companyName}
          commodity={commodity}
          pickupDate={pickupDate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default memo(LoadCard);
