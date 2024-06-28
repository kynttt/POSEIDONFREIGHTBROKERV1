import React from 'react';

const BookingConfirmation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h1 className="text-4xl text-secondary font-normal mb-14">Booking Successful</h1>
                <p className="text-lg font-normal text-gray-800">Your booking has been confirmed.</p>
                <p className="text-lg text-gray-800 mb-6">Please wait for the dispatcher to call.</p>
                <button className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-light">OK</button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
