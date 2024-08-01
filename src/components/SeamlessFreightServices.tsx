import React from 'react';
import { useInView } from 'react-intersection-observer';
import carriersImage from '../assets/img/carriers.png';
import brokersImage from '../assets/img/brokers.png';
import shippersImage from '../assets/img/shippers.png';

const SeamlessFreightServices: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div id='services' className="py-5 bg-white">
      <div className="text-left px-6 md:px-32 ">
        <h1 className="lg:px-8 text-base md:text-xl lg:text-xl font-normal mb-2 text-[#252F70]">SERVICES</h1>
        <h2 className="lg:px-8 text-4xl md:text-4xl lg:text-4xl font-medium mb-8 text-[#252F70]">Seamless Freight Services</h2>
      </div>

      <div ref={ref} className={`flex flex-col md:flex-row justify-between items-center px-6 md:px-32 mt-10 md:mt-16 mb-16 transition-transform duration-1000 ${inView ? 'md:transform-none md:opacity-100' : 'md:transform md:translate-y-20 md:opacity-0'}`}>
    <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
        <img src={carriersImage} alt="Carriers" className="mx-auto mb-4" />
        <p className="text-sm md:text-base lg:text-lg mb-2 text-primary mt-12">
            Carriers
        </p>
        <p className="text-lg font-light text-gray-500 mx-auto lg:w-1/2">
            Tailored Carrier Services to Fit Your Business
        </p>
    </div>
    <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
        <img src={brokersImage} alt="Brokers" className="mx-auto mb-4" />
        <p className="text-sm md:text-base lg:text-lg mb-2 text-primary mt-12">
            Brokers
        </p>
        <p className="text-lg font-light text-gray-500 mx-auto lg:w-1/2">
            Driving Your Business Forward with Expert Logistics Support
        </p>
    </div>
    <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
        <img src={shippersImage} alt="Shippers" className="mx-auto mb-4" />
        <p className="text-sm md:text-base lg:text-lg mb-2 text-primary mt-12">
            Shippers
        </p>
        <p className="text-lg font-light text-gray-500 mx-auto lg:w-1/2">
            Optimizing Your Shipping Process for Maximum Efficiency
        </p>
    </div>
</div>

    </div>
  );
};

export default SeamlessFreightServices;
