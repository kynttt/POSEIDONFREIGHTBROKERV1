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
  resetTruckCatalog: () => void;
  addPricingFresh: (sizeSelected: number) => void;
  removePricing: (sizeIndex: number, pricingIndex: number) => void;
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
              pricing: [],
            })),
          },
        };
      }
      return state;
    }),

  updatePricing: (sizeIndex, pricingIndex, updatedPricing) =>
    set((state) => {
      if (state.truckCatalog && state.truckCatalog.sizes[sizeIndex]) {
        const updatedSizes = [...state.truckCatalog.sizes];
        const pricingList = updatedSizes[sizeIndex].pricing;

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
        updatedSizes[sizeSelected].pricing.push({
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

  removePricing: (sizeIndex, pricingIndex) =>
    set((state) => {
      if (state.truckCatalog && state.truckCatalog.sizes[sizeIndex]) {
        const updatedSizes = [...state.truckCatalog.sizes];
        updatedSizes[sizeIndex].pricing.splice(pricingIndex, 1);

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
