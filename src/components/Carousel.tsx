import React, { useState, useRef, useEffect } from 'react';
import Slide1 from '../assets/img/HeroBanner.png';
import Slide2 from '../assets/img/HeroBanner.png';
import Slide3 from '../assets/img/HeroBanner.png';
import Slide4 from '../assets/img/HeroBanner.png';
import Slide5 from '../assets/img/HeroBanner.png';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [Slide1, Slide2, Slide3, Slide4, Slide5];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    if (carouselRef.current) {
      const newScrollPosition = carouselRef.current.scrollWidth / images.length * currentSlide;
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  return (
    <div className="container mx-auto relative text-center md:my-12 sm:my-6 py-8">
      {/* Header */}
      <h1 className="text-base md:text-xl lg:text-xl font-normal mb-2 text-[#252F70]">SERVICES</h1>
      <h2 className="text-4xl md:text-4xl lg:text-4xl font-medium mb-16 text-[#252F70]">Seamless Freight Services</h2>

      {/* Slides Container */}
      <div className="relative overflow-hidden">
        <div className="flex space-x-8 no-scrollbar overflow-x-scroll h-96 md:h-112 lg:h-128" ref={carouselRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-full sm:w-full md:w-1/2 lg:w-1/3 flex-shrink-0 rounded-xl overflow-hidden ${
                index === currentSlide ? 'opacity-100' : 'opacity-50'
              } transition-opacity duration-1000`}
            >
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 md:-left-12 lg:left-0 bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 md:-right-12 lg:right-0 bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
        >
          &gt;
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 my-12">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none transition-colors duration-300 ${
                index === currentSlide ? 'bg-gray-400' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
