import React from 'react';
import truck1 from '../assets/img/about-c1.png';
import truck2 from '../assets/img/about-c2.png';
import truck3 from '../assets/img/about-c3.png';

const AboutUs: React.FC = () => {
  return (
    <div id='about' className="container mx-auto px-4 lg:py-28 flex flex-col lg:flex-row font-lexend ">
      <div className="flex flex-col lg:flex-row lg:justify-start w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4 lg:pl-24 hidden lg:flex" style={{ height: '70vh' }}>
        <div className="flex flex-col space-y-4 ">
          <img
            src={truck3}
            alt="Pic 1"
            className="w-full lg:w-60 lg:h-1/2 h-auto object-cover rounded-lg"
          />
          <img
            src={truck2}
            alt="Pic 2"
            className="w-full lg:w-60 lg:h-1/2 h-auto object-cover rounded-lg"
          />
        </div>
        <img
          src={truck1}
          alt="Pic 3"
          className="w-full lg:w-96 h-auto object-cover rounded-lg"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-24 text-[#252F70] my-16 lg:mt-0" >
        <p className="text-xl font-medium mb-8">About Us</p>
        <h1 className="text-3xl text-gray-600  mb-8 text-primary">Transport and Logistics</h1>
        <p className="text-gray-500 text-md font-normal leading-relaxed">
          Welcome to Poseidon Distribution Inc. PDI is a family-owned transportation company with big business capability, yet a family working environment. Established in Auburn, WA in 2017, our teammates provide FTL, dry van, reefer (temperature controlled), and Flatbed Conestoga freights.
          <br /><br />
          <span className="font-bold">Trusted by Amazon</span>
          <br />
          We are a reliable Amazon Linehaul Contractor.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
