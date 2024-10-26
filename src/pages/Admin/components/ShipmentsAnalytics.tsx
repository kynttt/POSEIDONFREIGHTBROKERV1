import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchBookings } from "../../../lib/apiCalls"; // Function to fetch bookings data
import dayjs from "dayjs"; // For date manipulation
import { Booking } from "../../../utils/types";

interface ShipmentData {
  date: string;
  count: number;
}

const ShipmentsBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const bookings = await fetchBookings();

        // Aggregate the bookings by date
        const bookingsByDate: { [key: string]: number } = {};

        bookings.forEach((booking: Booking) => {
          const date = dayjs(booking.createdAt).format("YYYY-MM-DD"); // Format date as YYYY-MM-DD
          if (bookingsByDate[date]) {
            bookingsByDate[date]++;
          } else {
            bookingsByDate[date] = 1;
          }
        });

        // Convert the aggregated data into the format expected by the chart
        const processedChartData = Object.entries(bookingsByDate).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        setChartData(processedChartData);
      } catch (err) {
        setError("Failed to load bookings data");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const colors = ["#8884d8"];

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 sm:p-6 md:p-6 rounded-2xl h-64 sm:h-80 md:h-[450px] shadow-lg border">
      <h3 className="text-xl sm:text-2xl md:pl-12 font-medium mb-4 lg:pb-2">
        Shipments Per Day (Bar Chart)
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill={colors[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShipmentsBarChart;
