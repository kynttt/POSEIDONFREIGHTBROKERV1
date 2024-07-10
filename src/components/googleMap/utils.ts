interface CalculateRouteParams {
  origin: string;
  destination: string;
  setDirections: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
  map: google.maps.Map | null;
  originLocation?: google.maps.LatLng | null;  // Make originLocation optional
  destinationLocation?: google.maps.LatLng | null;
}

  
  export const calculateRoute = ({
    origin,
    destination,
    setDirections,
    setDistance,
    map,
  }: CalculateRouteParams) => {
    if (origin === '' || destination === '') {
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
          setDirections(result);
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
      },
      (response, status) => {
        if (status === 'OK' && response && response.rows[0].elements[0].status === 'OK') {
          const distance = response.rows[0].elements[0].distance.text;
          setDistance(distance);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };
  