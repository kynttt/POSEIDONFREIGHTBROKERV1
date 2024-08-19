import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookingById } from "../../../lib/apiCalls";
import { Booking, Quote } from "../../../utils/types";

const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const truncateText = (text: string, maxLength: number): string => {
  //     if (text.length <= maxLength) {
  //         return text;
  //     }
  //     return `${text.slice(0, maxLength)}...`;
  // };

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // Convert '0' hour to '12' and make sure '12' remains '12'

    return `${hour}:${minutes} ${period}`;
  };

  const handleBillOfLadingClick = () => {
    navigate(`/bill-of-lading/${id}`); // Navigate to /bill-of-lading
  };

  useEffect(() => {
    const fetchBookingDetail = async () => {
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

    fetchBookingDetail();
  }, [id]);

  // const handleConfirmBooking = () => {
  //     navigate('/booking-successful');
  // };

  if (loading)
    return <p className="text-gray-500">Loading booking details...</p>;

  if (!booking) return <p className="text-gray-500">No booking found.</p>;

  return (
    <div className="flex h-screen">
      <nav className="flex-1 bg-white overflow-y-auto lg:px-20">
        <div className="flex flex-col lg:flex-row justify-evenly w-full ">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
              <h1 className="text-2xl font-medium mb-8 mt-4 text-secondary">
                Shipment Summary
              </h1>
            </div>

            {/* Pick Up Details */}
            <div className=" p-6 w-full max-w-screen-2xl mx-auto ">
              <h2 className="text-xl  mb-4 text-secondary">Pick Up Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base  "
                    htmlFor="facilityName"
                  >
                    Facility / Company Name
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.companyName || "N/A"}
                  </p>
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label
                    className="block text-primary text-base "
                    htmlFor="facilityAddress"
                  >
                    Facility Address
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.origin || "TBA"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base  "
                    htmlFor="appointment"
                  >
                    Appointment <span className="text-red-600">*</span>
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
  {(() => {
    const pickupDate = (booking.quote as Quote)?.pickupDate;
    let formattedDate = "TBA";

    if (pickupDate instanceof Date && !isNaN(pickupDate.getTime())) {
      formattedDate = pickupDate.toLocaleDateString();
    } else if (typeof pickupDate === 'string') {
      const parsedDate = new Date(pickupDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleDateString();
      }
    }

    const formattedTime = booking.pickupTime
      ? convertTo12HourFormat(booking.pickupTime)
      : "08:00am - 03:00pm";

    return `${formattedDate}, ${formattedTime}`;
  })()}
</p>

                </div>
              </div>
            </div>

            <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Delivery Details */}
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
              <h2 className="text-xl  mb-4 text-secondary">Delivery Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base "
                    htmlFor="facilityName"
                  >
                    Facility / Company Name
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.companyName || "N/A"}
                  </p>
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label
                    className="block text-primary text-base "
                    htmlFor="facilityAddress"
                  >
                    Facility Address
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.destination || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base  "
                    htmlFor="appointment"
                  >
                    Appointment <span className="text-red-600">*</span>
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    <p className="text-gray-500 text-sm font-medium">
                    <p className="text-gray-500 text-sm font-medium">
  {(() => {
    const deliveryDate = (booking.quote as Quote)?.deliveryDate;
    let formattedDate = "TBA";

    if (deliveryDate instanceof Date && !isNaN(deliveryDate.getTime())) {
      formattedDate = deliveryDate.toLocaleDateString();
    } else if (typeof deliveryDate === 'string' || typeof deliveryDate === 'number') {
      const parsedDate = new Date(deliveryDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleDateString();
      }
    }

    const formattedTime = booking.deliveryTime
      ? convertTo12HourFormat(booking.deliveryTime)
      : "08:00am - 03:00pm";

    return `${formattedDate}, ${formattedTime}`;
  })()}
</p>

                    </p>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Shipment Details */}
            <div className=" p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-4 text-secondary">
                Additional Shipment Details
              </h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base font-bold "
                    htmlFor="customerReference"
                  >
                    Customer Reference # <span className="text-red-600">*</span>
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote).notes || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="commodity"
                  >
                    Commodity
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote).commodity || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="packaging"
                  >
                    Packaging
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote).packaging || "TBA"}
                  </p>
                  <label
                    className="block text-primary text-base mt-2"
                    htmlFor="notes"
                  >
                    Additional Notes
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote).notes || "N/A"}
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
                    {(booking.quote as Quote).maxWeight || "N/A"} lb
                  </p>

                  <label
                    className="block text-primary text-base font-bold mt-2"
                    htmlFor="total"
                  >
                    Truck Type
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote).trailerType || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carrier */}
          <div className="w-full lg:w-1/3 flex justify-center lg:pt-32 bg-white ">
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-2 text-secondary">Carrier</h2>
              <div className="flex flex-col sm:flex-row mb-4 border-b py-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-sm font-bold "
                    htmlFor="customerReference"
                  >
                    Carrier Name
                  </label>
                  <p className="text-gray-500 text-base font-medium">
                    {booking.carrier || "TBA"}
                  </p>

                  <label
                    className="block text-primary text-sm font-bold "
                    htmlFor="commodity"
                  >
                    Driver
                  </label>
                  <p className="text-gray-500 text-base font-medium">
                    {booking.driver || "TBA"}
                  </p>
                </div>
              </div>

              <h2 className="text-xl mb-4 text-secondary ">Rate</h2>
              <div className="flex flex-col sm:flex-row mb-4 border-b">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-sm font-bold"
                    htmlFor="customerReference"
                  >
                    Base Rate
                  </label>
                  <p className="text-price text-base font-medium">
                    $ {(booking.quote as Quote).price || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-sm font-bold "
                    htmlFor="commodity"
                  >
                    Distance
                  </label>
                  <p className="text-gray-500 text-base font-medium mb-4">
                    {(booking.quote as Quote).distance || "N/A"}
                  </p>
                </div>
              </div>

              <h2 className="text-xl mb-2 text-secondary">Documents</h2>
              <div className="flex flex-col sm:flex-row mb-4 border-b py-4">
                <div
                  onClick={handleBillOfLadingClick}
                  className="w-full sm:w-1/2 mb-4 sm:mb-0"
                >
                  <button
                    className={`block text-primary text-sm font-bold p-2 rounded-md ${
                      booking.status === "Pending"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-secondary text-white cursor-pointer"
                    }`}
                    disabled={booking.status === "Pending"}
                  >
                    Bill of Lading (BOL)
                  </button>
                  {/* <p className='text-gray-500 text-base font-medium'>{booking.bol || 'N/A'}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ShipmentDetails;
