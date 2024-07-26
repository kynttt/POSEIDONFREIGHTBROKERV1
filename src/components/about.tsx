import React from 'react';
import { useInView } from 'react-intersection-observer';
import AboutImage from '../assets/img/aboutus.png';

const AboutUs: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.5 });

  return (
    <div className="bg-[#eaeefa] flex flex-col lg:flex-row items-center lg:items-center px-4 md:px-8 lg:px-20 xl:px-32">
      {/* Image Section */}
      <div
        className={`w-full lg:w-2/3 flex justify-end items-center mb-10 lg:order-last transition-transform duration-1000 ${
          imageInView ? 'transform-none opacity-100' : 'transform translate-x-20 opacity-0'
        }`}
        ref={imageRef}
      >
        <img
          src={AboutImage}
          alt="About Us"
          className="lg:w-4/5 h-auto lg:max-h-full object-cover object-center"
        />
      </div>

      {/* Content Section */}
          
      <div
        className={`w-full lg:w-1/3 flex flex-col justify-center text-[#252F70] max-w-prose lg:ml-2px lg:mt-16 mb-5 transition-transform duration-1000 ${
          textInView ? 'transform-none opacity-100' : 'transform -translate-x-20 opacity-0'
        }`}
        ref={textRef}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <div className="text-start">
              <h2 className="text-lg tracking-tight text-primary tracking-wider font-normal">
                About Us
              </h2>
              <p className="mt-4 text-3xl text-gray-600 tracking-wider text-primary">
              Transport and Logistics
              </p>
              <p className="mt-4 text-gray-500 text-md font-normal leading-relaxed text-justify">
          Welcome to Poseidon Distribution Inc. (PDI)! Based in Auburn, WA since 2017, PDI is a family-owned transportation company that merges the capabilities of a large business with the warmth of a family-oriented work culture. Our skilled team provides Full Truckload (FTL) services, including dry van, temperature-controlled reefer, and Flatbed Conestoga freights.
        </p>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;
