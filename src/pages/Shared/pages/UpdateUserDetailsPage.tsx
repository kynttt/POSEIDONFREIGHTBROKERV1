import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../../state/useAuthStore'; // Adjust the import path as needed
import { updateUserDetails, getCurrentUser } from '../../../lib/apiCalls'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { faCheckCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateUserDetailsPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userRole, setUserRole] = useState<string>(''); // State to store user role

  const { isAuthenticated, userId: authUserId } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page
    }
  }, [isAuthenticated, navigate]);

  // Fetch and set user details on component mount
  useEffect(() => {
    if (authUserId) {
      setUserId(authUserId);
      const fetchUserDetails = async () => {
        try {
          const result = await getCurrentUser();
          const user = result.data;
          setName(user.name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setAddress(user.address || '');
          setPostalCode(user.postalCode || '');
          setCompanyName(user.companyName || '');
          setUserRole(user.role || ''); // Assuming user role is part of the user data
        } catch (err) {
          setError('Failed to fetch user details.');
        }
      };

      fetchUserDetails();
    }
  }, [authUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateUserDetails(userId, name, email, phone, address, postalCode, companyName);
      setSuccess('User details updated successfully.');
    } catch (error) {
      setError('Failed to update user details. Please try again.');
    }
  };

  const handleGoBack = () => {
    if (userRole === 'admin') {
      navigate('/a/profile');
    } else if (userRole === 'user') {
      navigate('/s/profile');
    } else {
      navigate('/login'); // Default redirect if role is not recognized
    }
  };

  return (
    <div className="m-2 flex items-center justify-center min-h-screen bg-light-grey">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
  <FontAwesomeIcon icon={faUserEdit} className="mr-2 w-4 h-4 p-2 text-primary bg-grey rounded-full" />
  Update User Details
</h2>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 border border-red-300 rounded-md bg-red-50 flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M4.293 4.293a1 1 0 00-1.415 1.414L5.586 8 3.878 9.707a1 1 0 001.414 1.415L7 9.415l2.707 2.707a1 1 0 001.415-1.414L8.415 8l2.707-2.707a1 1 0 00-1.415-1.414L7 6.586 4.293 3.879a1 1 0 00-1.415 1.414z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 text-sm text-green-700 border border-price rounded-md bg-green-50 flex items-center space-x-2">
            <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-price" />
            <span>{success}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-500">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-200 font-normal"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-500">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-normal"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-500">Phone</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-normal"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-500">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-normal"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode" className="mb-2 text-sm font-medium text-gray-500">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-normal"
              placeholder="Enter your postal code"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="companyName" className="mb-2 text-sm font-medium text-gray-500">Company Name (Optional)</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="p-2 bg-light-grey rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-normal"
              placeholder="Enter your company name"
            />
          </div>
          <div className='flex gap-4'>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Details
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full border-2 text-primary border-secondary px-4 py-2 font-medium  rounded-md hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Go Back
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDetailsPage;
