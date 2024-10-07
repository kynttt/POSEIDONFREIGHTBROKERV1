import { useLocation, useNavigate } from "react-router-dom";
import {
  ShipmentAccordionProvider,
  useShipmentAccordion,
} from "../context/ShipmentAccordionProvider";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDirectionsStore } from "../../../hooks/useDirectionStore";
import { useQuery } from "@tanstack/react-query";
import { fetchQuoteDetails, listTrucks } from "../../../lib/apiCalls";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { Accordion, ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { StepProvider } from "../context/ShipmenStepperProvider";
import InformationQuotation from "./InformationQuotation";
import CompleteTheRequirements from "./CompleteTheRequirements";

export default function SectionFirstPage() {
  return (
    <ShipmentAccordionProvider>
      <FieldSection />
    </ShipmentAccordionProvider>
  );
}

function FieldSection() {
  const { value } = useShipmentAccordion();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quoteId = searchParams.get("quoteId");
  const routeCoordinatesString = searchParams.get("routeCoordinates");
  const trailerType = searchParams.get("trailerType");
  const originName = searchParams.get("originName");
  const destinationName = searchParams.get("destinationName");
  const navigate = useNavigate();

  const map = useMap("map-background");
  const routesLibrary = useMapsLibrary("routes");
  const initializeDirections = useDirectionsStore(
    (state) => state.initializeDirections
  );

  const {
    data: listTrucksData,

    isError,
    error,
  } = useQuery({
    queryKey: ["truck-catalogs", "distance-calculator"],
    queryFn: listTrucks,
  });
  const { data: dataState, init: initDistanceCalculator } =
    useDistanceCalculator();

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

  useEffect(() => {
    if (routesLibrary && map) {
      initializeDirections(routesLibrary, map);
    }
  }, [routesLibrary, map, initializeDirections]);

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
        routeCoordinates,
      } = data;

      const packagingSplit = packaging.split(" ");

      const trailerTypeFound = listTrucksData.find(
        (type) => type.truckType === trailerType
      );

      let originLocation: google.maps.LatLngLiteral | undefined;
      let destinationLocation: google.maps.LatLngLiteral | undefined;

      // Initialize locations from `routeCoordinates` if they exist in the fetched data
      if (routeCoordinates && routeCoordinates.coordinates.length > 0) {
        originLocation = {
          lat: routeCoordinates.coordinates[0][1],
          lng: routeCoordinates.coordinates[0][0],
        };

        destinationLocation = {
          lat: routeCoordinates.coordinates[1][1],
          lng: routeCoordinates.coordinates[1][0],
        };
      }

      initDistanceCalculator({
        packagingNumber: parseInt(packagingSplit[0], 10),
        packagingType: packagingSplit[1],
        origin,
        originLocation,
        destination,
        destinationLocation,
        distance: distance,
        routeCoordinates,
        pickupDate: new Date(pickupDate).toLocaleDateString(),
        trailerType: trailerTypeFound,
        trailerSize,
        commodity,
        maxWeight: maxWeight.toString(),
        companyName,
        notes: notes || undefined,
        price,
      });
    } else if (
      routeCoordinatesString &&
      trailerType &&
      listTrucksData &&
      listTrucksData.length > 0
    ) {
      // Initialize locations from `routeCoordinatesString` if coming from the URL
      let originLocation: google.maps.LatLngLiteral | undefined;
      let destinationLocation: google.maps.LatLngLiteral | undefined;

      try {
        const parsedRouteCoordinates = JSON.parse(
          decodeURIComponent(routeCoordinatesString)
        );

        originLocation = {
          lat: parsedRouteCoordinates[0][1],
          lng: parsedRouteCoordinates[0][0],
        };

        destinationLocation = {
          lat: parsedRouteCoordinates[1][1],
          lng: parsedRouteCoordinates[1][0],
        };
        const trailerTypeFound = listTrucksData.find(
          (type) => type.truckType === trailerType
        );
        initDistanceCalculator({
          packagingNumber: undefined,
          packagingType: undefined,
          origin: originName || undefined,
          originLocation,
          destination: destinationName || undefined,
          destinationLocation,
          distance: undefined,
          routeCoordinates: {
            type: "LineString",
            coordinates: parsedRouteCoordinates,
          },
          pickupDate: undefined,
          trailerType: trailerTypeFound,
          trailerSize: undefined,
          commodity: undefined,
          maxWeight: undefined,
          companyName: undefined,
          notes: undefined,
          price: 0, // Placeholder price; set as needed
        });
      } catch (error) {
        console.error("Failed to parse route coordinates from URL:", error);
      }
    }
  }, [
    data,
    isQueryLoading,
    initDistanceCalculator,
    listTrucksData,
    trailerType,
    routeCoordinatesString,
    originName,
    destinationName,
  ]);

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
    if (!dataState) {
      initDistanceCalculator(null);
    }
  }, [dataState, initDistanceCalculator]);

  return (
    <div className="w-full h-full overflow-auto  ">
      <div className="w-full flex items-center justify-center h-[10%] text-primary text-lg font-bold relative">
        <div className="absolute left-6 text-primary">
          <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ActionIcon>
        </div>
        QUOTATION
      </div>
      <div className="h-[90%] p-5">
        <Accordion
          value={value}
          classNames={{
            chevron: "text-primary",
            control: "text-primary",
            label: "text-primary",
            panel: "font-normal",
          }}
        >
          <Accordion.Item value="information">
            <Accordion.Control>
              <div className="text-primary font-bold">
                Information for Quotation
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <StepProvider>
                <InformationQuotation />
              </StepProvider>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="calculation">
            <Accordion.Control>
              <div className="text-primary font-bold">
                Complete the Requirements
              </div>
              {dataState?.distance && dataState?.price ? (
                <div className="flex flex-col text-sm text-primary">
                  Thank you for providing the necessary details. The total
                  distance and exact amount for your shipment are displayed
                  below.
                </div>
              ) : (
                <div className="flex flex-col text-sm text-primary">
                  Please fill out all required information in order to calculate
                  the total distance and exact amount for your shipment.
                </div>
              )}
            </Accordion.Control>

            <Accordion.Panel>
              <CompleteTheRequirements />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
