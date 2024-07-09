import { useState } from "react";
import Sidebar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";

const AccountingReports: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row font-lexend bg-white">
      <Sidebar />
      <div className="flex-1 px-4 md:px-16 mt-4 md:mt-16">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-8 text-gray-500">Reports</h2>
        
        {/* Year selection */}
        <div className="flex items-center mb-4 mt-2">
          <label htmlFor="year" className="mr-2 text-secondary text-lg font-medium">
            Select Year
          </label>
        </div>
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

        {/* Selected year info */}
        {/* <div className="mb-4 text-xs font-normal mt-2 text-gray-400">
          <p>Selected Year: {selectedYear}</p>
    
        </div> */}

        {/* Example report layout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:pr-32 text-primary mt-5">
          <h2 className="text-lg md:text-xl font-semibold">PDI ENTERPRISE LLC</h2>
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

        {/* Table header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-5 w-full md:w-11/12 text-primary">
          <div className="py-1">
            <div className="flex flex-wrap text-base font-semibold">
              <div className="w-full md:w-1/4 px-4">Invoice</div>
              <div className="w-full md:w-1/4 px-4 md:pl-15">Transaction Type</div>
              <div className="w-full md:w-1/4 px-4 md:pl-20">Load Date</div>
              <div className="w-full md:w-1/4 flex justify-center items-center md:pr-4">
                <div className="ml-auto">Paid Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table rows */}
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg shadow-md p-4 mb-5 w-full md:w-11/12">
            <div className="py-1">
              <div className="flex flex-wrap text-base font-normal text-secondary">
                <div className="w-full md:w-1/4 px-4">ABC-123456</div>
                <div className="w-full md:w-1/4 px-4 md:pl-15">Payment</div>
                <div className="w-full md:w-1/4 px-4 md:pl-20">07/24/2024</div>
                <div className="w-full md:w-1/4 flex justify-end items-center md:pr-4">
                  <div className="ml-auto">$ 420.20</div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
