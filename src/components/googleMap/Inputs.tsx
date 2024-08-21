import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface InputProps {
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
}

export const OriginInput: React.FC<InputProps> = ({ onLoad, onPlaceChanged }) => (
  <div className="mb-4">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input type="text" placeholder="Origin" className="p-2   rounded w-full bg-light-grey text-primary font-normal " />
    </Autocomplete>
  </div>
);

export const DestinationInput: React.FC<InputProps> = ({ onLoad, onPlaceChanged }) => (
  <div className="mb-4">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input type="text" placeholder="Destination" className="p-2  rounded w-full bg-light-grey text-primary font-normal " />
    </Autocomplete>
  </div>
);
