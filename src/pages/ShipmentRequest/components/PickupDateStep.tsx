import { useEffect, useState } from "react";
import { Calendar, DayProps } from "@mantine/dates";
import dayjs from "dayjs"; // Make sure dayjs is installed
import ShipmentRequestHeader from "./ShipmentRequestHeader"; // Adjust the import path
import { Button } from "@mantine/core";
import { useStepContext } from "./ShipmenStepperProvider";
import useDistanceCalculator from "../../../hooks/useDistanceCalculator";

export default function PickupDateStep() {
  const { nextStep } = useStepContext();
  const { data, update } = useDistanceCalculator();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    data?.pickupDate ? new Date(data.pickupDate) : null
  );

  useEffect(() => {
    if (data?.pickupDate) {
      setSelectedDate(new Date(data.pickupDate));
    }
  }, [data]);

  const handleSelect = (date: Date) => {
    // If the same date is clicked again, deselect it
    if (selectedDate && dayjs(date).isSame(selectedDate, "date")) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date); // Select a new date
    }
  };

  const onNextHandler = () => {
    update({
      ...data!,
      pickupDate: selectedDate!.toISOString(),
    });
    nextStep();
  };

  // Set minimum date to today (or tomorrow if you don't want to allow selecting today)
  const today = dayjs().startOf("day").toDate();

  return (
    <div className="flex flex-col my-5">
      <ShipmentRequestHeader
        title={<div>Choose Pickup Date</div>}
        description={
          <div>
            Select a date for the pickup of your shipment. Ensure it aligns with
            your desired schedule.
          </div>
        }
      />
      <div className="py-5 flex justify-center">
        <Calendar
          className="border border-primary p-5 rounded-lg border-[2px]"
          getDayProps={(
            date
          ): Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> => ({
            selected: selectedDate
              ? dayjs(date).isSame(selectedDate, "date")
              : false,
            onClick: () => handleSelect(date),
          })}
          // Disable past dates
          minDate={today}
        />
      </div>
      <Button disabled={!selectedDate} onClick={onNextHandler}>
        Next
      </Button>
    </div>
  );
}
