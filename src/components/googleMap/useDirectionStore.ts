// useDirectionsStore.ts
import create from "zustand";

interface DirectionsState {
  directionsService?: google.maps.DirectionsService;
  directionsRenderer?: google.maps.DirectionsRenderer;
  routes: google.maps.DirectionsRoute[];
  routeIndex: number;
  selectedRoute?: google.maps.DirectionsRoute;
  initializeDirections: (
    routesLibrary: google.maps.RoutesLibrary | null,
    map: google.maps.Map | null
  ) => void;
  calculateRoutes: (
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ) => void; // Accept parameters
  setRouteIndex: (index: number) => void;
}

export const useDirectionsStore = create<DirectionsState>((set, get) => ({
  directionsService: undefined,
  directionsRenderer: undefined,
  routes: [],
  routeIndex: 0,
  selectedRoute: undefined,

  initializeDirections: (routesLibrary, map) => {
    if (!routesLibrary || !map) return;

    const directionsService = new routesLibrary.DirectionsService();
    const directionsRenderer = new routesLibrary.DirectionsRenderer({ map });

    set({ directionsService, directionsRenderer });
  },

  calculateRoutes: (origin, destination) => {
    const { directionsService, directionsRenderer } = get();

    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        set({
          routes: response.routes,
          selectedRoute: response.routes[0],
          routeIndex: 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching directions", error);
      });
  },

  setRouteIndex: (index) => {
    const { directionsRenderer } = get();
    directionsRenderer?.setRouteIndex(index);
    set((state) => ({
      routeIndex: index,
      selectedRoute: state.routes[index],
    }));
  },
}));
