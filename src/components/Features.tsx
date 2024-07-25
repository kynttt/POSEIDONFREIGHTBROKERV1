import React from 'react';
import { useInView } from 'react-intersection-observer';
import freightImage from '../assets/img/freight.png';

const FeaturesSection: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: textRef1, inView: textInView1 } = useInView({ threshold: 0.5 });
  const { ref: textRef2, inView: textInView2 } = useInView({ threshold: 0.5 });
  const { ref: textRef3, inView: textInView3 } = useInView({ threshold: 0.5 });

  return (
    <div className="bg-white flex flex-col items-center lg:flex-row lg:items-start px-4 md:px-8 lg:px-36 lg:py-8">
      {/* Image Section */}
      <div
        className={`w-full lg:w-1/3 text-center mb-8 transition-transform duration-1000 ${
          imageInView ? 'transform-none opacity-100' : 'transform -translate-x-20 opacity-0'
        }`}
        ref={imageRef}
      >
        <div id="features" className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <div className="text-start">
              <h2 className="text-lg tracking-tight text-primary tracking-wider font-normal">
                FEATURES
              </h2>
              <p className="mt-4 text-3xl text-gray-600 tracking-wider text-primary">
                How it works
              </p>
            </div>
          </div>
          {/* Image display with responsive margin and padding */}
          <div className="mt-8 lg:mt-24 flex justify-center px-6 lg:px-0">
            <img
              src={freightImage}
              alt="Freight"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-2/3 mt-8 lg:mt-18">
        <div className="lg:mt-36 flex flex-col lg:grid lg:grid-cols-2 gap-20">
          <div
            className={`bg-white transition-transform duration-1000 ${
              textInView1 ? 'transform-none opacity-100' : 'transform translate-x-20 opacity-0'
            }`}
            ref={textRef1}
          >
            <h3 className="text-lg font-bold text-primary text-center">
              FLAT RATE QUOTES
            </h3>
            <p className="mt-2 font-normal text-base text-gray-500 py-2 text-center">
              The freight quotes you’ll get are flat rates based on a shipment’s
              date, distance, and trailer type. These aren’t estimates, but
              actual market-based quotes you can book.
            </p>
          </div>

          <div
            className={`bg-white transition-transform duration-1000 ${
              textInView2 ? 'transform-none opacity-100' : 'transform translate-x-20 opacity-0'
            }`}
            ref={textRef2}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary text-center">
                BOOK SHIPMENTS INSTANTLY
              </h3>
              <p className="mt-2 font-normal text-base text-gray-500 py-2 text-center">
                Booking at your quoted rate only takes a couple of clicks. If
                you don’t have an account, creating one takes less than 5
                minutes.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`bg-white text-center my-20 transition-transform duration-1000 ${
            textInView3 ? 'transform-none opacity-100' : 'transform translate-x-20 opacity-0'
          }`}
          ref={textRef3}
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary">
              GET 24/7 SUPPORT
            </h3>
            <p className="mt-2 font-normal text-base text-gray-500 py-2 text-center">
              We’ll keep you updated from the moment the BOL is 
              generated to<br /> the second the carrier uploads the POD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
