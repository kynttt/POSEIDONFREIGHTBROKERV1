import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const BillofLandingPage: React.FC = () => {
  return (
    <nav>
      <Navbar />

      <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-medium mb-8 mt-4 text-secondary">Shipment Summary</h1>

        <div className="flex flex-col sm:flex-row items-start">
          <div className="mb-4 sm:mr-20">
            <h2 className="text-lg font-normal mb-2 text-gray-500">Post ID</h2>
            <p className="text-base text-primary font-bold">3046112</p>
          </div>

          <div className="mb-4 sm:mr-20">
            <h2 className="text-lg font-normal mb-2 text-gray-500">Carrier</h2>
            <p className="text-base text-primary font-bold">PDI Enterprise</p>
          </div>

          <div className="mb-4 sm:mr-20">
            <h2 className="text-lg font-normal mb-2 text-gray-500">Carrier Rate</h2>
            <p className="text-base text-primary font-bold">$4200.00</p>
          </div>

          <div className="mt-4 sm:mt-0 sm:mr-4 flex-grow">
            <Button
              label="View Terminal Info"
              size="bookingSuccessful"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={() => {
                // Define your onClick function here
              }}
              className="extra-class-for-medium-button"
            />
          </div>
        </div>
      </div>

                <hr className="border-t lg:border-secondary lg:border-4 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

      {/* Start of Pick up Details form */}
      <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
  <h2 className="text-xl font-medium mb-4 text-secondary">Pick Up Details</h2>

  <div className="flex flex-col sm:flex-row mb-4">
    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="shipperName">
            Shipper Name <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="shipperName"
            className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter shipper name"
            required
        />
    </div>

    <div className="w-full sm:w-1/2 sm:pl-2">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="contactName">
            Contact Name <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="contactName"
            className="border rounded w-full sm:w-64 lg:w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter contact name"
            required
        />
    </div>
    <div className="w-full sm:w-1/2 sm:pr-2">      
    </div>
</div>


<div className="flex flex-col sm:flex-row mb-4">
    <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2 md:w-1/3 md:pr-4 lg:w-1/3 lg:pr-4">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="addressLine1">
            Address Line 1 <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="addressLine1"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter address line 1"
            required
        />
    </div>

    <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2 md:w-1/6 md:pr-4 lg:w-1/6 lg:pr-4">
        <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="city">
            City
        </label>
        <p className="text-primary">Los Angeles</p>
    </div>

    <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2 md:w-1/6 md:pr-4 lg:w-1/6 lg:pr-4">
        <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="state">
            State
        </label>
        <p className="text-primary">CA</p>
    </div>

    <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2 md:w-1/5 md:pr-0 lg:w-1/5 lg:pr-0">
        <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="zipCode">
            Zip Code
        </label>
        <p className="text-primary">291921</p>
    </div>
</div>



  <div className="flex flex-col sm:flex-row mb-4">
    <div className="w-full sm:w-1/5 mb-4 sm:mb-0 sm:pr-2">
      <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="shipDate">
        Ship Date
      </label>
      <p className="text-primary ">28-Jun-2024 | 14-42</p>
    </div>

    <div className="w-full sm:w-1/2 sm:pl-3 sm:ml-48">
    {/* <!-- Adjusted padding and moved to right --> */}
    <label className="block text-primary text-base font-medium mb-2" htmlFor="pickupNumber">
        Pick up #
    </label>
    <input
        type="text"
        id="pickupNumber"
        className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
        placeholder="Enter pickup number"
    />
</div>

  </div>
</div>

      {/* End of Pick up Details form */}

                        <hr className="border-t lg:border-secondary lg:border-4 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

     {/* Start of Delivery up Details form */}
    <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
    <h2 className="text-xl font-medium mb-4 text-secondary">Delivery Details</h2>

    <div className="flex flex-col sm:flex-row mb-4">
    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="shipperName">
            Receiver Name <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="shipperName"
            className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 sm:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter receiver name"
            required
        />
    </div>

    <div className="w-full sm:w-1/2">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="contactName">
            Contact Name <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="contactName"
            className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 sm:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter contact name"
            required
        />
    </div>

    <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2 lg:w-1/2 lg:mb-0 lg:pr-2 md:order-last lg:order-none">
        <label className="block text-primary text-base font-medium mb-2" htmlFor="phone">
            Phone # <span className="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="phone"
            className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 lg:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
            placeholder="Enter phone number"
            required
        />
    </div>
</div>


    <div className="flex flex-col sm:flex-row mb-4">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:pr-2">
            <label className="block text-primary text-base font-medium mb-2" htmlFor="addressLine1">
                Address Line 1 <span className="text-red-600">*</span>
            </label>
            <input
                type="text"
                id="addressLine1"
                className="border rounded w-full py-2 px-3 sm:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
                placeholder="Enter address line 1"
                required
            />
        </div>

        <div className="w-full sm:w-1/6 mb-4 sm:mb-0 sm:pr-2 sm:ml-1">
            <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="city">
                City
            </label>
            <p className="text-primary">Los Angeles</p>
        </div>

        <div className="w-full sm:w-1/6 mb-4 sm:mb-0 sm:pr-2">
            <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="state">
                State
            </label>
            <p className="text-primary">CA</p>
        </div>

        <div className="w-full sm:w-1/5 mb-4 sm:mb-0 sm:pr-2">
            <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="zipCode">
                Zip Code
            </label>
            <p className="text-primary">291921</p>
        </div>
    </div>

    <div className="flex flex-col sm:flex-row mb-4">
        <div className="w-full sm:w-1/5 mb-4 sm:mb-0 sm:pr-2">
            <label className="block text-gray-500 text-base font-medium mb-2" htmlFor="shipDate">
                Ship Date
            </label>
            <p className="text-primary">28-Jun-2024 | 14-42</p>
        </div>

        <div className="w-full sm:w-1/2 sm:pl-3 sm:ml-48">
            {/* <!-- Adjusted padding and moved to right --> */}
            <label className="block text-primary text-base font-medium mb-2" htmlFor="pickupNumber">
                Pick up #
            </label>
            <input
                type="text"
                id="pickupNumber"
                className="border rounded w-full sm:w-64 lg:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
                placeholder="Enter pickup number"
            />
        </div>
    </div>
</div>


                        <hr className="border-t lg:border-secondary lg:border-4 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

      {/* Start of Additional up Details form */}
      <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
    <h2 className="text-xl font-medium mb-4 text-secondary">Other Reference Type</h2>

    <div className="flex flex-col sm:flex-row mb-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="receiverName">
                Receiver Name <span className="text-red-600">*</span>
            </label>
            <select
                id="receiverName"
                className="border rounded w-full sm:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
                required
            >
                <option value="" disabled selected>Customer Reference</option>
                <option value="PO Number">PO Number</option>
                <option value="SO Number">SO Number</option>
            </select>
        </div>

        <div className="w-full sm:w-1/2">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="referenceNumber">
                Reference Number <span className="text-red-600">*</span>
            </label>
            <input
                type="text"
                id="referenceNumber"
                className="border rounded w-full sm:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-12 font-normal"
                placeholder="Enter Reference Number"
                required
            />
        </div>
    </div>
</div>


                <hr className="border-t lg:border-secondary lg:border-4 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

                <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
      <h2 className="text-xl font-medium mb-4 text-secondary">Terms and Conditions</h2>

      <p className="text-md mb-4 font-medium text-primary">
        <strong className="text-xl font-medium text-gray-700 ">Note: </strong>
        No Limitation of carrier liability applies to this shipment, unless set forth in the Transportation Agreement between the parties.
      </p>

      <div className="flex border border-gray-300 rounded-lg p-4 mb-4 text-sm font-normal text-primary">
      <div className="flex-none w-1/3 pr-8 border-r border-gray-300 text-justify overflow-x-auto max-h-48 sm:max-h-full">
        <p>
          Received, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable, otherwise to the rates, classifications, and rules that have been established by the carrier and are available to the shipper, on request, and to all applicable state and federal regulations.
        </p>
      </div>
      <div className="flex-1 pl-4 overflow-y-auto max-h-48 sm:max-h-full">
        <p>
          The carrier shall not make delivery of this shipment without payment of charges and all other lawful fees. If a motor carrier, freight forwarder, broker, or other transportation service provider accepts this shipment from anyone other than the shipper listed hereon, it agrees to seek payment of its charges exclusively from the entity from which it accepted the shipment (e.g., the broker) and expressly waives any other collection rights or remedies otherwise available to it, including any right to seek payment of the transportation charges from the consignor or consignee.
        </p>
      </div>
    </div>

      <div className="flex justify-start space-x-4 mt-8">
      <Button
                        label="Next"
                        size="medium"
                        bgColor="#252F70"
                        hoverBgColor="white"
                        onClick={() => {
                            // Define your onClick function here
                        }}
                        className="extra-class-for-medium-button"
                        />
        <Button
                        label="Save"
                        size="medium"
                        bgColor="#252F70"
                        hoverBgColor="white"
                        onClick={() => {
                            // Define your onClick function here
                        }}
                        className="extra-class-for-medium-button"
                        />
      </div>
    </div>
    


    </nav>
  );
}

export default BillofLandingPage;
