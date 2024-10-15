import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBillOfLadingByBookingId,
  fetchBookingById,
} from "../../../lib/apiCalls";
import { BillOfLadingSchema, Booking, Quote } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  // faBox,
  faBoxOpen,
  // faBuilding,
  // faCalendarCheck,
  // faDollarSign,
  faFile,
  // faHashtag,
  faLocationDot,
  // faMapLocationDot,
  faMoneyCheck,
  // faNoteSticky,
  faTruck,
  // faTruckFront,
  // faTruckMoving,
  faUser,
  // faWeightScale,
} from "@fortawesome/free-solid-svg-icons";

const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [billOfLading, setBillOfLading] = useState<BillOfLadingSchema | null>(
    null
  );
  // const [blobUrl, setBlobUrl] = useState<string | null>(null);

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

        const response = await fetchBillOfLadingByBookingId(id);

        setBillOfLading(response);

        // if (Array.isArray(response) && response.length > 0) {
        //   const responseData = response[0];
        //   if (responseData.pdfDocument && responseData.pdfDocument.data) {
        //     const pdfBuffer = responseData.pdfDocument.data;
        //     const binaryData = new Uint8Array(pdfBuffer);
        //     const blob = new Blob([binaryData], { type: "application/pdf" });
        //     const url = URL.createObjectURL(blob);
        //     setBlobUrl(url);
        //   } else {
        //     throw new Error("PDF data not found in the response");
        //   }
        // } else {
        //   throw new Error("Unexpected response format");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetail();

    // return () => {
    //   if (blobUrl) {
    //     URL.revokeObjectURL(blobUrl);
    //   }
    // };
  }, [id]);

  const handleViewBillOfLading = () => {
    // if (blobUrl) {
    //   window.open(blobUrl, "_blank");
    // }
    if (billOfLading) {
      // console.log(`${JSON.stringify(billOfLading.file)}`);
      window.open(
        `${process.env.REACT_APP_SERVER_URL}/api/folders/${billOfLading.file.folder}/files/${billOfLading.file.id}/view`,
        `${billOfLading.file.name}`
      );
    }
  };

  // const handleConfirmBooking = () => {
  //     navigate('/booking-successful');
  // };

  if (loading)
    return <p className="text-gray-500">Loading booking details...</p>;

  if (!booking) return <p className="text-gray-500">No booking found.</p>;

  return (
    <div className="flex min-h-screen">
      <nav className="flex-1 bg-blue-50 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-evenly w-full gap-8">
          <div className="w-full p-2">
            <div className="bg-blue-50 p-6 w-full max-w-screen mx-auto ">
              <h1 className="text-2xl font-large  mt-4 text-rblue">
                Shipment Summary
              </h1>
            </div>

            <div className="md:flex items-center justify-between bg-blue-50 p-6 w-full max-w-screen mx-auto ">
              <h1 className="md:text-2xl text-lg font-medium mb-4 mt-4 text-rblue">
                Shipment Reference: {booking.bookingRef}
              </h1>
              <p className="flex items-center text-rblue">
                Status{" "}
                <p className="px-8 py-2 my-4 border border-blue-500  text-blue-500 rounded-3xl mx-6">
                  {" "}
                  {booking.status}
                </p>
              </p>
              <p className="text-rblue font-normal">
                Last Updated:{" "}
                {booking.updatedAt
                  ? new Date(booking.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div className="mb-10 md:flex  w-full max-w-screen mx-auto bg-white rounded-xl  md:py-6  border border-rblue md:p-0 p-6">
              {/* Pick Up Details */}
              <div className="  w-full max-w-screen mx-auto bg-white  md:px-8 ">
                <h2 className="text-xl  mb-8 text-rblue ">
                  <FontAwesomeIcon icon={faTruck} className="mr-4" />
                  Shipment
                  {/* <p className="text-base text-gray-500 font-normal">
                            Full Overview of Pickup Timing and Address
                            </p> */}
                </h2>

                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="appointment"
                  >
                    {/* <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> */}
                    Appointment
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <p className="text-gray-500 text-sm font-medium ">
                    <p className="text-gray-500 text-sm font-medium">
                      <p className="text-sm text-gray-500 font-normal">
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

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="facilityName"
                  >
                    {/* <FontAwesomeIcon icon={faBuilding} className="mr-2" /> */}
                    Facility / Company Name
                  </label>
                  <p className="text-sm text-gray-500 font-normal ">
                    {(booking.quote as Quote)?.companyName || "N/A"}
                  </p>
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
                    {typeof booking.createdBy === "object" &&
                    booking.createdBy.id
                      ? booking.createdBy.id
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Pick Up Details */}
              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
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
                    {typeof booking.createdBy === "object" &&
                    booking.createdBy.name
                      ? booking.createdBy.name
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
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote)?.origin || "TBA"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="notes"
                  >
                    {/* <FontAwesomeIcon icon={faNoteSticky} className="mr-2" /> */}
                    Additional Notes
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote).notes || "N/A"}
                  </p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className=" w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl  mb-8 text-rblue">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-4" />
                  Drop-off{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                                Delivery Schedule and Address Breakdown
                                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="facilityName"
                  >
                    {/* <FontAwesomeIcon icon={faBuilding} className="mr-2" /> */}
                    Consignee
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote)?.companyName || "N/A"}
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
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote)?.destination || "N/A"}
                  </p>
                </div>
                {/* </div> */}

                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base  font-medium"
                    htmlFor="appointment"
                  >
                    {/* <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> */}
                    Arrival Date/Time
                    {/* <span className="text-red-600">*</span> */}
                  </label>
                  <p className="text-gray-500 text-sm font-medium">
                    <p className="text-gray-500 text-sm font-medium">
                      <p className="text-sm text-gray-500 font-normal">
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
              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl mb-8 text-rblue">
                  <FontAwesomeIcon icon={faBoxOpen} className="mr-4" />
                  Additional Details
                  {/* <p className="text-base text-gray-500 font-normal">
                  Extra Shipment Information and Coordination Overview
                </p> */}
                </h2>
                {/* <div className="flex flex-col sm:flex-row mb-4"> */}
                {/* <div className="w-full sm:w-1/2 mb-4 sm:mb-0"> */}

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="total"
                  >
                    {/* <FontAwesomeIcon icon={faTruckMoving} className="mr-2" /> */}
                    Truck Type
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote).trailerType || "N/A"}
                  </p>
                </div>

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="commodity"
                  >
                    {/* <FontAwesomeIcon icon={faBoxOpen} className="mr-2" /> */}
                    Commodity
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote).commodity || "N/A"}
                  </p>
                </div>
                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="packaging"
                  >
                    {/* <FontAwesomeIcon icon={faBox} className="mr-2" /> */}
                    Packaging
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote).packaging || "TBA"}
                  </p>
                </div>

                {/* </div> */}

                <div className=" items-center justify-between py-2 ">
                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="weight"
                  >
                    {/* <FontAwesomeIcon icon={faWeightScale} className="mr-2" /> */}
                    Weight
                  </label>
                  <p className="text-sm text-gray-500 font-normal">
                    {(booking.quote as Quote).maxWeight || "N/A"} lb
                  </p>
                </div>
              </div>

              {/* </div> */}
            </div>

            <div className="mb-10 md:flex  w-full max-w-screen mx-auto bg-white rounded-xl  md:py-6  border border-rblue md:p-0 p-6">
              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 ">
                <h2 className="text-xl mb-8 text-rblue">
                  <FontAwesomeIcon icon={faUser} className="mr-4" />
                  Carrier{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                                    Details on Carrier and Assigned Driver
                                </p> */}
                </h2>

                <div className="w-full sm:w-full mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="customerReference"
                  >
                    {/* <FontAwesomeIcon icon={faTruckFront} className="mr-2" />{" "} */}
                    Carrier Name
                  </label>
                  <p className="text-sm text-gray-500 font-normal my-2">
                    {booking.carrier || "Please wait for the confirmation..."}
                  </p>

                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="commodity"
                  >
                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                    Driver
                  </label>
                  <p className="text-sm text-gray-500 font-normal my-2">
                    {booking.driver || "Please wait for the confirmation..."}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl mb-8 text-rblue ">
                  <FontAwesomeIcon icon={faMoneyCheck} className="mr-4" />
                  Rate{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                                    Cost and Distance Calculation Summary
                                </p> */}
                </h2>

                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    className="block text-primary text-base font-medium"
                    htmlFor="customerReference"
                  >
                    {/* <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> */}
                    Base Rate
                  </label>
                  <p className="text-sm text-gray-500 font-normal my-2">
                    $ {(booking.quote as Quote).price || "N/A"}
                  </p>

                  <label
                    className="block text-primary text-base font-medium "
                    htmlFor="commodity"
                  >
                    {/* <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" /> */}
                    Distance
                  </label>
                  <p className="text-sm text-gray-500 font-normal my-2">
                    {(booking.quote as Quote).distance || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-screen mx-auto bg-white  md:px-8 md:border-l border-t md:border-t-0 pt-4 md:pt-0">
                <h2 className="text-xl mb-8 text-rblue">
                  Documents{" "}
                  {/* <p className="text-base text-gray-500 font-normal">
                                    Access and Review Shipment Documents
                                </p> */}
                </h2>
                <div className="flex flex-col justify-center sm:flex-row mb-4  py-4">
                  <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    {billOfLading ? (
                      <button
                        onClick={handleViewBillOfLading}
                        className="block text-primary text-sm font-bold p-2 rounded-md bg-blue-500 text-white cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="mr-2"
                        />
                        View Bill of Lading (BOL)
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleBillOfLadingClick}
                          className={`block text-primary text-sm font-bold p-2 rounded-md ${
                            booking.status === "Pending"
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-blue-500 text-white cursor-pointer"
                          }`}
                          disabled={booking.status === "Pending"}
                        >
                          <FontAwesomeIcon icon={faFile} className="mr-2" />
                          Generate Bill of Lading (BOL)
                        </button>
                        <p className="text-xs text-gray-400 font-light">
                          * Please review this information once our dispatcher
                          has confirmed the shipment.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carrier
          <div className="w-full lg:w-1/3  justify-center lg:pt-28 bg-blue-50 ">
            
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default ShipmentDetails;
