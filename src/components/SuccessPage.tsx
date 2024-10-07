// import React from 'react';
import HeroBanner from '../assets/img/HeroBanner.png'; // Replace with your actual image paths
// import './styles.css'; // Import your CSS for styling if needed

const RoadToSuccess = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8 font-lexend">
      <div className="text-2xl mb-4 text-center lg:text-left" style={{ color: '#252F70', fontSize: '30px', paddingLeft: '55px' }}>
        The road to<br />success starts here.
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-4 lg:space-y-0 lg:space-x-4 px-4 sm:px-6 lg:px-10" style={{ marginLeft: '20px' }}>
        {/* Carriers */}
        <div className="flex flex-col items-center">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg" style={{ width: '100%', maxWidth: '320px', height: '360px' }}>
            {/* Label */}
            <div className="absolute top-0 left-0 rounded-tl-lg rounded-br-lg p-2">
              <div className="text-lg font-bold text-primary" style={{ fontWeight: '400' }}>Carriers</div>
            </div>
            {/* Image */}
            <img src={HeroBanner} alt="Carriers" className="w-full h-auto object-cover mt-2 px-6" style={{ marginTop: '185px' }} />
          </div>
        </div>
        {/* Brokers */}
        <div className="flex flex-col items-center">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg" style={{ width: '100%', maxWidth: '320px', height: '360px' }}>
            {/* Label */}
            <div className="absolute top-0 left-0 rounded-tl-lg rounded-br-lg p-2">
              <div className="text-lg font-bold text-primary" style={{ fontWeight: '400' }}>Brokers</div>
            </div>
            {/* Image */}
            <img src={HeroBanner} alt="Brokers" className="w-full h-auto object-cover mt-2 px-6" style={{ marginTop: '185px' }} />
          </div>
        </div>
        {/* Shippers */}
        <div className="flex flex-col items-center">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg" style={{ width: '100%', maxWidth: '320px', height: '360px' }}>
            {/* Label */}
            <div className="absolute top-0 left-0 rounded-tl-lg rounded-br-lg p-2">
              <div className="text-lg font-bold text-primary" style={{ fontWeight: '400' }}>Shippers</div>
            </div>
            {/* Image */}
            <img src={HeroBanner} alt="Shippers" className="w-full h-auto object-cover mt-2 px-6" style={{ marginTop: '185px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoadToSuccess;