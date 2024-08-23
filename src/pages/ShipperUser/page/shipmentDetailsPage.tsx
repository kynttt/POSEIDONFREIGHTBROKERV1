import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookingById } from "../../../lib/apiCalls";
import { Booking, Quote } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faBoxOpen, faBuilding, faCalendarCheck, faDollarSign, faFile, faHashtag, faLocationDot, faMapLocationDot, faNoteSticky, faTruckFront, faTruckMoving, faUser, faWeightScale } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex min-h-screen">
      <nav className="flex-1 bg-light-grey ">
        <div className="flex flex-col lg:flex-row justify-evenly w-full ">
          <div className="w-full lg:w-1/2">
            <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto ">
              <h1 className="text-2xl font-medium mb-4 mt-4 text-secondary">
                Shipment Summary
              </h1>
            </div>

            {/* Pick Up Details */}
            <div className=" p-6 w-full max-w-screen-2xl mx-auto bg-white rounded-xl md:px-12 md:py-10 shadow-lg">
              <h2 className="text-xl  mb-4 text-secondary ">Pick Up Details
              <p className="text-base text-gray-500 font-normal">Full Overview of Pickup Timing and Address</p>
              </h2>
              
              {/* <div className="flex flex-col sm:flex-row mb-4"> */}
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base  font-medium"
                  htmlFor="facilityName"
                >
                  <FontAwesomeIcon icon={faBuilding} className="mr-2"/>Facility / Company Name
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote)?.companyName || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="facilityAddress"
                >
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2"/>Facility Address
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote)?.origin || "TBA"}
                </p>
              </div>
              {/* </div> */}

              {/* <div className="flex flex-col sm:flex-row mb-4"> */}
              <div className="flex items-center justify-between py-2">
                <label
                  className="block text-primary text-base  font-medium"
                  htmlFor="appointment"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="mr-2"/>Appointment <span className="text-red-600">*</span>
                </label>
                <p className="text-gray-500 text-sm font-medium">
                  <p className="text-gray-500 text-sm font-medium">
                    <p className="text-base text-gray-500 font-normal">
                      {(booking.quote as Quote)?.pickupDate
                        ? new Date(
                            (booking.quote as Quote)?.pickupDate as
                              | string
                              | number
                              | Date
                          ).toLocaleDateString()
                        : "TBA"}
                      ,
                      {booking.pickupTime
                        ? convertTo12HourFormat(booking.pickupTime)
                        : " 08:00am - 03:00pm"}
                    </p>
                  </p>
                </p>
              </div>
              {/* </div> */}
            </div>

            {/* Delivery Details */}
            <div className="p-6 w-full max-w-screen-2xl mx-auto bg-white rounded-xl my-6 md:px-12 md:py-10 shadow-lg">
              <h2 className="text-xl  mb-4 text-secondary">Delivery Details <p className="text-base text-gray-500 font-normal">Delivery Schedule and Address Breakdown</p></h2>
              {/* <div className="flex flex-col sm:flex-row mb-4"> */}
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="facilityName"
                >
                  <FontAwesomeIcon icon={faBuilding} className="mr-2"/>Facility / Company Name
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote)?.companyName || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="facilityAddress"
                >
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2"/>Facility Address
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote)?.destination || "N/A"}
                </p>
              </div>
              {/* </div> */}

              {/* <div className="flex flex-col sm:flex-row mb-4"> */}
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base  font-medium"
                  htmlFor="appointment"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="mr-2"/>Appointment <span className="text-red-600">*</span>
                </label>
                <p className="text-gray-500 text-sm font-medium">
                  <p className="text-gray-500 text-sm font-medium">
                    <p className="text-base text-gray-500 font-normal">
                      {(() => {
                        const deliveryDate = (booking.quote as Quote)
                          ?.deliveryDate;
                        let formattedDate = "TBA";

                        if (
                          deliveryDate instanceof Date &&
                          !isNaN(deliveryDate.getTime())
                        ) {
                          formattedDate = deliveryDate.toLocaleDateString();
                        } else if (
                          typeof deliveryDate === "string" ||
                          typeof deliveryDate === "number"
                        ) {
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
              {/* </div> */}
            </div>

            {/* Additional Shipment Details */}
            <div className="p-6 w-full max-w-screen-2xl mx-auto bg-white rounded-xl my-6 md:px-12 md:py-10 shadow-lg">
              <h2 className="text-xl mb-4 text-secondary">
                Additional Shipment Details<p className="text-base text-gray-500 font-normal">Extra Shipment Information and Coordination Overview</p>
              </h2>
              {/* <div className="flex flex-col sm:flex-row mb-4"> */}
              {/* <div className="w-full sm:w-1/2 mb-4 sm:mb-0"> */}
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="customerReference"
                >
                  <FontAwesomeIcon icon={faHashtag} className="mr-2" />Customer Reference No. <span className="text-red-600">*</span>
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).notes || "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="total"
                >
                  <FontAwesomeIcon icon={faTruckMoving} className="mr-2"/>Truck Type
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).trailerType || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="commodity"
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="mr-2"/>Commodity
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).commodity || "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="packaging"
                >
                  <FontAwesomeIcon icon={faBox} className="mr-2"/>Packaging
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).packaging || "TBA"}
                </p>
              </div>

              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="notes"
                >
                  <FontAwesomeIcon icon={faNoteSticky} className="mr-2"/>Additional Notes
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).notes || "N/A"}
                </p>
              </div>

              {/* </div> */}

              <div className="flex items-center justify-between py-2 ">
                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="weight"
                >
                  <FontAwesomeIcon icon={faWeightScale} className="mr-2"/>Weight
                </label>
                <p className="text-base text-gray-500 font-normal">
                  {(booking.quote as Quote).maxWeight || "N/A"} lb
                </p>
              </div>

              {/* </div> */}
            </div>
          </div>

          {/* Carrier */}
          <div className="w-full lg:w-1/3  justify-center lg:pt-28 bg-light-grey ">
            <div className="bg-white w-full p-6 rounded-lg shadow-lg md:px-12 md:py-10">
              <h2 className="text-xl mb-6 text-secondary">Carrier <p className="text-base text-gray-500 font-normal">Details on Carrier and Assigned Driver</p></h2>

              <div className="w-full sm:w-full mb-4 sm:mb-0">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="customerReference"
                >
                  <FontAwesomeIcon icon={faTruckFront} className="mr-2" /> Carrier Name
                </label>
                <p className="text-base text-gray-500 font-normal my-2">
                  {booking.carrier || "Please wait for the confirmation..."}
                </p>

                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="commodity"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />Driver
                </label>
                <p className="text-base text-gray-500 font-normal my-2">
                  {booking.driver || "Please wait for the confirmation..."}
                </p>
              </div>
            </div>

            <div className="bg-white  p-6 rounded-lg my-6 shadow-lg md:px-12 md:py-10">
              <h2 className="text-xl mb-4 text-secondary ">Rate <p className="text-base text-gray-500 font-normal">Cost and Distance Calculation Summary</p></h2>

              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <label
                  className="block text-primary text-base font-medium"
                  htmlFor="customerReference"
                >
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />Base Rate
                </label>
                <p className="text-base text-gray-500 font-normal my-2">
                  $ {(booking.quote as Quote).price || "N/A"}
                </p>

                <label
                  className="block text-primary text-base font-medium "
                  htmlFor="commodity"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />Distance
                </label>
                <p className="text-base text-gray-500 font-normal my-2">
                  {(booking.quote as Quote).distance || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white  p-6 rounded-lg my-6 shadow-lg md:px-12 md:py-10">
              <h2 className="text-xl mb-2 text-secondary">Documents <p className="text-base text-gray-500 font-normal">Access and Review Shipment Documents</p></h2>
              <div className="flex flex-col sm:flex-row mb-4  py-4">
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
                    <FontAwesomeIcon icon={faFile} className="mr-2"/>Bill of Lading (BOL)
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
