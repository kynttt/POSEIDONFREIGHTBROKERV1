import { notifications } from "@mantine/notifications";
import { create } from "zustand";

interface DirectionsState {
  isLoading: boolean;
  directionsService?: google.maps.DirectionsService;
  directionsRenderer?: google.maps.DirectionsRenderer;
  routes: google.maps.DirectionsRoute[];
  routeIndex: number;
  selectedRoute?: google.maps.DirectionsRoute;
  initializeDirections: (
    routesLibrary: google.maps.RoutesLibrary | null,
    map: google.maps.Map | null
  ) => void;
  calculateRoutes: ({
    origin,
    destination,
    onResponse,
    onError,
  }: {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
    onResponse: (response: google.maps.DirectionsResult) => void;
    onError?: (error: { message: string }) => void;
  }) => void; // Accept parameters
  setRouteIndex: (index: number) => void;
}

export const useDirectionsStore = create<DirectionsState>((set, get) => ({
  isLoading: false,
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

  calculateRoutes: ({ origin, destination, onResponse, onError }) => {
    if (get().isLoading) return;
    set({ isLoading: true });
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
        set({ isLoading: false });
        directionsRenderer.setDirections(response);
        onResponse(response);
        set({
          routes: response.routes,
          selectedRoute: response.routes[0],
          routeIndex: 0,
        });
      })
      .catch((error) => {
        set({ isLoading: false });
        if (error instanceof google.maps.MapsRequestError) {
          notifications.show({
            title: "Map Direction Route",
            message: error.message,
            color: "red",
            autoClose: 5000,
          });
        } else {
          notifications.show({
            title: "Map Direction Route",
            message:
              error.message || "An error occurred while fetching directions",
            color: "red",
            autoClose: 5000,
          });
        }
        onError && onError({ message: error.message });

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
