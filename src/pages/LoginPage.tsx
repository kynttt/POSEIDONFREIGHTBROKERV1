import React from 'react';
import signupImage from './signup.png';
import appleIcon from './apple.png';
import googleIcon from './googleicon.png';

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-secondary flex flex-col justify-center items-center p-8">
          <h1 className="text-white text-4xl mb-4">Freight Booker</h1>
          <img src={signupImage} alt="Freight Booker" className="w-full" />
          <p className="text-white text-2xl mt-4">Transport Logistics</p>
        </div>
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-secondary text-center">Sign In</h2>
            <form>
              <div className="mb-4">
                <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
                  Email or Username
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label className="block text-primary text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 w-52 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-6 flex items-center">
              <div className="border-t-4 flex-grow border-secondary"></div>
              <span className="px-3 text-gray-600">or continue</span>
              <div className="border-t-4 flex-grow border-secondary"></div>
            </div>
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
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don’t have an account? <a href="#" className="text-blue-500">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
