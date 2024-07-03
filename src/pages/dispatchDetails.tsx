import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';


const DispatchDetails: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/bill-lading');
  };
  return (
    <nav>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className=" h-screen bg-white flex flex-col md:flex-row items-center justify-center   px-4 ">
        <div className="border rounded-lg shadow-lg bg-white p-6 w-full md:w-8/12">
          <h2 className="text-2xl font-medium text-blue-700 mb-6 text-secondary text-center md:text-left">Dispatched Details</h2>

          <div className="overflow-x-auto">
            <div className="flex md:grid md:grid-cols-12 gap-4 mb-6 items-center min-w-[768px]">
              <div className="flex-shrink-0 text-center md:text-left md:col-span-3 pb-4 md:pb-0">
                <p className="text-gray-500 text-lg font-medium mb-6">Pick</p>
                <p className="text-base mb-1 text-primary">Fairfield, OH</p>
                <p className="text-sm font-medium text-primary">Sat 06/27/2024</p>
              </div>
              <div className="flex-shrink-0 text-center md:col-span-1 md:pr-16 hidden md:block">
                <FontAwesomeIcon icon={faAnglesRight} className="text-3xl text-secondary" />
              </div>
              <div className="flex-shrink-0 text-center md:text-left md:col-span-2 pb-4 md:pb-0">
                <p className="text-gray-500 text-lg font-medium mb-6">Drop</p>
                <p className="text-base mb-1 text-primary">Los Angeles, CA</p>
                <p className="text-sm font-medium text-primary">Sat 06/27/2024</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left md:col-span-2">
                <p className="text-gray-500 text-lg font-medium mb-2">3 Total Stops</p>
                <p className="text-base text-primary">3043 mi</p>
              </div>
              <div className="flex-shrink-0 text-center md:col-span-2 md:border-l-2 md:border-r-2 md:border-secondary md:py-3">
                <p className="text-xl font-medium text-primary">0 mi DH</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left md:col-span-2">
                <p className="text-gray-500 text-lg font-medium mb-2">Max. Weight</p>
                <p className="text-xl font-medium text-primary">41,000 lbs.</p>
              </div>
            </div>
          </div>

          <hr className="border-t lg:border-secondary lg:border-2 mb-6 hidden md:block" />

          <h2 className="text-xl font-medium text-secondary mb-5 text-center md:text-left">Additional Details</h2>
          <div className="overflow-x-auto pr-56">
            <div className="flex md:grid md:grid-cols-5 gap-4 items-center min-w-[768px]">
              <div className="flex-shrink-0 text-center md:text-left col-span-1 pb-2 md:pb-0">
                <p className="text-gray-500 text-base font-medium mb-2">Trailer Type</p>
                <p className="text-primary">FTL</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left col-span-1 pb-4 md:pb-0">
                <p className="text-gray-500 text-base font-medium mb-2">Drop DH</p>
                <p className="text-primary">-- mi</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left col-span-1 pb-4 md:pb-0">
                <p className="text-gray-500 text-base font-medium mb-2">Trailer Size</p>
                <p className="text-primary">48 ft.</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left col-span-1 pb-4 md:pb-0">
                <p className="text-gray-500 text-base font-medium mb-2">Commodity</p>
                <p className="text-primary">Fruits</p>
              </div>
              <div className="flex-shrink-0 text-center md:text-right col-span-1 pb-4 md:pb-0">
                <p className="text-gray-500 text-base font-medium mb-2">Company name</p>
                <p className="text-primary">AirTransit</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-12">
            <Button
              label="Confirm"
              size="large"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleButtonClick}
              className="extra-class-for-medium-button" type={''}            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DispatchDetails;
