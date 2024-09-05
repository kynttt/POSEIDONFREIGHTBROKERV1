import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faArrowsSpin,
  faSackDollar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { fetchBookings } from "../../../lib/apiCalls"; // Assume this hook fetches the bookings data from the backend
import { Booking } from "../../../utils/types";

interface OverviewData {
  totalShipments: number;
  inTransit: number;
  revenue: number;
  delivered: number;
}

const OverviewSection: React.FC = () => {
  const [data, setData] = useState<OverviewData>({
    totalShipments: 10000, // Start total shipments at 10000
    inTransit: 100, // Start in transit at 100
    revenue: 0,
    delivered: 10000, // Start delivered shipments at 10000
  });

  useEffect(() => {
    async function loadBookings() {
      const bookings = await fetchBookings(); // Fetch bookings from the database

      // Calculate overview data
      const totalShipments = 10000 + bookings.length; // Add real data to the starting value
      const inTransit =
        100 +
        bookings.filter((booking: Booking) => booking.status === "In Transit")
          .length; // Add real data to the starting value
      const delivered =
        10000 +
        bookings.filter((booking: Booking) => booking.status === "Delivered")
          .length;
      const revenue = bookings.reduce(
        (acc: number, booking: Booking) => acc + (booking.quote?.price || 0),
        0
      );

      setData({
        totalShipments,
        inTransit,
        revenue: parseFloat(revenue.toFixed(2)), // Format revenue to 2 decimal places
        delivered,
      });
    }

    loadBookings();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8  md:mb-8">
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg">
        <div className="flex justify-start">
          <FontAwesomeIcon
            icon={faBox}
            className="text-2xl mb-2 text-gray-500"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Total Shipments</h3>
          <p className="text-2xl">
            {data.totalShipments.toLocaleString()}
          </p>{" "}
          {/* Add commas */}
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg">
        <div className="flex justify-start">
          <FontAwesomeIcon
            icon={faArrowsSpin}
            className="text-2xl mb-2 text-gray-500"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">In Transit</h3>
          <p className="text-2xl">{data.inTransit.toLocaleString()}</p>{" "}
          {/* Add commas */}
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg">
        <div className="flex justify-start">
          <FontAwesomeIcon
            icon={faSackDollar}
            className="text-2xl mb-2 text-gray-500"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Revenue</h3>
          <p className="text-2xl">
            ${" "}
            {data.revenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>{" "}
          {/* Format revenue with commas and 2 decimal places */}
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg">
        <div className="flex justify-start">
          <FontAwesomeIcon
            icon={faTruck}
            className="text-2xl mb-2 text-gray-500"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Delivered</h3>
          <p className="text-2xl">{data.delivered.toLocaleString()}</p>{" "}
          {/* Add commas */}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
