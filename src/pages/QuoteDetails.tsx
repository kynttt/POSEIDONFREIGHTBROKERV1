import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const QuoteDetails: React.FC = () => {
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [pickUpState, setPickUpState] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryState, setDeliveryState] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [trailerType, setTrailerType] = useState('');
    const [trailerSize, setTrailerSize] = useState('');
    const [commodity, setCommodity] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div>
            <Navbar />
            <div className="bg-white min-h-screen">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-10 px-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold lg:mb-20 text-secondary">PICK UP DETAILS</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* PICK UP */}
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-lg font-semibold text-secondary mb-4">PICK UP</h3>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Pick Up Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    value={pickUpLocation}
                                    onChange={(e) => setPickUpLocation(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={pickUpState}
                                    onChange={(e) => setPickUpState(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-primary font-normal mb-2">
                                    Pick Up Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        placeholder="MM/DD/YYYY"
                                        value={pickUpDate}
                                        onChange={(e) => setPickUpDate(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded-md bg-white text-grey font-thin pl-10"
                                    />
                                    <div className="absolute top-2 right-2">
                                    <i className="far fa-calendar-alt text-blue-500"></i>


                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Trailer Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={trailerType}
                                    onChange={(e) => setTrailerType(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white text-grey font-thin"
                                >
                                    <option className=" text-primary font-normal" value="">Full Truckload</option>
                                    <option className=" text-primary font-normal" value="Flat Bed">Flat Bed</option>
                                    <option className=" text-primary font-normal" value="Dry Van">Dry Van</option>
                                    <option className=" text-primary font-normal" value="Refrigerated">Refrigerated</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Trailer Size <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={trailerSize}
                                    onChange={(e) => setTrailerSize(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white text-grey font-thin"
                                >
                                    <option className=" text-primary font-normal" value="">Select Trailer Size</option>
                                    <option className=" text-primary font-normal" value="48 ft">48 ft</option>
                                    <option className=" text-primary font-normal" value="53 ft">53 ft</option>
                                </select>
                            </div>
                        </div>



                        {/* DROP */}
                        <div className="mb-8 md:mb-0 lg:border-l-4 lg:border-secondary lg:pl-8">
                            <h3 className="text-lg font-semibold text-secondary mb-4">DROP</h3>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Delivery Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter delivery location"
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={deliveryState}
                                    onChange={(e) => setDeliveryState(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                        </div>




                        {/* ADDITIONAL DETAILS */}
                        <div className="mb-8 md:mb-0 lg:border-l-4 lg:border-secondary lg:pl-8">
                            <h3 className="text-lg font-semibold text-secondary mb-4">ADDITIONAL DETAILS</h3>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Commodity <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Fruits"
                                    value={commodity}
                                    onChange={(e) => setCommodity(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Max Wt. <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 1000lbs"
                                    value={maxWeight}
                                    onChange={(e) => setMaxWeight(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end lg:mt-16">
                        <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700">
                            PROCEED TO PAYMENT
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default QuoteDetails;
