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
      <div className="w-full h-[100vh] flex">
        <div className="w-full h-full">
          <MapComponent />
        </div>
        <div className="w-1/3 h-full bg-white">
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
