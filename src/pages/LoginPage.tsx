import React from 'react';
import signupImage from '../assets/img/signup.png';
import appleIcon from '../assets/img/apple.png';
import googleIcon from '../assets/img/googleicon.png';
import Button from '../components/Button';


const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-secondary flex flex-col justify-center items-center p-8">
          <h1 className="text-white text-4xl mb-4">Freight Broker</h1>
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
                  className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center ">
                  <label className="block text-primary text-sm font-bold mb-2 " htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="inline-block align-baseline font-medium text-sm text-blue-400 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-center">
              <Button
                  label="Login"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={() => console.log('Button Clicked')}
                  className="extra-class-for-medium-button"
                />
              </div>
            </form>
            <div className="mt-6 flex items-center">
              <div className="border-t-4 flex-grow border-secondary"></div>
              <span className="px-3 text-gray-600 font-normal">or continue</span>
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
              <p className="text-gray-600 font-medium">
                Don’t have an account? <a href="/signup" className="text-blue-400">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
