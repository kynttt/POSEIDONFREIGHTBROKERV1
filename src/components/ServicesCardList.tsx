import React from 'react';
import { useInView } from 'react-intersection-observer';
import Card from './ServicesCard';
import service1 from '../assets/img/Service-1.png';
import service2 from '../assets/img/service-2.png';
import service3 from '../assets/img/service-3.png';

const ServicesCardList: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div id='services' className="py-16">
      <h1 className="text-base md:text-xl lg:text-xl font-normal mb-2 text-[#252F70] text-center">SERVICES</h1>
      <h2 className="text-4xl md:text-4xl lg:text-4xl font-medium mb-8 text-[#252F70] text-center">Seamless Freight Services</h2>

      <div 
        ref={ref} 
        className={`flex flex-wrap justify-center items-center transition-transform duration-1000 
                    ${inView ? 'md:transform-none md:opacity-100' : 'md:transform md:translate-y-20 md:opacity-0'}`}
      >
        <div className="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-6">
          <Card
            title="Carriers"
            description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
            imageSrc={service1}
          />
        </div>
        <div className="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-6">
          <Card
            title="Brokers"
            description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
            imageSrc={service2}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Card
            title="Shippers"
            description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
            imageSrc={service3}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesCardList;
