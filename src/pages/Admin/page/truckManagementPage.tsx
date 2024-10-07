import {
  faAdd,
  faClose,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "mantine-datatable";
import {
  Button,
  Card,
  Fieldset,
  Flex,
  Group,
  Modal,
  NumberInput,
  ScrollArea,
  Stack,
  Stepper,
  TagsInput,
  CloseButton,
  useMatches,
  Badge,
  ActionIcon,
  Box,
  Popover,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNewTruckCatalog } from "../../../hooks/useNewTruckCatalog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PriceError, TruckCatalog } from "../../../utils/types";
import {
  createTruck,
  deleteTruck,
  listTrucks,
  updateTruck,
} from "../../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import queryClient from "../../../lib/queryClient";
import { validatePricing } from "../../../utils/helpers";
import { trailerTypes } from "../../../components/googleMap/priceCalculator";

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
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCatalog, setSelectedCatalog] = useState<TruckCatalog | null>(
    null
  );

  const isFullScreen = useMatches({
    xs: true,
    md: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["truck-catalogs"],
    queryFn: listTrucks,
  });

  const mutation = useMutation<void, AxiosError, string>({
    mutationFn: deleteTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["truck-catalogs"],
      });
      notifications.show({
        title: "Truck catalog deleted",
        message: "Truck catalog has been deleted successfully",
        color: "green",
      });
    },
  });
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Edit ${selectedCatalog?.truckType || ""}`}
        size="lg"
        fullScreen={isFullScreen}
        centered
      >
        <EditTruckCatalog truckCatalogCache={selectedCatalog} close={close} />
      </Modal>
      <DataTable
        columns={[
          { accessor: "truckType" },
          {
            accessor: "sizes",
            render: (value) => (
              <Group gap={5}>
                {value.sizes.map((size) => (
                  <Badge key={size.size + value._id!}>{size.size}</Badge>
                ))}
              </Group>
            ),
          },
          {
            accessor: "actions",
            title: <Box mr={6}>Actions</Box>,
            textAlign: "right",
            render: (catalog) => (
              <>
                <Group
                  key={catalog._id!}
                  gap={14}
                  justify="right"
                  wrap="nowrap"
                >
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="blue"
                    onClick={() => {
                      setSelectedCatalog(catalog);
                      open();
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => mutation.mutate(catalog._id!)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionIcon>
                </Group>
              </>
            ),
          },
        ]}
        records={data}
        fetching={isLoading || mutation.isPending}
        idAccessor="_id"
      />
    </>
  );
}

function EditTruckCatalog({
  close,
  truckCatalogCache,
}: {
  close: () => void;
  truckCatalogCache: TruckCatalog | null;
}) {
  const setCatalog = useNewTruckCatalog((state) => state.setCatalog);
  const truckCatalog = useNewTruckCatalog((state) => state.truckCatalog);

  const resetState = useNewTruckCatalog((state) => state.resetTruckCatalog);

  const sizes = useNewTruckCatalog((state) => state.truckCatalog?.sizes || []);
  const removeSize = useNewTruckCatalog((state) => state.removeSize);
  const addTruckSize = useNewTruckCatalog((state) => state.addTruckSize);
  const [newSize, setNewSize] = useState<number | undefined>(undefined);
  const [opened, setOpened] = useState(false);

  const [invalidIndices, setInvalidIndices] = useState<
    Record<number, number[]>
  >({});
  const [errors, setErrors] = useState<string[]>([]);

  const mutation = useMutation<TruckCatalog, AxiosError, TruckCatalog>({
    mutationFn: updateTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["truck-catalogs"],
      });
      close();
      notifications.show({
        title: "Truck catalog updated",
        message: "Truck catalog has been updated successfully",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Truck catalog update failed",
        message: JSON.stringify(error.response?.data) || "An error occurred",
        color: "red",
      });
    },
  });
  useEffect(() => {
    setCatalog(truckCatalogCache!);
    return () => {
      resetState();
    };
  }, [truckCatalogCache, resetState, setCatalog]);

  const handleSave = () => {
    const { errors, invalidIndices } = validatePricing({ sizes });
    setErrors(errors); // Save errors
    setInvalidIndices(invalidIndices); // Save invalid indices to state
    if (errors.length === 0) {
      mutation.mutate(truckCatalog!);
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
  const handleRemoveSize = (index: number) => {
    removeSize(index);
  };

  const handleAddSize = () => {
    if (newSize !== undefined) {
      addTruckSize(newSize);
      setNewSize(undefined);
      setOpened(false);
    }
  };

  return (
    <Stack>
      <Group gap={5}>
        {sizes.map((size, index) => (
          <Badge
            key={index}
            size="lg"
            variant="outline"
            rightSection={
              <ActionIcon
                variant="transparent"
                size="xs"
                onClick={() => handleRemoveSize(index)}
              >
                <FontAwesomeIcon icon={faClose} />
              </ActionIcon>
            }
          >
            {size.size}
          </Badge>
        ))}
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
          onChange={setOpened}
        >
          <Popover.Target>
            <Button
              size="xs"
              radius="lg"
              leftSection={<FontAwesomeIcon icon={faAdd} />}
              onClick={() => setOpened((o) => !o)}
            >
              New Size
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Group>
              <NumberInput
                label="Size"
                placeholder="What is the size?"
                value={newSize}
                onChange={(value) => setNewSize(Number(value))}
                required
              />
              <Button fullWidth onClick={handleAddSize}>
                Add
              </Button>
            </Group>
          </Popover.Dropdown>
        </Popover>
      </Group>
      <TruckPricesForm priceError={{ invalidIndices, errors }}>
        <Button onClick={handleSave}>Save</Button>
      </TruckPricesForm>
    </Stack>
  );
}

function CreateTruckShell({ onCloseModal }: { onCloseModal: () => void }) {
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
    (state) => state.truckCatalog?.truckType || undefined
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
      {/* <Input
        placeholder="Truck Catalog"
        value={truckCatalogName}
        onChange={(event) => addTruckCatalogName(event.currentTarget.value)}
      /> */}
      <Select
        label="Trailer Type"
        placeholder="Select your desired trailer type"
        value={truckCatalogName}
        data={trailerTypes}
        required
        onChange={(value) => {
          if (value) {
            addTruckCatalogName(value);
          }
        }}
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
  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    const { errors, invalidIndices } = validatePricing({ sizes });
    setErrors(errors); // Save errors
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
    <TruckPricesForm priceError={{ invalidIndices, errors }}>
      <Group justify="flex-end">
        <Button onClick={prev} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Group>
    </TruckPricesForm>
  );
}

function TruckPricesForm({
  priceError: { invalidIndices },
  children,
}: {
  priceError: PriceError;
  children?: React.ReactNode;
}) {
  const sizes = useNewTruckCatalog((state) => state.truckCatalog?.sizes || []);
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
      {children}
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
      queryClient.invalidateQueries({
        queryKey: ["truck-catalogs"],
      });
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
