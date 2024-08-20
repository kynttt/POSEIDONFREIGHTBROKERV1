import { Libraries } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  OriginInput,
  DestinationInput,
} from "../../components/googleMap/Inputs";
import { MapComponent } from "../../components/googleMap/MapComponent";
import { calculateRoute } from "../../components/googleMap/utils";
// import { useAuth } from '../../hooks/useAuth';
import Button from "../../components/Button";
import { useAuthStore } from "../../state/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  // faCalendarAlt,
  faTruck,
  faBox,
  faWeight,
  faBuilding,
  faMapLocationDot,
  faMoneyBillWave,
  faNoteSticky,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { createQuote } from "../../lib/apiCalls";
import { calculatePrice } from "../../components/googleMap/priceCalculator";

// Import truck types and sizes data
import truckTypes from "../../components/googleMap/truckTypes.json";
import truckSizes from "../../components/googleMap/truckSizes.json";
import Calendar from "../../components/Calendar";
import { Quote } from "../../utils/types";

const libraries: Libraries = ["places"];
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API || ""; // Provide an empty string as a fallback

export default function DistanceCalculatorPage() {
  // };
  const navigate = useNavigate();
  // const { isAuthenticated, login } = useAuth();
  const { isAuthenticated, userId } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userId: state.userId, // Make sure userId is part of your store
  }));

  useEffect(() => { }, [isAuthenticated]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocompleteA, setAutocompleteA] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteB, setAutocompleteB] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originLocation, setOriginLocation] =
    useState<google.maps.LatLng | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<google.maps.LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState<number | null>(null); // State to hold calculated price

  const [pickupDate, setPickupDate] = useState("");
  const [selectedTrailerType, setSelectedTrailerType] = useState<string>("");
  const [selectedTrailerSize, setSelectedTrailerSize] = useState<number>(0);
  const [commodity, setCommodity] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [packagingNumber, setPackagingNumber] = useState("");
  const [selectedPackagingType, setSelectedPackagingType] = useState("");
  const [notes, setNotes] = useState("");
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const saveDataToSessionStorage = () => {
    const data = {
      origin,
      destination,
      pickupDate,
      selectedTrailerType,
      selectedTrailerSize,
      commodity,
      maxWeight,
      companyName,
      packagingNumber,
      selectedPackagingType,
      notes,
      distance,
      price,
    };
    sessionStorage.setItem('distanceCalculatorData', JSON.stringify(data));
  };

  const handleConfirmFirstModal = () => {
    saveDataToSessionStorage();
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleConfirmSecondModal = () => {
    saveDataToSessionStorage();
    setShowSecondModal(false);
    setShowThirdModal(true);
  };

  const handleConfirmThirdModal = () => {
    sessionStorage.removeItem('distanceCalculatorData');
    setShowThirdModal(false);
    setShowPrice(true);
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem('distanceCalculatorData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setOrigin(data.origin || '');
      setDestination(data.destination || '');
      setPickupDate(data.pickupDate || '');
      setSelectedTrailerType(data.selectedTrailerType || '');
      setSelectedTrailerSize(data.selectedTrailerSize || 0);
      setCommodity(data.commodity || '');
      setMaxWeight(data.maxWeight || '');
      setCompanyName(data.companyName || '');
      setPackagingNumber(data.packagingNumber || '');
      setSelectedPackagingType(data.selectedPackagingType || '');
      setNotes(data.notes || '');
      setDistance(data.distance || '');
      setPrice(data.price || null);
    }
  }, []);


  const [warnings, setWarnings] = useState({
    origin: "",
    destination: "",
    pickupDate: "",
    selectedTrailerType: "",
    selectedTrailerSize: "",
    commodity: "",
    maxWeight: "",
    companyName: "",
    packaging: "",
  });

  const onLoadA = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      setAutocompleteA(autocomplete);
    },
    []
  );

  const onLoadB = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      setAutocompleteB(autocomplete);
    },
    []
  );

  const onPlaceChangedA = () => {
    if (autocompleteA) {
      const place = autocompleteA.getPlace();
      if (place.formatted_address) {
        setOrigin(place.formatted_address);
      }
      if (place.geometry && place.geometry.location) {
        setOriginLocation(place.geometry.location);
      }
    }
  };

  const onPlaceChangedB = () => {
    if (autocompleteB) {
      const place = autocompleteB.getPlace();
      if (place.formatted_address) {
        setDestination(place.formatted_address);
      }
      if (place.geometry && place.geometry.location) {
        setDestinationLocation(place.geometry.location);
      }
    }
  };

  useEffect(() => {
    if (originLocation && destinationLocation) {
      calculateRoute({
        origin,
        destination,
        setDirections,
        setDistance,
        map,
        originLocation,
        destinationLocation,
      });
    }
  }, [originLocation, destinationLocation, origin, destination, map]);

  useEffect(() => {
    if (map && originLocation && destinationLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(originLocation);
      bounds.extend(destinationLocation);
      map.fitBounds(bounds);
    }
  }, [map, originLocation, destinationLocation]);

  useEffect(() => {
    if (distance && selectedTrailerType && selectedTrailerSize && maxWeight) {
      const calculatedPrice = calculatePrice(
        distance,
        selectedTrailerType,
        selectedTrailerSize,
        maxWeight
      );
      setPrice(calculatedPrice);
    }
  }, [distance, selectedTrailerType, selectedTrailerSize, maxWeight]);

  const handleQuoteButtonClick = async () => {
    const newWarnings = {
      origin: !origin ? "Please select a pickup location." : "",
      destination: !destination ? "Please select a drop-off location." : "",
      pickupDate: !pickupDate ? "Please select a pickup date." : "",
      selectedTrailerType: !selectedTrailerType
        ? "Please select a trailer type."
        : "",
      selectedTrailerSize:
        selectedTrailerSize === 0 ? "Please select a trailer size." : "",
      commodity: !commodity ? "Please enter the commodity." : "",
      maxWeight: !maxWeight ? "Please enter the maximum weight." : "",
      companyName: !companyName ? "Please enter the company name." : "",
      packaging:
        !packagingNumber || !selectedPackagingType
          ? "Please fill both packaging number and type."
          : "",
    };

    setWarnings(newWarnings);

    if (Object.values(newWarnings).some((warning) => warning !== "")) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const quoteDetails: Quote = {
        origin,
        destination,
        pickupDate: new Date(pickupDate).toISOString(),
        trailerType: selectedTrailerType,
        trailerSize: selectedTrailerSize,
        commodity,
        maxWeight: parseInt(maxWeight),
        companyName,
        distance,
        packaging: `${packagingNumber} ${selectedPackagingType}`,
        price: parseFloat(price!.toFixed(2)),
        notes,
      };

      try {
        const data = await createQuote(quoteDetails);
        navigate("/requests/confirmation", {
          state: { price, quoteId: data._id, userId },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating quote:", error.message);
        } else {
          console.error("Unknown error occurred while creating quote");
        }
      }
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading message until the script is loaded
  }
  return (
    <div className="flex h-full flex-1">
      {/* <SideBar isAuthenticated={isAuthenticated} /> */}
      <div className="flex-1 bg-white min-h-screen overflow-y-auto">
        <div className="relative">
          <div className="mt-4  lg:col-span-3">
            <MapComponent
              map={map}
              setMap={setMap}
              directions={directions}
              originLocation={originLocation}
              destinationLocation={destinationLocation}
            />
          </div>
        </div>

        {/* Calendar and Dialog */}
        <div className=" flex justify-center w-full absolute  bottom-0 left-0 right-0 lg:mx-auto py-8   px-4  rounded-lg ">
          <div className="lg:ml-80 gap-8 md:flex justify-center w-full">
            {/* <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-medium text-secondary mb-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2 text-gray-400"
                />
                Pickup Date <span className="text-red-500">*</span>
              </h3>
              
            </div> */}
            <Calendar
              value={pickupDate}
              onChange={(date) => {
                setPickupDate(date);
                setShowFirstModal(true); // Show the first modal when a date is picked
              }}
              className="border border-secondary rounded"
            />

            {warnings.pickupDate && (
              <p className="text-red-500 text-sm">{warnings.pickupDate}</p>
            )}

            {showFirstModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 backdrop-blur-sm z-50">
                <div className="mx-2 bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowFirstModal(false)}
                    aria-label="Close"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div>
                    <h1 className="text-primary text-xl">Book Your Shipment</h1>
                    <p className="text-gray-500 font-normal mb-8">
                      Enter your shipment details and select your transportation
                      option.
                    </p>
                  </div>

                  <div className="md:flex gap-4">
                    <div className="mb-8 md:mb-0 w-full">
                      <h3 className="text-lg font-normal text-secondary mb-2">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-2 text-gray-400"
                        />
                        Pickup Location <span className="text-red-500">*</span>
                      </h3>
                      <OriginInput
                        onLoad={onLoadA}
                        onPlaceChanged={onPlaceChangedA}
                      />
                      {warnings.origin && (
                        <p className="text-red-500 text-sm">
                          {warnings.origin}
                        </p>
                      )}
                    </div>

                    <div className="mb-8 md:mb-0 lg:border-secondary w-full">
                      <h3 className="text-lg font-normal text-secondary mb-2">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-2 text-gray-400"
                        />
                        Drop-off Location{" "}
                        <span className="text-red-500">*</span>
                      </h3>
                      <DestinationInput
                        onLoad={onLoadB}
                        onPlaceChanged={onPlaceChangedB}
                      />
                      {warnings.destination && (
                        <p className="text-red-500 text-sm">
                          {warnings.destination}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" ">
                    <div className="w-full md:w-full mb-8 md:mb-0 ">
                      <div className="mb-2 lg:mt-4">
                        <h3 className="text-lg font-normal text-secondary mb-2">
                          <FontAwesomeIcon
                            icon={faTruck}
                            className="mr-2 text-gray-400"
                          />
                          Trailer Type <span className="text-red-500">*</span>
                        </h3>
                        <div className="flex justify-between gap-2">
                          {truckTypes.map((type) => (
                            <button
                              key={type.type}
                              className={`p-2 bg-grey   rounded w-full md:w-full  text-primary font-normal ${selectedTrailerType === type.type
                                ? "bg-secondary text-white" // Highlight selected button
                                : ""
                                }`}
                              onClick={() => setSelectedTrailerType(type.type)}
                            >
                              {type.type}
                            </button>
                          ))}
                        </div>

                        {warnings.selectedTrailerType && (
                          <p className="text-red-500 text-sm">
                            {warnings.selectedTrailerType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 ">
                      <div className="mb-4 lg:mt-4">
                        <h3 className="text-lg font-normal text-secondary my-2">
                          Size (ft) <span className="text-red-500">*</span>
                        </h3>
                        <div className="flex  gap-2">
                          {truckSizes.map((size) => (
                            <button
                              key={size}
                              className={`p-2 bg-grey rounded w-full lg:w-full text-primary font-normal ${selectedTrailerSize === size
                                ? "bg-secondary text-white"
                                : ""
                                } ${size === 48 &&
                                  (selectedTrailerType === "Dry Van" ||
                                    selectedTrailerType === "Refrigerated")
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                                }`}
                              onClick={() => setSelectedTrailerSize(size)}
                              disabled={
                                size === 48 &&
                                (selectedTrailerType === "Dry Van" ||
                                  selectedTrailerType === "Refrigerated")
                              }
                            >
                              {size}
                              {size === 48 &&
                                (selectedTrailerType === "Dry Van" ||
                                  selectedTrailerType === "Refrigerated") && (
                                  <span className="ml-2 text-red-500">🚫</span> // Sign added here
                                )}
                            </button>
                          ))}
                        </div>

                        {warnings.selectedTrailerSize && (
                          <p className="text-red-500 text-sm">
                            {warnings.selectedTrailerSize}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={` py-2 px-4  rounded text-white 
    ${!origin || !destination || !selectedTrailerType || !selectedTrailerSize
                          ? "bg-gray-400 cursor-not-allowed w-1/3"
                          : "bg-primary hover:bg-secondary cursor-pointer w-1/3"
                        }`}
                      onClick={handleConfirmFirstModal}
                      disabled={
                        !origin ||
                        !destination ||
                        !selectedTrailerType ||
                        !selectedTrailerSize
                      }
                    >
                      Next . . .
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showSecondModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowSecondModal(false)}
                    aria-label="Close"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div>
                    <h1 className="text-primary text-xl">Book Your Shipment</h1>
                    <p className="text-gray-500 font-normal mb-8">
                      Please provide the commodity type, weight, and packaging
                      information for your shipment.
                    </p>
                  </div>
                  <div className="mb-8 md:mb-0">
                    <h3 className="text-lg font-normal text-secondary mb-2">
                      <FontAwesomeIcon
                        icon={faBox}
                        className="mr-2 text-gray-400"
                      />
                      Commodity <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                      placeholder="e.g. Electronics"
                      value={commodity}
                      onChange={(e) => setCommodity(e.target.value)}
                    />
                    {warnings.commodity && (
                      <p className="text-red-500 text-sm">
                        {warnings.commodity}
                      </p>
                    )}
                  </div>

                  <div className="mb-8 md:mb-0 mt-2">
                    <h3 className="text-lg font-normal text-secondary mb-2">
                      <FontAwesomeIcon
                        icon={faWeight}
                        className="mr-2 text-gray-400"
                      />
                      Maximum Weight <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                      placeholder="e.g. 1000lbs"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(e.target.value)}
                    />
                    {warnings.maxWeight && (
                      <p className="text-red-500 text-sm">
                        {warnings.maxWeight}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap md:mt-4">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-4">
                      <h3 className="text-lg font-normal text-secondary mb-2">
                        <FontAwesomeIcon
                          icon={faBox}
                          className="mr-2 text-gray-400"
                        />
                        Packaging <span className="text-red-500">*</span>
                      </h3>
                      <input
                        type="number"
                        className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                        value={packagingNumber}
                        onChange={(e) => setPackagingNumber(e.target.value)}
                        placeholder="Enter no. of packages"
                      />
                      {warnings.packaging && (
                        <p className="text-red-500 text-sm">
                          {warnings.packaging}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-2/3">
                      <h3 className="text-lg font-normal text-secondary mb-2">
                        Packaging Type <span className="text-red-500">*</span>
                      </h3>
                      <select
                        className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                        value={selectedPackagingType}
                        onChange={(e) =>
                          setSelectedPackagingType(e.target.value)
                        }
                      >
                        <option value="">Select packaging type</option>
                        <option value="Carton">Carton</option>
                        <option value="Floor">Floor</option>
                        <option value="Loose">Loose</option>
                        <option value="Pallet">Pallet</option>
                        <option value="Roll">Roll</option>
                        <option value="Skids">Skids</option>
                        <option value="Others">Others</option>
                      </select>
                      {warnings.packaging && (
                        <p className="text-red-500 text-sm">
                          {warnings.packaging}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`mt-4 py-2 px-4 rounded text-white 
    ${!commodity || !maxWeight || !packagingNumber || !selectedPackagingType
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-secondary cursor-pointer"
                        }`}
                      onClick={handleConfirmSecondModal}
                      disabled={
                        !commodity ||
                        !maxWeight ||
                        !packagingNumber ||
                        !selectedPackagingType
                      }
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showThirdModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowThirdModal(false)}
                    aria-label="Close"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div>
                    <h1 className="text-primary text-xl">Book Your Shipment</h1>
                    <p className="text-gray-500 font-normal mb-8">
                      Provide the consignee's information and any additional
                      notes about the shipment.
                    </p>
                  </div>
                  <div className="mb-8 md:mb-0">
                    <h3 className="text-lg font-medium text-secondary my-2">
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="mr-2 text-gray-400"
                      />
                      Company Name / Consignee{" "}
                      <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                      placeholder="Enter your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    {warnings.companyName && (
                      <p className="text-red-500 text-sm">
                        {warnings.companyName}
                      </p>
                    )}
                  </div>

                  <div className="mb-8 md:mb-0 w-full">
                    <h3 className="text-lg font-medium text-secondary my-2">
                      <FontAwesomeIcon
                        icon={faNoteSticky}
                        className="mr-2 text-gray-400"
                      />
                      Additional Notes
                    </h3>
                    <textarea
                      className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                      placeholder="Enter your additional notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`mt-4 py-2 px-4 rounded text-white 
    ${!companyName
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-secondary cursor-pointer"
                        }`}
                      onClick={handleConfirmThirdModal}
                      disabled={!companyName}
                    >
                      {!companyName ? "Almost There!" : "Done 🎉"}
                    </button>

                  </div>
                  {companyName && (
                    <p className="text-gray-500 font-normal ">Please check your price...</p>
                  )}
                </div>
              </div>
            )}

            <div className="border border-secondary p-8 bg-white h-auto w-1/4 rounded-lg shadow-xl">

              {showPrice ? (
                <div>
                  <h1 className="text-primary text-xl">Your Quote is Ready!</h1>
                  <p className="text-gray-500 font-normal mb-8">
                    Your price has been calculated. You can now review your details and proceed to payment.
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-primary text-xl">Complete Your Details</h1>
                  <p className="text-gray-500 font-normal mb-8">
                    Please fill out all required information so we can calculate the distance and price for your shipment.
                  </p>
                </div>
              )}
              <div className="flex flex-col items-left mb-4 lg:mb-0">
                <div className="text-primary text-2xl font-medium pt-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="text-gray-400 w-6"
                  />{" "}
                  Distance
                </div>
                {showPrice && (
                  <div
                    className="text-secondary text-4xl font-medium text-gray-500 p-4 rounded-lg"
                    style={{ height: "60px" }}
                  >
                    {distance ? distance : <span>&nbsp;</span>}
                  </div>
                )}

              </div>

              <div className="flex flex-col items-left">
                <div className="text-primary text-2xl font-medium pt-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="text-gray-400 w-6"
                  />{" "}
                  Price
                </div>
                {showPrice && (
                  <div
                    className="text-secondary text-4xl font-large text-gray-500 p-4 rounded-lg"
                    style={{ height: "60px" }}
                  >
                    {price !== null ? (
                      `$ ${price.toFixed(2)}`
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                )}
              </div>
              {pickupDate && (
                <Button
                  label="GET THIS QUOTE"
                  size="xl"
                  bgColor="#7783D2"
                  hoverBgColor="white"
                  onClick={handleQuoteButtonClick}
                  className="extra-class-for-medium-button mt-8"
                  type="button"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
