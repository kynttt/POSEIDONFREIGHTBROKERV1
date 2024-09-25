import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the page type
type DistancePageType = "form" | "confirmation";

// Define the context type
interface DistancePageContextType {
  currentPage: DistancePageType;
  goToFormPage: () => void;
  goToConfirmationPage: () => void;
}

// Create a context with the specified type
const DistancePageContext = createContext<DistancePageContextType | undefined>(
  undefined
);

// Define the provider's props type
interface DistancePageProviderProps {
  children: ReactNode;
}

// Helper function to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Context provider to wrap the components
export const DistancePageProvider: React.FC<DistancePageProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const [currentPage, setCurrentPage] = useState<DistancePageType>("form");

  // Effect to sync query parameter with page state
  useEffect(() => {
    const pageFromQuery = query.get("page") as DistancePageType;
    if (
      pageFromQuery &&
      (pageFromQuery === "form" || pageFromQuery === "confirmation")
    ) {
      setCurrentPage(pageFromQuery);
    } else {
      // Create a new URLSearchParams object to preserve existing params
      const newQuery = new URLSearchParams(location.search);
      newQuery.set("page", "form"); // Update the 'page' param

      // Navigate with the new query params, replacing the current state
      navigate(`${location.pathname}?${newQuery.toString()}`, {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, query]);

  // Function to update query parameter and page state
  const goToFormPage = () => {
    navigate("?page=form");
    setCurrentPage("form");
  };

  const goToConfirmationPage = () => {
    navigate("?page=confirmation");
    setCurrentPage("confirmation");
  };

  return (
    <DistancePageContext.Provider
      value={{ currentPage, goToFormPage, goToConfirmationPage }}
    >
      {children}
    </DistancePageContext.Provider>
  );
};

// Custom hook to use the DistancePageContext
// eslint-disable-next-line react-refresh/only-export-components
export const useDistancePage = (): DistancePageContextType => {
  const context = useContext(DistancePageContext);
  if (!context) {
    throw new Error(
      "useDistancePage must be used within a DistancePageProvider"
    );
  }
  return context;
};
