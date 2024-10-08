import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import OTPImage from "../assets/img/quoteRequest.png";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional, to make the confetti fit the screen size

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate(); // Get navigate function from React Router
  const handleNavigateToDashboard = () => {
    // Navigate to '/shipper-dashboard' when 'Ok' button is clicked
    navigate("/s/booking-transactions");
  };

  // Use window size for Confetti effect
  const { width, height } = useWindowSize();

  // State to control confetti duration
  const [confettiActive, setConfettiActive] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 30000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50 backdrop-filter backdrop-blur-sm">
      {/* Confetti effect */}
      {confettiActive && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}
      <div className="relative w-full max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg m-4">
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
            Expect a call from our dispatchers for this booking. Thank you!
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
