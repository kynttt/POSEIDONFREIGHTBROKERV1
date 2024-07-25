import React from "react";
import Sidebar from "../components/SideBar"; // Adjust the import path based on your project structure
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTruck,
  faCalendarAlt,
  faBuilding,
  faCircleDollarToSlot,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

const ShipmentDetailsConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/payment-method");
  };

  const handleEditClick = () => {
    navigate("/request-quote");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isAuthenticated={false} />

      {/* Main Content */}
      <div className="p-8 bg-white flex-1 xl:px-20 md:px-5 min-h-screen">
        <h1 className="text-2xl font-bold text-left mt-10 mb-14 text-primary">
          Shipment Details Confirmation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-2 md:gap-0 mb-8">
          <div className="lg:ml-4">
            <div className="grid grid-cols-1 lg:gap-10 md:gap-10">
              <div className="flex flex-col lg:flex-row md:flex-row xl:gap-20  md:gap-2">
                <div className="bg-white p-8 rounded-lg text-center flex-grow flex items-center lg:w-40 md:w-40 lg:h-48 md:h-48 shadow-lg">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-blue-600 mr-2 mb-16"
                    size="1x"
                  />
                  <div>
                    <h2 className="font-medium text-lg text-secondary">
                      Pickup Location
                    </h2>
                    <p className="text-lg mt-7 pl-2 text-left text-gray-500">
                      Auburn, WS
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg text-center flex-grow flex items-center lg:w-40 md:w-40 lg:h-48 md:h-48 mt-8 md:mt-0 shadow-lg">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-blue-600 mr-2 mb-16"
                    size="1x"
                  />
                  <div>
                    <h2 className="font-medium text-lg text-secondary">
                      Drop-off Location
                    </h2>
                    <p className="text-lg mt-7 pl-2 text-left text-gray-500">
                      Dallas, TX
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg lg:mt-5 mt-5 md:mt-0 xl:w-full lg:w-full md:w-80 xl:h-80 lg:h-96 md:h-full shadow-lg">
                <h2 className="font-medium text-lg text-secondary mb-2">
                  Other Details
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start">
                      <div className="flex items-start">
                        <p className="text-base font-medium text-secondary flex items-center">
                          <FontAwesomeIcon
                            icon={faTruck}
                            className="mr-2 text-gray-500"
                          />
                          Trailer Type:
                        </p>
                      </div>
                      <div className="ml-8 text-sm mt-2">
                        <p className="text-gray-500">Flat bed</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-secondary flex items-center">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-2 text-gray-500"
                          />
                          Date & Time:
                        </p>
                      </div>
                      <div className="ml-8 text-sm mt-2">
                        <p className="text-gray-500">
                          6 July 2024 at 15:00 PM GMT
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end lg:mr-16 md:mr-16">
                      <div className="flex items-end">
                        <p className="text-sm font-medium text-secondary flex items-center">
                          <FontAwesomeIcon
                            icon={faTruck}
                            className="mr-2 text-gray-500"
                          />
                          Size (ft.):
                        </p>
                      </div>
                      <div className="ml-8 text-sm mt-2">
                        <p className="text-gray-500">48 ft.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col items-start">
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-secondary flex items-center">
                          <FontAwesomeIcon
                            icon={faBuilding}
                            className="mr-2 text-gray-500"
                          />
                          Company Name:
                        </p>
                      </div>
                      <div className="ml-8 text-sm mt-2">
                        <p className="text-gray-500">ABC Company, LLC</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center lg:mr-56 md:mr-40">
                      <div className="flex items-start">
                        <p className="text-sm font-medium text-secondary flex items-center">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-2 text-gray-500"
                          />
                          Commodity:
                        </p>
                      </div>
                      <div className="ml-8 text-sm mt-2">
                        <p className="text-gray-500">Fruits, Vegetables</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative md:static md:mt-0 mt-10 md:mr-22">
            <div className="xl:ml-4 md:ml-24 bg-white p-6 rounded-lg text-left lg:w-96 md:w-72 lg:h-full md:h-full shadow-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  className="text-blue-600 mr-4 text-gray-500"
                  size="1x"
                />
                <h2 className="font-medium text-lg text-secondary">
                  Total Shipment Price
                </h2>
              </div>
              <h1 className="text-6xl font-bold mb-20 pl-9 text-primary">
                $4,509
              </h1>

              <div className="flex items-center mb-3">
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  className="text-blue-600 mr-4 text-gray-500"
                  size="1x"
                />
                <p className="text-lg font-medium text-secondary">Taxes and other fees</p>
              </div>
              <p className="text-lg font-medium mb-40 pl-9 text-gray-500">6 July 2024 at 15:00 PM GMT</p>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faFileDownload}
                  className="mr-4 text-gray-500"
                />
                <p className="text-lg font-medium text-secondary">Download BOL</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start space-x-4 mt-14 lg:ml-4 md:ml-2">
          <Button
            label="Next"
            size="medium"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={handleNextClick}
            type=""
          />
          <Button
            label="Edit"
            size="medium"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={handleEditClick}
            type=""
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsConfirmation;
