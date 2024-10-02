import Stand1Image from '../../../../assets/img/stand1.png';
import Stand2Image from '../../../../assets/img/stand2.png';
import Stand3Image from '../../../../assets/img/stand3.png';
import Stand4Image from '../../../../assets/img/stand4.png';
import Stand5Image from '../../../../assets/img/stand5.png';
import Stand6Image from '../../../../assets/img/stand6.png';
import Stand7Image from '../../../../assets/img/stand7.png';
import Stand8Image from '../../../../assets/img/stand8.png';

const TrailerStandardProcess = () => {
  const data = [
    {
      id: 1,
      title: "Proper Packaging",
      description: "Use sturdy boxes and appropriate cushioning materials to protect items from damage during transit.",
      image: Stand1Image,
    },
    {
      id: 2,
      title: "Securing Loads",
      description: "Utilize straps, pallets, and tie-downs to keep packages stable and prevent shifting during transport.",
      image: Stand2Image,
    },
    {
      id: 3,
      title: "Weight Distribution",
      description: "Distribute weight evenly throughout the truck to maintain balance and avoid tipping or accidents.",
      image: Stand3Image,
    },
    {
      id: 4,
      title: "Temperature Control",
      description: "For sensitive items, ensure that the truck is equipped with climate control if necessary.",
      image: Stand4Image,
    },
    {
      id: 5,
      title: "Regular Inspections",
      description: "Conduct pre-trip and post-trip inspections to check for any issues with the load or vehicle.",
      image: Stand5Image,
    },
    {
      id: 6,
      title: "Training Drivers",
      description: "Educate drivers on safe driving practices and handling procedures to minimize risks.",
      image: Stand6Image,
    },
    {
      id: 7,
      title: "GPS Tracking",
      description: "Use GPS and tracking systems to monitor the location and conditions of the freight in real-time.",
      image: Stand7Image,
    },
    {
      id: 8,
      title: "Insurance Coverage",
      description: "Ensure that adequate insurance is in place to cover any potential damage or loss.",
      image: Stand8Image,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-darkBlue mb-8">Standard Safety Precautions</h2>
        <p className="text-center text-lg text-darkBlue mb-8 font-medium">Ensuring the safety of packages in a freight truck involves several key practices:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center">
          {data.map((item) => (
            <div 
              key={item.id} 
              className="bg-white overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center"
            >
              {item.id % 2 === 0 ? (
              
                // Odd ID: Image on top, Description below
                <div className="flex flex-col items-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto object-cover"
                  />
                  <div 
                    className={`p-6 border-4 flex items-center justify-center ${
                      item.id % 2 === 0 ? 'border-yellow-500' : 'border-darkBlue'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-5xl font-bold text-darkBlue mr-4">
                      {item.id}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-darkBlue mb-2">{item.title}</h3>
                      <p className="text-sm text-darkBlue font-medium">{item.description}</p>
                    </div>
                  </div>
                </div>
) : (
                  // Even ID: Description on top, Image below
                  <div className="flex flex-col items-center">
                  <div 
                    className={`p-4 border-4 flex items-center justify-center ${
                      item.id % 2 === 0 ? 'border-darkBlue' : 'border-darkBlue'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-5xl font-bold text-darkBlue mr-4">
                      {item.id}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-darkBlue mb-2">{item.title}</h3>
                      <p className="text-sm text-darkBlue font-medium mb-4">{item.description}</p>
                    </div>
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailerStandardProcess;
