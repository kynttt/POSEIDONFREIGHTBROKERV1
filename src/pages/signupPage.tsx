import React from 'react';
import signupImage from './signup.png';

const SignupPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="City, State, Country"
                required
              />
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Postal Code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone number *</label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  🇺🇸
                </span>
                <input
                  type="tel"
                  className="block w-full border-gray-300 rounded-r-md shadow-sm"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your password"
                required
                minLength="8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Already have an account? <a href="/login" className="text-blue-600">Login</a>
            </p>
          </form>
          <div className="mt-6">
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 mb-4">
              Sign up with Google
            </button>
            <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
              Sign up with Apple
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-secondary items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome to Freight Booker</h1>
            <img src={signupImage} alt="Freight Booker" className="my-6" />

            <h2 className="text-2xl font-bold text-white">TRANSPORT LOGISTICS</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
