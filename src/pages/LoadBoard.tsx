import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sampleData from './sampleData.json'; // Make sure to import the sample data
import Button from '../components/Button';
import LoadCard from '../components/LoadCard';
import 'react-datepicker/dist/react-datepicker.css';
import sampleLoadData from './sampleLoadData.json'; // Import the sample data
import { useAuth } from '../components/useAuth';
import SideBar from '../components/SideBar';





const LoadBoard: React.FC = () => {

    const { isAuthenticated, role } = useAuth();

    console.log('User authenticated?', isAuthenticated);
    console.log('User role:', role);

    const [pickUpLocation, setPickUpLocation] = useState('');
    const [pickUpState, setPickUpState] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryState, setDeliveryState] = useState('');
    const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
    const [trailerType, setTrailerType] = useState('');
    const [trailerSize, setTrailerSize] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [radius, setRadius] = useState('');

    const [price, setPrice] = useState(0);
    const [availableDeliveryLocations, setAvailableDeliveryLocations] = useState<string[]>([]);




    const radiusOptions = ['10 mi', '20 mi', '30 mi', '40 mi', '50 mi'];

    const getDistance = (startLocation: string, endLocation: string): number => {
        const distanceData = sampleData.distances;
        return distanceData[startLocation]?.[endLocation] || 0;
    };



    useEffect(() => {
        if (pickUpLocation) {
            setAvailableDeliveryLocations(Object.keys(sampleData.distances[pickUpLocation] || {}));
        } else {
            setAvailableDeliveryLocations([]);
        }
    }, [pickUpLocation]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted");
    };

    return (
        <div className="flex h-screen">
            {/* <Navbar isAuthenticated={isAuthenticated} /> */}
            <SideBar isAuthenticated={isAuthenticated} />

            <div className="flex-1 bg-white min-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto py-10 px-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold lg:mb-20 text-secondary">FIND LOADS</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* PICK UP */}
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-lg font-semibold text-secondary mb-4">PICK UP</h3>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-3/4 pr-2">
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
                                <div className="w-1/4 pl-2">
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

                        </div>

                        {/* DROP */}
                        <div className="mb-8 md:mb-0  lg:pl-8">
                            <h3 className="text-lg font-semibold text-secondary mb-4">DROP</h3>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-3/4 pr-2">
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
                                <div className="w-1/4 pl-2">
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
                                <div className="mb-4 mt-4">
                                    <label className="block text-primary font-normal mb-2">
                                        Radius (mi) <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin"
                                    >
                                        <option className="text-primary font-normal" value="">Select Radius</option>
                                        {radiusOptions.map(option => (
                                            <option className="text-primary font-normal" key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                        </div>

                        {/* ADDITIONAL DETAILS */}
                        <div className="mb-8 md:mb-0  lg:pl-8">
                            <h3 className="text-lg font-semibold text-secondary mb-4">ADDITIONAL DETAILS</h3>
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
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                            label="Search"
                            size="large"
                            bgColor="#252F70"
                            hoverBgColor="white"
                            onClick={() => { }}
                            className="extra-class-for-medium-button" type={''} />

                        <Button
                            label="Clear"
                            size="large"
                            bgColor="#252F70"
                            hoverBgColor="white"
                            onClick={() => { }}
                            className="extra-class-for-medium-button" type={''} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <a href="#" className="text-blue-500 hover:underline">Sort & Filter</a>
                        </div>

                    </div>

                    {sampleLoadData.map(load => (
                        <LoadCard
                            key={load.id}
                            id={load.id}
                            pickUp={load.pickUp}
                            drop={load.drop}
                            companyName={load.companyName}
                            trailerType={load.trailerType}
                            trailerSize={load.trailerSize}
                            loadPrice={load.loadPrice}
                            onBookLoadClick={() => { /* Handle book load click */ }}
                        />
                    ))}
                </form>

            </div>



        </div>

    );
};

export default LoadBoard;
