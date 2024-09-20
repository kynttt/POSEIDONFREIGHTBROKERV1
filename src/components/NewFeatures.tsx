import React from 'react';
import feat1Image from "../assets/img/feat1.png";
import feat2Image from "../assets/img/feat2.png";
import feat3Image from "../assets/img/feat3.png";

const FreightFeatures: React.FC = () => {
  return (
    <section className="container mx-auto my-32 bg-white  flex flex-col justify-center items-center">
      {/* Title Section */}
      <h2 className="text-5xl font-medium text-center text-rblue w-3/4 mb-16">
        Where <span className="text-blue-500">Your Freight Meets</span> the Open Road: Reliable, Rapid, Ready!
      </h2>

      <div className="mt-12 space-y-12 md:space-y-12 md:grid md:grid-cols-1 lg:grid-cols-1 gap-12 px-6 lg:px-16">
        
        {/* First Section: Flat Rate Quotes */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-6 lg:space-y-0 lg:space-x-16">
          <div className="lg:w-1/2  ">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Flat Rate Quotes</h3>
            <p className="text-nblue font-normal">
              The freight quotes you'll get are flat rates based on a shipment's date, distance, and trailer type. 
              These aren't estimates, but actual market-based quotes you can book.
            </p>
          </div>
          <img src={feat1Image} alt="Flat Rate Quotes" className="lg:w-1/2 object-cover" />
        </div>

        {/* Second Section: Book Shipment Instantly */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-center space-y-6 lg:space-y-0 lg:space-x-16 lg:space-x-reverse">
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Book Shipment Instantly</h3>
            <p className="text-nblue font-normal">
              Booking at your quoted rate only takes a couple of clicks. If you don't have an account, creating one takes less than 5 minutes.
            </p>
          </div>
          <img src={feat2Image} alt="Book Shipment Instantly" className="lg:w-1/2 object-cover" />
        </div>

        {/* Third Section: Get 24/7 Support */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-6 lg:space-y-0 lg:space-x-16">
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Get 24/7 Support</h3>
            <p className="text-nblue font-normal">
              We'll keep you updated from the moment the BOL is generated to the second the carrier uploads the POD.
            </p>
          </div>
          <img src={feat3Image} alt="Get 24/7 Support" className="lg:w-1/2 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default FreightFeatures;
