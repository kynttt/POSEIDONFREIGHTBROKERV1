import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';  // Ensure this file includes the @import for the Lexend font
import Footer from '../components/Footer';
import TrailerTypes from '../components/TrailerTypes';

const TrailerOptionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main>
      <TrailerTypes/>
      <Footer/>

        
      </main>
    </div>
  );
};

export default TrailerOptionsPage;
