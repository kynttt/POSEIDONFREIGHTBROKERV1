// import React from 'react';
import ReactDOM from "react-dom";
import OTPImage from "../assets/img/quoteRequest.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const QuoteRequestModal = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
   // Get the window size for Confetti to match the screen
   const { width, height } = useWindowSize();

  const handleNavigateToDashboard = () => {
    if (role === "admin") {
      navigate("/a");
    } else {
      navigate("/s");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm">
       {/* Confetti component */}
       <Confetti
        width={width}
        height={height}
        recycle={false} // Optional: Makes the confetti not reappear after a single burst
        numberOfPieces={200} // Adjust based on desired confetti amount
      />
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
            Booking Confirmed!
          </h2>
          <p className="mb-6 font-medium text-sm text-primary">
          Ready to schedule the next booking?
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
    </div>,
    document.body
  );
};

export default QuoteRequestModal;
