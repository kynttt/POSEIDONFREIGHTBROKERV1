import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../assets/img/Component 44.png"; // Import your background image
import { useNavigate } from "react-router-dom";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import rectangle from "../assets/img/Rectangle 114.png";

interface PlaceAutocompleteClassicProps {
  id: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  placeholder?: string;
}

const PlaceAutocompleteClassic = ({
  onPlaceSelect,
  id,
  placeholder,
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
        type="text"
        id={id}
        className="bg-grey mt-1 px-4 py-3 block w-full rounded-lg  shadow-sm focus:border-blue-500 focus:ring-blue-500  placeholder-font-thin"
        placeholder={placeholder}
        style={{ fontWeight: "300" }} // Make the placeholder font thin
      />
    </div>
  );
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API || "";
const LogisticsForm: React.FC = () => {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [destination, setDestination] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [trailerType, setTrailerType] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State to store error messages

  const onRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission refresh
    setError(null); // Reset error message

    if (!origin) {
      setError("Please select an origin location.");
      return;
    }

    if (!destination) {
      setError("Please select a destination location.");
      return;
    }

    if (!trailerType || trailerType === "Select Trailer Type") {
      setError("Please select a trailer type.");
      return;
    }

    // Proceed if all fields are filled
    const originLat = origin.geometry?.location?.lat();
    const originLng = origin.geometry?.location?.lng();
    const destinationLat = destination.geometry?.location?.lat();
    const destinationLng = destination.geometry?.location?.lng();
    const originName = origin.name;
    const destinationName = destination.name;
    const routeCoordinates = [
      [originLng, originLat],
      [destinationLng, destinationLat],
    ];

    const encodedRouteCoordinates = encodeURIComponent(
      JSON.stringify(routeCoordinates)
    );

    navigate(
      `/requests?trailerType=${trailerType}&routeCoordinates=${encodedRouteCoordinates}&originName=${originName}&destinationName=${destinationName}`
    );
  };

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <div className="relative ">
        
        <div className="relative">
          <img
            src={rectangle}
            alt="Trucks"
            className="w-full h-[220px] object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-black opacity-70 sm:block md:block lg:opacity-20 "></div>

      
        <div className="absolute inset-0 flex flex-col justify-center  items-center text-center px-4  md:px-12 lg:px-24">
          <h1 className="text-2xl md:text-4xl lg:text-3xl font-bold text-gray-400 mb-4 leading-tight">
            Book your truck in under{" "}
            <span className="text-yellow-500">5 MINUTES </span> and receive{" "}
            <span className="text-yellow-500">INSTANT, COMPETITIVE</span>{" "}
            quotations.
          </h1>
        </div>
      </div>
      <div className="relative w-full h-3/4">
        {/* Dark Overlay for md to xs screens */}
        <div className="absolute inset-0 bg-black opacity-70 md:opacity-60 lg:opacity-20" />

        {/* Background Section */}
        <div
          className="flex flex-col lg:flex-row items-center justify-between h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`, // Set background image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Left Section - Empty (for background) */}
          <div className="lg:w-1/2 w-full" />

          {/* Right Section */}
          <div className="lg:w-1/2 w-full bg-transparent p-4 lg:p-16 text-white relative">
            <div className="lg:w-5/7 mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 md:text-center sm:text-left">
                Get Quotation, pay and book your freight transportation{" "}
                <span className="text-yellow-500">
                  24 Hours Operating support services
                </span>
              </h2>
              <p className="text-sm lg:text-base mb-8 font-normal lg:w-3/4 mx-auto text-justify lg:px-0 sm:px-24">
                Through Third-Party Logistics (3PL) services, businesses can
                achieve the flexibility and expertise required to streamline
                operations and lower expenses, allowing you to prioritize your
                core business as we oversee logistics, including expedited
                shipping and full truck loads.
              </p>
            </div>

            {/* Updated Form */}
            <form className="bg-white text-gray-900 p-6 rounded-lg shadow-lg lg:w-3/4 mx-auto">
              {/* Origin Location */}
              <div className="mb-4">
                <label
                  htmlFor="origin"
                  className="block text-md font-medium text-rblue"
                >
                  Choose pick-up destination
                </label>
                <PlaceAutocompleteClassic
                  id="origin"
                  placeholder={"Enter Origin Location"}
                  onPlaceSelect={(place) => {
                    setOrigin(place);
                  }}
                />
              </div>

              {/* Destination Location */}
              <div className="mb-4">
                <label
                  htmlFor="destination"
                  className="block text-md text-rblue font-medium"
                >
                  Choose drop-off location
                </label>
                <PlaceAutocompleteClassic
                  id="destination"
                  placeholder={"Enter Destination Location"}
                  onPlaceSelect={(place) => {
                    setDestination(place);
                  }}
                />
              </div>

              {/* Trailer Type */}
              <div className="mb-6">
                <label
                  htmlFor="trailerType"
                  className="block text-md text-rblue font-medium"
                >
                  Choose your trailer type
                </label>
                <select
                  id="trailerType"
                  value={trailerType}
                  onChange={(e) => setTrailerType(e.target.value)}
                  className="bg-grey mt-1 px-4 py-3 block w-full rounded-lg  shadow-sm focus:border-blue-500 focus:ring-blue-500 "
                  style={{ fontWeight: "300" }}
                >
                  <option>Select Trailer Type</option>
                  <option>Dry Van</option>
                  <option>Flatbed</option>
                  <option>Reefer</option>
                  <option>Stepdeck</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 text-red-500 font-medium text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="md:w-1/2 w-full bg-yellow-500 text-blue-900 py-3 px-4 rounded-md shadow-sm font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={onRequestQuote}
                >
                  Get Instant Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default LogisticsForm;