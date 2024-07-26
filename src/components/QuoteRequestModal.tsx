import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import OTPImage from '../assets/img/quoteRequest.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom'; 


// const QuoteRequestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const QuoteRequestModal = ({ isOpen }: { isOpen: boolean;  }) => {
  const [seconds, setSeconds] = useState(15);
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/shipper-dashboard');
};


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    }
    return () => {
      clearInterval(timer);
      setSeconds(15);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg">
        {/* <button
          className="absolute top-2 right-2 text-gray-500 px-2"
          onClick={onClose}
        >
          &times;
        </button> */}
        <div className="text-center">
          <img src={OTPImage} alt="Verification" className="mx-auto mb-4 w-32 sm:w-48" />
          <h2 className="mb-2 text-xl font-semibold text-secondary">Booking Request Successful! </h2>
          <p className="mb-6 font-medium text-sm text-primary">
          Wait for the dispatcher to confirm your quote and booking.
          </p>
          
          <div className="flex justify-center">
            <Button
              label="Confirm"
              size="medium"
              bgColor="#252F70"
              fontStyle="thin"
              onClick={handleNavigateToDashboard}
              className="extra-class-for-medium-button" type={''}            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuoteRequestModal;
