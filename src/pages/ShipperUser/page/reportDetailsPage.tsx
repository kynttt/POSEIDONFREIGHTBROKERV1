import React, { useState } from "react";
// import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faDownload,
  faFileLines,
  faPrint,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportDetails: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    // Clear error when start date changes
    setError("");
  };

  const handleEndDateChange = (date: Date | null) => {
    if (startDate && date && date < startDate) {
      setError("End date cannot be earlier than start date");
    } else {
      setEndDate(date);
      setError("");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* <Navbar isAuthenticated={false} /> */}

      <div className="px-32 flex-1 min-h-screen overflow-y-auto">
        <h2 className="text-2xl text-gray-500 font-medium mb-4 text-left mt-5 lg:ml-10">
          REPORTING
        </h2>
        <div className="mx-10">
          <div className="flex flex-col sm:flex-row mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2">
              <label
                className="block text-secondary font-semibold mb-5 text-xl"
                htmlFor="startDate"
              >
                Delivery Date Range
              </label>

              <div className="flex items-center gap-4 mb-4">
                {/* Start Date Input */}
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    className="border rounded py-2 px-3 font-normal text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 w-full sm:w-auto pr-10"
                    placeholderText="MM/DD/YYYY"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-secondary text-lg"
                    />
                  </div>
                </div>

                {/* End Date Input */}
                <div className="relative ml-2">
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    className="border rounded py-2 px-3 font-normal text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 w-full sm:w-auto pr-10"
                    placeholderText="MM/DD/YYYY"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-secondary text-lg"
                    />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 mb-4 text-sm font-normal text-primary relative mx-10 bg-white">
          <div className="p-4">
            <div className="mb-4 flex justify-between items-start">
              <h1 className="text-lg text-secondary font-medium px-4">
                MY LOADS
              </h1>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faUpRightFromSquare}
                    className="text-black text-xs"
                  />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto text-secondary">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    {[
                      "Mode",
                      "Status",
                      "Customer PO",
                      "FreightBroker PO",
                      "Schedule Delivery Date",
                      "Origin City",
                      "Origin State",
                      "Destination City",
                      "Scheduled Pickup Date",
                      "Destination",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-3 px-4 text-center text-sm font-semibold text-primary"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-primary hover:text-secondary transition-colors duration-300 text-center"
                      >
                        <td className="py-2 px-4 text-sm font-medium text-secondary hover:bg-primary hover:text-secondary transition-colors duration-300">
                          {index === 0 ? <span>FTL</span> : "FTL"}
                        </td>
                        <td className="py-2 px-4 text-sm font-medium">
                          {index === 0 ? (
                            <span className="text-green-500 text-green">
                              Active
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="py-2 px-4 text-sm"></td>
                        <td className="py-2 px-4 text-sm"></td>
                        <td className="py-2 px-4 text-sm">MM/DD/YYYY</td>
                        <td className="py-2 px-4 text-sm">Fairfield</td>
                        <td className="py-2 px-4 text-sm">OH</td>
                        <td className="py-2 px-4 text-sm">Los Angeles</td>
                        <td className="py-2 px-4 text-sm">MM/DD/YYYY</td>
                        <td className="py-2 px-4 text-sm">CA</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-start space-x-4 mt-5">
              <button className="text-blue-600 flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-black text-xs"
                />
                <span>Download</span>
              </button>
              <button className="text-blue-600 flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="text-black text-xs"
                />
                <span>View</span>
              </button>
              <button className="text-blue-600 flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faPrint}
                  className="text-black text-xs"
                />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
