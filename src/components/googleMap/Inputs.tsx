import React from "react";
import { Autocomplete } from "@react-google-maps/api";

interface InputProps {
  value?: string;
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
}

export const OriginInput: React.FC<InputProps> = ({
  value,
  onLoad,
  onPlaceChanged,
}) => (
  <div className="">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        value={value}
        type="text"
        placeholder="Origin"
        className="p-2   rounded w-full bg-light-grey text-primary font-normal "
      />
    </Autocomplete>
  </div>
);

export const DestinationInput: React.FC<InputProps> = ({
  value,
  onLoad,
  onPlaceChanged,
}) => (
  <div className="">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        value={value}
        placeholder="Destination"
        className="p-2  rounded w-full bg-light-grey text-primary font-normal "
      />
    </Autocomplete>
  </div>
);
