import React from "react";
import carriersImage from "../assets/img/carriers.jpg";
import shippersImage from "../assets/img/shippers.png";
import { useNavigate } from 'react-router-dom';


const ServiceCards: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div id="services" className="flex flex-col items-center justify-center py-16 bg-white">
      <h2 className="text-5xl font-medium text-center text-darkBlue mb-10 lg:mb-28">
        Seamless Freight Service
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full max-w-sm">
          <img
            src={carriersImage}
            alt="Carriers"
            className="w-full h-72 object-cover"
          />
          <div className="p-8 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Fast Delivery</h3>
            <p className="text-nblue font-normal flex-grow">
              Tailored Carrier Services to Fit Your Business.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full max-w-sm">
          <img
            src={shippersImage}
            alt="Shippers"
            className="w-full h-72 object-cover"
          />
          <div className="p-8 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Dispatch Agents</h3>
            <p className="text-nblue font-normal flex-grow">
              Accommodate customer’s queries and needs 24 hours.
            </p>
            <div className="text-center mt-auto">
              <button
                type="button" // Change type to button to prevent form submission if inside a form
                className="mt-6 w-full bg-yellow-500 text-blue-900 py-3 px-12 rounded-md shadow-sm font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={() => navigate('/agent-page')}
              >
                See more
              </button>

            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full w-full max-w-sm">
          <img
            src={shippersImage}
            alt="Shippers"
            className="w-full h-72 object-cover"
          />
          <div className="p-8 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Monitored 24/7</h3>
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
