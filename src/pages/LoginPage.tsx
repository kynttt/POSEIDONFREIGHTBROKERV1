import React, { useState } from 'react';
import axios from 'axios';
import signupImage from '../assets/img/DeliveredPackage.gif';
import appleIcon from '../assets/img/apple.png';
import googleIcon from '../assets/img/googleicon.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuthStore } from '../state/useAuthStore';

interface DecodedToken {
  user: {
    id: string;
    role: string;
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      login(token);

      const decodedToken = jwtDecode<DecodedToken>(token);
      const userRole = decodedToken.user && decodedToken.user.role;

      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/shipper-dashboard');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          setError(err.response.data.msg || 'Login failed.');
        } else {
          setError('Login failed.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-secondary flex flex-col justify-center items-center p-8">
          <h1 className="text-white text-4xl mb-4">Freight Broker</h1>
          <img src={signupImage} alt="Freight Booker" className="w-full"/>
          <p className="text-white text-2xl mt-4">Transport Logistics</p>
        </div>
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-secondary text-center">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
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
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <Button
                  label={loading ? 'Logging In...' : 'Login'}
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  className="extra-class-for-medium-button"
                  type="submit"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
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