import { Libraries } from "@react-google-maps/api";
import { useAuthStore } from "../../state/useAuthStore";

import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  OriginInput,
  DestinationInput,
} from "../../components/googleMap/Inputs";
import { MapComponent } from "../../components/googleMap/MapComponent";
import { calculateRoute } from "../../components/googleMap/utils";
// import { useAuth } from '../../hooks/useAuth';
// import Button from "../../components/Button";

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
import {
  fetchQuoteDetails,
  getPricePerMile,
  listTrucks,
} from "../../lib/apiCalls";
import { calculatePrice } from "../../components/googleMap/priceCalculator";

// Import truck types and sizes data
import Calendar from "../../components/Calendar";
// import { Quote } from "../../utils/types";
import { driver } from "driver.js";
import "driver.js/dist/driver.css"; // Import the driver.js CSS
import { GetPriceMileData, GetPriceMileResponse } from "../../utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";

const libraries: Libraries = ["places"];
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API || ""; // Provide an empty string as a fallback

export default function DistanceCalculatorPage() {
  const [showCalendar, setShowCalendar] = useState(true);
  const { role } = useAuthStore();
  const [isTourStarted, setIsTourStarted] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quoteId = searchParams.get("quoteId");
  // };
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const {
    data: dataState,
    warnings,
    update: updateState,
    init: initDistanceCalculator,
    generateWarning,
  } = useDistanceCalculator();

  /// <<<--- MAP RELATED STATES --->>>
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<google.maps.LatLng | null>(null);
  const [autocompleteA, setAutocompleteA] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteB, setAutocompleteB] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [originLocation, setOriginLocation] =
    useState<google.maps.LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  /// <<<--- MAP RELATED STATES END --->>>

  const [showPrice, setShowPrice] = useState(false);

  /// <<<--- MODAL STATES --->>>
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  /// <<<--- MODAL STATES END --->>>

  const {
    data: listTrucksData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["truck-catalogs", "distance-calculator"],

    staleTime: undefined,
    gcTime: undefined,
    queryFn: listTrucks,
  });

  const {
    data,
    isLoading: isQueryLoading,
    error: savedQuoteError,
  } = useQuery({
    enabled: !!quoteId && !!listTrucksData && listTrucksData.length > 0,
    queryKey: ["bookingDetails", quoteId],
    queryFn: () => fetchQuoteDetails(quoteId),
    refetchOnWindowFocus: false,
    staleTime: 600000, // 10 minutes
    gcTime: 1800000, // 30 minutes
  });

  const mutation = useMutation<
    GetPriceMileResponse,
    AxiosError,
    GetPriceMileData
  >({
    mutationFn: getPricePerMile,
    onSuccess: (data) => {
      if (!dataState) {
        return;
      }

      if (!dataState.distance && !dataState.maxWeight) {
        return;
      }
      const calculatedPrice = calculatePrice(
        dataState.distance!,
        data.pricePerMile,
        dataState.maxWeight!
      );

      if (!calculatePrice) {
        return;
      }
      // setPrice(calculatedPrice);
      updateState({
        ...dataState!,
        price: calculatedPrice!,
      });
    },
    onError: (error) => {
      console.error("Error fetching price data:", error.message);
      notifications.show({
        title: "Error",
        message: "An error occurred while calculating the price",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    },
  });

  useEffect(() => {
    if (data && listTrucksData && listTrucksData.length > 0) {
      const {
        origin,
        destination,
        pickupDate,
        trailerType,
        trailerSize,
        commodity,
        maxWeight,
        companyName,
        packaging,
        notes,
        distance,
        price,
      } = data;

      const packagingSplit = packaging.split(" ");

      const trailerTypeFound = listTrucksData!.find(
        (type) => type.truckType === trailerType
      );

      initDistanceCalculator({
        packagingNumber: parseInt(packagingSplit[0], 10),
        packagingType: packagingSplit[1],
        origin,
        destination,
        pickupDate: new Date(pickupDate).toLocaleDateString(),
        trailerType: trailerTypeFound,
        trailerSize,
        commodity,
        maxWeight: maxWeight.toString(),
        companyName,
        notes: notes || undefined,
        distance,
        price,
      });
    }
  }, [data, isQueryLoading]);

  useEffect(() => {
    if (!isTourStarted && role === "user") {
      setIsTourStarted(true);

      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: "#calendar",
            popover: {
              title: "Pick a Date",
              description:
                "Select a date for the pickup of your shipment. Ensure it aligns with your desired schedule.",
              side: "right",
              align: "start",
            },
          },

          // Add more steps if needed
        ],
      });

      // Start the tour
      driverObj.drive();
    }
  }, [isTourStarted, role]); // Only run once when the component mounts

  useEffect(() => {
    if (listTrucksData && listTrucksData.length == 0) {
      notifications.show({
        title: "No Trailers Found",
        message: "It seems there are no trailers stored in the database",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    }
  }, [listTrucksData]);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching truck data",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    }
    if (savedQuoteError) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching old quote data",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    }
  }, [isError, error, savedQuoteError]);

  useEffect(() => {
    if (originLocation && destinationLocation) {
      const origin = dataState?.origin || "";
      const destination = dataState?.destination || "";

      calculateRoute({
        origin,
        destination,
        onDirections: setDirections,
        onDistance: (value) => {
          updateState({
            ...dataState!,
            distance: value,
          });
        },
        map,
        originLocation,
        destinationLocation,
      });
    }
  }, [
    originLocation,
    destinationLocation,
    origin,
    dataState?.origin,
    dataState?.destination,
  ]);

  useEffect(() => {
    if (!dataState) {
      initDistanceCalculator(null);
    }
  }, []);

  useEffect(() => {
    if (map && originLocation && destinationLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(originLocation);
      bounds.extend(destinationLocation);
      map.fitBounds(bounds);
    }
  }, [map, originLocation, destinationLocation]);

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
  const pricingCalculateHandler = () => {
    if (dataState) {
      const { distance, maxWeight, trailerType, trailerSize } = dataState;
      if (distance && maxWeight && trailerType && trailerSize) {
        console.log(distance, maxWeight, trailerType, trailerSize);
        mutation.mutate({
          distance: parseFloat(distance.replace(/[^\d.]/g, "")),
          truckId: trailerType._id!,
          trailerSize: trailerSize,
        });
      }
    }
  };
  const onPlaceChangedA = () => {
    if (autocompleteA) {
      const place = autocompleteA.getPlace();
      if (place.formatted_address) {
        // setOrigin(place.formatted_address);
        updateState({
          ...dataState!,
          origin: place.formatted_address,
        });
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
        // setDestination(place.formatted_address);
        updateState({
          ...dataState!,
          destination: place.formatted_address,
        });
      }
      if (place.geometry && place.geometry.location) {
        setDestinationLocation(place.geometry.location);
      }
    }
  };
  const handlePackagingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // setPackagingNumber(value);
      updateState({
        ...dataState!,
        packagingNumber: value,
      });
    }
  };

  const handleConfirmFirstModal = () => {
    // saveDataToSessionStorage();

    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleConfirmSecondModal = () => {
    // saveDataToSessionStorage();
    setShowSecondModal(false);
    setShowThirdModal(true);
  };

  const handleConfirmThirdModal = () => {
    pricingCalculateHandler();
    setShowThirdModal(false);
    setShowPrice(true);
    setShowCalendar(true);
  };

  const handleQuoteButtonClick = async () => {
    if (mutation.isPending) return;

    generateWarning();

    if (warnings) {
      notifications.show({
        title: "Error",
        message: "Please fill in all required fields",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
      return;
    }

    // try {
    //   const data = await createQuote(quoteDetails);
    //   navigate("/requests/confirmation?quoteId=" + data._id);
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     console.error("Error creating quote:", error.message);
    //   } else {
    //     console.error("Unknown error occurred while creating quote");
    //   }
    // }

    // quoteMutation.mutate(quoteDetails);
    navigate("/requests/confirmation");
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading message until the script is loaded
  }
  return (
    <div className="flex h-full flex-1">
      {/* <SideBar isAuthenticated={isAuthenticated} /> */}
      <div className="flex-1 bg-light-grey min-h-screen overflow-y-auto">
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
          <div className="lg:ml-80 gap-8 md:flex justify-center w-full ">
            {/* <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-medium text-secondary mb-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2 text-gray-400"
                />
                Pickup Date <span className="text-red-500">*</span>
              </h3>
              
            </div> */}
            {showCalendar && (
              <Calendar
                id="calendar"
                value={dataState?.pickupDate}
                onChange={(date) => {
                  // setPickupDate(date);
                  updateState({
                    ...dataState!,
                    pickupDate: date,
                  });

                  setShowFirstModal(true); // Show the first modal when a date is picked
                  setShowCalendar(false);
                }}
                className="border border-secondary rounded transition-transform duration-700 transform scale-75 hover:scale-100 focus-within:scale-100"
              />
            )}

            {warnings?.pickupDate && (
              <p className="text-red-500 text-sm">{warnings.pickupDate}</p>
            )}

            {showFirstModal && (
              <div className="fixed bottom-0 flex items-center justify-center w-full  z-50 ">
                <div className="bg-white rounded-lg lg:p-10 md:mb-36 p-6 w-full max-w-2xl shadow-lg relative ">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setShowFirstModal(false);
                      setShowCalendar(true);
                    }}
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
                  <div className="relative">
                    <LoadingOverlay
                      visible={isLoading}
                      zIndex={1000}
                      overlayProps={{ radius: "sm", blur: 2 }}
                    />
                    <div className="md:flex gap-4">
                      <div className="mb-8 md:mb-0 w-full">
                        <h3 className="text-md font-normal text-secondary mb-2">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="mr-2 text-gray-400"
                          />
                          Pickup Location{" "}
                          <span className="text-red-500">*</span>
                        </h3>
                        <OriginInput
                          onLoad={onLoadA}
                          onPlaceChanged={onPlaceChangedA}
                        />
                        {warnings?.origin && (
                          <p className="text-red-500 text-sm">
                            {warnings.origin}
                          </p>
                        )}
                      </div>

                      <div className="mb-8 md:mb-0 lg:border-secondary w-full">
                        <h3 className="text-md font-normal text-secondary mb-2">
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
                        {warnings?.destination && (
                          <p className="text-red-500 text-sm">
                            {warnings.destination}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className=" ">
                      <div className="w-full md:w-full mb-8 md:mb-0 ">
                        <div className="mb-2 lg:mt-4">
                          <h3 className="text-md font-normal text-secondary mb-2">
                            <FontAwesomeIcon
                              icon={faTruck}
                              className="mr-2 text-gray-400"
                            />
                            Trailer Type <span className="text-red-500">*</span>
                          </h3>
                          <div className="flex justify-between gap-2">
                            {[...(listTrucksData || [])].map((type) => (
                              <button
                                key={type._id}
                                className={` py-2 border border-2 border-grey  rounded-lg w-full md:w-full  text-black font-normal ${
                                  dataState?.trailerType === type
                                    ? "bg-secondary text-white" // Highlight selected button
                                    : ""
                                }`}
                                onClick={() => {
                                  updateState({
                                    ...dataState!,
                                    trailerType: type,
                                  });
                                }}
                              >
                                {type.truckType}
                              </button>
                            ))}
                          </div>

                          {warnings?.trailerType && (
                            <p className="text-red-500 text-sm">
                              {warnings.trailerType}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 ">
                        <div className="mb-4 lg:mt-4">
                          <h3 className="text-md font-normal text-secondary my-2">
                            Size (ft) <span className="text-red-500">*</span>
                          </h3>
                          <div className="flex  gap-2">
                            {dataState &&
                              dataState.trailerType &&
                              dataState.trailerType.sizes.map((size) => (
                                <button
                                  key={size.size}
                                  className={` py-2 border border-2 border-grey  rounded-lg w-full md:w-full  text-black font-normal ${
                                    dataState.trailerSize === size.size
                                      ? "bg-secondary text-white" // Highlight selected button
                                      : ""
                                  }`}
                                  onClick={() =>
                                    // setSelectedTrailerSize(size.size)
                                    updateState({
                                      ...dataState!,
                                      trailerSize: size.size,
                                    })
                                  }
                                >
                                  {size.size}
                                </button>
                              ))}
                            {!dataState?.trailerType && (
                              <p className="text-red-500 text-sm">
                                Please select a trailer type first
                              </p>
                            )}
                            {/* {truckSizes.map((size) => (
                              <button
                                key={size}
                                className={` py-3 bg-grey rounded-lg w-full lg:w-full text-black font-normal ${
                                  selectedTrailerSize === size
                                    ? "bg-secondary text-white"
                                    : ""
                                } ${
                                  size === 48 &&
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
                                    <span className="ml-2 text-red-500">
                                      🚫
                                    </span> // Sign added here
                                  )}
                              </button>
                            ))} */}
                          </div>

                          {warnings?.trailerSize && (
                            <p className="text-red-500 text-sm">
                              {warnings.trailerSize}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        className={` py-3 px-2  rounded text-white w-full mt-2
    ${
      !dataState?.origin ||
      !dataState?.destination ||
      !dataState?.trailerType ||
      !dataState?.trailerSize
        ? "bg-gray-400 cursor-not-allowed w-1/3"
        : "bg-primary hover:bg-secondary cursor-pointer w-1/3"
    }`}
                        onClick={handleConfirmFirstModal}
                        disabled={
                          !dataState?.origin ||
                          !dataState?.destination ||
                          !dataState?.trailerType ||
                          !dataState?.trailerSize
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showSecondModal && (
              <div className="fixed bottom-0 flex items-center justify-center w-full z-50">
                <div className="bg-white rounded-lg lg:p-10 md:mb-36 p-6 w-full max-w-2xl shadow-lg relative">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setShowSecondModal(false);
                      setShowCalendar(true);
                    }}
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
                    <h3 className="text-md font-normal text-secondary mb-2">
                      <FontAwesomeIcon
                        icon={faBox}
                        className="mr-2 text-gray-400"
                      />
                      Commodity <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      className="p-2 px-6 border rounded w-full bg-light-grey text-primary font-normal"
                      placeholder="e.g. Electronics"
                      value={dataState?.commodity}
                      onChange={(e) => {
                        // setCommodity(e.target.value);
                        updateState({
                          ...dataState!,
                          commodity: e.target.value,
                        });
                      }}
                    />
                    {warnings?.commodity && (
                      <p className="text-red-500 text-sm">
                        {warnings.commodity}
                      </p>
                    )}
                  </div>

                  <div className="mb-8 md:mb-0 mt-2">
                    <h3 className="text-md font-normal text-secondary mb-2">
                      <FontAwesomeIcon
                        icon={faWeight}
                        className="mr-2 text-gray-400"
                      />
                      Maximum Weight (lbs){" "}
                      <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="number"
                      className="p-2 px-6  rounded w-full bg-light-grey text-primary font-normal"
                      placeholder="e.g. 1000lbs"
                      value={dataState?.maxWeight}
                      onChange={(e) => {
                        // setMaxWeight(e.target.value);
                        updateState({
                          ...dataState!,
                          maxWeight: e.target.value,
                        });
                      }}
                      min="0"
                    />
                    {warnings?.maxWeight && (
                      <p className="text-red-500 text-sm">
                        {warnings.maxWeight}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap md:mt-4">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-4">
                      <h3 className="text-md font-normal text-secondary mb-2">
                        <FontAwesomeIcon
                          icon={faBox}
                          className="mr-2 text-gray-400"
                        />
                        Packaging <span className="text-red-500">*</span>
                      </h3>
                      <input
                        type="number"
                        className="p-2 rounded w-full bg-light-grey text-primary font-normal"
                        value={dataState?.packagingNumber}
                        onChange={handlePackagingNumberChange}
                        placeholder="Enter no. of packages"
                        min="0" // This ensures only non-negative values are allowed
                      />
                      {warnings?.packaging && (
                        <p className="text-red-500 text-sm">
                          {warnings.packaging}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-2/3">
                      <h3 className="text-md font-normal text-secondary mb-2">
                        Packaging Type <span className="text-red-500">*</span>
                      </h3>
                      <select
                        className="p-2 rounded w-full bg-light-grey text-primary font-normal"
                        value={dataState?.packagingType}
                        onChange={(e) =>
                          // setSelectedPackagingType(e.target.value)
                          updateState({
                            ...dataState!,
                            packagingType: e.target.value,
                          })
                        }
                      >
                        <option className="text-gray-400" value="">
                          Select packaging type
                        </option>
                        <option value="Carton">Carton</option>
                        <option value="Floor">Floor</option>
                        <option value="Loose">Loose</option>
                        <option value="Pallet">Pallet</option>
                        <option value="Roll">Roll</option>
                        <option value="Skids">Skids</option>
                        <option value="Others">Others</option>
                      </select>
                      {warnings?.packaging && (
                        <p className="text-red-500 text-sm">
                          {warnings.packaging}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`mt-6 py-3 px-4 rounded text-white w-full 
    ${
      !dataState?.commodity ||
      !dataState?.maxWeight ||
      !dataState?.packagingNumber ||
      !dataState?.packagingType
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-secondary cursor-pointer"
    }`}
                      onClick={handleConfirmSecondModal}
                      disabled={
                        !dataState?.commodity ||
                        !dataState?.maxWeight ||
                        !dataState?.packagingNumber ||
                        !dataState?.packagingType
                      }
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showThirdModal && (
              <div className="fixed bottom-0 flex items-center justify-center w-full z-50">
                <div className="bg-white rounded-lg shadow-lg lg:p-10 md:mb-36 p-6 w-full max-w-2xl relative">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {setShowThirdModal(false);
                      setShowCalendar(true);
                    }}
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
                    <h3 className="text-md font-medium text-secondary my-2">
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
                      value={dataState?.companyName}
                      onChange={(e) => {
                        // setCompanyName(e.target.value)
                        updateState({
                          ...dataState!,
                          companyName: e.target.value,
                        });
                      }}
                    />
                    {warnings?.companyName && (
                      <p className="text-red-500 text-sm">
                        {warnings.companyName}
                      </p>
                    )}
                  </div>

                  <div className="mb-8 md:mb-0 w-full">
                    <h3 className="text-md font-medium text-secondary my-2">
                      <FontAwesomeIcon
                        icon={faNoteSticky}
                        className="mr-2 text-gray-400"
                      />
                      Additional Notes
                    </h3>
                    <textarea
                      className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                      placeholder="Enter your additional notes"
                      value={dataState?.notes}
                      onChange={(e) => {
                        // setNotes(e.target.value)
                        updateState({
                          ...dataState!,
                          notes: e.target.value,
                        });
                      }}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`mt-4 py-3 px-4 rounded text-white w-full
    ${
      !dataState?.companyName
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-secondary cursor-pointer"
    }`}
                      onClick={handleConfirmThirdModal}
                      disabled={!dataState?.companyName}
                    >
                      {!dataState?.companyName ? "Almost There!" : "Done 🎉"}
                    </button>
                  </div>
                  {dataState?.companyName && (
                    <p className="text-gray-500 font-normal ">
                      Please check your quote...
                    </p>
                  )}
                </div>
              </div>
            )}
            {showCalendar && (
              <div className="border border-secondary p-4 md:p-8 bg-white h-auto w-full md:w-1/2 lg:w-1/4 rounded-lg shadow-xl md:mt-0 xs:mt-4 transition-transform duration-700 transform scale-75 hover:scale-100 focus-within:scale-100 flex flex-col justify-between">
                {showPrice ? (
                  <div>
                    <h1 className="text-primary text-lg md:text-xl">
                      Your Quote is Ready!
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base font-normal mb-4 md:mb-8">
                      Your price has been calculated. You can now review your
                      details and proceed to payment.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-primary text-lg md:text-xl">
                      Complete Your Details
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base font-normal mb-4 md:mb-8">
                      Please fill out all required information so we can
                      calculate the distance and price for your shipment.
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-start mb-4 lg:mb-0">
                  <div className="text-primary text-xl md:text-2xl font-medium pt-4 rounded-lg">
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="text-gray-400 w-4 md:w-6"
                    />{" "}
                    Distance
                  </div>
                  {showPrice && (
                    <div
                      className="text-secondary text-2xl md:text-4xl font-medium text-gray-500 p-2 md:p-4 rounded-lg"
                      style={{ height: "60px" }}
                    >
                      {/* {distance ? distance : <span>&nbsp;</span>} */}
                      {dataState?.distance || <span>&nbsp;</span>}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-primary text-xl md:text-2xl font-medium pt-4 rounded-lg">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="text-gray-400 w-4 md:w-6"
                    />{" "}
                    Price
                  </div>
                  {mutation.isPending && (
                    <div className="text-secondary text-2xl md:text-4xl font-medium text-gray-500 p-2 md:p-4 rounded-lg">
                      Calculating price...
                    </div>
                  )}
                  {showPrice && (
                    <div
                      className="text-secondary text-2xl md:text-4xl font-medium text-gray-500 p-2 md:p-4 rounded-lg"
                      style={{ height: "60px" }}
                    >
                      {/* {price !== null ? (
                      `$ ${price.toFixed(2)}`
                    ) : (
                      <span>&nbsp;</span>
                    )} */}

                      {dataState?.price !== null ? (
                        `$ ${(dataState?.price || 0.0).toFixed(2)}`
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  )}
                </div>
                <button
  className={`py-5 px-2 rounded-lg w-full mt-auto text-white font-medium transition-colors duration-300 ${
    showPrice ? "bg-[#252F70] hover:bg-secondary hover:text-white" : "bg-gray-400 cursor-not-allowed"
  }`}
  onClick={handleQuoteButtonClick}
  disabled={!showPrice}
>
  GET THIS QUOTE
</button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
