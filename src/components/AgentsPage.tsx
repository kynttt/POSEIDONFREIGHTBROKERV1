import React from 'react';
import agentBanner from "../assets/img/agentbanner.png"; // Assuming this is your existing image
import agentSupport from '../assets/img/agent-support.png'; // Path to the newly uploaded image
import iProcess from '../assets/img/illustration-process.png'; // Path to the second newly uploaded image

const AgentsPage = () => {
  return (
    <div>
      {/* Section 1: Become an Agent */}
      <div className="bg-darkBlue text-white py-12 px-8 flex justify-between items-center">
        {/* Left Side: Text Section */}
        <div className="space-y-8 px-20">
          {/* Title */}
          <h1 className="text-5xl font-bold">
            Become an <br /><span className="text-yellow-400">AGENT</span>
          </h1>
          {/* Description */}
          <p className="text-lg font-normal">
            Freight Solutions empowers every agent to run their own business,
            supported by the extensive resources of a major enterprise.
          </p>
          {/* Apply Button */}
          <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-md hover:bg-yellow-500 transition">
            APPLY NOW
          </button>
        </div>

        {/* Right Side: Image Section */}
        <div className="relative w-full flex justify-end px-auto">
  {/* Group Image */}
  <img
    src={agentBanner}
    alt="Agents working together"
    className="relative w-auto h-auto max-w-full max-h-full object-cover"
    style={{ transform: 'translateY(18.5%) translateX(5%)' }}
  />
</div>

      </div>

      {/* Section 2: Agent Support */}
      <div className="bg-white text-blue-900 py-16 px-8 flex justify-between items-center">
        {/* Left Side: Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src={agentSupport}
            alt="Agent support conversation"
            className="w-[650px] h-auto object-cover"
          />
        </div>

        {/* Right Side: Text Section */}
        <div className="space-y-4 w-1/2">
          <p className="text-2xl text-darkBlue">
            Our independent agents at Poseidon Freight offer personalized local
            service, supported by our extensive global resources for stability
            and strength.
          </p>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 font-bold">🟨</span>
              <p className="font-semibold text-darkBlue text-lg">No Limits To Your Earnings</p>
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
              <p className="font-semibold text-darkBlue text-lg">Freedom To Define Your Priorities</p>
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
              <p className="font-semibold text-darkBlue text-lg">Support From Freight Solutions For Your Success</p>
            </div>
            <p className="font-normal text-darkBlue">
              Poseidon Freight provides the support you need to succeed. As an
              industry leader, we are dedicated to helping your freight agency
              thrive.
            </p>
          </div>
          <p className="font-normal text-darkBlue">Call 888-949-2880 for more details about becoming a freelance Freight Solutions agent or opening your own agency.</p>
        </div>
      </div>

      {/* Section 3: How Does The Agent Model Work */}
      <div className="">
        <h2 className="text-center text-darkBlue text-3xl font-medium mb-6">
          How Does The Agent Model Work At Freight Solutions?
        </h2>
        <div
          className="flex justify-between items-stretch text-white p-12"
          style={{ background: "linear-gradient(to right, #1B4980 85%, #FFCC00 15%)" }}
        >
          <p className="text-md w-3/4 font-normal ml-20">
            The agent model at Poseidon Freight operates by empowering independent
            business owners to deliver personalized service at the local level. These
            agents utilize Freight Solutions' extensive resources and global network
            to support their operations. This model ensures flexibility, local
            expertise, and access to comprehensive logistical support, all
            contributing to the success of each agent's business.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center p-20">
  <img
    src={iProcess}
    alt="Agent support conversation"
    className="w-full max-w-7xl h-auto object-cover"
  />
</div>

    </div>
  );
};

export default AgentsPage;
