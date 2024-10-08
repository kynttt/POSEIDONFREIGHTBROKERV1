import React from "react";
import carrierImage from "../assets/img/about-img.png";
import feat1Image from "../assets/img/feat1.png";
import feat2Image from "../assets/img/feat2.png";
import feat3Image from "../assets/img/feat3.png";

const FreightFeatures: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-white  flex flex-col justify-center items-center leading-tight md:py-20 py-12"
    >
      {/* Title Section */}
      <h2 className="md:text-5xl xs:text-3xl px-4 font-semibold text-center text-darkBlue  ">
        Navigate Your Shipping Needs with
      </h2>
      <h2 className="md:px-8 text-darkBlue md:text-5xl xs:text-3xl font-semibold text-center  md:w-3/4 mb-4   p-4 mx-4 rounded-xl ">
        <span className="text-yellow-500">Fast, Reliable</span>, and <span className="text-yellow-500">24/7</span> Support Service 
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 md:mb-24 mb-8 items-center">
        <div className="p-4 bg-darkBlue rounded-lg text-yellow-400 flex justify-center items-center text-lg w-full sm:w-auto">
          Contact Us Now!
        </div>
        <div className="p-4 border-2 border-darkBlue rounded-lg text-darkBlue flex justify-center items-center text-lg w-full sm:w-auto">
          <i className="fas fa-phone-alt mr-4"></i>
          253-269-1300
        </div>
      </div>

      <div className="bg-white">
        <div className="sm:px-auto lg:px-auto">
          <div>
            {/* Left Side (Images and Transport & Logistics Section) */}
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
              <img
                src={carrierImage}
                alt="Truck rear view"
                className="h-auto w-full object-cover md:rounded-r-xl xs:rounded-r-md"
              />
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl text-rblue font-bold text-gray-800 md:px-12">
                  Transport & Logistics
                </h2>
                <p className="py-12 px-4 text-nblue font-normal text-gray-700 md:px-16 sm:mx-4 text-justify leading-relaxed ">
                  <span className="font-bold">
                    Welcome to Poseidon Distribution Inc. (PDI)!
                  </span>{" "}
                  <br />
                  A family-owned transportation company where we combine the
                  strength and efficiency of a large business with the warmth
                  and close-knit atmosphere of a family working environment.
                  Since our establishment in Auburn, WA in 2017, we have been
                  committed to delivering exceptional service and building
                  long-lasting relationships with our clients. At PDI, we pride
                  ourselves on our ability to meet diverse transportation needs,
                  providing solutions that ensure your cargo reaches its
                  destination safely and on time.
                  <br />
                  <br />
                  Our services cover a wide range of freight types, including
                  Full Truckload (FTL), dry van, reefer
                  (temperature-controlled), and flatbed Conestoga freights,
                  making us a versatile partner for businesses across various
                  industries. Whether you require transportation for perishable
                  goods, construction materials, or general cargo, our
                  experienced team is dedicated to tailoring solutions that fit
                  your unique requirements. With a strong focus on reliability
                  and customer satisfaction, Poseidon Distribution Inc.
                  continues to be a trusted name in the transportation industry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side (Flat Rate Quotes Section) */}

          <div className="container mx-auto ">
          <div className="md:text-5xl xs:text-4xl font-semibold md:text-center text-darkBlue md:w-1/2  md:mt-32 mb-8">
                How It Works?
              </div>
            <div>
              
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col justify-center  sm:mx-20">
                  <div className="flex items-center space-x-2 ">
                    <div className="md:mb-0 mb-4 flex items-center justify-center h-12 w-12 rounded-full text-darkBlue border-darkBlue border-4 text-3xl flex-shrink-0">
                      1
                    </div>
                    <div></div>
                    <h2 className="md:text-3xl text-2xl text-darkBlue font-bold  py-2 pr-6">
                      Flat Rate Quotes
                    </h2>
                  </div>
                  <ul className="space-y-4 leading-relaxed  border-darkBlue  md:p-8 md:ml-5">
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
                        The freight quotes you receive are flat rates determined
                        by the shipment’s date, distance, and trailer type.
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
                        These are not estimates, but real, market-based quotes
                        that you can book immediately.
                      </p>
                    </li>
                  </ul>
                </div>

                <img
                  src={feat1Image}
                  alt="Truck rear view"
                  className="h-auto md:w-4/5 w-full object-cover border-r-4  border-yellow-500"
                />
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              {/* Left Side (Book Shipments Section) */}

              <div className="  grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col justify-center  sm:mx-20">
                  <div className="flex items-center space-x-2">
                    <div className="md:mb-0 mb-4 flex items-center justify-center h-12 w-12 rounded-full text-darkBlue border-darkBlue border-4 text-3xl flex-shrink-0">
                      2
                    </div>
                    <div></div>
                    <h2 className="md:text-3xl text-2xl text-darkBlue font-bold  py-2 pr-6">
                      Book Instantly
                    </h2>
                  </div>
                  <ul className="space-y-4 leading-relaxed  border-darkBlue  md:p-8 md:ml-5">
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
                        Booking at your quoted rate is just a couple of clicks
                        away.
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
                        If you don't have an account, creating one takes less
                        than 5 minutes.
                      </p>
                    </li>
                  </ul>
                </div>

                <img
                  src={feat2Image}
                  alt="Truck rear view"
                  className="h-auto md:w-4/5  w-full object-cover border-r-4  border-darkBlue"
                />
              </div>
            </div>

            {/* Right Side (24/7 Support) */}

            <div className="mt-8 md:mt-0">
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col justify-center  sm:mx-20 sm:my-6">
                  <div className="flex items-center space-x-2">
                    <div className="md:mb-0 mb-4 flex items-center justify-center h-12 w-12 rounded-full text-darkBlue border-4 border-darkBlue text-3xl flex-shrink-0">
                      3
                    </div>
                    <div></div>
                    <h2 className="md:text-3xl text-2xl text-darkBlue font-bold  py-2 pr-6">
                      Get 24/7 Support
                    </h2>
                  </div>
                  <ul className="space-y-4 leading-relaxed  md:p-8 md:ml-5">
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
                        We’ll keep you informed every step of the way, from the
                        moment the Bill of Lading (BOL) is generated until the
                        carrier uploads the Proof of Delivery (POD).
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
                        Real-time updates and transparent communication, you'll
                        have full visibility into your shipment’s journey,
                        ensuring peace of mind as you track your freight
                        seamlessly from dispatch to delivery.
                      </p>
                    </li>
                  </ul>
                </div>

                <img
                  src={feat3Image}
                  alt="Truck rear view"
                  className="h-auto  md:w-4/5 w-full object-cover border-r-4  border-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreightFeatures;
