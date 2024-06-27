import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sampleData from './sampleData.json'; // Make sure to import the sample data
import Button from '../components/Button';
import TrailerTypes from '../components/TrailerTypes';


const QuoteDetails: React.FC = () => {
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [pickUpState, setPickUpState] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryState, setDeliveryState] = useState('');
    const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
    const [trailerType, setTrailerType] = useState('');
    const [trailerSize, setTrailerSize] = useState('');
    const [commodity, setCommodity] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [price, setPrice] = useState(0);
    const [availableDeliveryLocations, setAvailableDeliveryLocations] = useState<string[]>([]);


    const trailerTypePrices: { [key: string]: number } = {
        'Flat Bed': 2.0,
        'Dry Van': 1.5,
        'Refrigerated': 3.0,
    };

    const trailerSizePrices: { [key: string]: number } = {
        '48 ft': 1.0,
        '53 ft': 1.2,
    };

    const getDistance = (startLocation: string, endLocation: string): number => {
        const distanceData = sampleData.distances;
        return distanceData[startLocation]?.[endLocation] || 0;
    };

    const calculatePrice = () => {
        const distance = getDistance(pickUpLocation, deliveryLocation);
        const trailerTypePrice = trailerTypePrices[trailerType] || 0;
        const trailerSizePrice = trailerSizePrices[trailerSize] || 0;
        const weight = parseFloat(maxWeight) || 0;

        const price = distance * (trailerTypePrice + trailerSizePrice) * weight;
        setPrice(price);
    };

    useEffect(() => {
        if (pickUpLocation) {
            setAvailableDeliveryLocations(Object.keys(sampleData.distances[pickUpLocation] || {}));
        } else {
            setAvailableDeliveryLocations([]);
        }
    }, [pickUpLocation]);

    useEffect(() => {
        calculatePrice();
    }, [pickUpLocation, deliveryLocation, trailerType, trailerSize, maxWeight]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted");
    };

    return (
        <div >
            <Navbar />
            <div className="bg-white min-h-screen">
                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto py-10 px-4">
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
                                <select
                                    value={pickUpLocation}
                                    onChange={(e) => setPickUpLocation(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                                >
                                    <option className="text-primary font-normal" value="">Select Pick Up Location</option>
                                    {Object.keys(sampleData.distances).map(location => (
                                        <option className="text-primary font-normal" key={location} value={location}>{location}</option>
                                    ))}
                                </select>
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
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Pick Up Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={pickUpDate}
                                        onChange={(date) => setPickUpDate(date)}
                                        className="w-full border border-gray-300 p-2 rounded-md bg-white  font-thin text-black"
                                        placeholderText="MM/DD/YYYY"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                    <div className="absolute top-2 right-2 cursor-pointer" onClick={() => document.querySelector('.react-datepicker-wrapper input')?.focus()}>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary" />
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
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin text-black"
                                >
                                    <option className="text-primary font-normal" value="">Select Trailer Type</option>
                                    <option className="text-primary font-normal" value="Flat Bed">Flat Bed</option>
                                    <option className="text-primary font-normal" value="Dry Van">Dry Van</option>
                                    <option className="text-primary font-normal" value="Refrigerated">Refrigerated</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Trailer Size <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={trailerSize}
                                    onChange={(e) => setTrailerSize(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin text-black"
                                >
                                    <option className="text-primary font-normal" value="">Select Trailer Size</option>
                                    <option className="text-primary font-normal" value="48 ft">48 ft</option>
                                    <option className="text-primary font-normal" value="53 ft">53 ft</option>
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
                                <select
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                                    disabled={!pickUpLocation}
                                >
                                    <option className="text-primary font-normal" value="">Select Delivery Location</option>
                                    {availableDeliveryLocations.map(location => (
                                        <option className="text-primary font-normal" key={location} value={location}>{location}</option>
                                    ))}
                                </select>
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
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
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
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
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
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary font-normal mb-2">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your company name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center lg:mt-16">
                        <div className="text-xl font-semibold text-secondary">
                            Price: ${price.toFixed(2)}
                        </div>
                        <Button
                            label="PROCEED TO PAYMENT"
                            size="xl"
                            bgColor="#7783D2"
                            hoverBgColor="white"
                            onClick={() => { }}
                            className="extra-class-for-medium-button "
                        />
                        {/* <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700">
                            PROCEED TO PAYMENT
                        </button> */}
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default QuoteDetails;
