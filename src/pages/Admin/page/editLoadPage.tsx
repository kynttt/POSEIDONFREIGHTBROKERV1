import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  bookingRefund,
  fetchBookingById,
  updateBookingDetails,
  updateBookingStatus,
} from "../../../lib/apiCalls";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import {
  Booking,
  BookingStatus,
  Quote,
  RefundResponse,
} from "../../../utils/types";
import { formatDateForInput } from "../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faBox,
  faBoxOpen,
  // faBuilding,
  // faCalendarCheck,
  // faCircleCheck,
  // faClock,
  // faDollarSign,
  faFloppyDisk,
  // faHashtag,
  faLocationDot,
  // faMapLocationDot,
  faMoneyCheck,
  // faNoteSticky,
  faPenToSquare,
  // faQuestionCircle,
  faTruck,
  // faTruckFast,
  // faTruckFront,
  // faTruckMoving,
  faUser,
  // faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import ConfirmationModal from "../../../components/EditLoadConfirmationModal";
import {
  toBookPaymentStatus,
  toBookStatusTitle,
} from "../../../components/googleMap/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../../../lib/queryClient";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

type FormStateField = keyof FormState | keyof NonNullable<FormState["quote"]>;
interface FormState {
  pickupTime?: string;
  deliveryTime?: string;
  carrier?: string;
  driver?: string;
  quote?: {
    trailerSize?: string;
    maxWeight?: number;
    pickupDate?: string;
    deliveryDate?: string;
  };
  // Add other fields as needed
}

