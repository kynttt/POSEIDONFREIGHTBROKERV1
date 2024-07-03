import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BookingConfirmation: React.FC = () => {

    const navigate = useNavigate(); // Get navigate function from React Router
    const handleBackToHomePage = () => {
        // Navigate to '/quote-details' when a truck button is clicked
        navigate('/load-board');
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
            <div className="p-6 max-w-lg w-full text-center border shadow-lg rounded-lg">
                <h1 className="text-4xl text-secondary font-normal mb-6">Booking Successful!</h1>
                <p className="text-xl font-light text-gray-500 tracking-wider py-6">This booking has been confirmed.</p>
                {/* <p className="text-lg font-light text-gray-500 mb-14">Please wait for the dispatcher to call.</p> */}
                <div className='flex justify-center items-center'>
              <Button
              label="OK"
              size="bookingSuccessful"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleBackToHomePage}
              className="extra-class-for-medium-button my-6" type={''}        />
              </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
