import { MapComponent } from "../../components/googleMap/MapComponent";
import SectionFirstPage from "./components/SectionFirstPage";
import SectionSecondPage from "./components/SectionSecondPage";
import {
  DistancePageProvider,
  useDistancePage,
} from "./context/DistancePageProvider";

export default function DistanceCalculatorPage() {
  return (
    <DistancePageProvider>
      <div className="w-full h-[100vh] flex flex-col md:flex-row">
      <div className="w-full h-1/2 md:h-full">
        <MapComponent />
      </div>
      <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white md:py-0 py-4">
        <PageContent />
      </div>
      </div>
    </DistancePageProvider>
  );
}
const PageContent = () => {
  const { currentPage } = useDistancePage(); // Get the current page from the context

  return (
    <>{currentPage === "form" ? <SectionFirstPage /> : <SectionSecondPage />}</>
  );
};
