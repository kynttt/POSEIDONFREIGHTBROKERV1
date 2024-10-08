import React from "react";
import carriersImage from "../assets/img/carriers.jpg";
import shippersImage from "../assets/img/shippers.png";
import agentImage from "../assets/img/agent.jpg";
import { useNavigate } from 'react-router-dom';

const ServiceCards: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="services"
      className="flex md:h-screen flex-col items-center justify-center py-8 px-4 lg:px-16 lg:py-16 bg-white" // Adjusted padding for smaller screens
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center text-darkBlue mb-6 sm:mb-10 lg:mb-16">
        Seamless Freight Service
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full">
          <img
            src={carriersImage}
            alt="Carriers"
            className="w-full h-48 sm:h-64 lg:h-72 object-cover"
          />
          <div className="p-6 sm:p-8 flex-grow flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              Fast Delivery
            </h3>
            <p className="text-nblue font-normal flex-grow">
              Tailored Carrier Services to Fit Your Business.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full">
          <img
            src={agentImage}
            alt="Shippers"
            className="w-full h-48 sm:h-64 lg:h-72 object-cover"
          />
          <div className="p-6 sm:p-8 flex-grow flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              Freight Agents
            </h3>
            <p className="text-nblue font-normal flex-grow">
              Refer Shippers and Grow Your Client Network!
            </p>
            <div className="text-center mt-auto flex justify-center">
              <button
                type="button" // Change type to button to prevent form submission if inside a form
                className="mt-4 w-full bg-yellow-500 text-blue-900 py-2 rounded-md shadow-sm text-sm font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 flex items-center justify-center"
                onClick={() => navigate('/agent-page')}
              >
                More Details
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full">
          <img
            src={shippersImage}
            alt="Shippers"
            className="w-full h-48 sm:h-64 lg:h-72 object-cover"
          />
          <div className="p-6 sm:p-8 flex-grow flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              Monitored 24/7
            </h3>
            <p className="text-nblue font-normal flex-grow">
              Driving your business forward with Expert Logistic Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
