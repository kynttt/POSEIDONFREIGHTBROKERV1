import { Stepper } from "@mantine/core";
import PickupDateStep from "./PickupDateStep";
import { useStepContext } from "../context/ShipmenStepperProvider";
import ShipmentTransportationStep from "./ShipmentTransportationStep";
import PackageDetailsStep from "./PackageDetailsStep";
import CompanyDetailStep from "./CompanyDetailsStep";

export default function InformationQuotation() {
  const { active } = useStepContext();
  return (
    <div>
      <Stepper iconSize={30} active={active} size="xs">
        <Stepper.Step>
          <ShipmentTransportationStep />
        </Stepper.Step>
        <Stepper.Step>
          <PickupDateStep />
        </Stepper.Step>
        <Stepper.Step>
          <PackageDetailsStep />
        </Stepper.Step>
        <Stepper.Step>
          <CompanyDetailStep />
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
