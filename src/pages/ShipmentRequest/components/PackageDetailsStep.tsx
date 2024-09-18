import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShipmentRequestHeader from "./ShipmentRequestHeader";
import { faBox, faHashtag, faWeight } from "@fortawesome/free-solid-svg-icons";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";
import { useStepContext } from "./ShipmenStepperProvider";
import { Button, Space } from "@mantine/core";

export default function PackageDetailsStep() {
  const { data: dataState, update: updateState } = useDistanceCalculator();
  const { nextStep, prevStep } = useStepContext();
  const handlePackagingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // setPackagingNumber(value);
      updateState({
        ...dataState!,
        packagingNumber: value,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col my-5">
        <ShipmentRequestHeader
          title={<div>Package Details</div>}
          description={
            <div>
              Please provide the commodity type, weight, and packaging
              information for your shipment.
            </div>
          }
        />
        <div className="mt-5 flex flex-col gap-5">
          <div className="mb-8 md:mb-0">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon icon={faBox} className="mr-2 text-gray-400" />
              Commodity <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Electronics"
              value={dataState?.commodity || ""}
              onChange={(e) => {
                // setCommodity(e.target.value);
                updateState({
                  ...dataState!,
                  commodity: e.target.value,
                });
              }}
            />
          </div>

          <div className="mb-8 md:mb-0 mt-2">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon icon={faWeight} className="mr-2 text-gray-400" />
              Maximum Weight (lbs) <span className="text-red-500">*</span>
            </h3>
            <input
              type="number"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. 1000lbs"
              value={dataState?.maxWeight || ""}
              onChange={(e) => {
                // setMaxWeight(e.target.value);
                updateState({
                  ...dataState!,
                  maxWeight: e.target.value,
                });
              }}
              min="0"
            />
          </div>

          <div className="text-primary">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon icon={faBox} className="mr-2 text-gray-400" />
              Packaging <span className="text-red-500">*</span>
            </h3>
            <select
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={dataState?.packagingType || ""}
              onChange={(e) =>
                // setSelectedPackagingType(e.target.value)
                updateState({
                  ...dataState!,
                  packagingType: e.target.value,
                })
              }
            >
              <option disabled value={""}>
                Select packaging type
              </option>
              <option className="text-primary" value="Carton">
                Carton
              </option>
              <option className="text-primary" value="Floor">
                Floor
              </option>
              <option className="text-primary" value="Loose">
                Loose
              </option>
              <option className="text-primary" value="Pallet">
                Pallet
              </option>
              <option className="text-primary" value="Roll">
                Roll
              </option>
              <option className="text-primary" value="Skids">
                Skids
              </option>
              <option className="text-primary" value="Others">
                Others
              </option>
            </select>
          </div>
          <div className="">
            <h3 className="text-md font-normal text-primary mb-2">
              <FontAwesomeIcon
                icon={faHashtag}
                className="mr-2 text-gray-400"
              />
              Packaging Qty <span className="text-red-500">*</span>
            </h3>
            <input
              type="number"
              className="w-full bg-blue-100 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={dataState?.packagingNumber || ""}
              onChange={handlePackagingNumberChange}
              placeholder="Enter no. of packages"
              min="0" // This ensures only non-negative values are allowed
            />
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <Button variant="outline" fullWidth onClick={prevStep}>
            Back
          </Button>
          <Space w="md" />
          <Button
            disabled={
              !dataState?.commodity ||
              !dataState?.maxWeight ||
              !dataState?.packagingType ||
              !dataState?.packagingNumber
            }
            onClick={nextStep}
            fullWidth
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
