import React from "react";
import Navbar from "../../../components/Navbar";
import "../../../index.css"; // Ensure this file includes the @import for the Lexend font
import HeroBanner from "../../../components/HeroBanner";
// import Carousel from '../components/Carousel';
import FreightQuote from "../../../components/FreightQuote";
import AboutUs from "../../../components/about";
// import SuccessPage from '../components/SuccessPage';
import FAQsPage from "../../../components/Faqs";
import FeaturesSection from "../../../components/Features";
import Footer from "../../../components/Footer";
// import ServicesCardList from '../components/ServicesCardList';
import SeamlessFreightServices from "../../../components/SeamlessFreightServices";
import ContactForm from "../../../components/ContactUs";
import TrustedAmazon from "../../../components/TrustedAmazon";
import { useAuthStore } from "../../../state/useAuthStore";
import { Stack } from "@mantine/core";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="w-full">
      <header className="w-full">
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <Stack w="100%">
        <HeroBanner />
        <SeamlessFreightServices />
        {/* <ServicesCardList /> */}
        {/* <Carousel /> */}
        <FreightQuote />
        <FeaturesSection />
        <AboutUs />
        <FAQsPage />
        <TrustedAmazon />
        <ContactForm />
        {/* <SuccessPage /> */}
      </Stack>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
