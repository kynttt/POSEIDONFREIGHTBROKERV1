import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faArrowsSpin,
  faSackDollar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { fetchBookings } from "../../../lib/apiCalls";
import { Booking } from "../../../utils/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface OverviewData {
  totalShipments: number;
  inTransit: number;
  revenue: number;
  delivered: number;
}

interface DataPoint {
  date: string;
  value: number;
}

const OverviewSection: React.FC = () => {
  const [data, setData] = useState<OverviewData>({
    totalShipments: 10000,
    inTransit: 100,
    revenue: 0,
    delivered: 10000,
  });

  const [totalShipmentsData, setTotalShipmentsData] = useState<DataPoint[]>([]);
  const [inTransitData, setInTransitData] = useState<DataPoint[]>([]);
  const [revenueData, setRevenueData] = useState<DataPoint[]>([]);
  const [deliveredData, setDeliveredData] = useState<DataPoint[]>([]);

  useEffect(() => {
    async function loadBookings() {
      const bookings = await fetchBookings();
  
      // Process data for graphs
      const newTotalShipmentsData: DataPoint[] = [];
      const newInTransitData: DataPoint[] = [];
      const newRevenueData: DataPoint[] = [];
      const newDeliveredData: DataPoint[] = [];
  
      bookings.forEach((booking: Booking) => {
        const createdAt = booking.createdAt;
        if (createdAt) {
          const date = new Date(createdAt).toDateString();
          const isInTransit = booking.status === "In Transit";
          const isDelivered = booking.status === "Delivered";
          const price = booking.quote?.price || 0;
  
          // Update data arrays based on the booking status
          const existingTotal = newTotalShipmentsData.find((point) => point.date === date);
          const existingInTransit = newInTransitData.find((point) => point.date === date);
          const existingDelivered = newDeliveredData.find((point) => point.date === date);
          const existingRevenue = newRevenueData.find((point) => point.date === date);
  
          if (existingTotal) {
            existingTotal.value += 1;
          } else {
            newTotalShipmentsData.push({ date, value: 1 });
          }
  
          if (isInTransit) {
            if (existingInTransit) {
              existingInTransit.value += 1;
            } else {
              newInTransitData.push({ date, value: 1 });
            }
          }
  
          if (isDelivered) {
            if (existingDelivered) {
              existingDelivered.value += 1;
            } else {
              newDeliveredData.push({ date, value: 1 });
            }
          }
  
          if (existingRevenue) {
            existingRevenue.value += price;
          } else {
            newRevenueData.push({ date, value: price });
          }
        }
      });
  
      setTotalShipmentsData(newTotalShipmentsData);
      setInTransitData(newInTransitData);
      setDeliveredData(newDeliveredData);
      setRevenueData(newRevenueData);
  
      // Calculate overview data
      const totalShipments = 10000 + bookings.length;
      const inTransit = 100 + bookings.filter((booking: Booking) => booking.status === "In Transit").length;
      const delivered = 10000 + bookings.filter((booking: Booking) => booking.status === "Delivered").length;
      const revenue = bookings.reduce((acc: number, booking: Booking) => acc + (booking.quote?.price || 0), 0);
  
      setData({
        totalShipments,
        inTransit,
        revenue: parseFloat(revenue.toFixed(2)),
        delivered,
      });
    }
  
    loadBookings();
  }, []);
  

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:mb-8">
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg border">
        <div className="flex justify-start">
          <FontAwesomeIcon icon={faBox} className="text-2xl mb-2 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Total Shipments</h3>
          <p className="text-2xl">{data.totalShipments.toLocaleString()}</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={totalShipmentsData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="value" stroke="#00D9C9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg border">
        <div className="flex justify-start">
          <FontAwesomeIcon icon={faArrowsSpin} className="text-2xl mb-2 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">In Transit</h3>
          <p className="text-2xl">{data.inTransit.toLocaleString()}</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={inTransitData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="value" stroke="#00BFFF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg border">
        <div className="flex justify-start">
          <FontAwesomeIcon icon={faSackDollar} className="text-2xl mb-2 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Revenue</h3>
          <p className="text-2xl">
            ${" "}
            {data.revenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={revenueData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="value" stroke="#9370DB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white py-4 p-4 md:px-10 rounded-lg shadow-lg border">
        <div className="flex justify-start">
          <FontAwesomeIcon icon={faTruck} className="text-2xl mb-2 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary">Delivered</h3>
          <p className="text-2xl">{data.delivered.toLocaleString()}</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={deliveredData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="value" stroke="#FF1493" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
