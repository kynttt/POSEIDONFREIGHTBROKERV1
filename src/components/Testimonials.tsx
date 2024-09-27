import { useEffect, useRef } from 'react';
import testimonial1 from "../assets/img/testimonial1.png";
import testimonial2 from "../assets/img/testimonial2.png";

const TrustedByAmazon = () => {
  return (
    <div className="w-full relative">
      {/* Blue Section */}
      <div style={{ backgroundColor: '#1B4980' }} className="text-white py-16 min-h-[40vh]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Trusted by Amazon</h2>
          <p className="text-white font-normal leading-normal mt-12">
            We are a reliable Amazon Linehaul Contractor. Fantastic Ratings
          </p>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="absolute left-0 right-0 mx-auto transform translate-y-[-50%] flex justify-center space-x-10">
        {/* Testimonial 1 */}
        <div className="relative bg-white text-black rounded-sm shadow-lg p-6 max-w-xl flex items-center">
          <img
            className="rounded-sm w-[250px] h-[250px] mr-4"
            src={testimonial1}
            alt="Grey Mudson"
          />
          <div>
            <p className="font-normal p-6 text-rblue">
              "The team provided exceptional support and communication throughout our freight journey. It made all the difference!"
            </p>
            <div className="mt-4 p-6">
              <p className="font-bold text-sblue">Grey Mudson</p>
              <p className="text-sm text-sblue font-normal">Business Owner</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="relative bg-white text-black rounded-sm shadow-lg p-6 max-w-xl flex items-center">
          <img
            className="rounded-sm w-[250px] h-[250px] mr-4"
            src={testimonial2}
            alt="Madison Blue"
          />
          <div>
            <p className="flex font-normal p-6 text-sblue items-center">
              "Thanks to this service, we streamlined our shipping process and reduced costs significantly. Highly recommend!"
            </p>
            <div className="mt-4 p-6">
              <p className="font-bold text-rblue">Madison Blue</p>
              <p className="text-sm text-rblue font-normal">Business Owner</p>
            </div>
          </div>
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white text-center py-32 mt-32">
        <div className="flex justify-center space-x-16">
          {/* Statistic 1 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">89%</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>

          {/* Statistic 2 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">5000+</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>

          {/* Statistic 3 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">45+</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByAmazon;
