import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Fieldset,
  Flex,
  Group,
  Input,
  Modal,
  NumberInput,
  ScrollArea,
  Stack,
  Stepper,
  TagsInput,
  CloseButton,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNewTruckCatalog } from "../../../hooks/useNewTruckCatalog";
import { useMutation } from "@tanstack/react-query";
import { TruckCatalog } from "../../../utils/types";
import { createTruck } from "../../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export default function TruckManagementPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const isFullScreen = useMatches({
    xs: true,
    md: false,
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Truck Catalog"
        size="lg"
        fullScreen={isFullScreen}
        centered
      >
        <CreateTruckShell onCloseModal={close} />
      </Modal>
      <Stack gap="lg" w="100%">
        <Flex h="20" justify={"flex-end"}>
          <Button
            variant="light"
            onClick={open}
            leftSection={<FontAwesomeIcon icon={faAdd} />}
          >
            Add Truck
          </Button>
        </Flex>
        <TruckList />
      </Stack>
    </>
  );
}

function TruckList() {
  return (
    <div>
      <h1>Truck List</h1>
    </div>
  );
}

function CreateTruckShell({ onCloseModal }: { onCloseModal: () => void }) {
  const {} = useNewTruckCatalog();
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const resetState = useNewTruckCatalog((state) => state.resetTruckCatalog);
  useEffect(() => {
    return () => resetState();
  }, [resetState]);
  return (
    <>
      <Stepper active={active} onStepClick={setActive} size="md" iconSize={30}>
        <Stepper.Step
          label="First step"
          description="Create a new truck catalog"
          allowStepSelect={false}
        >
          <CreateTruckStep1 onNext={nextStep} />
        </Stepper.Step>

        <Stepper.Step
          label="Final step"
          description="Price per mile"
          allowStepSelect={false}
        >
          <CreateTruckStep2 prev={prevStep} next={nextStep} />
        </Stepper.Step>
        <Stepper.Completed>
          <CreateTruckComplete onPrev={prevStep} onCloseModal={onCloseModal} />
        </Stepper.Completed>
      </Stepper>
    </>
  );
}

function CreateTruckStep1({ onNext }: { onNext: () => void }) {
  const sizes = useNewTruckCatalog((state) => state.truckCatalog?.sizes || []);
  const addTruckCatalogName = useNewTruckCatalog(
    (state) => state.addTruckCatalogName
  );
  const truckCatalogName = useNewTruckCatalog(
    (state) => state.truckCatalog?.truckType || ""
  );
  const addTruckSizes = useNewTruckCatalog((state) => state.addTruckSizes);
  const hasTruckCatalog = useNewTruckCatalog(
    (state) => !!state.truckCatalog && !!state.truckCatalog.truckType
  );

  const handleNext = () => {
    onNext();
  };

  const handleSizeChange = (newSizes: string[]) => {
    // Filter out any strings that are not purely numeric and are not empty
    const cleanedSizes = newSizes.filter((size) => /^\d+$/.test(size));

    // Convert the remaining valid numeric strings to numbers
    const convertedNumbers = cleanedSizes.map((size) => parseInt(size, 10));

    // Add the valid sizes to the state
    addTruckSizes(convertedNumbers);
  };

  return (
    <Stack>
      <Input
        placeholder="Truck Catalog"
        value={truckCatalogName}
        onChange={(event) => addTruckCatalogName(event.currentTarget.value)}
      />
      <TagsInput
        splitChars={[",", " ", "|"]}
        type="number"
        placeholder={
          !hasTruckCatalog
            ? "Fill up the Truck Catalog First"
            : "Add Truck Sizes"
        }
        description={"Use comma, space or pipe to separate sizes"}
        disabled={!hasTruckCatalog}
        data={[]}
        value={sizes.map((size) => size.size.toString())}
        onChange={handleSizeChange}
        allowDuplicates={false}
      />
      <Button
        onClick={handleNext}
        disabled={!hasTruckCatalog || sizes.length === 0}
      >
        Next
      </Button>
    </Stack>
  );
}

