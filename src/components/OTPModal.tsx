import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import OTPImage from '../assets/img/OTP.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const OTPModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [seconds, setSeconds] = useState(15);
  const navigate = useNavigate();


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


  const handleVerifyOTP = () => {
    // Navigate to '/quote-details' when a truck button is clicked
    navigate('/login');
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 px-2"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <img src={OTPImage} alt="Verification" className="mx-auto mb-4 w-32 sm:w-48" />
          <h2 className="mb-2 text-xl font-semibold text-secondary">Enter your Verification Code</h2>
          <p className="mb-6 font-thin text-sm text-primary">
            We will send you an <span className="font-bold">One Time Passcode</span><br />
            via this number <span className="font-bold">09123456789</span> and email <span className="font-bold">abc123@email.com</span>
          </p>
          <div className="flex justify-center mb-4 space-x-2">
            <input
              type="text"
              maxLength={1}
              className="bg-grey w-10 h-10 sm:w-12 sm:h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              maxLength={1}
              className="bg-grey w-10 h-10 sm:w-12 sm:h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              maxLength={1}
              className="bg-grey w-10 h-10 sm:w-12 sm:h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              maxLength={1}
              className="bg-grey w-10 h-10 sm:w-12 sm:h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between mb-4 text-gray-600">
            <button className="text-blue-600 font-thin text-sm">Resend code</button>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
          <div className="flex justify-center">
            <Button
              label="Verify OTP"
              size="medium"
              bgColor="#252F70"
              fontStyle="thin"
              onClick={handleVerifyOTP} // Call handleVerifyOTP on button click
              className="extra-class-for-medium-button" type={''}            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OTPModal;
