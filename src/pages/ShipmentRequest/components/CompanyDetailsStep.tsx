import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShipmentRequestHeader from "./ShipmentRequestHeader";
import { faBuilding, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";

import { Button, Space } from "@mantine/core";
import { useShipmentAccordion } from "../context/ShipmentAccordionProvider";
import { useStepContext } from "../context/ShipmenStepperProvider";
import { useMutation } from "@tanstack/react-query";
import { GetPriceMileData, GetPriceMileResponse } from "../../../utils/types";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { getPricePerMile } from "../../../lib/apiCalls";
import { useDirectionsStore } from "../../../hooks/useDirectionStore";
import { calculatePrice } from "../../../components/googleMap/priceCalculator";

export default function CompanyDetailStep() {
  const { prevStep } = useStepContext();
  const { setValue } = useShipmentAccordion();

  const selectedRoutes = useDirectionsStore((state) => state.selectedRoute);
  const leg = selectedRoutes?.legs[0];

  const { data: dataState, update: updateState } = useDistanceCalculator();

  const mutation = useMutation<
    GetPriceMileResponse,
    AxiosError,
    GetPriceMileData
  >({
    mutationFn: getPricePerMile,
    onSuccess: (data) => {
      if (!dataState) {
        return;
      }
      if (!leg?.distance && !dataState.maxWeight) {
        return;
      }
      const calculatedPriceResponse = calculatePrice(
        dataState.distance!,
        data.pricePerMile,
        dataState.maxWeight!
      );
      if (!calculatePrice) {
        return;
      }

      // console.log("Calculated price:"  , calculatedPriceResponse);
      // setPrice(calculatedPrice);
      updateState({
        ...dataState!,
        price: calculatedPriceResponse!,
      });

      setValue("calculation");
    },
    onError: (error) => {
      console.error("Error fetching price data:", error.message);
      notifications.show({
        title: "Error",
        message: "An error occurred while calculating the price",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    },
  });

  const onNextHandler = () => {
    if (!leg?.distance || !dataState?.trailerType || !dataState.trailerSize) {
      return;
    }

    mutation.mutate({
      distance: dataState.distance!,
      truckId: dataState.trailerType!.id!,
      trailerSize: dataState.trailerSize!,
    });
  };

  return (
    <>
      <div className="flex flex-col my-5">
        <ShipmentRequestHeader
          title={<div>Company Details</div>}
          description={
            <div>
              Provide the consignee's information and any additional notes about
              the shipment.
            </div>
          }
        />
        <div className="mt-5 flex flex-col gap-5">
          <div className="mb-8 md:mb-0">
            <h3 className="text-md font-medium text-primary my-2">
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2 text-gray-400"
              />
              Company Name / Consignee <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your company name"
              value={dataState?.companyName || ""}
              onChange={(e) => {
                // setCompanyName(e.target.value)
                updateState({
                  ...dataState!,
                  companyName: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-8 md:mb-0 w-full">
            <h3 className="text-md font-medium text-primary my-2">
              <FontAwesomeIcon
                icon={faNoteSticky}
                className="mr-2 text-gray-400"
              />
              Additional Notes
            </h3>
            <textarea
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your additional notes"
              value={dataState?.notes || ""}
              onChange={(e) => {
                // setNotes(e.target.value)
                updateState({
                  ...dataState!,
                  notes: e.target.value,
                });
              }}
              rows={3}
            />
          </div>
          <div className="flex justify-between mt-10">
            <Button variant="outline" fullWidth onClick={prevStep}>
              Back
            </Button>
            <Space w="md" />
            <Button
              disabled={!dataState?.companyName}
              onClick={onNextHandler}
              loading={mutation.isPending}
              fullWidth
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
