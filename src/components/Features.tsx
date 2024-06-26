import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg tracking-tight text-primary tracking-wider font-normal">
            FEATURES
          </h2>
          <p className="mt-4 text-3xl text-gray-600 tracking-wider text-primary">
            How it works
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {/* Feature 1: Flat rate quotes */}
          <div className="bg-white overflow-hidden h-auto sm:h-64 w-full sm:w-72 mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-secondary">FLAT RATE</h3>
              <h3 className="text-lg font-medium text-secondary pr-5">QUOTES</h3>
              <p className="mt-2 font-normal text-sm text-primary py-2">
                The freight quotes you’ll get are flat rates based on a shipment’s date, distance, and trailer type. These aren’t estimates, but actual market-based quotes you can book.
              </p>
            </div>
          </div>

          {/* Feature 2: Book shipments instantly */}
          <div className="bg-white overflow-hidden h-auto sm:h-64 w-full sm:w-72 mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-secondary">BOOK SHIPMENTS</h3>
              <h3 className="text-lg font-medium text-secondary pr-5">INSTANTLY</h3>
              <p className="mt-2 font-normal text-sm text-primary py-2">
                Booking at your quoted rate only takes a couple of clicks. If you don’t have an account, creating one takes less than 5 minutes.
              </p>
            </div>
          </div>

          {/* Feature 3: Get 24/7 support */}
          <div className="bg-white overflow-hidden h-auto sm:h-64 w-full sm:w-72 mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-secondary">GET 24/7</h3>
              <h3 className="text-lg font-medium text-secondary">SUPPORT</h3>
              <p className="mt-2 font-normal text-sm text-primary py-2">
                We’ll keep you updated from the moment the BOL is generated to the second the carrier uploads the POD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
