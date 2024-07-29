import React from 'react';
import { useInView } from 'react-intersection-observer';
import aboutImage from '../assets/img/aboutagent.png';

const AboutAgentPage: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.5 });

  const faqs = [
    {
      answer: 'Our independent agents at Freight Solutions offer personalized local service, supported by our extensive global resources for stability and strength.',
    },
    {
      question: 'No Limits to Your Earnings',
      answer: 'At Freight Solutions, there are no limits to what you can earn. Our business model is designed to support your growth, enabling you to elevate your business and earnings.',
    },
    {
      question: 'Freedom to Define Your Priorities',
      answer: 'Running your own business with Freight Solutions gives you the freedom to set your own priorities. Its hard work, but it means operating on your terms, fitting into the lifestyle you choose.',
    },
    {
      question: 'Support from Freight Solutions for Your Success',
      answer: 'Freight Solutions provides the support you need to succeed. As an industry leader, were committed to your success and dedicated to helping your freight agency thrive.',
    },
    {
      answer: 'Call 888-949-2880 for more details about becoming a freelance Freight Solutions agent or opening your own agency.',
    },
  ];

  return (
    <div className="bg-white flex flex-col px-4 py-8 md:px-8 lg:px-32 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-8 lg:pl-28">
        {/* Image Section */}
        <div
          className={`text-center mb-8 lg:mb-0 lg:w-1/3 transition-transform duration-1000 ${
            imageInView ? 'transform-none opacity-100' : 'transform -translate-x-20 opacity-0'
          }`}
          ref={imageRef}
        >
          <img
            src={aboutImage}
            alt="FAQS"
            className="lg:w-full lg:h-full object-cover object-center mt-24"
          />
        </div>

        {/* FAQ Section */}
        <div
          className={`lg:w-2/3 mt-10 transition-transform duration-1000 ${
            contentInView ? 'transform-none opacity-100' : 'transform translate-x-20 opacity-0'
          }`}
          ref={contentRef}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-medium text-primary mb-4">{faq.question}</h2>
              <p className="text-gray-500 text-md font-thin mb-4 text-justify">{faq.answer}</p>
              {/* {index < faqs.length - 1 && <hr className="mt-6" />} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutAgentPage;
