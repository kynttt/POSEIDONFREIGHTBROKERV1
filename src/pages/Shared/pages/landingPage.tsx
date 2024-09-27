import React from "react";
import Navbar from "../../../components/Navbar";
import "../../../index.css"; // Ensure this file includes the @import for the Lexend font
import HeroBanner from "../../../components/Hero";
// import Carousel from '../components/Carousel';
// import FreightQuote from "../../../components/FreightQuote";
// import AboutUs from "../../../components/about";
// import SuccessPage from '../components/SuccessPage';
import FAQsPage from "../../../components/Faqs";
// import FeaturesSection from "../../../components/Features";
import Footer from "../../../components/Footer";
// import ServicesCardList from '../components/ServicesCardList';
import SeamlessFreightServices from "../../../components/SeamlessFreightServices";
import ContactForm from "../../../components/ContactUs";
// import TrustedAmazon from "../../../components/TrustedAmazon";
import { Stack } from "@mantine/core";
// import CarouselComponent from "../../../components/CarouselComponent";
// import PricingPage from "./PricingPage";
import NewFeatures from "../../../components/NewFeatures";
// import NewAboutUs from "../../../components/NewAboutUs";
import HorizontalScrollComponent from "../../../components/HorizontalScrollSection";
import Testimonials from "../../../components/Testimonials";
import LogisticsForm from "../../../components/LogisticsForm";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      <header className="w-full">
        <Navbar />
      </header>
      <Stack w="100%" gap={0}>
        <HeroBanner />
        <LogisticsForm/>
        <SeamlessFreightServices />
        {/* <ServicesCardList /> */}
        {/* <Carousel /> */}
        {/* <FreightQuote /> */}
        <NewFeatures />
        {/* <NewAboutUs/> */}
        <HorizontalScrollComponent/>
        {/* <PricingPage/> */}
        <Testimonials/>
        {/* <CarouselComponent/> */}
        {/* <FeaturesSection /> */}
        {/* <AboutUs /> */}
        <FAQsPage />
        {/* <TrustedAmazon /> */}
        
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
