import { useState } from "react";
import Sidebar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";

const AccountingPayment: React.FC = () => {
  const [selectedBalance, setSelectedBalance] = useState<string>("All");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<string>("Past Hour");

  const handleChangeBalance = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBalance(event.target.value);
  };

  const handleChangeTimeRange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeRange(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-lexend">
      <Sidebar />
      <div className="flex-1 px-4 md:px-16 mt-4 md:mt-16">
        <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-10 text-gray-500">
          Payments
        </h2>
        <div className="flex flex-wrap items-center mb-4 md:mb-0 space-x-0 md:space-x-4">
  {/* For Year dropdown */}
  <div className="flex items-center mb-4 md:mb-0">
    <select
      id="balance"
      name="balance"
      value={selectedBalance}
      onChange={handleChangeBalance}
      className="text-gray-500 font-medium text-base px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-w-full md:max-w-xs mb-2 md:mb-0"
      // Adjust max-w-full and max-w-xs to control the maximum width of the dropdown
    >
      <option value="All">All</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
      <option value="Currently Processing">
        Currently Processing
      </option>
      <option value="Need BOLs">Need BOLs</option>
      {/* Add more options as needed */}
    </select>
  </div>
  <div className="flex items-center">
    <select
      id="timeRange"
      name="timeRange"
      value={selectedTimeRange}
      onChange={handleChangeTimeRange}
      className="text-gray-500 font-medium text-base px-3 py-2 md:px-6 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-w-full md:max-w-xs"
    >
      <option value="Past Hour">Past Hour</option>
      <option value="Past 24 Hours">Past 24 Hours</option>
      <option value="Past Week">Past Week</option>
      <option value="Past Two Weeks">Past Two Weeks</option>
      <option value="Past Month">Past Month</option>
      <option value="Past Three Months">Past Three Months</option>
      <option value="Past Six Months">Past Six Months</option>
      <option value="Past One Year">Past One Year</option>
      <option value="All">All</option>
    </select>
  </div>
</div>


        {/* Example report layout */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-4 md:pr-0 text-primary mt-10">
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

        <div className="bg-white rounded-lg shadow-md py-2 overflow-x-auto mb-5 text-primary">
          <div className="flex">
            <div className="w-1/6  text-center py-3 px-4">
              Freight PO
            </div>
            <div className="w-1/6  text-center py-3 px-4">
              Pay Status
            </div>
            <div className="w-1/6 text-center py-3 px-4">
              Estimated Paid Date
            </div>
            <div className="w-1/6 text-center py-3 px-4">
              Paid Date
            </div>
            <div className="w-1/6 text-center py-3 px-4">
              Invoice Number
            </div>
            <div className="w-1/6 text-center py-3 px-4">
              Documents
            </div>
            <div className="w-1/6 text-center py-3 px-4">
              Paid Total
            </div>
          </div>

        </div>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 border border-gray-300 rounded-lg overflow-hidden mb-5 text-secondary text-base font-normal">
          <div className="flex">
            <div className="w-1/6  text-center py-4 px-4">
             ABC-123456
            </div>
            <div className="w-1/6 text-center py-4 px-4 border-r">
             Paid
            </div>
            <div className="w-1/6 text-center py-4 px-4 border-r">
             07/24/2024
            </div>
            <div className="w-1/6 text-center py-3 px-4 border-r">
             07/24/2024
            </div>
            <div className="w-1/6 text-center py-3 px-4 border-r">
             ABC-123456
            </div>
            <div className="w-1/6 text-center py-3 px-4 border-r">
             BOL
            </div>
            <div className="w-1/6 text-center py-3 px-4 border-r">
             $ 420.20
            </div>
            </div>
            </div>
        
        ))}

        <div className="border-t border-gray-300 mt-10 pt-4 text-secondary">
          <div className="text-left text-lg font-semibold">
            TOTAL: $234,000.20
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingPayment;
