import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById, updateBookingDetails } from "../../../lib/apiCalls";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import { Booking, Quote } from "../../../utils/types";
import { formatDateForInput } from "../../../utils/helpers";

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
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

      if (newStatus === "Confirmed") {
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
    <div className="flex h-screen md:mt-12">
      <nav className="flex-1 bg-white overflow-y-auto lg:px-20">
        <div className="flex flex-col lg:flex-row justify-evenly w-full gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
              <div className="md:flex items-center">
                <h1 className="text-2xl font-medium  text-secondary mr-auto my-2">
                  Shipment Summary
                </h1>
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

            {/* Pick Up Details */}
            <div className=" p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-4 text-secondary">Pick Up Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="companyName"
                  >
                    Facility / Company Name
                  </label>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {(booking?.quote as Quote)?.companyName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 ">
                  <label
                    className="block text-primary text-base"
                    htmlFor="origin"
                  >
                    Facility Address
                  </label>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {(booking?.quote as Quote)?.origin || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="pickupDate"
                  >
                    Appointment
                  </label>
                  <div className="flex gap-2 items-center">
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
                      <p className="text-gray-500 text-sm font-medium">
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
                        className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                        onClick={() =>
                          editingField.pickupDate
                            ? handleSave("pickupDate")
                            : toggleEdit("pickupDate")
                        }
                      >
                        {editingField.pickupDate ? "Save" : "Edit Date"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="pickupTime"
                  >
                    Pick Up Time <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    {editingField.pickupTime ? (
                      <input
                      type="time"
                      name="pickupTime"
                      value={
                        booking.pickupTime
                          ? new Date(`1970-01-01T${convertTo24HourFormat(booking.pickupTime)}`).toISOString().slice(11, 16)
                          : "TBA"
                      }
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    
                    ) : (
                      <p className="text-gray-500 text-sm font-medium">
                        {booking.pickupTime
                          ? new Date(
                              `1970-01-01T${booking.pickupTime}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "TBA"}
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
                        {editingField.pickupTime ? "Save" : "Edit Time"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Delivery Details */}
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto ">
              <h2 className="text-xl mb-4 text-secondary">Delivery Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="destinationCompanyName"
                  >
                    Facility / Company Name
                  </label>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {(booking?.quote as Quote)?.companyName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="block text-primary text-base"
                    htmlFor="destination"
                  >
                    Facility Address
                  </label>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {(booking?.quote as Quote)?.destination || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="deliveryDate"
                  >
                    Appointment <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
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
                      <p className="text-gray-500 text-sm font-medium">
                        {(booking.quote as Quote)?.deliveryDate
                          ? new Date(
                              (booking.quote as Quote).deliveryDate!
                            ).toLocaleDateString()
                          : "TBA"}
                      </p>
                    )}
                    {booking.status === "Pending" && (
                      <button
                        className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                        onClick={() =>
                          editingField.deliveryDate
                            ? handleSave("deliveryDate")
                            : toggleEdit("deliveryDate")
                        }
                      >
                        {editingField.deliveryDate ? "Save" : "Edit Date"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="deliveryTime"
                  >
                    Delivery Time <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
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
                      <p className="text-gray-500 text-sm font-medium">
                        {booking.deliveryTime
                          ? new Date(
                              `1970-01-01T${booking.deliveryTime}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "TBA"}
                      </p>
                    )}
                    {booking.status === "Pending" && (
                      <button
                        className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                        onClick={() =>
                          editingField.deliveryTime
                            ? handleSave("deliveryTime")
                            : toggleEdit("deliveryTime")
                        }
                      >
                        {editingField.deliveryTime ? "Save" : "Edit Time"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Load Details */}
            <div className=" p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-4 text-secondary">Load Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base font-bold "
                    htmlFor="customerReference"
                  >
                    Customer Reference # <span className="text-red-600">*</span>
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.notes || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="commodity"
                  >
                    Commodity
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.commodity || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="packaging"
                  >
                    Packaging
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.packaging || "N/A"}
                  </p>
                  <label
                    className="block text-primary text-base mt-2"
                    htmlFor="notes"
                  >
                    Additional Notes
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.notes || "N/A"}
                  </p>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="block text-primary text-base font-bold "
                    htmlFor="weight"
                  >
                    Weight
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.maxWeight} lb
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="total"
                  >
                    Truck Type
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.trailerType || "N/A"}
                  </p>
                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {booking.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carrier */}
          <div className="w-full md:w-1/3 lg:mt-24 ">
            <div className="px-6 md:px-6 md:pt-2 w-full max-w-screen-2xl mx-auto border-b">
              <h2 className="text-xl mb-4 text-secondary">Carrier</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base"
                    htmlFor="carrier"
                  >
                    Carrier Name <span className="text-red-600">*</span>
                  </label>
                  {editingField.carrier ? (
                    <input
                      type="text"
                      name="carrier"
                      value={booking.carrier || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm font-medium">
                      {booking.carrier}
                    </p>
                  )}
                  {booking.status === "Pending" && (
                    <button
                      className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                      onClick={() =>
                        editingField.carrier
                          ? handleSave("carrier")
                          : toggleEdit("carrier")
                      }
                    >
                      {editingField.carrier ? "Save" : "Edit Carrier"}
                    </button>
                  )}
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label
                    className="block text-primary text-base"
                    htmlFor="driver"
                  >
                    Driver <span className="text-red-600">*</span>
                  </label>
                  {editingField.driver ? (
                    <input
                      type="text"
                      name="driver"
                      value={booking.driver || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm font-medium">
                      {booking.driver}
                    </p>
                  )}
                  {booking.status === "Pending" && (
                    <button
                      className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                      onClick={() =>
                        editingField.driver
                          ? handleSave("driver")
                          : toggleEdit("driver")
                      }
                    >
                      {editingField.driver ? "Save" : "Edit Driver"}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-sm font-bold"
                    htmlFor="customerReference"
                  >
                    Base Rate
                  </label>
                  <p className="text-price text-base font-medium">
                    $ {(booking.quote as Quote)?.price || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-sm font-bold "
                    htmlFor="commodity"
                  >
                    Distance
                  </label>
                  <p className="text-gray-500 text-base font-medium mb-4">
                    {(booking.quote as Quote)?.distance || "N/A"} miles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <QuoteRequestModal isOpen={isModalOpen} />
    </div>
  );
};

export default EditLoad;
