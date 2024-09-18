import { useState, useEffect, useCallback } from "react";
import ShipperBookings from "../components/shipperBookings";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Booking, Quote } from "../../../utils/types";
import { fetchUserBookings } from "../../../lib/apiCalls";

interface ProcessedDataInterface {
  date: string;
  count: number;
  totalMiles: number;
}
const ShipperDashboardPage = () => {
  const [totalLoadsData, setTotalLoadsData] = useState<
    ProcessedDataInterface[]
  >([]);
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
    Pending: 0,
    Confirmed: 0,
    "In Transit": 0,
    Delivered: 0,
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]); // State to store all bookings
  const [, setFilteredBookings] = useState<Booking[]>([]); // State to store filtered bookings

  const fetchBookings = useCallback(async () => {
    try {
      const bookingsData = await fetchUserBookings();

      // Conversion factor from feet to miles
      const FEET_TO_MILES_CONVERSION = 5280;

      // Object to store date-wise counts and total miles
      const dateCounts: {
        [date: string]: { count: number; totalMiles: number };
      } = {};

      bookingsData.forEach((booking: Booking) => {
        if (isQuote(booking.quote)) {
          const quote = booking.quote as Quote;
          const date = new Date(quote.pickupDate).toLocaleDateString(); // Extract date
          // let distanceStr = quote.distance || "0"; // Default to '0' if undefined
          const unit = quote.unit || "miles"; // Default to 'miles' if undefined

          // Sanitize distanceStr: Remove commas and any other non-numeric characters except the decimal point
          // distanceStr = distanceStr.replace(/[^0-9.]/g, "");

          // Convert distance to a number
          const distance = quote.distance || 0;

          // Convert to miles if the unit is feet
          const miles =
            unit === "feet" ? distance / FEET_TO_MILES_CONVERSION : distance;

          // If this date isn't in the object yet, initialize it
          if (!dateCounts[date]) {
            dateCounts[date] = { count: 0, totalMiles: 0 };
          }

          // Increment the count and total miles for this date
          dateCounts[date].count += 1;
          dateCounts[date].totalMiles += miles;
        }
      });

      // Convert the dateCounts object to an array format for the chart
      const processedData = Object.keys(dateCounts).map((date) => ({
        date,
        count: dateCounts[date].count,
        totalMiles: dateCounts[date].totalMiles,
      }));

      setTotalLoadsData(processedData);

      // Count bookings by status
      const statusCounts = bookingsData.reduce(
        (acc: { [key: string]: number }, booking: Booking) => {
          const status = booking.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        {}
      );

      setStatusCounts(statusCounts);
      setAllBookings(bookingsData); // Set all bookings
      setFilteredBookings(bookingsData); // Initialize filtered bookings
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const isQuote = (quote: string | Quote): quote is Quote => {
    return typeof quote !== "string";
  };

  // Handler to track the selected date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // // Filter bookings by selected date
  // const handleFilterClick = () => {
  //   if (selectedDate) {
  //     const filtered = allBookings.filter((booking) => {
  //       if (isQuote(booking.quote)) {
  //         return (
  //           new Date(booking.quote.pickupDate).toISOString().split("T")[0] ===
  //           selectedDate
  //         );
  //       }
  //       return false;
  //     });
  //     setFilteredBookings(filtered);
  //   }
  // };

  // Clear the filter and show all bookings
  const handleClearFilterClick = () => {
    setSelectedDate(null);
    setFilteredBookings(allBookings); // Reset to all bookings
  };

  return (
    <div className="bg-white h-full flex flex-col md:flex-row mt-6">
      <div className="flex-1 p-4 md:p-6 bg-[#FAF6FE] overflow-y-auto lg:px-20">
        <h1 className="text-2xl font-bold mb-4 text-gray-500">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Overview</h2>

          <div className="grid lg:w-1/2 grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Search Pickup Date
              </label>
              <input
                type="date"
                id="startDate"
                className="border border-secondary bg-white rounded-lg p-2 text-sm text-gray-500"
                value={selectedDate || ""} // Set input value
                onChange={handleDateChange} // Update the selected date
              />
            </div>

            {/* Filter and Clear Filter Buttons */}
            <div className="flex items-end gap-4">
              {/* <button
                onClick={handleFilterClick}
                className="bg-primary text-white rounded-lg px-4 py-2 text-sm"
              >
                Filter
              </button> */}
              <button
                onClick={handleClearFilterClick}
                className="bg-gray-400 text-white rounded-lg px-4 py-2 text-sm"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-light-grey p-4 rounded-lg shadow text-center flex-1">
              <p className="text-gray-600 font-semibold text-primary">
                Total Miles Per Day
              </p>
              <div className="w-full h-60">
                {totalLoadsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={totalLoadsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="totalMiles"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {["Pending", "Confirmed", "In Transit", "Delivered"].map(
                (status) => (
                  <div
                    key={status}
                    className="bg-light-grey p-4 rounded-lg shadow text-center border border-gray-200"
                  >
                    <p className="text-gray-600 text-left font-medium text-primary text-base sm:text-lg md:text-xl">
                      {status}
                    </p>
                    <h3 className="text-2xl text-left sm:text-3xl md:text-2xl font-bold text-secondary">
                      {statusCounts[status] || 0}{" "}
                      {/* Display the count or 0 if no data */}
                    </h3>
                  </div>
                )
              )}
            </div>

            {/* Daily Booking Analytics */}
            <div className="bg-light-grey rounded-lg shadow p-4 md:p-6 flex-1">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Daily Booking Analytics
              </h2>
              <div className="w-full h-60">
                {totalLoadsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={totalLoadsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ShipperBookings
          onDataFetched={fetchBookings}
          selectedDate={selectedDate}
        />{" "}
        {/* Pass selectedDate to ShipperBookings */}
      </div>
    </div>
  );
};

export default ShipperDashboardPage;
