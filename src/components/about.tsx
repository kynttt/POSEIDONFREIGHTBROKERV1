import React from 'react';
import AboutImage from "../assets/img/aboutus.png";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#eaeefa] flex flex-col lg:flex-row items-center lg:items-center px-4 md:px-8 lg:px-20 xl:px-32  ">
      {/* Image Section */}
      
      <div className="w-full lg:w-2/3 flex justify-end items-center mb-10 lg:order-last">
        <img src={AboutImage} alt="About Us" className="lg:w-4/5 h-auto lg:max-h-full object-cover object-center  " />
      </div>

      {/* Content Section */}
      <div className=" w-full lg:w-1/3 flex flex-col justify-center text-[#252F70] max-w-prose lg:ml-2px lg:mt-16 mb-5">
        <p className="text-xl font-medium mb-4 lg:mb-8">About Us</p>
        <h1 className="lg:ml-8 text-3xl text-gray-600 mb-4 lg:mb-8 text-primary">Transport and Logistics</h1>
        <p className=" lg:ml-8 text-gray-500 text-md font-normal leading-relaxed text-justify">
          Welcome to Poseidon Distribution Inc. (PDI)! Based in Auburn, WA since 2017, PDI is a family-owned transportation company that merges the capabilities of a large business with the warmth of a family-oriented work culture. Our skilled team provides Full Truckload (FTL) services, including dry van, temperature-controlled reefer, and Flatbed Conestoga freights.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
