import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShipmentRequestHeader from "./ShipmentRequestHeader";
import { faMapMarkerAlt, faTruck } from "@fortawesome/free-solid-svg-icons";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import MapMarkerDialog from "../../../components/googleMap/MapMarkerDialog";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { memo, useCallback, useEffect } from "react";
import { getAddressFromLatLng } from "../../../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { listTrucks } from "../../../lib/apiCalls";
import { Button, Space } from "@mantine/core";
import { useStepContext } from "./ShipmenStepperProvider";
import { useDirectionsStore } from "../../../hooks/useDirectionStore";

function ShipmentTransportationStep() {
  const { data: dataState, update: updateState } = useDistanceCalculator();
  const { nextStep, prevStep } = useStepContext();
  const calculateRoutes = useDirectionsStore((state) => state.calculateRoutes);
  const { data: listTrucksData } = useQuery({
    queryKey: ["truck-catalogs", "distance-calculator"],
    queryFn: listTrucks,
  });
  const selectedRoutes = useDirectionsStore((state) => state.selectedRoute);

  const leg = selectedRoutes?.legs[0];
  const [
    originDialogOpened,
    { open: openOriginDialog, close: closeOriginDialog },
  ] = useDisclosure(false);

  const [
    destinationDialogOpened,
    { open: openDestinationDialog, close: closeDestinationDialog },
  ] = useDisclosure(false);

  const [debouncedOriginLocation] = useDebouncedValue(
    dataState?.originLocation,
    500
  );
  const [debouncedDestinationLocation] = useDebouncedValue(
    dataState?.destinationLocation,
    500
  );

  const updateOriginAddress = useCallback(
    async (location: google.maps.LatLngLiteral) => {
      const address = await getAddressFromLatLng(location);
      // setOrigin(address);
      // setOriginLocation(location);

      updateState({
        ...dataState!,
        origin: address,
        originLocation: location,
      });
    },
    [dataState, updateState]
  );

  const updateDestinationAddress = useCallback(
    async (location: google.maps.LatLngLiteral) => {
      const address = await getAddressFromLatLng(location);
      // setDestination(address);
      // setDestinationLocation(location);
      updateState({
        ...dataState!,
        destination: address,
        destinationLocation: location,
      });
    },
    [dataState, updateState]
  );

  const handleOriginApply = useCallback(
    (position: google.maps.LatLngLiteral) => {
      updateOriginAddress(position);
      closeOriginDialog();
    },
    [updateOriginAddress, closeOriginDialog]
  );

  const handleDestinationApply = useCallback(
    (position: google.maps.LatLngLiteral) => {
      updateDestinationAddress(position);
      closeDestinationDialog();
    },
    [updateDestinationAddress, closeDestinationDialog]
  );

  useEffect(() => {
    if (debouncedOriginLocation && debouncedDestinationLocation) {
      console.log("calculateRoutes");
      // updateState({
      //   ...dataState!,

      //   routeCoordinates: {
      //     type: "LineString",
      //     coordinates: [
      //       [debouncedOriginLocation.lng, debouncedOriginLocation.lat] as [
      //         number,
      //         number
      //       ],
      //       [
      //         debouncedDestinationLocation.lng,
      //         debouncedDestinationLocation.lat,
      //       ] as [number, number],
      //     ],
      //   },
      // });
      calculateRoutes({
        origin: debouncedOriginLocation,
        destination: debouncedDestinationLocation,
        onResponse: () => {},
      });
    }
  }, [debouncedOriginLocation, debouncedDestinationLocation, calculateRoutes]);

  const onNext = () => {
    if (!debouncedOriginLocation || !debouncedDestinationLocation) return;
    nextStep();
    let distance = 0;

    if (leg?.distance?.value) {
      const distanceInKm = leg.distance.value / 1000;
      const distanceInMiles = distanceInKm * 0.62137119;
      distance = distanceInMiles;
    }
    updateState({
      ...dataState!,
      distance: distance,
      routeCoordinates: {
        type: "LineString",
        coordinates: [
          [debouncedOriginLocation.lng, debouncedOriginLocation.lat] as [
            number,
            number
          ],
          [
            debouncedDestinationLocation.lng,
            debouncedDestinationLocation.lat,
          ] as [number, number],
        ],
      },
    });
  };

  return (
    <>
      <div className="flex flex-col my-5">
        <ShipmentRequestHeader
          title={<div>Shipment and transportation</div>}
          description={
            <div>
              Enter your shipment details and select your transportation option.
            </div>
          }
        />
        <div className="mt-5 flex flex-col gap-2">
          {/* Origin Input */}
          <div className="mb-8 md:mb-0 w-full">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-gray-400"
              />
              Pickup Location <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              readOnly
              value={dataState?.origin || ""}
              placeholder="Pickup Location"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={openOriginDialog}
            />
          </div>
          {/* Destination Input */}
          <div className="mt-2 mb-8 md:mb-0 lg:border-secondary w-full">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-gray-400"
              />
              Drop-off Location <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              readOnly
              value={dataState?.destination || ""}
              placeholder="Drop-off Location"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={openDestinationDialog}
            />
          </div>
          <div className="w-full md:w-full mb-8 md:mb-0 ">
            <div className="mb-2 lg:mt-4">
              <h3 className="text-md font-normal text-primary mb-2">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="mr-2 text-gray-400"
                />
                Trailer Type <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-wrap justify-between gap-5">
                {[...(listTrucksData || [])].map((type) => (
                  <button
                    key={type._id}
                    className={` py-2 border border-2 border-primary text-primary  rounded-lg w-[47%] md:w-[47%]  text-black font-normal ${
                      dataState?.trailerType === type
                        ? "bg-primary text-white" // Highlight selected button
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
            </div>
          </div>
          <div className="w-full md:w-1/2 ">
            <div className="mb-4 lg:mt-4">
              <h3 className="text-md font-normal text-primary my-2">
                Size (ft) <span className="text-red-500">*</span>
              </h3>
              <div className="flex  gap-2">
                {dataState &&
                  dataState.trailerType &&
                  dataState.trailerType.sizes.map((size) => (
                    <button
                      key={size.size}
                      className={` py-2 border border-2 border-primary text-primary  rounded-lg w-full md:w-full  text-black font-normal ${
                        dataState.trailerSize === size.size
                          ? "bg-primary text-white" // Highlight selected button
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <Button variant="outline" fullWidth onClick={prevStep}>
            Back
          </Button>
          <Space w="md" />
          <Button
            disabled={
              !dataState?.origin ||
              !dataState?.destination ||
              !dataState?.trailerType ||
              !dataState?.trailerSize
            }
            onClick={onNext}
            fullWidth
          >
            Next
          </Button>
        </div>
      </div>
      {/* MapMarkerDialog for Origin */}
      <MapMarkerDialog
        isDialogOpened={originDialogOpened}
        opened={originDialogOpened}
        onClose={closeOriginDialog}
        onApply={handleOriginApply}
        initialPosition={dataState?.originLocation}
      />
      {/* MapMarkerDialog for Destination */}
      <MapMarkerDialog
        isDialogOpened={destinationDialogOpened}
        opened={destinationDialogOpened}
        onClose={closeDestinationDialog}
        onApply={handleDestinationApply}
        initialPosition={dataState?.destinationLocation}
      />
    </>
  );
}

export default memo(ShipmentTransportationStep);
