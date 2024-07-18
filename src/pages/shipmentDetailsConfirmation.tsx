import React from 'react';
import Sidebar from '../components/SideBar';

const ShipmentDetailsConfirmation: React.FC = () => {
  return (
    <div className="bg-white h-screen flex flex-col md:flex-row">
      <Sidebar isAuthenticated={false} />
      <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-8">Shipment Details Confirmation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold">Pickup Location</h2>
            <p>Auburn, WS</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold">Drop-off Location</h2>
            <p>Dallas, TX</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold">Other Details</h2>
            <p><span className="font-medium">Trailer Type:</span> Flat bed</p>
            <p><span className="font-medium">Date & Time:</span> 6 July 2024 at 15:00 PM GMT</p>
            <p><span className="font-medium">Size (ft.):</span> 48 ft.</p>
            <p><span className="font-medium">Company Name:</span> ABC Company, LLC</p>
            <p><span className="font-medium">Commodity:</span> Fruits, Vegetables</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold">Total Shipment Price</h2>
            <p className="text-3xl font-bold">$4,509</p>
            <p>Taxes and other fees</p>
            <p>6 July 2024 at 15:00 PM GMT</p>
            <h2 className="font-semibold mt-4">Total Price</h2>
            <p className="text-3xl font-bold">$4,509</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Next</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg">Edit</button>
        </div>
        
      </div>
    </div>
  );
};

export default ShipmentDetailsConfirmation;
