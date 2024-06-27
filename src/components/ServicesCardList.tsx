import React from 'react';
import Card from './ServicesCard';
import service1 from '../assets/img/Service-1.png';
import service2 from '../assets/img/service-2.png';
import service3 from '../assets/img/service-3.png';

const ServicesCardList: React.FC = () => {
  return (
    <div id='services' className="py-16">
      <h1 className="text-base md:text-xl lg:text-xl font-normal mb-2 text-[#252F70] text-center">SERVICES</h1>
      <h2 className="text-4xl md:text-4xl lg:text-4xl font-medium mb-8 text-[#252F70] text-center">Seamless Freight Services</h2>

      <div className="flex flex-wrap justify-center items-center space-x-0 space-y-6 lg:space-y-0 lg:space-x-12">
        <Card
          title="Carriers"
          description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
          imageSrc={service1}
        />
        <Card
          title="Brokers"
          description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
          imageSrc={service2}
        />
        <Card
          title="Shippers"
          description="Book with confidence knowing your goods will be handled by one of our 15,000 FTL."
          imageSrc={service3}
        />
      </div>
    </div>
  );
};

export default ServicesCardList;
