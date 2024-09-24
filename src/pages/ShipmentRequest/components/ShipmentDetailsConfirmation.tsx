import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faTruck,
  faCalendar,
  faRulerCombined,
  faBuilding,
  faBoxes,
  faDollarSign,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mantine/core";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import { useStepContext } from "./ShipmenStepperProvider";

export default function ShipmentDetailsConfirmation() {
  const { data: dataState } = useDistanceCalculator();
  const { prevStep, nextStep } = useStepContext();

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-2">SHIPMENT DETAILS CONFIRMATION</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Please double check the details for your shipment before proceeding to the next process.
      </p>

      <div className="flex flex-col items-start w-full text-left gap-4">
        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faTruck} className="mr-2" />
          <span>Trailer Type: {dataState?.trailerType || "Flatbed"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          <span>Date: {dataState?.pickupDate || new Date().toLocaleDateString()}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faRulerCombined} className="mr-2" />
          <span>Size (ft): {dataState?.maxWeight || "53"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faBuilding} className="mr-2" />
          <span>Company: {dataState?.companyName || "Blue Corner Entertainment"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faBoxes} className="mr-2" />
          <span>Commodity: {dataState?.commodity || "Electronic"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faBox} className="mr-2" />
          <span>Packaging: {dataState?.packagingNumber || "25"} {dataState?.packagingType || "carton"}</span>
        </div>

        <div className="flex justify-between w-full mt-6">
          <div className="text-lg font-bold">Total Shipment Price</div>
          <div className="text-2xl font-bold text-blue-600">${dataState?.price || "0.00"}</div>
        </div>

        <div className="flex justify-between w-full">
          <div className="text-lg">Taxes and other fees</div>
          <div className="text-lg font-bold text-gray-700">${dataState?.taxes || "0.00"}</div>
        </div>
      </div>

      <div className="flex justify-between mt-10 w-full">
        <Button variant="outline" fullWidth onClick={prevStep}>
          Back
        </Button>
        <Button className="ml-4" fullWidth onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
