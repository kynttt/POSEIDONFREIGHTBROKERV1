import React from 'react';
import heroBanner from '../assets/img/HeroBanner.png'; // Adjust the path relative to your project structure
import Button from './Button';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center h-screen" style={{ 
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        height: '90vh', // Set the height to 90% of viewport height
      }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* First div */}
      <div className="relative flex flex-col justify-center items-center px-10 mb-8 md:mr-8 md:mb-0 md:w-1/2">
        <div className="flex flex-col justify-center   mb-8 md:mr-8 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white my-2">TRANSPORT</h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-indigo-300 mt-2 mb-5 ">LOGISTICS</h2>
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
      
      {/* Second div */}
      <div className="relative flex flex-col justify-center items-center space-y-4 px-10 mt-8 md:ml-8 md:mt-0 md:w-1/2"> {/* Adjusted margin and added width for responsiveness */}
        <Button
          label="PICK UP"
          size="xl"
          bgColor="#7783D2"
          hoverBgColor="white"
          onClick={() => console.log('Button Clicked')}
          className="extra-class-for-medium-button"
        />
        <Button
          label="DELIVER"
          size="xl"
          bgColor="#7783D2"
          hoverBgColor="white"
          onClick={() => console.log('Button Clicked')}
          className="extra-class-for-medium-button"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
