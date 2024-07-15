import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "tailwindcss/tailwind.css";
import PerformanceGrade from "../pages/PerformanceGrade.json";
import Pagination from "../components/pagination";

const PerformanceGradeComponent: React.FC = () => {
  const chartData = [
    { date: "Metric 1", value: 50 },
    { date: "Metric 2", value: 75 },
    { date: "Metric 3", value: 100 },
    { date: "Metric 4", value: 60 },
    { date: "Metric 5", value: 40 },
  ];

  const dashboardData = [
    {
      additionalInfo: (
        <span className="flex items-center">
          <span className="mr-1 text-4xl font-semibold text-primary mt-3">
            100%
          </span>
          <span className="ml-5 text-xs font-normal">
            <FontAwesomeIcon icon={faCaretUp} className="text-green-200 px-2" />
            0.3% <br /> 1 week
          </span>
        </span>
      ),
      type: "positive",
    },
    {
      additionalInfo: (
        <span className="flex items-center">
          <span className="mr-1 text-4xl font-semibold text-primary mt-3">
            99.9%
          </span>
          <span className="ml-5 text-xs font-normal">
            <FontAwesomeIcon icon={faCaretDown} className="text-red-200 px-2" />
            0.3% <br /> 1 week
          </span>
        </span>
      ),
      type: "negative",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Example state for current page
  const totalPages = 5; // Example for total pages
  const handlePageChange = (page: number) => {
    // Example function to handle page change
    setCurrentPage(page);
  };

  const TransparencyData = [
    {
      additionalInfo: (
        <span className="flex items-center">
          <span className="text-center text-5xl lg:text-7xl font-semibold text-primary mt-10">
            99%
          </span>
          <span className="ml-5 text-xs font-normal">
            <FontAwesomeIcon
              icon={faCaretUp}
              className="text-green-200 mt-10 px-2"
            />
            0.3% <br /> 1 week
          </span>
        </span>
      ),
      type: "positive",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isAuthenticated={false} />
      <div className="p-4 lg:px-20 flex-1">
        <div className="text-2xl font-semibold mb-6 text-gray-400">
          Performance
        </div>
        <div className="text-xl font-medium mb-7 mt-10 text-secondary">
          Performance Grade
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Average Lead Time */}
          <div className="bg-light-grey p-4 rounded-lg shadow text-center flex-1 mb-4 lg:mb-0 max-w-xs w-full lg:w-72">
            <p className="text-gray-600 font-semibold text-primary text-left py-5 pl-5">
              Performance Grade/Score
            </p>
            <div className="flex items-center justify-center mt-10">
              <h1 className="text-5xl lg:text-7xl font-semibold text-primary">
                A+
              </h1>
              <h3 className="text-3xl lg:text-5xl font-medium text-primary ml-4 mt-3 lg:mt-2">
                99%
              </h3>
            </div>
          </div>

          {/* Dashboard Data */}
          <div className="grid grid-cols-1 sm:grid-rows-2 gap-4 mb-4 lg:mb-0 w-full lg:w-72">
            {dashboardData.map((item, index) => (
              <div
                key={index}
                className="bg-light-grey p-4 rounded-lg shadow text-center border border-gray-200"
              >
                <h2 className="text-gray-600 text-left font-medium text-primary text-base sm:text-lg md:text-lg">
                  {item.type === "positive"
                    ? "Good Performance"
                    : "Performance Issues"}
                </h2>
                <div
                  className={
                    item.type === "positive"
                      ? "text-green-500 mt-2 flex items-center justify-center"
                      : "text-red-500 mt-2 flex items-center justify-center"
                  }
                >
                  {item.additionalInfo}
                </div>
              </div>
            ))}
          </div>

          {/* Transparency Data */}
          {TransparencyData.map((item, index) => (
            <div
              key={index}
              className="bg-light-grey p-4 rounded-lg shadow text-center justify-center flex-1 mb-4 lg:mb-0 max-w-xs w-full lg:w-72"
            >
              <p className="text-gray-600 font-medium text-left text-primary sm:text-lg md:text-lg py-5 pl-5">
                Transparency Focused
              </p>

              <div
                className={`${
                  item.type === "positive"
                    ? "text-green-500 mt-2 flex items-center justify-center"
                    : "text-red-500 mt-2 flex items-center justify-center"
                }`}
              >
                {item.additionalInfo}
              </div>
            </div>
          ))}

          {/* Total Loads Analytics */}
          <div className="bg-light-grey rounded-lg shadow p-4 md:p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Total Loads Analytics
            </h2>
            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pagination and Table Section */}
        <div className="bg-light-grey p-4 rounded-lg shadow-lg mt-10">
          <div className="flex justify-between items-center border-b-2 border-secondary">
            <div className="flex items-center">
              <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-0 pb-2">
                Drivers
              </h3>
            </div>
            <div className="ml-4 flex items-center">
              <h3 className="mr-4 text-sm font-light">
                Showing 1 to 8 of 32 Entries
              </h3>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Scrollable Table Section */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-secondary">
              <thead>
                <tr className="text-primary">
                  <th className="px-4 py-2 text-left">Load number</th>
                  <th className="px-4 py-2 text-left">Driver</th>
                  <th className="px-4 py-2 text-left">Delivery Address</th>
                  <th className="px-4 py-2 text-left">Delivery Date & Time</th>
                  <th className="px-4 py-2 text-left">Leg</th>
                  <th className="px-4 py-2 text-left">Performance</th>
                </tr>
              </thead>
              <tbody>
                {PerformanceGrade.entries.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-secondary text-base font-normal">
                      {entry.loadNumber}
                    </td>
                    <td className=" px-4 py-2 text-base font-normal text-secondary">
                      {entry.driver}
                    </td>
                    <td className=" px-4 py-2 text-base font-normal text-secondary">
                      {entry.deliveryAddress}
                    </td>
                    <td className=" px-4 py-2 text-base font-normal text-secondary">
                      {entry.deliveryDateTime}
                    </td>
                    <td className=" px-4 py-2 text-base font-normal text-secondary">
                      {entry.leg}
                    </td>
                    <td className=" px-4 py-2 text-base font-normal text-secondary">
                      {entry.performance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGradeComponent;
