import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById, updateBookingDetails } from "../../../lib/apiCalls";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import { Booking, Quote } from "../../../utils/types";
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

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<{ [key: string]: boolean }>(
    {}
  );
  // const [formState, setFormState] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "Pending":
  //       return faClock;
  //     case "Confirmed":
  //       return faCalendarCheck;
  //     case "In Transit":
  //       return faTruckFast;
  //     case "Delivered":
  //       return faCircleCheck;
  //     default:
  //       return faQuestionCircle;
  //   }
  // };
  const [isAllPrepared, setIsAllPrepared] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          return;
        }
        const bookingData = await fetchBookingById(id);
        setBooking(bookingData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const toggleEdit = (field: string) => {
    setEditingField((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    if (!booking) return;

    const { pickupDate, deliveryDate } = booking.quote as Quote;

    const { pickupTime, deliveryTime, carrier, driver } = booking;

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
  }, [booking, editingField, isAllPrepared]);

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
      if (!id || !booking) return;

      await updateBookingDetails(id, booking);

      setBooking((prevBooking) => {
        if (!prevBooking) return prevBooking;
        return {
          ...prevBooking,
          [field]: booking?.[field as keyof Booking],
        };
      });

      setEditingField((prevState) => ({ ...prevState, [field]: false }));
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };
  const handleConfirmBooking = async (
    _event: React.MouseEvent<HTMLButtonElement>,
    action = "default"
  ) => {
    try {
      if (!booking) return;
      if (!id) return;

      // console.log("Action:", action);

      let newStatus: Booking["status"]; // Ensure newStatus matches the expected type

      if (action === "cancel" && booking.status === "In Transit") {
        newStatus = "Confirmed"; // Revert to Confirmed status when canceling transit
      } else if (action === "cancel" && booking.status === "Confirmed") {
        newStatus = "Pending"; // Set status to Pending when canceling confirm
      } else {
        switch (booking.status) {
          case "Confirmed":
            newStatus = "In Transit";
            break;
          case "In Transit":
            newStatus = "Delivered";
            break;
          case "Pending":
          default:
            newStatus = "Confirmed";
        }
      }

      await updateBookingDetails(id, {
        ...booking,
        status: newStatus,
      });

      setBooking((prevBooking) => {
        if (!prevBooking) return null;

        return {
          ...prevBooking,
          status: newStatus,
        };
      });

      if (action !== "cancel" && newStatus === "Confirmed") {
        setIsModalOpen(true); // Open the modal only if confirming the booking
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (loading)
    return <p className="text-gray-500">Loading booking details...</p>;

  if (!booking) return <p className="text-gray-500">No booking found.</p>;

  // const truncateText = (text: string | undefined, maxLength: number) => {
  //   if (!text) {
  //     return ""; // Return an empty string if text is undefined or null
  //   }
  //   if (text.length > maxLength) {
  //     return text.slice(0, maxLength) + "...";
  //   }
  //   return text;
  // };

  return (
    <div className="flex min-h-screen md:mt-12 ">
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
                            Shipment Reference: {booking.bookingRef}
                            </h1>
                            <p className="flex items-center text-rblue">Status <p className="px-8 py-2 my-4 border border-blue-500  text-blue-500 rounded-3xl mx-6"> {booking.status} 
                                </p></p>
                            <p className="text-rblue font-normal">Last Updated: {booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : "N/A"}</p>
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
                    {(booking?.quote as Quote)?.companyName || "N/A"}
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
                                        {typeof booking.createdBy === 'object' && booking.createdBy._id ? booking.createdBy._id : "N/A"}
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
                  {(booking.quote as Quote)?.notes || "N/A"}
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
                                    {typeof booking.createdBy === 'object' && booking.createdBy.name ? booking.createdBy.name : "N/A"}
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
                    {(booking?.quote as Quote)?.origin || "N/A"}
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
                        (booking.quote as Quote)?.pickupDate
                          ? formatDateForInput(
                              new Date((booking.quote as Quote)?.pickupDate)
                            )
                          : formatDateForInput(new Date()) // Default to today's date
                      }
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 font-normal">
                      {/* {new Date(booking.pickupDate).toLocaleDateString()} */}
                      {(booking.quote as Quote)?.pickupDate
                        ? new Date(
                            (booking.quote as Quote)?.pickupDate
                          ).toLocaleDateString()
                        : "TBA"}
                    </p>
                  )}
                  {booking.status === "Pending" && (
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
                    {(booking?.quote as Quote)?.companyName || "N/A"}
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
                    {(booking?.quote as Quote)?.destination || "N/A"}
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
                        (booking.quote as Quote)?.pickupDate
                          ? formatDateForInput(
                              new Date(
                                (booking.quote as Quote)?.deliveryDate ||
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
                        (booking.quote as Quote)?.deliveryDate
                          ? "text-sm text-gray-500 font-normal"
                          : "text-red-500 text-sm  font-normal"
                      }`}
                    >
                      {(booking.quote as Quote)?.deliveryDate
                        ? new Date(
                            (booking.quote as Quote).deliveryDate!
                          ).toLocaleDateString()
                        : "Edit Delivery Date Here..."}
                    </p>
                  )}
                  {booking.status === "Pending" && (
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
                        booking.deliveryTime
                          ? convertTo24HourFormat(booking.deliveryTime)
                          : "00:00" // Provide a default value if deliveryTime is not set
                      }
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p
                      className={` font-medium ${
                        booking.deliveryTime
                          ? "text-sm text-gray-500 font-normal"
                          : "text-red-500 text-sm  font-normal"
                      }`}
                    >
                      {booking.deliveryTime
                        ? new Date(
                            `1970-01-01T${booking.deliveryTime}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Edit Delivery Time Here..."}
                    </p>
                  )}
                  {booking.status === "Pending" && (
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
                  {(booking.quote as Quote)?.commodity || "N/A"}
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
                  {(booking.quote as Quote)?.packaging || "N/A"}
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
                  {(booking.quote as Quote)?.maxWeight} lb
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
                  {(booking.quote as Quote)?.trailerType || "N/A"}
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
                      value={booking.carrier || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter carrier name..."
                    />
                  ) : booking.carrier ? (
                    <p className="text-sm text-gray-500 font-normal my-2">
                      {booking.carrier}
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm  font-normal">
                      Edit Carrier Here...
                    </p>
                  )}
                  {booking.status === "Pending" && (
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
                      value={booking.driver || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter driver's name..."
                    />
                  ) : booking.driver ? (
                    <p className="text-sm text-gray-500 font-normal my-2">
                      {booking.driver}
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm  font-normal">
                      Edit Driver's Name Here...
                    </p>
                  )}
                  {booking.status === "Pending" && (
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
            <FontAwesomeIcon icon={faMoneyCheck} className="mr-4"/>
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
                    $ {(booking.quote as Quote)?.price || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="commodity"
                  >
                    {/* <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" /> */}
                    Distance (mi)
                  </label>
                  <p className="text-sm text-gray-500 font-normal my-2">
                    {(booking.quote as Quote)?.distance || "N/A"}
                  </p>
                </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-center max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
              {booking.status === "Delivered" ? (
                  <h2 className="text-2xl font-medium text-price">
                    Successfully delivered!
                  </h2>
                ) : booking.status === "Confirmed" ? (
                  <>
                    <button
                      className="text-sm ml-4 text-white bg-orange-500 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event)}
                    >
                      Mark as In-Transit
                    </button>
                    <button
                      className="text-sm ml-4 text-white bg-red-600 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event, "cancel")}
                    >
                      Cancel Confirmation
                    </button>
                  </>
                ) : booking.status === "In Transit" ? (
                  <>
                    <button
                      className="text-sm ml-4 text-white bg-price px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event)}
                    >
                      Mark as Delivered
                    </button>
                    <button
                      className="text-sm ml-4 text-white bg-red-600 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event, "cancel")}
                    >
                      Cancel Transit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`px-4 py-2 bg-blue-600 text-white rounded ${
                        isAllPrepared
                          ? "cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={handleConfirmBooking}
                      disabled={!isAllPrepared}
                    >
                      Confirm Booking
                    </button>
                  </>
                )}

            </div>
            </div>

            
          
        </div>
      </nav>
      <QuoteRequestModal isOpen={isModalOpen} />
    </div>
  );
};

export default EditLoad;
