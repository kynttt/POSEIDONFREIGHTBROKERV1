import React from "react";
import heroBanner from "../assets/img/heroimage.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate("/distance-calculator");
  };

  return (
    <div
      className="relative flex flex-col md:flex-row justify-between items-start px-6 md:px-12 lg:px-24 xl:px-32 lg:w-full lg:h-5/6 md:h-screen md:h-1/2 sm:h-1/2"
      style={{
        background:
          "linear-gradient(-180deg, #7783D2 13%, #F0F0F0 83%)",
      }}
    >
      {/* Parent container for both text content and image */}
      <div className="flex flex-col md:flex-row items-start justify-between w-full lg:h-full mt-5 lg:mt-7">
        {/* Image Section (mobile first) */}
        <div className="md:hidden w-full relative mb-8">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-auto object-cover lg:max-h-full"
            style={{ filter: "drop-shadow(4px 4px 4px rgba(2, 2, 2, 0.5))" }}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 md:px-10 lg:px-20 xl:px-40 md:mt-12 lg:mt-32 sm:mt-8 z-10">
          <h1
            className="text-3xl md:text-5xl xl:text-7xl font-medium text-white"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 2, 0.3)" }}
          >
            TRANSPORT
          </h1>

          <h2
            className="text-2xl md:text-4xl xl:text-7xl font-black mt-2 mb-5 relative"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 relative z-10">
              LOGISTICS
            </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 absolute top-0 left-0 z-0"
              style={{
                filter: "drop-shadow(0 4px 2px rgba(0, 0, 0, 0.3))",
              }}
            >
              LOGISTICS
            </span>
          </h2>

          <div className="flex justify-start mt-6 md:mt-8 lg:mt-12 mb-8 sm:mb-12">
            <Button
              label="REQUEST A QUOTE"
              size="homeButton"
              bgColor="#252F70"
              fontStyle="normal"
              onClick={handlePickup}
              className="extra-class-for-medium-button"
              type=""
            />
          </div>
        </div>

        {/* Image Section (desktop) */}
        <div className="hidden md:block md:w-1/2 lg:w-2/5 relative">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-auto object-cover md:max-w-sm lg:max-w-full lg:max-h-full"
            style={{ filter: "drop-shadow(4px 4px 4px rgba(2, 2, 2, 0.5))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
