import React from "react";
import "react-circular-progressbar/dist/styles.css";
import heroTruck from "../assets/img/hero-truck.png";
import FreightQuote2 from "./FreightQuote2";

const HeroBanner: React.FC = () => {

  return (
<div className="relative w-full overflow-hidden h-[90vh]">
  <div
    className="absolute inset-0 bg-cover bg-center rounded-b-[60px] bg-white"
    style={{ backgroundImage: `url(${heroTruck})` }}
  />
  <div
  className="absolute inset-0 rounded-b-[60px]"
  style={{
    background: "linear-gradient(to top, rgba(0, 28, 124, 0.7) 0%, rgba(0, 28, 124, 0) 60%)",
  }}
/>



  {/* Heading Section */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center z-30">
    <h1 className="text-4xl md:text-5xl font-black text-white">
      Driving Your Business F➤rward
    </h1>
  </div>

  {/* Descriptive Text */}
  <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-center z-30">
    <p className="italic font-normal text-lg sm:text-xl text-white">
      Connecting Shippers and Carriers with Precision, Reliability, and Unmatched Expertise, 
      Ensuring Your Cargo Moves Safely and Efficiently Across Every Mile.
    </p>
  </div>

  {/* Freight Quote Section */}
  <div className="shadow-2xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/5 border border-purple-50 border-opacity-5 rounded-2xl absolute bottom-20 sm:bottom-28 md:bottom-16 left-1/2 transform -translate-x-1/2 py-8 sm:py-10 md:py-12 px-6 sm:px-12 lg:px-20 z-20 bg-white">
    <FreightQuote2/>
  </div>
</div>


  );
};

export default HeroBanner;

