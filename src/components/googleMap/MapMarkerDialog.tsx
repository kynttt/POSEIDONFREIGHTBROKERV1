import { useState, useCallback, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Marker, Map, MapMouseEvent, useMap } from "@vis.gl/react-google-maps";
import { Modal, Button } from "@mantine/core";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

const defaultCenter: google.maps.LatLngLiteral = {
  lat: 38.84,
  lng: -104.56,
};

interface IMarkerDialogProps {
  isLoaded: boolean;
  isDialogOpened: boolean;
  opened: boolean;
  onClose: () => void;
  onApply: (position: google.maps.LatLngLiteral) => void;
  initialPosition?: google.maps.LatLngLiteral | null; // Optional initial position
}

export default function MapMarkerDialog({
  isLoaded,
  opened,
  onClose,
  onApply,
  initialPosition = null, // Default to null if not provided
}: IMarkerDialogProps) {
  const map = useMap("map-marker");
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(
      initialPosition || defaultCenter
    );
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // Update marker position when initialPosition changes
  useEffect(() => {
    if (initialPosition) {
      setMarkerPosition(initialPosition);
      map?.panTo(initialPosition);
    }
  }, [initialPosition, map]);

  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (event.detail.latLng) {
        // const position = {
        //   lat: event.latLng.lat(),
        //   lng: event.latLng.lng(),
        // };

        const position = event.detail.latLng;
        setMarkerPosition(position);
        map?.panTo(position);
        //   if (mapInstance) {
        //     mapInstance.panTo(position);
        //   }
      }
    },
    [map]
  );

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      //   if (place.geometry && place.geometry.location) {
      //     const location = place.geometry.location;
      //     const position = {
      //       lat: location.lat(),
      //       lng: location.lng(),
      //     };
      //     setMarkerPosition(position);
      //     map?.panTo(position);
      //     // if (mapInstance) {
      //     //   mapInstance.panTo(position);
      //     // }
      //   }
      if (place.geometry) {
        const location = place.geometry.location;
        if (location) {
          console.log(location);
          // const location = place.geometry.location;
          // const position = location.toJSON();
          setMarkerPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
          map?.setZoom(12);
          map?.panTo(location);
        }
      }
    }
  };

  const onLoadAutocomplete = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleApply = () => {
    if (markerPosition) {
      onApply(markerPosition); // Pass selected location back to the parent
      onClose(); // Close the dialog
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Select Location" centered>
      <div className="flex flex-col space-y-4">
        {/* Search bar */}
        {isLoaded && (
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for a place"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-5"
            />
          </Autocomplete>
        )}

        {/* Map */}
        {isLoaded && opened ? (
          <Map
            id="map-marker"
            defaultZoom={markerPosition ? 8 : 4}
            className="h-[400px] w-full"
            defaultCenter={markerPosition || defaultCenter}
            onClick={onMapClick}
          >
            {/* <AdvancedMarker position={markerPosition || defaultCenter} /> */}
            <Marker position={markerPosition || defaultCenter} />
          </Map>
        ) : (
          <div>Loading Map...</div>
        )}

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={!markerPosition}
        >
          Apply Location
        </Button>
      </div>
    </Modal>
  );
}
