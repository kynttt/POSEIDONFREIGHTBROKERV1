// AutocompleteInputs.tsx

import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface AutocompleteInputProps {
    onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
    onPlaceChanged: () => void;
}

export const OriginInput: React.FC<AutocompleteInputProps> = ({ onLoad, onPlaceChanged }) => {
    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
                type="text"
                placeholder="Enter pick-up location"
                className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
            />
        </Autocomplete>
    );
};

export const DestinationInput: React.FC<AutocompleteInputProps> = ({ onLoad, onPlaceChanged }) => {
    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
                type="text"
                placeholder="Enter delivery location"
                className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
            />
        </Autocomplete>
    );
};
