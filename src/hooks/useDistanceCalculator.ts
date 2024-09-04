import { create } from "zustand";
import { TruckCatalog } from "../utils/types";
import { persist } from "zustand/middleware";

const localStorageName = "distance-calculator-storage";

interface DistanceCalculatorWarning {
  origin: string | null;

  destination: string | null;
  pickupDate: string | null;
  trailerType: string | null;
  trailerSize: string | null;
  commodity: string | null;
  maxWeight: string | null;
  companyName: string | null;
  packaging: string | null;
}
export interface DistanceCalculatorData {
  origin: string | undefined;
  destination: string | undefined;
  pickupDate: string | undefined;
  trailerType: TruckCatalog | undefined;
  trailerSize: number | undefined;
  commodity: string | undefined;
  maxWeight: string | undefined;
  companyName: string | undefined;
  packagingNumber: number | undefined;
  packagingType: string | undefined;
  notes: string | undefined;
  distance: string | undefined;
  price: number | undefined;
}

interface DistanceCalculatorState {
  data: DistanceCalculatorData | null;
  warnings: DistanceCalculatorWarning | null;
  init: (data: DistanceCalculatorData | null) => void;
  create: (data: DistanceCalculatorData) => void;
  update: (data: DistanceCalculatorData) => void;
  generateWarning: () => void;
  clearWarnings: () => void;
  dispose: () => void;
}

function warningGenerator(
  data: DistanceCalculatorData
): DistanceCalculatorWarning | null {
  const warning: DistanceCalculatorWarning = {
    origin: null,
    destination: null,
    pickupDate: null,
    trailerType: null,
    trailerSize: null,
    commodity: null,
    maxWeight: null,
    companyName: null,
    packaging: null,
  };

  if (!data.origin) warning.origin = "Please select a pickup location.";
  if (!data.destination)
    warning.destination = "Please select a drop-off location.";
  if (!data.pickupDate) warning.pickupDate = "Please select a pickup date.";
  if (!data.trailerType) warning.trailerType = "Please select a trailer type.";
  if (!data.trailerSize) warning.trailerSize = "Please select a trailer size.";
  if (!data.commodity) warning.commodity = "Please enter the commodity.";
  if (!data.maxWeight) warning.maxWeight = "Please enter the maximum weight.";
  if (!data.companyName) warning.companyName = "Please enter the company name.";
  if (!data.packagingNumber && data.packagingType)
    warning.packaging = "Please fill both packaging number and type.";

  const allNull = Object.values(warning).every((value) => value === null);

  return allNull ? null : warning;
}

export default create(
  persist<DistanceCalculatorState>(
    (set, get) => ({
      data: null,
      warnings: null,
      init: (data) => {
        if (data) {
          set({ data, warnings: null });
        } else {
          set({ data: null, warnings: null });
        }
      },
      create: (data) => set({ data }),
      update: (data) => {
        set({ data });
      },
      dispose: () => {
        set({ data: null, warnings: null });
        localStorage.removeItem(localStorageName);
      },
      generateWarning: () => {
        const data = get().data;
        if (data) {
          const warning = warningGenerator(data);
          set({ warnings: warning });
        }
      },
      clearWarnings: () => {
        set({ warnings: null });
      },
    }),

    { name: localStorageName }
  )
);
