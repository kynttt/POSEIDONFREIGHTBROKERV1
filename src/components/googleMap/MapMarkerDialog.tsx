import { useState, useCallback, useEffect, useRef } from "react";
import {
  Map,
  MapMouseEvent,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Modal, Button } from "@mantine/core";

const defaultCenter: google.maps.LatLngLiteral = {
  lat: 38.84,
  lng: -104.56,
};

interface IMarkerDialogProps {
  isDialogOpened: boolean;
  opened: boolean;
  onClose: () => void;
  onApply: (position: google.maps.LatLngLiteral) => void;
  initialPosition?: google.maps.LatLngLiteral | null; // Optional initial position
}

// The PlaceAutocompleteClassic component as provided
interface PlaceAutocompleteClassicProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocompleteClassic = ({
  onPlaceSelect,
}: PlaceAutocompleteClassicProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2"
        placeholder="Search for a place"
      />
    </div>
  );
};

// The main MapMarkerDialog component
export default function MapMarkerDialog({
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

  // Update marker position when initialPosition changes
  useEffect(() => {
    if (initialPosition) {
      setMarkerPosition(initialPosition || defaultCenter);
      map?.panTo(initialPosition);
    }
  }, [initialPosition, map]);

  // Handle map click event
  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (event.detail.latLng) {
        const position = {
          lat: event.detail.latLng.lat,
          lng: event.detail.latLng.lng,
        };
        setMarkerPosition(position);
        map?.panTo(position);
      }
    },
    [map]
  );

  // Handle place selection from Autocomplete
  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location) {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarkerPosition(position);
      map?.panTo(position);
    }
  };

  // Apply the selected location
  const handleApply = () => {
    if (markerPosition) {
      onApply(markerPosition); // Pass selected location back to the parent
      onClose(); // Close the dialog
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Select Location" centered>
      <div className="flex flex-col space-y-4">
        <p className="text-primary text-sm">Use the Search Bar or Tap the Map to Drop Your Pin!</p>
        <div className="flex items-top space-x-2">
          <i className="fas fa-info-circle text-gray-600"></i>
          <p className="text-gray-600 text-xs font-normal">
            Please ensure both the pickup and drop-off locations are commercial areas suitable and permitted for trailers/semi-truck loading and unloading.
          </p>
        </div>
        {/* Autocomplete Search bar */}
        <PlaceAutocompleteClassic onPlaceSelect={handlePlaceSelect}/>

        {/* Map */}
        {opened ? (
          <Map
            id="map-marker"
            className="h-[400px] w-full"
            defaultCenter={markerPosition || defaultCenter}
            onClick={onMapClick}
            defaultZoom={4}
          >
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
