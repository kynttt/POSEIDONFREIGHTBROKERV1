import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/Button';
import LoadCard from '../components/LoadCard';
import SideBar from '../components/SideBar';
import { useAuth } from '../hooks/useAuth';

type CardProps = {
    pickupDate: Date | null;
    id: string;
    pickUp: string;
    drop: string;
    companyName: string;
    trailerType: string;
    distance: number;
    trailerSize: string;
    loadPrice: number;
    onBookLoadClick: () => void;
};

const LoadBoard: React.FC = () => {
    const { isAuthenticated, role, token } = useAuth(); // Using useAuth hook for authentication

    const [pickUpLocation, setPickUpLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
    const [trailerType, setTrailerType] = useState('');
    const [radius, setRadius] = useState('');

    const [availableDeliveryLocations, setAvailableDeliveryLocations] = useState<string[]>([]);
    const [loadCards, setLoadCards] = useState<CardProps[]>([]);

    const radiusOptions = ['10 mi', '20 mi', '30 mi', '40 mi', '50 mi'];

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                if (pickUpLocation && token) {
                    const deliveryResponse = await axios.get(`http://localhost:5000/api/delivery-locations?pickUpLocation=${pickUpLocation}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setAvailableDeliveryLocations(deliveryResponse.data);
                }


                if (token) {
                    const quotesResponse = await axios.get('http://localhost:5000/api/quotes/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const transformedData = quotesResponse.data.map((quote: any) => ({
                        id: quote._id,
                        pickUp: quote.origin,
                        drop: quote.destination,
                        companyName: quote.companyName,
                        trailerType: quote.trailerType,
                        distance: quote.distance,
                        trailerSize: quote.trailerSize,
                        loadPrice: quote.price,
                        onBookLoadClick: () => { /* Handle book load click */ },
                    }));
                    setLoadCards(transformedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error (e.g., redirect to login if unauthorized)
            }
        };

        fetchData();
    }, [pickUpLocation, token]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted");
    };

    return (
        <div className="flex h-screen">
            <SideBar isAuthenticated={isAuthenticated} />

            <div className="flex-1 bg-white min-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit} className="lg:mx-16 py-10 px-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold lg:mb-20 text-secondary">FIND LOADS</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                        {/* Replace with actual pick up locations from your backend */}
                                        <option className="text-primary font-normal" value="Location1">Location1</option>
                                        <option className="text-primary font-normal" value="Location2">Location2</option>
                                    </select>
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

                        <div className="mb-8 md:mb-0 lg:pl-8">
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

                        <div className="mb-8 md:mb-0 lg:pl-8">
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

                    {loadCards.map(load => (
                        <LoadCard
                            key={load.id}
                            id={load.id}
                            pickUp={load.pickUp}
                            drop={load.drop}
                            companyName={load.companyName}
                            trailerType={load.trailerType}
                            distance={load.distance}
                            trailerSize={load.trailerSize}
                            loadPrice={load.loadPrice}
                            pickupDate={load.pickupDate} // Pass pickUpDate here
                            onBookLoadClick={load.onBookLoadClick}
                        />
                    ))}

                </form>
            </div>
        </div>
    );
};

export default LoadBoard;
