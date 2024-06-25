import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';  // Ensure this file includes the @import for the Lexend font
import HeroBanner from '../components/HeroBanner';
import Carousel from '../components/Carousel';
import FreightQuote from '../components/FreightQuote';

const landingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main>
      <HeroBanner />
      <Carousel />
      <FreightQuote/>
        
      </main>
    </div>
  );
};

export default landingPage;
