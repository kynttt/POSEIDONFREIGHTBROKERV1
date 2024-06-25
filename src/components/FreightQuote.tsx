import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Button from './Button';
import Modal from './Modal';

const FreightQuote: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [weight, setWeight] = useState('');
    const [pickUp, setPickUp] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate(); // Get navigate function from React Router

    const openModal = () => {
        // Check if all required inputs are populated
        if (pickUp.trim() !== '' && destination.trim() !== '' && weight.trim() !== '') {
            setShowModal(true);
        } else {
            alert('Please fill in all fields before requesting a quote.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        // Only update state if input is numeric or empty (allowing backspace/delete)
        if (/^\d*$/.test(input)) {
            setWeight(input);
        }
    };

    const handlePickUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPickUp(event.target.value);
    };

    const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value);
    };

    const handleTruckButtonClick = () => {
        // Navigate to '/quote-details' when a truck button is clicked
        navigate('/quote-details');
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center py-16 bg-[#b2b9f9]">
            <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mx-20">
                <h2 className="text-3xl font-semibold text-[#252F70]">GET A</h2>
                <h2 className="text-3xl font-semibold text-[#252F70]">FREIGHT QUOTE</h2>
            </div>
            <div className="flex items-center bg-white shadow-2xl rounded-lg px-6 py-12 w-full lg:w-auto">
                <div className="flex flex-col w-full">
                    <h3 className="text-center text-lg font-semibold text-[#252F70] mb-8">Cost Calculator</h3>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full">
                        <input
                            type="text"
                            placeholder="Pick Up"
                            value={pickUp}
                            onChange={handlePickUpChange}
                            className="border border-[#252F70] rounded px-4 py-2 bg-transparent w-full lg:w-auto text-black"
                        />
                        <input
                            type="text"
                            placeholder="Destination"
                            value={destination}
                            onChange={handleDestinationChange}
                            className="border border-[#252F70] rounded px-4 py-2 bg-transparent w-full lg:w-auto text-black"
                        />
                        <input
                            type="text"
                            placeholder="Weight (kg)"
                            value={weight}
                            onChange={handleWeightChange}
                            className="border border-[#252F70] rounded px-4 py-2 bg-transparent w-full lg:w-auto text-black"
                        />
                        <Button
                            label="Request a Quote"
                            size="quoteButton"
                            bgColor="#252F70"
                            hoverBgColor="white"
                            onClick={openModal}
                            className="extra-class-for-medium-button"
                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-12 py-8">
                        <div className="flex flex-col space-y-8 items-center">
                            <Button
                                label="Full Truckload"
                                size="truckButton"
                                bgColor="#ffffff"
                                onClick={handleTruckButtonClick}
                            />
                            <Button
                                label="Refrigerated Trailer"
                                size="truckButton"
                                bgColor="#ffffff"
                                onClick={handleTruckButtonClick}
                            />
                        </div>
                        <div className="flex flex-col space-y-8 items-center">
                            <Button
                                label="Dry Van"
                                size="truckButton"
                                bgColor="#ffffff"
                                onClick={handleTruckButtonClick}
                            />
                            <Button
                                label="Flatbed"
                                size="truckButton"
                                bgColor="#ffffff"
                                onClick={handleTruckButtonClick}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FreightQuote;
