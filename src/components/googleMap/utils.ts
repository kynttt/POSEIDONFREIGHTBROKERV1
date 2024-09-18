interface CalculateRouteParams {
  origin: string;
  destination: string;
  onDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | null>
  >;
  onDistance: (distance: string) => void;
  map: google.maps.Map | null;
  originLocation?: google.maps.LatLngLiteral | null; // Make originLocation optional
  destinationLocation?: google.maps.LatLngLiteral | null;
}

export const calculateRoute = ({
  origin,
  destination,
  onDirections,
  onDistance,
  map,
}: CalculateRouteParams) => {
  if (origin === "" || destination === "") {
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();

  directionsService.route(
    {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK && result) {
        onDirections(result);
        // Center the map on the route
        if (map && result.routes[0].overview_path.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((point) => {
            bounds.extend(point);
          });
          map.fitBounds(bounds);
        }
      } else {
        console.error(`Error fetching directions ${result}`);
      }
    }
  );

  const distanceMatrixService = new window.google.maps.DistanceMatrixService();
  distanceMatrixService.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    },
    (response, status) => {
      if (
        status === "OK" &&
        response &&
        response.rows[0].elements[0].status === "OK"
      ) {
        const distance = response.rows[0].elements[0].distance.text;
        onDistance(distance);
      } else {
        console.error("Error calculating distance:", status);
      }
    }
  );
};
