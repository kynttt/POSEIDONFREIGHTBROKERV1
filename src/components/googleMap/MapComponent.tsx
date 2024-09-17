import { Map } from "@vis.gl/react-google-maps";
import { memo } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "50vh", // Adjusted for responsive height
//   boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)", // Adding box shadow
//   borderRadius: "8px", // Adding border radius
// };

const defaultCenter: google.maps.LatLngLiteral = {
  lat: 38.84,
  lng: -104.56,
};

// Custom styles for the map
const mapStyles = [
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#e4e4e4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a8caea",
      },
    ],
  },
];

// interface MapComponentProps {
//   map: google.maps.Map | null;
//   setMap: (map: google.maps.Map | null) => void;
//   directions: google.maps.DirectionsResult | null;
//   originLocation: google.maps.LatLngLiteral | null;
//   destinationLocation: google.maps.LatLngLiteral | null;
// }

export function MapComponent() {
  console.log("MapComponent rendered");
  return (
    <>
      <Map
        id={"map-background"}
        // mapContainerStyle={containerStyle}
        className="w-full h-full"
        defaultCenter={defaultCenter}
        defaultZoom={4}
        // onLoad={(map) => setMap(map)}
        // options={{ styles: mapStyles }} // Applying custom styles

        styles={mapStyles}
      >
        {/* {originLocation && <Marker position={originLocation} label="A" />}
{destinationLocation && (
  <Marker position={destinationLocation} label="B" />
)}
{directions && (
  <DirectionsRenderer
    directions={directions}
    options={{
      polylineOptions: {
        strokeColor: "#7783D2", // Gray color for the route
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
    }}
  />
)} */}
      </Map>
    </>
  );
  {
    /* <GoogleMap
    mapContainerStyle={containerStyle}
    center={defaultCenter}
    zoom={10}
    onLoad={(map) => setMap(map)}
    options={{ styles: mapStyles }} // Applying custom styles
  >
    {originLocation && <Marker position={originLocation} label="A" />}
    {destinationLocation && (
      <Marker position={destinationLocation} label="B" />
    )}
    {directions && (
      <DirectionsRenderer
        directions={directions}
        options={{
          polylineOptions: {
            strokeColor: "#7783D2", // Gray color for the route
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        }}
      />
    )}
  </GoogleMap> */
  }
}

export default memo(MapComponent);
