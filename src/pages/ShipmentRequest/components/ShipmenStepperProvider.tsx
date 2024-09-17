/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context types
interface StepContextType {
  active: number;
  nextStep: () => void;
  prevStep: () => void;
}

// Create the context with an initial value of null
const StepContext = createContext<StepContextType | null>(null);

// Create a custom hook to access the StepContext
export const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};

// StepProvider component that wraps children and provides state
interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider = ({ children }: StepProviderProps) => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <StepContext.Provider value={{ active, nextStep, prevStep }}>
      {children}
    </StepContext.Provider>
  );
};
