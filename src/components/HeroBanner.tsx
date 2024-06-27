import React from 'react';
import heroBanner from '../assets/img/HeroBanner.png'; // Adjust the path relative to your project structure
import Button from './Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const HeroBanner: React.FC = () => {
  const navigate = useNavigate(); // Get navigate function from React Router

  const handlePickup = () => {
    // Navigate to '/quote-details' when a truck button is clicked
    navigate('/quote-details');
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        height: '90vh', // Set the height to 90% of viewport height
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* First div */}
      <div className="relative flex flex-col justify-center items-center px-6 md:px-12 md:w-1/2">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white my-2">TRANSPORT</h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-indigo-300 mt-2 mb-5">LOGISTICS</h2>
          <div className="flex justify-center sm:justify-start"> {/* Center on small screens */}
            <Button
              label="LEARN MORE"
              size="large"
              bgColor="transparent"
              fontStyle="thin" // Set font style to 'thin'
              onClick={() => console.log('Button Clicked')}
              className="extra-class-for-medium-button"
            />
          </div>
        </div>
      </div>

      {/* Second div */}
      <div className="relative flex flex-col justify-center items-center space-y-4 px-6 md:px-12 md:w-1/2">
        <Button
          label="REQUEST A QUOTE"
          size="xl"
          bgColor="#7783D2"
          hoverBgColor="white"
          onClick={handlePickup} // Pass handlePickup directly as onClick handler
          className="extra-class-for-medium-button"
        />
        {/* <Button
          label="DELIVER"
          size="xl"
          bgColor="#7783D2"
          hoverBgColor="white"
          onClick={handlePickup} // Pass handlePickup directly as onClick handler
          className="extra-class-for-medium-button"
        /> */}
      </div>
    </div>
  );
};

export default HeroBanner;
