import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';  // Ensure this file includes the @import for the Lexend font
import HeroBanner from '../components/HeroBanner';
import Carousel from '../components/Carousel';
import FreightQuote from '../components/FreightQuote';
import AboutUs from '../components/about';
import SuccessPage from '../components/SuccessPage';
import FAQsPage from '../components/Faqs';
import FeaturesSection from '../components/Features';

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
      <AboutUs />
      <SuccessPage />
      <FAQsPage />
      <FeaturesSection />
        
      </main>
    </div>
  );
};

export default landingPage;
