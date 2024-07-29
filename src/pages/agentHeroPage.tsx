import React from "react";
import agentBanner from "../assets/img/agentbanner.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AgentPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate("/distance-calculator");
  };

  return (
    <>
      <Navbar isAuthenticated={false} />

      <div
        className="relative flex flex-col md:flex-row justify-between items-start px-6 md:px-12 lg:px-24 xl:px-32 lg:w-full lg:h-5/6 md:h-5/6 sm:h-1/2"
        style={{
          background: "linear-gradient(-180deg, #adb4e4 0%, #ffffff 90%)",
        }}
      >
        {/* Parent container for both text content and image */}
        <div className="flex flex-col md:flex-row items-start justify-between w-full lg:h-full my-5 lg:py-14 lg:px-28">
          {/* Image Section (mobile first) */}
          <div className="md:hidden w-full relative mb-8">
            <img
              src={agentBanner}
              alt="Hero Banner"
              className="w-full h-auto object-cover"
              style={{ 
                height: "100%",
                width: "100%",
                filter: "drop-shadow(4px 4px 4px rgba(2, 2, 2, 0.5))" 
              }}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 md:mt-12 lg:mt-22 sm:mt-8 z-10 lg:mr-6">
            <h1
              className="text-3xl md:text-5xl xl:text-6xl font-medium text-primary"
              style={{ textShadow: "0px 4px 6px rgba(0, 0, 2, 0.3)" }}
            >
              Become an
            </h1>

            <h2 className="text-2xl md:text-4xl xl:text-6xl font-black mt-2 mb-5 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 relative z-10">
                AGENT
              </span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 absolute top-0 left-0 z-0"
                style={{
                  filter: "drop-shadow(0 4px 2px rgba(0, 0, 0, 0.3))",
                }}
              >
                AGENT
              </span>
            </h2>
            <p className="lg:text-base md:text-xl font-thin text-gray-500 justify-content mt-24">
              Freight Solutions empowers every agent to run <br />
              their own business, supported by the extensive<br/>
              resources of a major enterprise.
            </p>

            <div className="flex justify-start mt-6 md:mt-8 lg:mt-28 mb-8">
              <Button
                label="APPLY NOW"
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
          <div className="hidden md:block md:w-1/2 lg:w-1/2 relative mt-12">
            <img
              src={agentBanner}
              alt="Hero Banner"
              className="w-full h-auto object-cover"
              style={{ 
                // height: "100%",
                // width: "100%"
                height: "480px",
                width: "800px"
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentPage;
