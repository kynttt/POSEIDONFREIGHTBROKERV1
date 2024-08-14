import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById } from "../../../lib/apiCalls";
import { Booking, Quote } from "../../../utils/types";

const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${period}`;
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
            <div className="p-6 w-full max-w-screen-2xl mx-auto">
              <h2 className="text-xl mb-4 text-secondary">Pick Up Details</h2>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label className="block text-primary text-base">
                    Facility / Company Name
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.companyName || "N/A"}
                  </p>
                </div>

                <div className="w-full sm:w-1/2 sm:pl-2">
                  <label className="block text-primary text-base">
                    Facility Address
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.origin || "TBA"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label className="block text-primary text-base">
                    Appointment <span className="text-red-600">*</span>
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    {(booking.quote as Quote)?.pickupDate instanceof Date
                      ? new Date(
                          (booking.quote as Quote)?.pickupDate
                        ).toLocaleDateString()
                      : "TBA"}
                    ,
                    {booking?.pickupTime
                      ? convertTo12HourFormat(booking.pickupTime)
                      : "08:00am - 03:00pm"}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            {/* Add similar handling for other fields as done for pickup details */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ShipmentDetails;
