import React from "react";
import heroBanner from "../assets/img/hero.png"; // Adjust the path relative to your project structure
import Button from "./Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HeroBanner: React.FC = () => {
  const navigate = useNavigate(); // Get navigate function from React Router

  const handlePickup = () => {
    // Navigate to '/distance-calculator' when a truck button is clicked
    navigate("/distance-calculator");
  };

  return (
    <div
      className="relative flex flex-col md:flex-row justify-between items-start px-6 md:px-12 w-full h-screen"
      style={{
        background: "linear-gradient(-180deg, #7783D2 13%, #F0F0F0 83%)",
      }}
    >
      <div className="flex flex-col md:flex-row items-start justify-between w-full h-full">
        {/* Content Section */}
        <div className="text-left md:px-30 lg:px-40 mt-24 md:mt-32 lg:mt-48 z-10">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 2, 0.3)" }}
          >
            TRANSPORT
          </h1>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mt-2 mb-5 relative">
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 relative z-10"
              style={{ zIndex: 10 }}
            >
              LOGISTICS
            </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 absolute top-0 left-0 z-0"
              style={{
                filter: "drop-shadow(0 4px 2px rgba(0, 0, 0, 0.3))",
                zIndex: 0,
              }}
            >
              LOGISTICS
            </span>
          </h2>

          <div className="flex justify-start mt-6 md:mt-8 lg:mt-12">
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

        {/* Image Section */}
        <div className="flex items-center justify-center w-full md:w-[60%] lg:w-[45%] xl:w-[40%] h-auto">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-auto object-contain"
            style={{ filter: "drop-shadow(10px 10px 6px rgba(2, 2, 2, 0.5))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
