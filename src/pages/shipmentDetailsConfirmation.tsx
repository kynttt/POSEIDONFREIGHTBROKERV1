import React from 'react';
import Sidebar from '../components/SideBar';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faTruck,
  faCalendarAlt,
  faBuilding,
  faAppleAlt,
  faCircleDollarToSlot,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';

const ShipmentDetailsConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/payment-method');
  };

  const handleEditClick = () => {
    navigate('/request-quote');
  };

  return (
    <div className="bg-white h-screen flex flex-col md:flex-row">
      <Sidebar isAuthenticated={false} />

      <div className="p-8 bg-white flex-grow px-4 md:px-20">
        <h1 className="text-2xl font-bold text-left mt-10 mb-14">Shipment Details Confirmation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-2 md:gap-12 mb-8">
          <div className="md:mr-8">
            <div className="grid grid-cols-1 gap-8 md:gap-10">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="bg-gray-100 p-8 rounded-lg text-center flex-grow flex items-center w-80">
                  <FontAwesomeIcon icon={faLocationDot} className="text-blue-600 mr-2 mb-16" size="1x" />
                  <div>
                    <h2 className="font-semibold text-lg text-secondary">Pickup Location</h2>
                    <p className="text-xl mt-7 pl-2 text-left text-gray-500">Auburn, WS</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg text-center flex-grow flex items-center w-80">
                  <FontAwesomeIcon icon={faLocationDot} className="text-blue-600 mr-2 mb-16" size="1x" />
                  <div>
                    <h2 className="font-semibold text-lg text-secondary">Drop-off Location</h2>
                    <p className="text-xl mt-7 pl-2 text-left text-gray-500">Dallas, TX</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-8 rounded-lg mt-5 w-full">
                <h2 className="font-semibold text-lg text-secondary">Other Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <p className="mr-2 text-sm text-secondary">
                        <FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-500" />
                        Trailer Type:
                      </p>
                    </div>
                    <div className="ml-8 text-sm mt-4">
                      <p className="text-gray-500">Flat bed</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-2 text-sm text-secondary">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
                        Date & Time:
                      </p>
                    </div>
                    <div className="ml-8 text-sm mt-4">
                      <p className="text-gray-500">6 July 2024 at 15:00 PM GMT</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <p className="mr-2 text-sm text-secondary">
                        <FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-500" />
                        Size (ft.)
                      </p>
                    </div>
                    <div className="ml-8 text-sm mt-4">
                      <p className="text-gray-500">48 ft.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-2 text-sm text-secondary">
                        <FontAwesomeIcon icon={faBuilding} className="mr-2 text-gray-500" />
                        Company Name:
                      </p>
                    </div>
                    <div className="ml-8 text-sm mt-4">
                      <p className="text-gray-500">ABC Company, LLC</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-2 text-sm text-secondary">
                        <FontAwesomeIcon icon={faAppleAlt} className="mr-2 text-gray-500" />
                        Commodity:
                      </p>
                    </div>
                    <div className="ml-8 text-sm mt-4">
                      <p className="text-gray-500">Fruits, Vegetables</p>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>


          <div className="relative md:static mt-10 md:mt-0">
            <div className="bg-gray-100 p-6 rounded-lg text-left w-96 px-10" style={{ height: '32rem' }}>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-blue-600 mr-4 text-gray-500" size="1x" />
                <h2 className="font-semibold text-lg text-secondary">Total Shipment Price</h2>
              </div>
              <p className="text-4xl font-bold mb-16 pl-9 text-primary">$4,509</p>

              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-blue-600 mr-4 text-gray-500" size="1x" />
                <p className="text-lg text-secondary">Taxes and other fees</p>
              </div>
              <p className="text-lg mb-32 pl-9">6 July 2024 at 15:00 PM GMT</p>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faFileDownload} className="mr-2 text-gray-500" />
                <p className="text-left text-secondary">Download BOL</p>
              </div>
            </div>
          </div>
          
        </div>

        <div className="flex justify-start space-x-4 mt-14">
          <Button
            label="Next"
            size="medium"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={handleNextClick} type={''}          />
          <Button
            label="Edit"
            size="medium"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={handleEditClick} type={''}          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsConfirmation;
