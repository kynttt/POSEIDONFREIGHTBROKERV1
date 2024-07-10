// AccountingReports.tsx
import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../components/TableComponent"; // Import the TableComponent
import data from "../components/AccountingReportData.json"; // Import the JSON data

const AccountingReports: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="bg-white flex flex-col h-screen md:flex-row font-lexend">
      <Sidebar isAuthenticated={false} />
      <div className="flex-1 overflow-y-auto px-4 md:px-16 py-4 md:py-16">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-8 text-gray-500">
          Reports
        </h2>

        {/* Year selection */}
        <label htmlFor="year" className="mr-2 text-secondary text-lg font-medium">
          Select Year
        </label>
        <div className="flex items-center mb-4 mt-2">
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleChangeYear}
            className="px-2 py-1 md:px-6 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Example report layout */}
        <div className="flex items-center justify-between mb-4 md:pr-32 text-primary mt-5">
          <h2 className="text-lg md:text-xl font-semibold">
            PDI ENTERPRISE LLC
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faDownload}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              />
              <span className="text-sm md:text-base font-medium">Download</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faPrint}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              />
              <span className="text-sm md:text-base font-medium">Print</span>
            </div>
          </div>
        </div>

        {/* Render TableComponent with data */}
        <TableComponent data={data} />

        {/* Total section */}
        <div className="border-t border-gray-300 mt-10 pt-4 text-secondary">
          <div className="text-left text-lg font-semibold">
            TOTAL: $234,000.20
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingReports;
