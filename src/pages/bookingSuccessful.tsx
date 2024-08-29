import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import OTPImage from "../assets/img/quoteRequest.png";


const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate(); // Get navigate function from React Router
  const handleNavigateToDashboard = () => {
    // Navigate to '/quote-details' when a truck button is clicked
    navigate("/s/shipper-dashboard");
  };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg">
        {/* <button
          className="absolute top-2 right-2 text-gray-500 px-2"
          onClick={onClose}
        >
          &times;
        </button> */}
        <div className="text-center">
          <img
            src={OTPImage}
            alt="Verification"
            className="mx-auto mb-4 w-32 sm:w-48"
          />
          <h2 className="mb-2 text-xl font-semibold text-secondary">
          Booking Request Successful! 🎉
          </h2>
          <p className="mb-6 font-medium text-sm text-primary w-3/4 mx-auto text-center">
            Wait for the dispatcher to confirm your booking. Thank you!
          </p>
          <div className="flex justify-center">
            <Button
              label="Ok"
              size="medium"
              bgColor="#252F70"
              fontStyle="thin"
              onClick={handleNavigateToDashboard}
              className="extra-class-for-medium-button"
              type={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
