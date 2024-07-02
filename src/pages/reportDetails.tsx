import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";


const ReportDetails: React.FC = () => {
  return (
    <nav>
      <Navbar />

      <div className="border border-gray-300 rounded-lg p-4 mb-4 text-sm font-normal px-20">
        <h2 className="text-2xl text-gray-500 font-medium mb-4 text-center mt-5">
          REPORTING
        </h2>
        <div className="flex flex-col sm:flex-row mb-4">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2">
            <label
              className="block text-secondary font-semibold mb-2 text-xl"
              htmlFor="startDate"
            >
              Delivery Date Range
            </label>

            <div className="flex items-center">
              {/* Start Date Input */}
              <div className="relative">
                <input
                  type="text"
                  id="startDate"
                  className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 w-full sm:w-auto mr-2"
                  placeholder="MM/DD/YYYY"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-primary text-lg"
                  />
                </div>
              </div>

              {/* End Date Input */}
              <div className="relative ml-2">
                <input
                  type="text"
                  id="endDate"
                  className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 w-full sm:w-auto pr-10"
                  placeholder="MM/DD/YYYY"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-primary text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 mb-4 text-sm font-normal text-primary relative">
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-gray-400 text-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">Mode</p>
              <p>Road</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">Status</p>
              <p>Delivered</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Customer PO
              </p>
              <p>12345</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                FreightBroker PO
              </p>
              <p>67890</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Schedule Delivery Date
              </p>
              <p>06/30/2024</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Origin City
              </p>
              <p>New York</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Origin State
              </p>
              <p>NY</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Destination City
              </p>
              <p>Los Angeles</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Scheduled Pickup Date
              </p>
              <p>06/28/2024</p>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-4">
              <p className="text-primary text-base font-medium mb-2">
                Destination
              </p>
              <p>CA</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ReportDetails;
