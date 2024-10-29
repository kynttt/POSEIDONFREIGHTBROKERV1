import { SetStateAction, useState } from 'react';
import theadImage from '../../../../assets/img/thead.png';
import process1Image from '../../../../assets/img/process1.png';
import process2Image from '../../../../assets/img/process2.png';
import process3Image from '../../../../assets/img/process3.png';
import process4Image from '../../../../assets/img/process4.png';
import process5Image from '../../../../assets/img/process5.png';
import process6Image from '../../../../assets/img/process6.png';

const processDescriptions: { [key: number]: { title: string; description: string } } = {
  1: {
    title: 'Process 1: Export Haulage',
    description: "The initial stage is known as export haulage, during which the client's goods are delivered to the freight forwarder's warehouse for shipment."
  },
  2: {
    title: 'Process 2: Items Checkpoint',
    description: "When the goods arrive, the freight forwarder will carefully inspect everything to identify any issues or determine if the items are eligible for shipment to the destination."
  },
  3: {
    title: 'Process 3: Export Clearance',
    description: "The initial stage is known as export haulage, during which the client's goods are delivered to the freight forwarder's warehouse for shipment."
  },
  4: {
    title: 'Process 4: Import Clearance',
    description: "This stage is similar to export customs clearance, but now the goods must comply with the legal requirements set by the destination country."
  },
  5: {
    title: 'Process 5: Destination Arrival and Handling',
    description: "Once all the necessary requirements are met, the freight forwarder will gather all the essential documents for the shipment."
  },
  6: {
    title: 'Process 6: Import Haulage',
    description: "The final stage of the entire process involves transporting the goods from the receiving warehouse to the main recipient."
  },
};

const processImages: { [key: number]: string } = {
  1: process1Image,
  2: process2Image,
  3: process3Image,
  4: process4Image,
  5: process5Image,
  6: process6Image,
};

const TrailerHead = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle step click
  const handleStepClick = (step: SetStateAction<number>) => {
    setCurrentStep(step);
  };

  return (
    <div className="pb-10">
      {/* Top Section with Image and Title */}
      <div className="relative">
        <img
          src={theadImage}  // Use the imported image here
          alt="Process and Safety"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-100 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Process and <span className="text-yellow-400">Safety</span></h1>
        </div>
      </div>

      {/* Stepper Section */}
      <div className="relative py-10 bg-gradient-to-r from-daBlue to-darkBlue">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Stepper */}
          <div className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4 mt-6 sm:mt-10">
            {[1, 2, 3, 4, 5, 6].map((step, index) => (
              <div key={index} className="flex items-center">
                {/* Step number */}
                <div
                  onClick={() => handleStepClick(step)} // Clickable step
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer flex items-center justify-center transition-colors border-2 ${
                    step === currentStep
                      ? 'bg-yellow-400 text-darkBlue border-yellow-400' // Yellow background, dark blue text, yellow border when active
                      : 'bg-transparent text-gray-300 border-gray-300'  // Transparent background, gray text, gray border when inactive
                  }`}
                >
                  <span className="font-medium text-sm sm:text-base">{step}</span>
                </div>

                {/* Stepper line (only render between steps, except after the last one) */}
                {index < 5 && (
                  <div className="w-16 sm:w-20 h-1 bg-gray-300 mx-2">
                    <div
                      className={`h-full transition-colors ${step < currentStep ? 'bg-yellow-400' : ''}`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Process Details and Image Section */}
          <div className="flex flex-col lg:flex-row items-center mt-8 lg:mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Left Side: Process Title and Description */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 text-left">
              <div className="text-center lg:text-left">
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-100">{processDescriptions[currentStep].title}</h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 font-medium">
                  {processDescriptions[currentStep].description}
                </p>
              </div>
            </div>

            {/* Right Side: Step-specific Image */}
            <div className="w-full lg:w-1/2 p-4">
              <img
                src={processImages[currentStep]}  // Dynamically update image based on step
                alt={`Step ${currentStep} visual`}
                className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerHead;
