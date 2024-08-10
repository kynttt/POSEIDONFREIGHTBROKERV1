import React, { useState } from "react";
import SideBar from "../../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import PaymentCard from "../../../components/PaymentCardComponent"; // Import PaymentCard component
import { useAuthStore } from '../../../state/useAuthStore';


const AccountingPayment: React.FC = () => {
  const { isAuthenticated } = useAuthStore(); // Use useAuth hook to get isAuthenticated
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
      <SideBar isAuthenticated={isAuthenticated} />
      <div className="flex-1 overflow-y-auto px-4 md:px-16 mt-4 md:mt-16">
        <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-10 text-gray-500">
          Payments
        </h2>
        <div className="flex flex-wrap items-center mb-4 md:mb-6 space-y-3 md:space-y-0 md:space-x-4">
          {/* For Balance dropdown */}
          <div className="flex items-center mb-3 md:mb-0">
            <select
              id="balance"
              name="balance"
              value={selectedBalance}
              onChange={handleChangeBalance}
              className="text-gray-500 font-normal text-base px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-w-full md:max-w-xs"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Currently Processing">Currently Processing</option>
              <option value="Need BOLs">Need BOLs</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* For Time Range dropdown */}
          <div className="flex items-center">
            <select
              id="timeRange"
              name="timeRange"
              value={selectedTimeRange}
              onChange={handleChangeTimeRange}
              className="text-gray-500 font-normal text-base px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-w-full md:max-w-xs"
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

        {/* Download and Print icons */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-6 md:pr-0 text-primary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon
                icon={faDownload}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              />
              <span className="text-sm md:text-base font-medium">Download</span>
            </div>
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon
                icon={faPrint}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              />
              <span className="text-sm md:text-base font-medium">Print</span>
            </div>
          </div>
        </div>

        {/* Render PaymentCard */}
        <PaymentCard />
        
      </div>
    </div>
  );
};

export default AccountingPayment;
