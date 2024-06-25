import React from 'react';
import signupImage from './signup.png';
import Button from '../components/Button';


const SignupPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center ">
      <div className="container mx-auto w-50 ">
        <div className="flex item-center justify-center w-full">
          <div className="w-1/3 bg-white p-8 px-16">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Create an Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary">Name *</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Address *</label>
                <div className='flex'>
                <input
                  type="text"
                  className="mt-1 block w-3/5 border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
                  placeholder="City, State, Country"
                  required
                />
                <input
                  type="text"
                  className="mt-1 block w-1/3 border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4 ml-auto"
                  placeholder="Postal Code"
                  required
                />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
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
                    className="block w-full border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Password *</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
                  placeholder="Enter your password"
                  required
                  minLength="8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Email *</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-grey rounded-md  bg-white text-grey font-thin h-10 p-4"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='jsutify-center item-center'>
              <Button
                                    label="Sign Up"
                                    size="medium"
                                    bgColor="#252F70"
                                    hoverBgColor="white"

                                    onClick={() => console.log('Button Clicked')}
                                    className="extra-class-for-medium-button item-center"
                                />
              </div>

              <p className="text-xs text-black font-thin mt-4">
                Already have an account? <a href="/login" className="text-blue-600">Login</a>
              </p>
            </form>
            <div className="mt-6">
              <button className="w-full bg-white text-primary py-2 px-4 rounded-md hover:bg-red-700 mb-4 border">
                Sign up with Google
              </button>
              <button className="w-full bg-white text-primary py-2 px-4 rounded-md hover:bg-gray-800 border">
                Sign up with Apple
              </button>
            </div>
          </div>
          <div className="w-1/4 bg-secondary items-center justify-center">
            <div className="text-center py-16 px-2 ">
              <h1 className="text-sm font-normal text-left text-white pl-8">Welcome to </h1>
              <h1 className="text-4xl font-medium text-white"> Freight Booker</h1>
              <img src={signupImage} alt="Freight Booker" className="my-6" />
              <h2 className="text-3xl font-bold text-white font-thin">TRANSPORT </h2>
              <h2 className="text-3xl font-500px text-tertiary">LOGISTICS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
