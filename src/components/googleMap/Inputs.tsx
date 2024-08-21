import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface InputProps {
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop
}

export const OriginInput: React.FC<InputProps> = ({ onLoad, onPlaceChanged, value, onChange }) => (
  <div className="mb-4">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Origin"
        className="p-2 rounded w-full bg-light-grey text-primary font-normal"
        value={value}
        onChange={onChange} // Use the passed onChange handler
      />
    </Autocomplete>
  </div>
);

export const DestinationInput: React.FC<InputProps> = ({ onLoad, onPlaceChanged, value, onChange }) => (
  <div className="mb-4">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Destination"
        className="p-2 rounded w-full bg-light-grey text-primary font-normal"
        value={value}
        onChange={onChange} // Use the passed onChange handler
      />
    </Autocomplete>
  </div>
);
