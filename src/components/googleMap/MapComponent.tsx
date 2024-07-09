import React from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '625px',
  // boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', // Adding box shadow
  borderRadius: '8px', // Adding border radius
};



const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

interface MapComponentProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  directions: google.maps.DirectionsResult | null;
  originLocation: google.maps.LatLng | null;
  destinationLocation: google.maps.LatLng | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  map,
  setMap,
  directions,
  originLocation,
  destinationLocation,
}) => (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={defaultCenter}
    zoom={10}
    onLoad={(map) => setMap(map)}
  >
    {originLocation && <Marker position={originLocation} label="A" />}
    {destinationLocation && <Marker position={destinationLocation} label="B" />}
    {directions && <DirectionsRenderer directions={directions} />}
  </GoogleMap>
);
