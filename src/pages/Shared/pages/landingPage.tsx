<<<<<<< HEAD
import React from "react";
=======
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Importing FontAwesome icon
>>>>>>> 6a0fadee345a3a472988b1661b0da00d23ee60da
import NavbarNew from "../../../components/navBarNew";
import "../../../index.css"; // Ensure this file includes the @import for the Lexend font
import HeroBanner from "../../../components/Hero";
import BookingProcess from "../../../components/BookingProcess";
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
// import Testimonials2 from "../../../components/Testimonials2";
<<<<<<< HEAD
=======
import { PropagateLoader } from "react-spinners";
>>>>>>> 6a0fadee345a3a472988b1661b0da00d23ee60da
// import AgentsPage from "../../../components/AgentsPage";
// import AgentForm from "../../../components/AgentForm";

const LandingPage: React.FC = () => {
<<<<<<< HEAD
  return (
    <div className="w-full">
      <>
        <header className="w-full">
          <NavbarNew />
        </header>
        <Stack w="100%" gap={0}>
          <HeroBanner />
          <BookingProcess />
          <LogisticsForm />
          <SeamlessFreightServices />
          {/* <ServicesCardList /> */}
          {/* <Carousel /> */}
          {/* <FreightQuote /> */}
          <NewFeatures />
          {/* <AgentsPage />
        <AgentForm /> */}
          {/* <NewAboutUs /> */}
          <HorizontalScrollComponent />
          {/* <PricingPage /> */}
          <Testimonials />
          {/* <Testimonials2 /> */}
          {/* <CarouselComponent /> */}
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
      </>
=======
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false); // State to control visibility of "Back to Top" button

  useEffect(() => {
    // Simulating a loading delay (you can adjust this as per your needs)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Show button when scrolled down
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PropagateLoader color="#1b4980" loading={loading} size={15} />
        </div>
      ) : (
        <>
          <header className="w-full">
            <NavbarNew />
          </header>
          <Stack w="100%" gap={0}>
            <HeroBanner />
            <BookingProcess />
            <LogisticsForm />
            <SeamlessFreightServices />
            {/* <ServicesCardList /> */}
            {/* <Carousel /> */}
            {/* <FreightQuote /> */}
            <NewFeatures />
            {/* <AgentsPage />
        <AgentForm /> */}
            {/* <NewAboutUs /> */}
            <HorizontalScrollComponent />
            {/* <PricingPage /> */}
            <Testimonials />
            {/* <Testimonials2 /> */}
            {/* <CarouselComponent /> */}
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

          {/* "Back to Top" Button */}
          {showButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-darkBlue text-white p-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
              aria-label="Back to top"
            >
              <FaArrowUp
              size={20}
              className="animate-bounce"
              />
            </button>
          )}
        </>
      )}
>>>>>>> 6a0fadee345a3a472988b1661b0da00d23ee60da
    </div>
  );
};

export default LandingPage;
