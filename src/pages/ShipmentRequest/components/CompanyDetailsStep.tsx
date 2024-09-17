import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShipmentRequestHeader from "./ShipmentRequestHeader";
import { faBuilding, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import { Button, Space } from "@mantine/core";
import { useShipmentAccordion } from "./ShipmentAccordionProvider";
import { useStepContext } from "./ShipmenStepperProvider";

export default function CompanyDetailStep() {
  const { prevStep } = useStepContext();
  const { setValue } = useShipmentAccordion();
  const { data: dataState, update: updateState } = useDistanceCalculator();
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
            <h3 className="text-md font-medium text-secondary my-2">
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
              disabled={
                !dataState?.origin ||
                !dataState?.destination ||
                !dataState?.trailerType ||
                !dataState?.trailerSize
              }
              onClick={() => setValue("calculation")}
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