const convertTo24HourFormat = (time12h: string): string => {
  const [time, modifier] = time12h.split(" ");
  const timeMap = time.split(":").map(Number);
  let hours = timeMap[0];
  const minutes = timeMap[1];
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const EditLoad: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opened, { open, close }] = useDisclosure(false);
  const [action, setAction] = useState<((type: string) => void) | null>(null);
  const [editingField, setEditingField] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: bookingQueryData,
    isLoading: bookingLoading,
    isError: isBookingError,
    error: bookingError,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBookingById(id!),
    enabled: !!id,
  });

  const [bookingDebounce] = useDebouncedValue(booking, 500);

  const refundMutation = useMutation<RefundResponse, AxiosError, string>({
    mutationFn: bookingRefund,
    onSuccess: () => {
      // Refetch the booking data
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });

  const handleOpenConfirmationModal = (type: BookingStatus) => {
    setAction(() => () => handleConfirmBooking(type));
    open();
  };

  const handleConfirm = () => {
    if (!action) return;
    action("default");
    close();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAllPrepared, setIsAllPrepared] = useState(false);

  const toggleEdit = (field: string) => {
    setEditingField((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    if (!bookingQueryData) return;
    setIsEditing(["pending", "revised"].includes(bookingQueryData.status));
    setBooking(bookingQueryData);
  }, [bookingQueryData]);

  useEffect(() => {
    if (isBookingError) {
      notifications.show({
        title: "Booking Fetch Error",
        message: bookingError.message,
        color: "red",
      });
    }
  }, [isBookingError, bookingError]);

  useEffect(() => {
    if (!bookingDebounce) return;

    const { pickupDate, deliveryDate } = bookingDebounce.quote as Quote;

    const { pickupTime, deliveryTime, carrier, driver } = bookingDebounce;

    setIsAllPrepared(
      !!(
        pickupDate &&
        deliveryDate &&
        pickupTime &&
        deliveryTime &&
        carrier &&
        driver
      )
    );

    // console.log(isAllPrepared);
  }, [bookingDebounce, editingField, isAllPrepared]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "pickupDate" || name === "deliveryDate") {
      value = new Date(value).toISOString();
    } else if (name === "pickupTime" || name === "deliveryTime") {
      // Convert 12-hour format to 24-hour format
      value = convertTo24HourFormat(value);
    }

    setBooking((prevBooking) => {
      if (!prevBooking) return prevBooking;
      const data = {
        ...prevBooking,
        ...(name === "pickupDate" || name === "deliveryDate"
          ? {
              quote: {
                ...(prevBooking.quote as Quote),
                [name]: value,
              },
            }
          : { [name]: value }),
      };

      return data;
    });
  };

  const handleSave = async (field: FormStateField) => {
    try {
      if (!id || !bookingDebounce) return;

      await updateBookingDetails(id, {
        carrierName: bookingDebounce.carrier,
        driverName: bookingDebounce.driver,
        pickUpDate: bookingDebounce.quote?.pickupDate.toLocaleString(),
        pickUpTime: bookingDebounce.pickupTime,
        deliveryDate: bookingDebounce.quote?.deliveryDate?.toLocaleString(),
        deliveryTime: bookingDebounce.deliveryTime,
      });

      setBooking((prevBooking) => {
        if (!prevBooking) return prevBooking;
        return {
          ...prevBooking,
          [field]: bookingDebounce?.[field as keyof Booking],
        };
      });

      queryClient.invalidateQueries({ queryKey: ["booking", id] });

      setEditingField((prevState) => ({ ...prevState, [field]: false }));
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };
  const handleConfirmBooking = async (action: BookingStatus) => {
    try {
      if (!bookingDebounce) return;
      if (!id) return;

      await updateBookingStatus(id, {
        ...bookingDebounce,
        status: action,
      });

      setBooking((prevBooking) => {
        if (!prevBooking) return null;

        return {
          ...prevBooking,
          status: action,
        };
      });

      if (action === "confirmed") {
        setIsModalOpen(true); // Open the modal only if confirming the booking
      }

      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (bookingLoading || !bookingDebounce) {
    return <div>Loading...</div>;
  }

  if (!bookingDebounce) {
    return <div>Booking not found</div>;
  }

  const renderActionButtons = () => {
    switch (bookingDebounce.status) {
      case "delivered":
        return (
          <h2 className="text-2xl font-medium text-price">
            Successfully delivered!
          </h2>
        );
      case "cancelled":
        return (
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium text-red-600">
              Booking Cancelled
            </h2>
            {bookingDebounce.paymentStatus === "paid" && (
              <button
                className={`text-sm bg-red-600 text-white px-4 py-2 rounded ${
                  refundMutation.isPending && "opacity-50 cursor-not-allowed"
                }
                  `}
                onClick={() => refundMutation.mutate(bookingDebounce.id!)}
              >
                Refund
              </button>
            )}
          </div>
        );
      case "confirmed":
        return (
          <>
            <button
              className="text-sm ml-4 text-white bg-orange-500 px-4 py-2 rounded"
              onClick={() => handleOpenConfirmationModal("inTransit")}
            >
              Mark as In-Transit
            </button>
            <button
              className="text-sm ml-4 text-white bg-red-600 px-4 py-2 rounded"
              onClick={() => handleOpenConfirmationModal("cancelled")}
            >
              Cancel
            </button>
            <button
              className="text-sm ml-4 text-white bg-blue-600 px-4 py-2 rounded"
              onClick={() => handleOpenConfirmationModal("revised")}
            >
              Revised
            </button>
          </>
        );
      case "inTransit":
        return (
          <>
            <button
              className="text-sm ml-4 text-white bg-price px-4 py-2 rounded"
              onClick={() => handleOpenConfirmationModal("delivered")}
            >
              Mark as Delivered
            </button>
            <button
              className="text-sm ml-4 text-white bg-red-600 px-4 py-2 rounded"
              onClick={() => handleOpenConfirmationModal("cancelled")}
            >
              Cancel
            </button>
          </>
        );
      default:
        return (
          <button
            className={`px-4 py-2 bg-blue-600 text-white rounded ${
              isAllPrepared ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => handleOpenConfirmationModal("confirmed")}
            disabled={!isAllPrepared}
          >
            Confirm Booking
          </button>
        );
    }
  };

  return (
    <>
      <ConfirmationModal
        opened={opened}
        onClose={close}
        onConfirm={handleConfirm}
        title="Confirmation"
        message="Are you sure you want to perform this action?"
      />
      <div className="flex min-h-screen ">
        <nav className="flex-1 bg-blue-50 overflow-y-auto lg:px-20">
          <div className="flex flex-col  justify-evenly w-full gap-8 p-2">
            <div className="bg-blue-50 p-6 w-full max-w-screen-2xl mx-auto">
              <div className="md:flex items-center">
                <h1 className="text-2xl font-large mt-4  text-rblue mr-auto ">
                  Shipment Summary
                </h1>
              </div>
            </div>

            <div className="md:flex items-center justify-between bg-blue-50 px-6 w-full max-w-screen mx-auto ">
              <h1 className="md:text-2xl text-lg font-medium mb-4 mt-4 text-rblue">
                Shipment Reference: {bookingDebounce.bookingRef}
              </h1>
              <div className="flex items-center text-rblue">
                Status{" "}
                <div className="px-8 py-2 my-4 border border-blue-500  text-blue-500 rounded-3xl mx-6">
                  {" "}
                  {toBookStatusTitle(bookingDebounce.status)}{" "}
                  {(bookingDebounce.paymentStatus === "paid" ||
                    bookingDebounce.paymentStatus === "refunded") && (
                    <span className="text-red-500">
                      ({toBookPaymentStatus(bookingDebounce.paymentStatus)})
                    </span>
                  )}
                </div>
              </div>
              <p className="text-rblue font-normal">
                Last Updated:{" "}
                {bookingDebounce.updatedAt
                  ? new Date(bookingDebounce.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div className="mb-2 md:flex  w-full max-w-screen mx-auto bg-white rounded-xl  md:py-6  border border-rblue md:p-0 p-6">
              {/* Pick Up Details */}
              <div className=" w-full max-w-screen mx-auto bg-white  md:px-8  pt-4 md:pt-0">
                <h2 className="text-xl  mb-8 text-rblue ">
                  <FontAwesomeIcon icon={faTruck} className="mr-4" />
                  Shipment
                  {/* <p className="text-base text-gray-500 font-normal">
                  Full Overview of Pickup Timing and Address
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}

                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="facilityName"
                  >
                    {/* <FontAwesomeIcon icon={faBuilding} className="mr-2" /> */}
                    Facility / Company Name
                  </label>
                  <div>
                    <p className="text-sm text-gray-500 font-normal">
                      {(bookingDebounce?.quote as Quote)?.companyName || "N/A"}
                    </p>
                  </div>
                </div>
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="facilityAddress"
                  >
                    {/* <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> */}
                    Costumer Reference #
                  </label>
                  <p className="text-sm text-gray-500 font-normal ">
                    {typeof bookingDebounce.createdBy === "object" &&
                    bookingDebounce.createdBy.id
                      ? bookingDebounce.createdBy.id
                      : "N/A"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="notes"
                  >
                    {/* <FontAwesomeIcon icon={faNoteSticky} className="mr-2" /> */}
                    Additional Notes
                  </label>
                  <p className="text-base text-gray-500 font-normal">
                    {(bookingDebounce.quote as Quote)?.notes || "N/A"}
                  </p>
                </div>

                {/* <div className=" items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="facilityAddress"
                >
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  Facility Address
                </label>
                <div>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking?.quote as Quote)?.origin || "N/A"}
                  </p>
                </div>
              </div> */}

                {/* <div className=" items-center justify-between py-2">
                <label
                  className="block text-primary text-base  font-medium"
                  htmlFor="pickupTime"
                >
                  
                  Pick Up Time 
                </label>
                <div className="flex gap-2 items-center">
                  {editingField.pickupTime ? (
                    <input
                      type="time"
                      name="pickupTime"
                      value={
                        booking.pickupTime
                          ? convertTo24HourFormat(booking.pickupTime)
                          : "00:00" // Provide a default value if deliveryTime is not set
                      }
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p
                      className={` font-medium ${
                        booking.pickupTime
                          ? "text-sm text-gray-500 font-normal"
                          : "text-red-500 text-sm  font-normal"
                      }`}
                    >
                      {booking.pickupTime
                        ? new Date(
                            `1970-01-01T${booking.pickupTime}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Edit Pick-up Time Here..."}
                    </p>
                  )}
                  {booking.status === "Pending" && (
                    <button
                      className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                      onClick={() =>
                        editingField.pickupTime
                          ? handleSave("pickupTime")
                          : toggleEdit("pickupTime")
                      }
                    >
                      {editingField.pickupTime ? (
                        <FontAwesomeIcon
                          icon={faFloppyDisk}
                          className="text-primary"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-primary"
                        />
                      )}
                    </button>
                  )}
                </div>
              </div> */}
                {/* </div> */}
              </div>

              <div className=" w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl  mb-8 text-rblue ">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-4" />
                  Pick Up
                  {/* <p className="text-base text-gray-500 font-normal">
                  Full Overview of Pickup Timing and Address
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="facilityName"
                  >
                    {/* <FontAwesomeIcon icon={faBuilding} className="mr-2" /> */}
                    Sender
                  </label>
                  <p className="text-sm text-gray-500 font-normal ">
                    {typeof bookingDebounce.createdBy === "object" &&
                    bookingDebounce.createdBy.name
                      ? bookingDebounce.createdBy.name
                      : "N/A"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="facilityAddress"
                  >
                    {/* <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> */}
                    Address
                  </label>
                  <div>
                    <p className="text-sm text-gray-500 font-normal">
                      {(bookingDebounce?.quote as Quote)?.origin || "N/A"}
                    </p>
                  </div>
                </div>
                {/* </div> */}

                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="appointment"
                  >
                    {/* <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> */}
                    Appointment <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 items-center justify-between">
                    {editingField.pickupDate ? (
                      <input
                        type="date"
                        name="pickupDate"
                        value={
                          (booking!.quote as Quote)?.pickupDate
                            ? formatDateForInput(
                                new Date((booking!.quote as Quote)?.pickupDate)
                              )
                            : formatDateForInput(new Date()) // Default to today's date
                        }
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p className="text-sm text-gray-500 font-normal">
                        {/* {new Date(booking.pickupDate).toLocaleDateString()} */}
                        {(bookingDebounce.quote as Quote)?.pickupDate
                          ? new Date(
                              (bookingDebounce.quote as Quote)?.pickupDate
                            ).toLocaleDateString()
                          : "TBA"}
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.pickupDate
                            ? handleSave("pickupDate")
                            : toggleEdit("pickupDate")
                        }
                      >
                        {editingField.pickupDate ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="pickupTime"
                  >
                    {/* <FontAwesomeIcon icon={faClock} className="mr-2" /> */}
                    Pick Up Time
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 items-center justify-between">
                    {editingField.pickupTime ? (
                      <input
                        type="time"
                        name="pickupTime"
                        value={
                          booking!.pickupTime
                            ? convertTo24HourFormat(booking!.pickupTime)
                            : "00:00" // Provide a default value if deliveryTime is not set
                        }
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p
                        className={` font-medium ${
                          bookingDebounce.pickupTime
                            ? "text-sm text-gray-500 font-normal"
                            : "text-red-500 text-sm  font-normal"
                        }`}
                      >
                        {bookingDebounce.pickupTime
                          ? new Date(
                              `1970-01-01T${bookingDebounce.pickupTime}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Edit Pick-up Time Here..."}
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.pickupTime
                            ? handleSave("pickupTime")
                            : toggleEdit("pickupTime")
                        }
                      >
                        {editingField.pickupTime ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {/* </div> */}
              </div>

              {/* Delivery Details */}
              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl  mb-8 text-rblue">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-4" />
                  Drop-off{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                  Delivery Schedule and Address Breakdown
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="facilityName"
                  >
                    {/* <FontAwesomeIcon icon={faBuilding} className="mr-2" /> */}
                    Consignee
                  </label>
                  <div>
                    <p className="text-sm text-gray-500 font-normal">
                      {(bookingDebounce?.quote as Quote)?.companyName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="facilityAddress"
                  >
                    {/* <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> */}
                    Address
                  </label>
                  <div>
                    <p className="text-sm text-gray-500 font-normal">
                      {(bookingDebounce?.quote as Quote)?.destination || "N/A"}
                    </p>
                  </div>
                </div>
                {/* </div> */}

                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="appointment"
                  >
                    {/* <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> */}
                    Arrival Date <span className="text-red-600">*</span>
                  </label>
                  <div className="flex justify-between gap-2 items-center">
                    {editingField.deliveryDate ? (
                      <input
                        type="date"
                        name="deliveryDate"
                        value={
                          (booking!.quote as Quote)?.pickupDate
                            ? formatDateForInput(
                                new Date(
                                  (booking!.quote as Quote)?.deliveryDate ||
                                    formatDateForInput(new Date())
                                )
                              )
                            : formatDateForInput(new Date()) // Default to today's date
                        }
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p
                        className={`font-medium ${
                          (booking!.quote as Quote)?.deliveryDate
                            ? "text-sm text-gray-500 font-normal"
                            : "text-red-500 text-sm  font-normal"
                        }`}
                      >
                        {(booking!.quote as Quote)?.deliveryDate
                          ? new Date(
                              (booking!.quote as Quote).deliveryDate!
                            ).toLocaleDateString()
                          : "Edit Delivery Date Here..."}
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.deliveryDate
                            ? handleSave("deliveryDate")
                            : toggleEdit("deliveryDate")
                        }
                      >
                        {editingField.deliveryDate ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="deliveryTime"
                  >
                    {/* <FontAwesomeIcon icon={faClock} className="mr-2" /> */}
                    Arrival Time <span className="text-red-600">*</span>
                  </label>
                  <div className="flex justify-between gap-2 items-center">
                    {editingField.deliveryTime ? (
                      <input
                        type="time"
                        name="deliveryTime"
                        value={
                          booking!.deliveryTime
                            ? convertTo24HourFormat(booking!.deliveryTime)
                            : "00:00" // Provide a default value if deliveryTime is not set
                        }
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p
                        className={` font-medium ${
                          bookingDebounce.deliveryTime
                            ? "text-sm text-gray-500 font-normal"
                            : "text-red-500 text-sm  font-normal"
                        }`}
                      >
                        {bookingDebounce.deliveryTime
                          ? new Date(
                              `1970-01-01T${bookingDebounce.deliveryTime}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Edit Delivery Time Here..."}
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.deliveryTime
                            ? handleSave("deliveryTime")
                            : toggleEdit("deliveryTime")
                        }
                      >
                        {editingField.deliveryTime ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {/* </div> */}
              </div>

              {/* Load Details */}
              <div className=" w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl mb-8 text-rblue">
                  <FontAwesomeIcon icon={faBoxOpen} className="mr-4" />
                  Additional Details
                  {/* <p className="text-base text-gray-500 font-normal">
                  Extra Shipment Information and Coordination Overview
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                {/* <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={getStatusIcon(booking.status)}
                    className="text-primary"
                  />
                  <label
                    className="block text-primary text-base font-bold"
                    htmlFor="status"
                  >
                    Status
                  </label>
                </div>
                <p className="text-base text-gray-500 font-normal">
                  {booking.status}
                </p>
              </div> */}
                {/* <div className=" items-center justify-between py-2">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="customerReference"
                >
                  <FontAwesomeIcon icon={faHashtag} className="mr-2" />
                  Customer Reference No. <span className="text-red-600">*</span>
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote)?.notes || "N/A"}
                </p>
              </div> */}

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="commodity"
                  >
                    {/* <FontAwesomeIcon icon={faBoxOpen} className="mr-2" /> */}
                    Commodity
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(bookingDebounce.quote as Quote)?.commodity || "N/A"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="packaging"
                  >
                    {/* <FontAwesomeIcon icon={faBox} className="mr-2" /> */}
                    Packaging
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(bookingDebounce.quote as Quote)?.packaging || "N/A"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="weight"
                  >
                    {/* <FontAwesomeIcon icon={faWeightScale} className="mr-2" /> */}
                    Weight
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(bookingDebounce.quote as Quote)?.maxWeight} lb
                  </p>
                </div>

                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="total"
                  >
                    {/* <FontAwesomeIcon icon={faTruckMoving} className="mr-2" /> */}
                    Truck Type
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(bookingDebounce.quote as Quote)?.trailerType || "N/A"}
                  </p>
                </div>

                {/* </div> */}
              </div>
            </div>

            <div className="mb-10 md:flex  w-full max-w-screen mx-auto bg-white rounded-xl  md:py-6  border border-rblue md:p-0 p-6">
              {/* Carrier */}

              <div className="w-full max-w-screen mx-auto bg-white  md:px-8">
                <h2 className="text-xl mb-8 text-rblue">
                  <FontAwesomeIcon icon={faUser} className="mr-4" />
                  Carrier{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                  Details on Carrier and Assigned Driver
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className="w-full sm:w-full mb-4 sm:mb-0 ">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="carrier"
                  >
                    {/* <FontAwesomeIcon icon={faTruckFront} className="mr-2" />{" "} */}
                    Carrier Name
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="flex justify-between gap-2 items-center ">
                    {editingField.carrier ? (
                      <input
                        type="text"
                        name="carrier"
                        value={booking!.carrier || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter carrier name..."
                      />
                    ) : bookingDebounce.carrier ? (
                      <p className="text-sm text-gray-500 font-normal my-2">
                        {bookingDebounce.carrier}
                      </p>
                    ) : (
                      <p className="text-red-500 text-sm  font-normal">
                        Edit Carrier Here...
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.carrier
                            ? handleSave("carrier")
                            : toggleEdit("carrier")
                        }
                      >
                        {editingField.carrier ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-full mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-sm font-medium"
                    htmlFor="driver"
                  >
                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                    Driver
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="flex justify-between gap-2 items-center ">
                    {editingField.driver ? (
                      <input
                        type="text"
                        name="driver"
                        value={booking!.driver || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter driver's name..."
                      />
                    ) : bookingDebounce.driver ? (
                      <p className="text-sm text-gray-500 font-normal my-2">
                        {bookingDebounce.driver}
                      </p>
                    ) : (
                      <p className="text-red-500 text-sm  font-normal">
                        Edit Driver's Name Here...
                      </p>
                    )}
                    {isEditing && (
                      <button
                        className="text-white underline text-sm bg-blue-500 px-4 py-1 rounded w-1/2"
                        onClick={() =>
                          editingField.driver
                            ? handleSave("driver")
                            : toggleEdit("driver")
                        }
                      >
                        {editingField.driver ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-white"
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* </div> */}
              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl mb-8 text-rblue ">
                  <FontAwesomeIcon icon={faMoneyCheck} className="mr-4" />
                  Rate{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                  Cost and Distance Calculation Summary
                </p> */}
                </h2>

                <div className="flex flex-col sm:flex-row mb-4">
                  <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    <label
                      className="block text-primary text-base font-medium"
                      htmlFor="customerReference"
                    >
                      {/* <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> */}
                      Base Rate
                    </label>
                    <p className="text-sm text-gray-500 font-normal my-2">
                      $ {(bookingDebounce.quote as Quote)?.price || "N/A"}
                    </p>

                    <label
                      className="block text-primary text-base font-medium "
                      htmlFor="commodity"
                    >
                      {/* <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" /> */}
                      Distance (mi)
                    </label>
                    <p className="text-sm text-gray-500 font-normal my-2">
                      {(bookingDebounce.quote as Quote)?.distance || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-center max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-4">
                  {renderActionButtons()}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <QuoteRequestModal isOpen={isModalOpen} />
      </div>
    </>
  );
};

export default EditLoad;
