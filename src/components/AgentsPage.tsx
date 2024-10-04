import React from 'react';
import agentBanner from "../assets/img/agentbanner.png"; // Assuming this is your existing image
import agentSupport from '../assets/img/agent-support.png'; // Path to the newly uploaded image
import iProcess from '../assets/img/illustration-process.png'; // Path to the second newly uploaded image

const AgentsPage = () => {
  const getTransformStyles = () => {
    if (window.innerWidth < 640) {
      return { transform: 'translateY(29%) translateX(5%)' }; // Adjust for small screens (sm)
    } else if (window.innerWidth < 1024) {
      return { transform: 'translateY(25%) translateX(5%)' }; // Adjust for medium screens (md)
    } else {
      return { transform: 'translateY(20.5%) translateX(9%)' }; // Default for large screens (lg+)
    }
  };

  return (
    <div>
      {/* Section 1: Become an Agent */}
      <div className="bg-darkBlue text-white py-12 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row justify-between items-center">
  {/* Left Side: Text Section */}
  <div className="space-y-8 lg:px-20 text-center lg:text-left">
    {/* Title */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      Become an <br />
      <span className="text-yellow-400">AGENT</span>
    </h1>
    {/* Description */}
    <p className="text-sm sm:text-lg font-normal">
      Freight Solutions empowers every agent to run their own business,
      supported by the extensive resources of a major enterprise.
    </p>
    {/* Apply Button */}
    <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-md hover:bg-yellow-500 transition">
      APPLY NOW
    </button>
  </div>

  {/* Right Side: Image Section */}
  <div className="relative w-full lg:w-auto flex justify-end mt-6 lg:mt-0">
    <img
      src={agentBanner}
      alt="Agents working together"
      className="w-full lg:w-auto h-auto max-w-full max-h-full object-cover"
      style={getTransformStyles()}
    />
  </div>
</div>

      {/* Section 2: Agent Support */}
      <div className="bg-white text-blue-900 py-16 px-4 sm:px-8 flex flex-col lg:flex-row justify-between items-center">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src={agentSupport}
            alt="Agent support conversation"
            className="w-full max-w-[650px] h-auto object-cover"
          />
        </div>

        {/* Right Side: Text Section */}
        <div className="space-y-4 w-full lg:w-1/2">
          <p className="text-xl sm:text-2xl text-darkBlue text-justify">
            Our independent agents at Poseidon Freight offer personalized local
            service, supported by our extensive global resources for stability
            and strength.
          </p>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 font-bold">🟨</span>
              <p className="font-semibold text-darkBlue text-lg">
                No Limits To Your Earnings
              </p>
            </div>
            <p className="font-normal text-darkBlue">
              At Poseidon Freight, there are no limits to what you can earn. Our
              business model is designed to support your growth, enabling you to
              elevate your business and earnings.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 font-bold">🟨</span>
              <p className="font-semibold text-darkBlue text-lg">
                Freedom To Define Your Priorities
              </p>
            </div>
            <p className="font-normal text-darkBlue">
              Running your own business with Poseidon Freight gives you the
              freedom to set your own priorities. It means operating on your
              terms, fitting into the lifestyle you choose.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 font-bold">🟨</span>
              <p className="font-semibold text-darkBlue text-lg">
                Support From Freight Solutions For Your Success
              </p>
            </div>
            <p className="font-normal text-darkBlue">
              Poseidon Freight provides the support you need to succeed. As an
              industry leader, we are dedicated to helping your freight agency
              thrive.
            </p>
          </div>
          <p className="font-normal text-darkBlue">
            Call 888-949-2880 for more details about becoming a freelance Freight
            Solutions agent or opening your own agency.
          </p>
        </div>
      </div>

      {/* Section 3: How Does The Agent Model Work */}
      <div>
        <h2 className="text-center text-darkBlue text-xl sm:text-2xl md:text-3xl font-medium mb-6">
          How Does The Agent Model Work At Freight Solutions?
        </h2>
        <div
          className="flex flex-col lg:flex-row justify-between items-stretch text-white p-6 sm:p-8 md:p-12"
          style={{ background: "linear-gradient(to right, #1B4980 85%, #FFCC00 15%)" }}
        >
          <p className="text-sm sm:text-md md:text-lg w-full lg:w-3/4 font-normal ml-0 lg:ml-20 text-justify">
            The agent model at Poseidon Freight operates by empowering independent
            business owners to deliver personalized service at the local level. These
            agents utilize Freight Solutions' extensive resources and global network
            to support their operations. This model ensures flexibility, local
            expertise, and access to comprehensive logistical support, all
            contributing to the success of each agent's business.
          </p>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="w-full flex justify-center p-10 sm:p-16 lg:p-20">
        <img
          src={iProcess}
          alt="Agent support conversation"
          className="w-full max-w-4xl lg:max-w-7xl h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default AgentsPage;
