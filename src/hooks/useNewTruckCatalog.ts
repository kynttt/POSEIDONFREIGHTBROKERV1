import { create } from "zustand";
import { TruckCatalog, Pricing } from "../utils/types";

interface TruckState {
  truckCatalog: TruckCatalog | null;
  setCatalog: (catalog: TruckCatalog) => void;
  addTruckCatalogName: (truckType: string) => void;
  addTruckSizes: (sizes: number[]) => void;
  updatePricing: (
    sizeIndex: number,
    pricingIndex: number,
    updatedPricing: Pricing
  ) => void;
  addTruckSize: (size: number) => void;
  resetTruckCatalog: () => void;
  addPricingFresh: (sizeSelected: number) => void;
  removePricing: (sizeIndex: number, pricingIndex: number) => void;
  removeSize: (sizeIndex: number) => void;
}

export const useNewTruckCatalog = create<TruckState>((set) => ({
  truckCatalog: null,

  setCatalog: (catalog) => set({ truckCatalog: catalog }),
  addTruckCatalogName: (truckType) =>
    set({
      truckCatalog: {
        truckType,
        sizes: [],
      },
    }),

  addTruckSizes: (sizes) =>
    set((state) => {
      if (state.truckCatalog) {
        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: sizes.map((size) => ({
              size,
              pricings: [],
            })),
          },
        };
      }
      return state;
    }),
  addTruckSize: (size) =>
    set((state) => {
      if (state.truckCatalog) {
        const updatedSizes = [
          ...state.truckCatalog.sizes,
          { size, pricings: [] },
        ];

        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: updatedSizes,
          },
        };
      }
      return state;
    }),
  updatePricing: (sizeIndex, pricingIndex, updatedPricing) =>
    set((state) => {
      if (state.truckCatalog && state.truckCatalog.sizes[sizeIndex]) {
        const updatedSizes = [...state.truckCatalog.sizes];
        const pricingList = updatedSizes[sizeIndex].pricings;

        if (pricingList[pricingIndex]) {
          pricingList[pricingIndex] = updatedPricing;
        }

        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: updatedSizes,
          },
        };
      }
      return state;
    }),

  addPricingFresh: (sizeSelected) =>
    set((state) => {
      if (state.truckCatalog) {
        const updatedSizes = [...state.truckCatalog.sizes];
        updatedSizes[sizeSelected].pricings.push({
          minDistance: 0,
          maxDistance: undefined, // Ensure this field is present as it was in the original schema
          pricePerMile: 0,
        });

        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: updatedSizes,
          },
        };
      }
      return state;
    }),
    
  // addPricingFresh: (sizeSelected) =>
  //   set((state) => {
  //     console.log("Initial state:", state);
  
  //     if (state.truckCatalog) {
  //       console.log("Truck catalog exists:", state.truckCatalog);
  
  //       const updatedSizes = [...state.truckCatalog.sizes];
  //       console.log("Updated sizes array before modification:", updatedSizes);
  
  //       // Check if `sizeSelected` index exists
  //       if (!updatedSizes[sizeSelected]) {
  //         console.error(
  //           `Invalid sizeSelected index: ${sizeSelected}. Available sizes:`,
  //           updatedSizes
  //         );
  //         return state; // Exit early if sizeSelected is invalid
  //       }
  
  //       // Check if `pricings` property exists and is an array
  //       if (!Array.isArray(updatedSizes[sizeSelected].pricings)) {
  //         console.error(
  //           `Pricings is not an array or is undefined for sizeSelected: ${sizeSelected}`,
  //           updatedSizes[sizeSelected]
  //         );
  //         return state; // Exit early if pricings is invalid
  //       }
  
  //       // Add new pricing object
  //       updatedSizes[sizeSelected].pricings.push({
  //         minDistance: 0,
  //         maxDistance: undefined, // Ensure this field is present as it was in the original schema
  //         pricePerMile: 0,
  //       });
  
  //       console.log("Updated sizes array after modification:", updatedSizes);
  
  //       return {
  //         truckCatalog: {
  //           ...state.truckCatalog,
  //           sizes: updatedSizes,
  //         },
  //       };
  //     }
  
  //     console.error("Truck catalog is undefined in state:", state);
  //     return state;
  //   }),
  

  removePricing: (sizeIndex, pricingIndex) =>
    set((state) => {
      if (state.truckCatalog && state.truckCatalog.sizes[sizeIndex]) {
        const updatedSizes = [...state.truckCatalog.sizes];
        updatedSizes[sizeIndex].pricings.splice(pricingIndex, 1);

        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: updatedSizes,
          },
        };
      }
      return state;
    }),

  removeSize: (sizeIndex) =>
    set((state) => {
      if (state.truckCatalog) {
        const updatedSizes = [...state.truckCatalog.sizes];
        updatedSizes.splice(sizeIndex, 1);

        return {
          truckCatalog: {
            ...state.truckCatalog,
            sizes: updatedSizes,
          },
        };
      }
      return state;
    }),

  resetTruckCatalog: () => set({ truckCatalog: null }),
}));
