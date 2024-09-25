import { createContext, useContext, useState, ReactNode } from "react";

export type ShipmentAccordionValueType = "information" | "calculation";
// Define the shape of the context
interface ShipmentAccordionContextType {
  value: ShipmentAccordionValueType | null;
  setValue: (value: ShipmentAccordionValueType | null) => void;
}

// Create the context with an initial value of null
const ShipmentAccordionContext = createContext<
  ShipmentAccordionContextType | undefined
>(undefined);

// Custom hook to use the context
export const useShipmentAccordion = () => {
  const context = useContext(ShipmentAccordionContext);
  if (!context) {
    throw new Error(
      "useShipmentAccordion must be used within a ShipmentAccordionProvider"
    );
  }
  return context;
};

// Provider component
interface ShipmentAccordionProviderProps {
  children: ReactNode;
}

export const ShipmentAccordionProvider = ({
  children,
}: ShipmentAccordionProviderProps) => {
  const [value, setValue] = useState<ShipmentAccordionValueType | null>(
    "information"
  );

  return (
    <ShipmentAccordionContext.Provider value={{ value, setValue }}>
      {children}
    </ShipmentAccordionContext.Provider>
  );
};
