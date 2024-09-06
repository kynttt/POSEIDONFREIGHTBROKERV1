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
    <div id="services" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-start">
          <h2 className="text-lg tracking-tight text-primary tracking-wider font-normal">
            Services
          </h2>
          <p className="mt-4 text-3xl text-gray-600 tracking-wider text-primary">
            Seamless Freight Services
          </p>
        </div>
      </div>
      <div ref={ref} className={`flex flex-col md:flex-row justify-between items-center px-6 md:px-32 mt-10 md:mt-16 mb-16 transition-transform duration-1000 ${inView ? 'md:transform-none md:opacity-100' : 'md:transform md:translate-y-20 md:opacity-0'}`}>
        <div className="w-full md:w-1/3 text-center mb-4 md:mb-10">
          <img src={carriersImage} alt="Carriers" className="mx-auto mb-10" />
          <p className="sub-head">
            Carriers
          </p>
          <p className="subhead-label">
            Tailored Carrier Services to Fit <br/> Your Business
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-4 md:mb-10">
          <img src={brokersImage} alt="Brokers" className="mx-auto mb-10" />
          <p className="sub-head">
            Brokers
          </p>
          <p className="subhead-label">
            Driving Your Business Forward <br/>with Expert Logistics Support
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-4 md:mb-10">
          <img src={shippersImage} alt="Shippers" className="mx-auto mb-10" />
          <p className="sub-head">
            Shippers
          </p>
          <p className="subhead-label">
            Optimizing Your Shipping Process <br/>for Maximum Efficiency
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeamlessFreightServices;
