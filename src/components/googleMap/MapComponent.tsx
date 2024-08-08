import React from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '575px',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)', // Adding box shadow
  borderRadius: '8px', // Adding border radius
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

// Custom styles for the map
const mapStyles = [
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4e4e4"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a8caea" 
      }
    ]
  }
];

interface MapComponentProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  directions: google.maps.DirectionsResult | null;
  originLocation: google.maps.LatLng | null;
  destinationLocation: google.maps.LatLng | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({
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
    options={{ styles: mapStyles }} // Applying custom styles
  >
    {originLocation && <Marker position={originLocation} label="A" />}
    {destinationLocation && <Marker position={destinationLocation} label="B" />}
    {directions && (
      <DirectionsRenderer
        directions={directions}
        options={{
          polylineOptions: {
            strokeColor: '#7783D2', // Gray color for the route
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }
        }}
      />
    )}
  </GoogleMap>
);
