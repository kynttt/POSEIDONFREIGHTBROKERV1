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
// import ServicesCardList from '../components/ServicesCardList';
import SeamlessFreightServices from '../components/SeamlessFreightServices';
import ContactForm from '../components/ContactUs';
import TrustedAmazon from '../components/TrustedAmazon';
import { useAuthStore } from '../state/useAuthStore';



const LandingPage: React.FC = () => {
  const {  isAuthenticated, role } = useAuthStore();


  console.log('User authenticated?', isAuthenticated);
    console.log('User role:', role);
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
      <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <main>
      <HeroBanner />
      <SeamlessFreightServices />
      {/* <ServicesCardList/> */}
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

export default LandingPage;
