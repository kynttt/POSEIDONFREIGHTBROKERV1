import React from 'react';
import '../index.css'; // Ensure this file includes the @import for the Lexend font
// import Footer from '../components/Footer';
import TrailerTypes from '../components/TrailerTypes';
import { useAuthStore } from '../state/useAuthStore';
import SideBar from '../components/SideBar';

const TrailerOptionsPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore(); // Use Zustand store

  return (
    <div className="flex bg-gray-100 h-screen">
      <SideBar isAuthenticated={isAuthenticated} />

      <div className='flex-1 overflow-y-auto'>
        <div className="min-h-screen">
          <TrailerTypes />
         
        </div>
      </div>
    </div>
  );
};

export default TrailerOptionsPage;
