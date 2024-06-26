import React from 'react';
import HeroBanner from '../assets/img/HeroBanner.png';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-2 py-12 flex flex-col lg:flex-row font-lexend" style={{ paddingTop: '5rem'}}>
      <div className="w-full flex flex-col items-center lg:items-start mb-8 lg:mb-0">
        <div className="flex flex-col lg:flex-row lg:justify-start w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Conditionally render Pic 1 and Pic 2 based on screen size */}
          <div className="flex flex-col space-y-4">
            <img 
              src={HeroBanner} 
              alt="Pic 1" 
              className="w-full lg:w-auto h-auto object-cover hidden lg:block" 
              style={{ maxWidth: '280px', height: '290px', borderRadius: '10px' }} 
            />
            <img 
              src={HeroBanner} 
              alt="Pic 2" 
              className="w-full lg:w-auto h-auto object-cover hidden lg:block" 
              style={{ maxWidth: '280px', height: '290px', borderRadius: '10px' }} 
            />
          </div>
          {/* Always render Pic 3 */}
          <img 
            src={HeroBanner} 
            alt="Pic 3" 
            className="w-full lg:w-auto h-auto object-cover" 
            style={{ maxWidth: '410px', maxHeight: '595px', borderRadius: '10px' }} 
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-2rem" style={{ color: '#252F70', marginBottom: '16rem', marginRight: '0'}}>
        <p className="text-3xl mb-4" style={{ fontWeight: 'bold' }}>About Us</p>
        <h1 className="text-4xl font-bold mb-4 text-primary">Transport and Logistics</h1>
        <p className="text-2xl leading-relaxed" style={{ fontWeight: 'normal' }}>
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
