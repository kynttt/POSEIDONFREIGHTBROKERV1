import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useAuth } from '../components/AuthContext';


const BillofLandingPage: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Use useAuth hook to get isAuthenticated

    return (
        <nav className='bg-white'>
            <Navbar isAuthenticated={isAuthenticated} />


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
                            className="extra-class-for-medium-button" type={''} />
                    </div>
                </div>
            </div>

            <hr className="border-t lg:border-secondary lg:border-2  mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

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

            <hr className="border-t lg:border-secondary lg:border-2 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Start of Delivery up Details form */}
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
                <h2 className="text-xl font-medium mb-4 text-secondary">Delivery Details</h2>

                <div className="flex flex-col sm:flex-row mb-4">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <label className="block text-primary text-base font-medium mb-2" htmlFor="shipperName">
                            Consignee/Receiver Name <span className="text-red-600">*</span>
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


            <hr className="border-t lg:border-secondary lg:border-2 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

            {/* Start of Additional up Details form */}
            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
                <h2 className="text-xl font-medium mb-4 text-secondary">Additional Details</h2>

                <div className="flex flex-col sm:flex-row mb-4">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <label className="block text-primary text-sm font-bold mb-2" htmlFor="receiverName">
                            Other Reference Type <span className="text-red-600">*</span>
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


            <hr className="border-t lg:border-secondary lg:border-2 mb-6 w-full max-w-screen-2xl mx-auto hidden md:block" />

            <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
                <h2 className="text-xl font-medium mb-4 text-secondary">Terms and Conditions</h2>

                <div >
                    <p className="text-primary text-lg font-normal ">
                        <span className='text-black text-lg mb-2 font-normal'>Note:</span> No Limitation of carrier liability applies to this shipment, unless set forth in the Transportation Agreement between the parties.
                    </p>
                    <div className="text-gray-500 text-xs grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 mt-8">
                        <p className="lg:col-span-1 border-2 p-4 text-primary text-sm font-normal text-justify">
                            Received, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable,
                            to the rates, classifications, and rules that have been established by the carrier and are applicable to the shipment, as well as to all applicable
                            state and federal regulations.
                        </p>
                        <p className="lg:col-span-3 border-2 p-4 text-primary text-sm font-normal text-justify">
                            The carrier shall not make delivery of this shipment without payment of charges and all other lawful fees. If a motor carrier, freight forwarder, broker
                            or other transportation service provider accepts this shipment from anyone other than the shipper listed hereon, it agrees to seek payment of all charges
                            exclusively from this entity from which it accepted the shipment (i.e., the broker) and expressly waives any other collection rights or remedies otherwise
                            available to it, including any right to seek payment of the transportation charges from the consignee or consignor.

                            <p className='mt-6 text-base'>Shipper's Signature :  </p>
                        </p>
                    </div>
                    <div className="text-gray-500 text-xs grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4 mt-8">
                        <p className="lg:col-span-2 border-2 p-4 text-primary text-sm font-normal text-justify">
                            <p className='pb-8 border-b-4 border-gray-600 font-bold'>Shipper Signature/Date</p>
                            This is to certify that the above
                            named materials are properly
                            classified, packaged, marked,
                            and labeled, and are in proper
                            condition for transportation
                            according to the applicable
                            regulations of the DOT.

                        </p>
                        <p className="lg:col-span-1 border-2 p-4 text-primary text-sm font-normal text-justify">

                            Trailer Loaded :
                            <ul className="mt-2">
                                <li>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        By shipper
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        By loader
                                    </label>
                                </li>
                            </ul>

                        </p>
                        <p className="lg:col-span-1 border-2 p-4 text-primary text-sm font-normal text-justify">
                            Freight Counted:
                            <ul className="mt-2">
                                <li>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        By shipper
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        By driver/pallets said to contain
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        By driver/pieces
                                    </label>
                                </li>
                            </ul>
                        </p>
                        <p className="lg:col-span-2 border-2 p-4 text-primary text-sm font-normal text-justify">
                            
                                <p className='pb-8 border-b-4 border-gray-600'>Carrier Signature/Pickup Date</p>
                                Carrier acknowledges receipt of packages and
                                required placards. Carrier certifies emergency
                                response information was made available and/
                                or carrier has the DOT emergency response
                                guidebook or equivalent documentation in the
                                vehicle. Property described above is received in
                                good order, except as noted.

                            
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
                        className="extra-class-for-medium-button" type={''} />
                    <Button
                        label="Save"
                        size="medium"
                        bgColor="#252F70"
                        hoverBgColor="white"
                        onClick={() => {
                            // Define your onClick function here
                        }}
                        className="extra-class-for-medium-button" type={''} />
                </div>
            </div>



        </nav>
    );
}

export default BillofLandingPage;
