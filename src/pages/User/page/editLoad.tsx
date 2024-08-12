import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById, updateBookingDetails } from "../../../lib/apiCalls";
import SideBar from "../../../components/SideBar";
import { useAuthStore } from "../../../state/useAuthStore";
import QuoteRequestModal from "../../../components/QuoteRequestModal";

interface QuoteUpdate {
  trailerSize?: string;
  maxWeight?: number;
  // Add other quote fields as needed
}

interface BookingUpdate {
  origin?: string;
  price?: number;
  destination?: string;
  maxWeight?: number;
  companyName?: string;
  trailerType?: string;
  distance?: number;
  trailerSize?: string;
  commodity?: string;
  pickupDate?: string;
  deliveryDate?: string;
  notes?: string;
  packaging?: string;
  carrier?: string;
  driver?: string;
  bol?: string;
  pickupTime?: string;
  deliveryTime?: string;
  status?: string; // Add status field
  quote?: QuoteUpdate; // Include the quote property here
}

const EditLoad: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuthStore();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [formState, setFormState] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          return;
        }
        const bookingData = await fetchBookingById(id);
        setBooking(bookingData);
        setFormState(bookingData); // Initialize form state with fetched data
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (field: string) => {
    try {
      if (!id) return;

      // eslint-disable-next-line no-sparse-arrays
      const isQuoteField = [
        "trailerSize",
        "maxWeight",
        "pickupDate",
        "deliveryDate",

      ].includes(field);
      const updateData: BookingUpdate = isQuoteField
        ? { quote: { [field]: formState[field] } }
        : { [field]: formState[field] };

      await updateBookingDetails(id, updateData);

      setBooking((prevBooking: any) => ({
        ...prevBooking,
        [field]: formState[field],
      }));

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
      if (!id) return;

      let newStatus = "";
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

      await updateBookingDetails(id, { status: newStatus });

      setBooking((prevBooking: any) => ({
        ...prevBooking,
        status: newStatus,
      }));

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

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) {
      return ""; // Return an empty string if text is undefined or null
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex h-screen">
      <SideBar isAuthenticated={isAuthenticated} />
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
                      className="ml-4 text-white bg-orange-500 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event)}
                    >
                      Mark as In-Transit
                    </button>
                    <button
                      className="ml-4 text-white bg-red-600 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event, "cancel")}
                    >
                      Cancel Confirm
                    </button>
                  </>
                ) : booking.status === "In Transit" ? (
                  <>
                    <button
                      className="ml-4 text-white bg-price px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event)}
                    >
                      Mark as Delivered
                    </button>
                    <button
                      className="ml-4 text-white bg-red-600 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event, "cancel")}
                    >
                      Cancel Transit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="ml-4 text-white bg-blue-600 px-4 py-2 rounded"
                      onClick={(event) => handleConfirmBooking(event)}
                    >
                      Confirm Booking
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Pick Up Details */}
            <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto">
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
                    <p className="text-secondary text-sm font-medium">
                      {booking.companyName}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label
                    className="block text-primary text-base"
                    htmlFor="origin"
                  >
                    Facility Address
                  </label>
                  <div>
                    <p className="text-secondary text-sm font-medium">
                      {truncateText(booking.origin, 30)}
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
                        value={formState.pickupDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p className="text-secondary text-sm font-medium">
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                      onClick={() =>
                        editingField.pickupDate
                          ? handleSave("pickupDate")
                          : toggleEdit("pickupDate")
                      }
                    >
                      {editingField.pickupDate ? "Save" : "Schedule"}
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    <label
                      className="block text-primary text-base"
                      htmlFor="pickupTime"
                    >
                      Delivery Time <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-2 items-center">
                      {editingField.pickupTime ? (
                        <input
                          type="time"
                          name="pickupTime"
                          value={formState.pickupTime || ''}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="text-secondary text-sm font-medium">
                          {booking.pickupTime
                            ? new Date(`1970-01-01T${booking.pickupTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'TBA'}
                        </p>
                      )}
                      <button
                        className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                        onClick={() =>
                          editingField.pickupTime
                            ? handleSave("pickupTime")
                            : toggleEdit("pickupTime")
                        }
                      >
                        {editingField.pickupTime ? "Save" : "Schedule"}
                      </button>
                    </div>
                  </div>

              </div>
            </div>

            <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Delivery Details */}
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
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
                    <p className="text-secondary text-sm font-medium">
                      {booking.companyName}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label
                    className="block text-primary text-base"
                    htmlFor="destination"
                  >
                    Facility Address
                  </label>
                  <div>
                    <p className="text-secondary text-sm font-medium">
                      {truncateText(booking.destination, 30)}
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
                        value={formState.deliveryDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <p className="text-secondary text-sm font-medium">
                        {booking.deliveryDate ? new Date(booking.deliveryDate).toLocaleDateString() : 'TBA'}
                      </p>
                    )}
                    <button
                      className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                      onClick={() =>
                        editingField.deliveryDate
                          ? handleSave("deliveryDate")
                          : toggleEdit("deliveryDate")
                      }
                    >
                      {editingField.deliveryDate ? "Save" : "Schedule"}
                    </button>
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
                          value={formState.deliveryTime || ''}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="text-secondary text-sm font-medium">
                          {booking.deliveryTime
                            ? new Date(`1970-01-01T${booking.deliveryTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'TBA'}
                        </p>
                      )}
                      <button
                        className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                        onClick={() =>
                          editingField.deliveryTime
                            ? handleSave("deliveryTime")
                            : toggleEdit("deliveryTime")
                        }
                      >
                        {editingField.deliveryTime ? "Save" : "Schedule"}
                      </button>
                    </div>
                  </div>
                
              </div>

              

            </div>

            <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Load Details */}
            <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-4 text-secondary">Load Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base font-bold "
                    htmlFor="customerReference"
                  >
                    Customer Reference # <span className="text-red-600">*</span>
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.notes || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="commodity"
                  >
                    Commodity
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.commodity}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="packaging"
                  >
                    Packaging
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.packaging || "TBA"}
                  </p>
                  <label
                    className="block text-primary text-base mt-2"
                    htmlFor="notes"
                  >
                    Additional Notes
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.notes || "N/A"}
                  </p>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="block text-primary text-base font-bold "
                    htmlFor="weight"
                  >
                    Weight
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.maxWeight}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="total"
                  >
                    Truck Type
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.trailerType}
                  </p>
                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <p className="text-secondary text-sm font-medium">
                    {booking.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carrier */}
          <div className="w-full md:w-1/3 lg:mt-24">
            <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto">
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
                      value={formState.carrier}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p className="text-secondary text-sm font-medium">
                      {booking.carrier}
                    </p>
                  )}
                  <button
                    className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                    onClick={() =>
                      editingField.carrier
                        ? handleSave("carrier")
                        : toggleEdit("carrier")
                    }
                  >
                    {editingField.carrier ? "Save" : "Edit"}
                  </button>
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
                      value={formState.driver}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <p className="text-secondary text-sm font-medium">
                      {booking.driver}
                    </p>
                  )}
                  <button
                    className="text-blue-600 underline text-sm bg-grey px-4 py-1 rounded"
                    onClick={() =>
                      editingField.driver
                        ? handleSave("driver")
                        : toggleEdit("driver")
                    }
                  >
                    {editingField.driver ? "Save" : "Edit"}
                  </button>
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
                  <p className="text-secondary text-base font-medium">
                    $ {booking.price || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-sm font-bold "
                    htmlFor="commodity"
                  >
                    Distance
                  </label>
                  <p className="text-secondary text-base font-medium mb-4">
                    {booking.distance}
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
