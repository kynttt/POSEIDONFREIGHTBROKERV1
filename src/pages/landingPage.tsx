import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';  // Ensure this file includes the @import for the Lexend font
import HeroBanner from '../components/HeroBanner';
// import Carousel from '../components/Carousel';
import FreightQuote from '../components/FreightQuote';
import AboutUs from '../components/about';
// import SuccessPage from '../components/SuccessPage';
import FAQsPage from '../components/Faqs';
import FeaturesSection from '../components/Features';
import Footer from '../components/Footer';
import ServicesCardList from '../components/ServicesCardList';
import ContactForm from '../components/ContactUs';
import TrustedAmazon from '../components/TrustedAmazon';
import { useAuth } from '../components/AuthContext';


const landingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
      <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <main>
      <HeroBanner />
      <ServicesCardList/>
      {/* <Carousel /> */}
      <FreightQuote/>
      <FeaturesSection />
      <FAQsPage />
      <AboutUs />
      <ContactForm />
      <TrustedAmazon />
      <Footer/>
      {/* <SuccessPage /> */}
        
      </main>
    </div>
  );
};

export default landingPage;
