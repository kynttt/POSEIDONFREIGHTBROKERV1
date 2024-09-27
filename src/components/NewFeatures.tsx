import React from 'react';
import carrierImage from "../assets/img/about-img.png";
import feat1Image from "../assets/img/feat1.png";
import feat2Image from "../assets/img/feat2.png";
import feat3Image from "../assets/img/feat3.png";

const FreightFeatures: React.FC = () => {
  return (
    <section className="bg-white  flex flex-col justify-center items-center leading-tight lg:py-20">
      {/* Title Section */}
      <h2 className="text-5xl font-semibold text-center text-rblue md:w-1/2 mb-16 ">
        Navigate Your Shipping Needs with Confidence: <span className="text-yellow-500">Reliable, Rapid, Ready!</span>
      </h2>

      <div className="bg-white">
        <div className="sm:px-auto lg:px-auto">
          <div>
            {/* Left Side (Images and Transport & Logistics Section) */}
            <div className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
              <img
                src={carrierImage}
                alt="Truck rear view"
                className="h-auto w-full object-cover rounded-r-xl"
              />
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl text-rblue font-bold text-gray-800 md:px-12">
                  Transport & Logistics
                </h2>
                <p className="py-12 px-4 text-nblue font-normal text-gray-700 md:px-16 sm:mx-4 text-justify leading-relaxed">
                  <span className="font-bold">Welcome to Poseidon Distribution Inc. (PDI)!</span> <br />
                  A family-owned transportation company where we combine the strength and efficiency of a large business with the warmth and close-knit atmosphere of a family working environment. Since our establishment in Auburn, WA in 2017, we have been committed to delivering exceptional service and building long-lasting relationships with our clients. At PDI, we pride ourselves on our ability to meet diverse transportation needs, providing solutions that ensure your cargo reaches its destination safely and on time.
                  <br />
                  <br />
                  Our services cover a wide range of freight types, including Full Truckload (FTL), dry van, reefer (temperature-controlled), and flatbed Conestoga freights, making us a versatile partner for businesses across various industries. Whether you require transportation for perishable goods, construction materials, or general cargo, our experienced team is dedicated to tailoring solutions that fit your unique requirements. With a strong focus on reliability and customer satisfaction, Poseidon Distribution Inc. continues to be a trusted name in the transportation industry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side (Flat Rate Quotes Section) */}

          <div>
            <div className="space-y-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex flex-col justify-center lg:pl-60 lg:pr-16 sm:mx-20">
                <h2 className="text-3xl text-rblue font-bold text-gray-800 py-6 pr-6">Flat Rate Quotes</h2>
                <ul className="space-y-4 leading-relaxed">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
                      The freight quotes you receive are flat rates determined by
                      the shipment’s date, distance, and trailer type.
                    </p>
                  </li>
                  <li className="flex items-start ">
                    <div className="flex-shrink-0 ">
                      <svg
                        className="h-8 w-8 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
                      These are not estimates, but real, market-based quotes that
                      you can book immediately.
                    </p>
                  </li>
                </ul>
              </div>

              <img
                src={feat1Image}
                alt="Truck rear view"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div>
            {/* Left Side (Book Shipments Section) */}
            <div className="space-y-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
  {/* Content Section */}
  <div className="order-2 lg:order-1 mt-8 flex flex-col justify-center leading-relaxed">
    <img
      src={feat2Image}
      alt="Truck rear view"
      className="h-auto w-full object-cover"
    />
  </div>

  {/* Text Section */}
  <div className="order-1 lg:order-2 flex flex-col justify-center items-start sm:mx-20  lg:pr-60 lg:pl-16">
    <h2 className="text-3xl text-rblue font-bold text-gray-800 py-6 pr-6 ">
      Book Shipment Instantly
    </h2>
    <ul className="mt-4 space-y-4">
      <li className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
          Booking at your quoted rate is just a couple of clicks away.
        </p>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
          If you don't have an account, creating one takes less than 5 minutes.
        </p>
      </li>
    </ul>
  </div>
</div>

          </div>


          {/* Right Side (24/7 Support) */}

          <div>
            <div className="space-y-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex flex-col justify-center lg:pl-60 lg:pr-16 sm:mx-20 sm:my-12">
                <h2 className="text-3xl text-rblue font-bold text-gray-800 py-6 pr-6">Get 24/7 Support</h2>
                <ul className="space-y-4 leading-relaxed">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8  text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
                      We’ll keep you informed every step of the way, from the moment the Bill of Lading (BOL) is generated until the carrier uploads the Proof of Delivery (POD).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-nblue font-normal text-gray-600 text-justify">
                      Real-time updates and transparent communication, you'll have full visibility into your shipment’s journey, ensuring peace of mind as you track your freight seamlessly from dispatch to delivery.
                    </p>
                  </li>
                </ul>
              </div>

              <img
                src={feat3Image}
                alt="Truck rear view"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>


        </div>
      </div>

    </section>
  );
};

export default FreightFeatures;
