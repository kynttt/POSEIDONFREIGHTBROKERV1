import React from 'react';
import HeroBanner from '../assets/img/HeroBanner.png';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row font-lexend">
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
        <div className="flex flex-col lg:flex-row lg:justify-start w-full lg:w-auto">
          <div className="flex flex-col">
            <img 
              src={HeroBanner} 
              alt="Pic 1" 
              className="w-full lg:w-auto h-auto mb-4 lg:mb-0 lg:mr-4 object-cover" 
              style={{ width: '250px', height: '260px', marginBottom: '16px' }} 
            />
            <img 
              src={HeroBanner} 
              alt="Pic 2" 
              className="w-full lg:w-auto h-auto object-cover" 
              style={{ width: '250px', height: '260px' }} 
            />
          </div>
          <img 
            src={HeroBanner} 
            alt="Pic 3" 
            className="w-full lg:w-auto h-auto object-cover" 
            style={{ width: '450px', height: '535px', marginLeft: '16px' }} 
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-8 mt-8 lg:mt-0">
        <p className="text-2xl mb-4" style={{ fontWeight: '400' }}>About Us</p>
        <h1 className="text-3xl font-bold mb-4">Transport and Logistics</h1>
        <p className="text-lg leading-relaxed" style={{ fontWeight: '300' }}>
          Welcome to Poseidon Distribution Inc. PDI is a Family owned transportation company with big business capability, yet a family working environment. Established in Auburn, WA in 2017, our teammates provides FTL, dry van, reefer (temperature controlled) and Flatbed Conestoga freights.
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
