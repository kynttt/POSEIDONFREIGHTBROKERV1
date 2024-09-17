// Directions.tsx
import { useEffect } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useDirectionsStore } from "./useDirectionStore";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";

export function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const {
    directionsService,
    directionsRenderer,
    routes,
    routeIndex,
    selectedRoute,
    initializeDirections,
    calculateRoutes,
    setRouteIndex,
  } = useDirectionsStore();

  const { data: distanceData, update } = useDistanceCalculator();

  // Initialize directions service and renderer
  useEffect(() => {
    initializeDirections(routesLibrary, map);
  }, [routesLibrary, map, initializeDirections]);

  // Calculate routes when services are ready and origin/destination are available
  useEffect(() => {
    if (
      directionsService &&
      directionsRenderer &&
      distanceData?.origin &&
      distanceData?.destination
    ) {
      calculateRoutes({
        origin: distanceData.originLocation!,
        destination: distanceData.destinationLocation!,
        onResponse: (response) => {
          update({
            ...distanceData,
            distance: response.routes[0].legs[0].distance?.text,
          });
        },
      });
    }
  }, [
    directionsService,
    directionsRenderer,
    distanceData?.origin,
    distanceData?.destination,
    distanceData?.originLocation,
    distanceData?.destinationLocation,
    calculateRoutes,
    update,
    distanceData,
  ]);

  // Update route index in renderer
  useEffect(() => {
    if (directionsRenderer) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer]);

  const leg = selectedRoute?.legs[0];

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selectedRoute.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
