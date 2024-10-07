// Import React if necessary (for React versions before 17)
// import React from "react";

// Define the type for an individual item in the data array
interface PickupItem {
  id: string; // or number, depending on your data
  title: string;
  percentage: string; // or number, depending on your data
}

// Define the type for the props of the OnTimePickupsSection component
interface OnTimePickupsSectionProps {
  data: PickupItem[];
}

const OnTimePickupsSection: React.FC<OnTimePickupsSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 md:w-17%">
      {data.map((item) => (
        <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow text-center mb-4 border border-gray-200">
          <p className="text-gray-600 font-medium text-primary">{item.title}</p>
          <h3 className="text-4xl font-bold text-primary">{item.percentage}</h3>
        </div>
      ))}
    </div>
  );
};

export default OnTimePickupsSection;
