import React from "react";
import backgroundImage from "../assets/img/Component 44.png"; // Import your background image
import { useNavigate } from "react-router-dom";

const LogisticsForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-3/4">
      {/* Dark Overlay for md to xs screens */}
      <div className="absolute inset-0 bg-black opacity-50 md:opacity-60 lg:opacity-20" />
      
      {/* Background Section */}
      <div
        className="flex flex-col lg:flex-row items-center justify-between h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Set background image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left Section - Empty (for background) */}
        <div className="lg:w-1/2 w-full" />

        {/* Right Section */}
        <div className="lg:w-1/2 w-full bg-transparent p-8 lg:p-16 text-white relative">
          <div className="lg:w-5/7 mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 md:text-center sm:text-left">
            Get Quotation, pay and book 
            your freight transportation
              <h2 className="text-yellow-500">24 Hours Operating support services</h2>
            </h2>
            <p className="text-sm lg:text-base mb-8 font-normal lg:w-3/4 mx-auto text-justify lg:px-0 sm:px-24">
              Through Third-Party Logistics (3PL) services, businesses can achieve the flexibility and expertise required to streamline operations and lower expenses, allowing you to prioritize your core business as we oversee logistics, including expedited shipping and full truck loads.
            </p>
          </div>

          {/* Updated Form */}
          <form className="bg-white text-gray-900 p-6 rounded-lg shadow-lg lg:w-3/4 mx-auto">
            {/* Origin Location */}
            <div className="mb-4">
              <label htmlFor="origin" className="block text-md font-medium text-rblue">
              Choose pick-up destination
              </label>
              <input
                type="text"
                id="origin"
                className="bg-grey mt-1 px-4 py-3 block w-full rounded-lg  shadow-sm focus:border-blue-500 focus:ring-blue-500  placeholder-font-thin"
                placeholder="Enter Origin Location"
                style={{ fontWeight: '300' }} // Make the placeholder font thin
              />
            </div>

            {/* Destination Location */}
            <div className="mb-4">
              <label htmlFor="destination" className="block text-md text-rblue font-medium">
              Choose drop-off location
              </label>
              <input
                type="text"
                id="destination"
                className="bg-grey mt-1 px-4 py-3 block w-full rounded-lg  shadow-sm focus:border-blue-500 focus:ring-blue-500  placeholder-font-thin"
                style={{ fontWeight: '300' }}
                placeholder="Enter Destination Location"
              />
            </div>

            {/* Trailer Type */}
            <div className="mb-6">
              <label htmlFor="trailerType" className="block text-md text-rblue font-medium">
              Choose your trailer type
              </label>
              <select
                id="trailerType"
                className="bg-grey mt-1 px-4 py-3 block w-full rounded-lg  shadow-sm focus:border-blue-500 focus:ring-blue-500 "
                style={{ fontWeight: '300' }}
              >
                <option>Select Trailer Type</option>
                <option>Dry Van</option>
                <option>Flatbed</option>
                <option>Reefer</option>
                <option>Stepdeck</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                type="submit"
                className="md:w-1/2 w-full bg-yellow-500 text-blue-900 py-3 px-4 rounded-md shadow-sm font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={() => navigate("/requests")}
                >
                Request Quote
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogisticsForm;
