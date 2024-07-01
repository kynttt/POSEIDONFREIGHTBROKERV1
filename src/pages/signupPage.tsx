import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import signupImage from '../assets/img/signup.png';
import Button from '../components/Button';
import googleIcon from '../assets/img/googleicon.png';
import appleIcon from '../assets/img/apple.png';
import OTPModal from '../components/OTPModal';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    postalCode: '',
    companyName: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate required fields
    const errors: { [key: string]: string } = {};
    if (!formData.name) {
      errors.name = 'Name is required.';
    }
    if (!formData.address) {
      errors.address = 'Address is required.';
    }
    if (!formData.postalCode) {
      errors.postalCode = 'Postal Code is required.';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        postalCode: formData.postalCode,
        phone: formData.phone,
        companyName: formData.companyName,
        role: 'user', // Assuming a default role
      });
      if (response.data.token) {
        setSuccess(true);
        openModal();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error handling
        if (err.response && err.response.data) {
          setError(err.response.data.msg);
        } else {
          setError('An error occurred during registration.');
        }
      } else {
        // Generic error handling
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-2/3 lg:w-1/3 bg-white p-8 px-4 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Create an Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-primary">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                  required
                />
                {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Address *</label>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full md:w-3/5 border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.address ? 'border-red-500' : ''}`}
                    placeholder="City, State, Country"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`mt-1 lg:mt-4 block w-full md:w-2/5 border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.postalCode ? 'border-red-500' : ''}`}
                    placeholder="Postal Code"
                    required
                  />
                </div>
                {validationErrors.address && <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>}
                {validationErrors.postalCode && <p className="text-red-500 text-sm mt-1">{validationErrors.postalCode}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.phone ? 'border-red-500' : ''}`}
                    placeholder="Phone number"
                    required
                  />
                </div>
                {validationErrors.phone && <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-primary">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full border border-gray-300 rounded-md bg-white text-gray-700 font-thin h-10 p-4 ${validationErrors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
              </div>
              <div className="flex justify-center">
                <Button
                  label="Sign Up"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  className="extra-class-for-medium-button"
                  type="submit"
                />
                <OTPModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-4">Registration successful! Please check your email for verification.</p>
              )}
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
