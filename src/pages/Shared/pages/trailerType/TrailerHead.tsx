import { SetStateAction, useState } from 'react';
import theadImage from '../../../../assets/img/thead.png';
import process1Image from '../../../../assets/img/process1.png';

const processDescriptions = {
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

const TrailerHead = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle step click
  const handleStepClick = (step: SetStateAction<number>) => {
    setCurrentStep(step);
  };

  return (
    <div className="py-10">
      {/* Top Section with Image and Title */}
      <div className="relative">
        <img 
          src={theadImage}  // Use the imported image here
          alt="Process and Safety" 
          className="w-full h-72 md:h-100 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
          <h1 className="text-3xl md:text-4xl font-bold">Process and <span className="text-yellow-400">Safety</span></h1>
        </div>
      </div>

      {/* Stepper Section */}
      <div className="relative py-10 bg-gradient-to-r from-daBlue to-darkBlue">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Stepper */}
          <div className="flex flex-wrap justify-center items-center space-x-4 mt-10">
            {[1, 2, 3, 4, 5, 6].map((step, index) => (
              <div key={index} className="flex items-center">
                {/* Step number */}
                <div
                  onClick={() => handleStepClick(step)} // Clickable step
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer flex items-center justify-center transition-colors ${
                    step === currentStep ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                >
                  <span className="text-white font-bold text-sm md:text-base">{step}</span>
                </div>

                {/* Line between steps, centered */}
                {index < 5 && (
                  <div className="hidden md:flex-1 md:h-1 bg-gray-300 mx-2 md:mx-4 my-auto">
                    <div
                      className={`h-full transition-colors ${step < currentStep ? 'bg-yellow-400' : ''}`}
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Process Details and Image Section */}
          <div className="flex flex-col md:flex-row items-center mt-10 space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Side: Process Title and Description */}
            <div className="w-full md:w-1/2 p-4 text-left">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-gray-100">{processDescriptions[currentStep].title}</h2>
                <p className="mt-4 text-sm md:text-base text-gray-300 font-medium">
                  {processDescriptions[currentStep].description}
                </p>
              </div>
            </div>

            {/* Right Side: Single Image */}
            <div className="w-full md:w-1/2 p-4">
              <img src={process1Image} alt="Step visual" className="w-full h-48 md:h-64 object-cover rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerHead;
