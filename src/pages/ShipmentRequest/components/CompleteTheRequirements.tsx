import {
  faMapLocationDot,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import { useShipmentAccordion } from "../context/ShipmentAccordionProvider";
import { Button, Space } from "@mantine/core";
import { useAuthStore } from "../../../state/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useDistancePage } from "../context/DistancePageProvider";

export default function CompleteTheRequirements() {
  const navigate = useNavigate();
  const { goToConfirmationPage } = useDistancePage();
  const { isAuthenticated } = useAuthStore();
  const { data: dataState } = useDistanceCalculator();
  const { setValue } = useShipmentAccordion();

  const onNextHandler = () => {
    if (isAuthenticated) {
      // navigate("/requests/confirmation");
      goToConfirmationPage();
    } else {
      sessionStorage.setItem("savedQuote", JSON.stringify(dataState));
      // navigate("/login?redirectTo=/requests/confirmation");
      navigate("/login?redirectTo=/requests?page=confirmation");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col  items-start mb-4 lg:mb-0">
          <div className="text-primary text-lg  font-medium pt-4 rounded-lg flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faMapLocationDot}
              className="text-gray-400 w-5"
            />
            Distance
          </div>
          {dataState?.distance && (
            <div className="text-primary text-2xl font-bold text-gray-500 p-2 md:p-4 rounded-lg">
              {typeof dataState?.distance === 'number' 
              ? `${dataState.distance.toFixed(2)} miles` 
              : <span>&nbsp;</span>}
            </div>
          )}
        </div>
        <div className="flex flex-col  items-start mb-4 lg:mb-0">
          <div className="text-primary text-lg  font-medium pt-4 rounded-lg flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="text-gray-400 w-5"
            />
            Price
          </div>
          {dataState?.price && (
            <div className="text-primary text-2xl font-bold text-gray-500 p-2 md:p-4 rounded-lg">
              {/* {distance ? distance : <span>&nbsp;</span>} */}
              {`$ ${(dataState?.price || 0.0).toFixed(2)}` || (
                <span>&nbsp;</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setValue("information")}
        >
          Back
        </Button>
        <Space w="md" />
        <Button fullWidth onClick={onNextHandler}>
          Proceed
        </Button>
      </div>
    </div>
  );
}