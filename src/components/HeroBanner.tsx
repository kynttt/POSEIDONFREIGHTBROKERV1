import React from "react";
import heroBanner from "../assets/img/new-hero.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mantine/core";

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate("/distance-calculator");
  };

  return (
    <div
      className="relative flex flex-col md:flex-row justify-between items-start px-10 lg:px-20 lg:w-full h-[80vh] "
      // className="relative flex flex-col md:flex-row justify-between items-start px-6 md:px-12 lg:px-24 xl:px-32 lg:w-full lg:h-5/6 md:h-5/6 md:h-1/2 sm:h-1/2 overflow-hidden"
      style={{
        background: "linear-gradient(-180deg, #adb4e4 0%, #ffffff 90%)",
      }}
    >
      {/* Image Section (full cover) */}
      <img
        src={heroBanner}
        alt="Hero Banner"
        className="absolute inset-0 w-full lg:mt-12 h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(173, 180, 228, 0.8) 0%, transparent 100%)",
        }}
      />

      <Stack className="z-10 h-full w-full" justify="center">
        <Stack className="" justify="center" w="full" gap={0}>
          <h1
            className="lg:text-7xl text-5xl  font-medium text-white"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 2, 0.6)" }}
          >
            TRANSPORT
          </h1>
          <h2 className="lg:text-7xl text-5xl font-black mt-2 mb-5 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 relative z-10">
              LOGISTICS
            </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 absolute top-0 left-0 z-0"
              style={{
                filter: "drop-shadow(0 4px 2px rgba(0, 0, 0, 0.6))",
              }}
            >
              LOGISTICS
            </span>
          </h2>
        </Stack>

        <Button
          label="REQUEST A QUOTE"
          size="homeButton"
          bgColor="#252F70"
          fontStyle="normal"
          onClick={handlePickup}
          className="extra-class-for-medium-button"
          type=""
        />
      </Stack>
      {/* 
      <div className="relative flex flex-col md:flex-row items-start justify-between w-full lg:h-full mt-5 lg:py-14 lg:px-28 z-10">
        <div className="flex-1 md:mt-12 lg:mt-32 sm:mt-8">
          <h1
            className="text-3xl md:text-5xl xl:text-6xl font-medium text-white"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 2, 0.6)" }}
          >
            TRANSPORT
          </h1>

          <h2 className="text-2xl md:text-4xl xl:text-6xl font-black mt-2 mb-5 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 relative z-10">
              LOGISTICS
            </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 absolute top-0 left-0 z-0"
              style={{
                filter: "drop-shadow(0 4px 2px rgba(0, 0, 0, 0.6))",
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
      </div> */}
    </div>
  );
};

export default HeroBanner;