function CreateTruckStep2({
  prev,
  next,
}: {
  prev: () => void;
  next: () => void;
}) {
  const sizes = useNewTruckCatalog((state) => state.truckCatalog!.sizes);
  const [invalidIndices, setInvalidIndices] = useState<
    Record<number, number[]>
  >({});

  function validatePricing(): {
    errors: string[];
    invalidIndices: Record<number, number[]>;
  } {
    const errors: string[] = [];
    const invalidIndices: Record<number, number[]> = {};

    sizes.forEach((size, sizeIndex) => {
      size.pricing.forEach((pricing, pricingIndex) => {
        const invalidPricing = [];

        if (pricing.minDistance === undefined || isNaN(pricing.minDistance)) {
          errors.push(
            `Min Distance is invalid for Size ${size.size}, Pricing #${
              pricingIndex + 1
            }`
          );
          invalidPricing.push(pricingIndex);
        }
        if (pricing.maxDistance !== undefined && isNaN(pricing.maxDistance)) {
          errors.push(
            `Max Distance is invalid for Size ${size.size}, Pricing #${
              pricingIndex + 1
            }`
          );
          invalidPricing.push(pricingIndex);
        }
        if (
          pricing.pricePerMile === undefined ||
          pricing.pricePerMile <= 0 ||
          isNaN(pricing.pricePerMile)
        ) {
          errors.push(
            `Price per Mile is invalid for Size ${size.size}, Pricing #${
              pricingIndex + 1
            }`
          );
          invalidPricing.push(pricingIndex);
        }
        if (
          pricing.maxDistance !== undefined &&
          pricing.minDistance !== undefined &&
          pricing.minDistance > pricing.maxDistance
        ) {
          errors.push(
            `Min Distance cannot be greater than Max Distance for Size ${
              size.size
            }, Pricing #${pricingIndex + 1}`
          );
          invalidPricing.push(pricingIndex);
        }

        if (invalidPricing.length > 0) {
          invalidIndices[sizeIndex] = invalidIndices[sizeIndex] || [];
          invalidIndices[sizeIndex].push(pricingIndex);
        }
      });
    });

    return { errors, invalidIndices };
  }

  const handleNext = () => {
    const { errors, invalidIndices } = validatePricing();
    setInvalidIndices(invalidIndices); // Save invalid indices to state
    if (errors.length === 0) {
      next();
    } else {
      notifications.show({
        title: "Invalid Pricing Data",
        message: errors.join("\n"),
        color: "red",
        withBorder: true,
        autoClose: false,
      });
    }
  };

  return (
    <Stack w="100%">
      {sizes.map((size, index) => (
        <Group key={index} w="100%" h="380">
          <Fieldset legend={`Size ${size.size}`} w="100%" h="100%">
            <SizesPrices
              index={index}
              invalidIndices={invalidIndices[index] || []} // Pass down invalid indices
            />
          </Fieldset>
        </Group>
      ))}
      <Group justify="flex-end">
        <Button onClick={prev} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Group>
    </Stack>
  );
}

function SizesPrices({
  index,
  invalidIndices,
}: {
  index: number;
  invalidIndices: number[];
}) {
  const pricings = useNewTruckCatalog(
    (state) => state.truckCatalog!.sizes[index].pricing
  );
  const addPricingFresh = useNewTruckCatalog((state) => state.addPricingFresh);
  const updatePricing = useNewTruckCatalog((state) => state.updatePricing);
  const removePrice = useNewTruckCatalog((state) => state.removePricing);
  return (
    <ScrollArea h="100%" w="100%" scrollbars="x" type="always">
      <Flex gap={20} align={"center"}>
        {pricings.map((pricing, pricingIndex) => {
          const isInvalid = invalidIndices.includes(pricingIndex);

          return (
            <Card
              key={pricingIndex}
              shadow={isInvalid ? "md" : "sm"}
              radius="md"
              withBorder
              miw={300}
              style={{
                borderColor: isInvalid ? "red" : undefined,
                boxShadow: isInvalid ? "0 0 10px red" : undefined,
              }}
            >
              <Stack>
                <Flex justify={"flex-end"}>
                  <CloseButton
                    onClick={() => {
                      removePrice(index, pricingIndex);
                    }}
                  />
                </Flex>
                <NumberInput
                  label="Min Distance"
                  placeholder="What is the minimum distance?"
                  value={pricing.minDistance}
                  onChange={(value) => {
                    updatePricing(index, pricingIndex, {
                      ...pricing,
                      minDistance: Number(value),
                    });
                  }}
                  required
                />
                <NumberInput
                  label="Max Distance (optional)"
                  placeholder="What is the maximum distance?"
                  value={pricing.maxDistance}
                  onChange={(value) => {
                    updatePricing(index, pricingIndex, {
                      ...pricing,
                      maxDistance: Number(value),
                    });
                  }}
                />
                <NumberInput
                  label="Price per Mile"
                  placeholder="What is the price per mile?"
                  value={pricing.pricePerMile}
                  onChange={(value) => {
                    updatePricing(index, pricingIndex, {
                      ...pricing,
                      pricePerMile: Number(value),
                    });
                  }}
                  required
                />
              </Stack>
            </Card>
          );
        })}
        <Button onClick={() => addPricingFresh(index)}>Add Pricing</Button>
      </Flex>
    </ScrollArea>
  );
}

function CreateTruckComplete({
  onPrev,
  onCloseModal,
}: {
  onPrev: () => void;
  onCloseModal: () => void;
}) {
  const truckCatalog = useNewTruckCatalog((state) => state.truckCatalog);

  const mutation = useMutation<TruckCatalog, AxiosError, TruckCatalog>({
    mutationFn: createTruck,
    onSuccess: () => {
      onCloseModal();
      notifications.show({
        title: "Truck catalog created",
        message: "Truck catalog has been created successfully",
        color: "green",
      });
    },
    onError: (error) => {
      console.log(error.response?.data);

      notifications.show({
        title: "Truck catalog creation failed",
        message: JSON.stringify(error.response?.data) || "An error occurred",
        color: "red",
      });
    },
  });

  const onSubmit = () => {
    if (truckCatalog) {
      mutation.mutate(truckCatalog);
    }
  };
  return (
    <Flex gap={15}>
      <Button variant="outline" onClick={onPrev} miw={100}>
        Back
      </Button>
      <Button fullWidth loading={mutation.isPending} onClick={onSubmit}>
        Submit
      </Button>
    </Flex>
  );
}
