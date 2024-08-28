import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import heroTruck from "../assets/img/hero-truck.jpg";
import FreightQuote2 from "./FreightQuote2";

const HeroBanner: React.FC = () => {
  const trustRating = 95; // Example trust rating value

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroTruck})` }}
      />

      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 gap-4 text-white p-8 z-10">
        <div className="hidden lg:flex lg:mt-28 w-2/5 h-1/3 mx-auto text-white flex items-center justify-center">
          <div className="p-4 md:p-6 text-center bg-accentBg rounded-2xl shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
              TRUST RATING
            </h2>
            <div className="mx-6">
            <CircularProgressbar
              value={trustRating}
              text={`${trustRating}%`}
              strokeWidth={5} // Adjust the stroke width here
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#7783D2",
                trailColor: "#d6d6d6",
              })}
            />
            </div>
            <p className="mt-2 md:mt-4 text-xs md:text-sm font-light">
              Our dedication to reliable and efficient freight solutions
              builds lasting trust with shippers and carriers, ensuring
              every load is handled with the utmost care.
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-center lg:mt-6">
            Driving Your Business
          </h1>
          <h1 className="text-4xl md:text-5xl font-semibold text-center lg:mt-6">
            Forward
          </h1>
        </div>

        <div className="hidden lg:flex italic w-2/3 mx-auto flex items-center lg:mb-52 font-normal text-xl">
          Connecting Shippers and Carriers with Precision, Reliability, and
          Unmatched Expertise, Ensuring Your Cargo Moves Safely and
          Efficiently Across Every Mile.
        </div>
      </div>

      <div className="shadow-2xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/5 border border-purple-50 border-opacity-5 rounded-2xl absolute bottom-20 sm:bottom-28 md:bottom-44 left-1/2 transform -translate-x-1/2 py-8 sm:py-10 md:py-12 px-6 sm:px-12 lg:px-20 text-white z-20 bg-gray-900/50 backdrop-blur-sm">
  <FreightQuote2/>
</div>



    </div>
  );
};

export default HeroBanner;
