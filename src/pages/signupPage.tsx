import React, { useState } from 'react';
import signupImage from '../assets/img/signup.png';
import Button from '../components/Button';
import googleIcon from '../assets/img/googleicon.png';
import appleIcon from '../assets/img/apple.png';
import OTPModal from '../components/OTPModal';

const SignupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full space-y-8 md:space-y-0 md:space-x-8 ">
          <div className="w-full md:w-2/3 lg:w-1/3 bg-white p-8 px-4   rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Create an Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary">Name *</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Address *</label>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <input
                    type="text"
                    className="mt-1 block w-full md:w-3/5 border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                    placeholder="City, State, Country"
                    required
                  />
                  <input
                    type="text"
                    className="mt-1 block w-full md:w-2/5 border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                    placeholder="Postal Code"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Phone number *</label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    🇺🇸
                  </span>
                  <input
                    type="tel"
                    className="block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Password *</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                  placeholder="Enter your password"
                  required
                  minLength="8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Email *</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button
                  label="Sign Up"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={openModal}
                  className="extra-class-for-medium-button"
                />
                <OTPModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
              <p className="text-xs text-black font-thin mt-4 text-center">
                Already have an account? <a href="/login" className="text-blue-600">Login</a>
              </p>
            </form>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                Login with Google
              </button>
              <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
                Login with Apple
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/3 bg-secondary flex items-center justify-center lg:p-8 p-4 md:p-16 rounded-lg shadow-md h-100">
            <div className="text-center">
              <h1 className="text-sm font-normal text-left lg:pl-8 text-white">Welcome to</h1>
              <h1 className="text-4xl font-medium text-left text-white lg:pl-8">Freight Broker</h1>
              <img src={signupImage} alt="Freight Booker" className="my-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white">TRANSPORT</h2>
              <h2 className="text-3xl font-medium text-tertiary">LOGISTICS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
