import React from 'react';
import { useInView } from 'react-intersection-observer';
import AboutImage from '../assets/img/aboutus.png';

const AgentModel: React.FC = () => {
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
        {/* <p className="text-xl font-medium mb-4 lg:mb-8">About Us</p> */}
        <h1 className="lg:ml-8 text-3xl text-gray-600 mb-4 lg:mb-12 text-primary">How Does the Agent Model Work at Freight Solutions?</h1>
        <p className="lg:ml-8 text-gray-500 text-md font-normal leading-relaxed text-justify">
        The agent model at Freight Solutions operates by empowering independent business owners to deliver personalized service at the local level. These agents utilize Freight Solutions' extensive resources and global network to support their operations. This model ensures flexibility, local expertise, and access to comprehensive logistical support, all contributing to the success of each agent's business.
        </p>
      </div>
    </div>
  );
};

export default AgentModel;
