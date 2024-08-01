// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const AdminReportCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 text-sm font-normal text-primary relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <FontAwesomeIcon icon={faFileExport} className="text-gray-400 text-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Mode</p>
          <p>Road</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Status</p>
          <p>Delivered</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Customer PO</p>
          <p>12345</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">FreightBroker PO</p>
          <p>67890</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Schedule Delivery Date</p>
          <p>06/30/2024</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Origin City</p>
          <p>New York</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Origin State</p>
          <p>NY</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Destination City</p>
          <p>Los Angeles</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Scheduled Pickup Date</p>
          <p>06/28/2024</p>
        </div>
        <div className="col-span-2 sm:col-span-1 mb-4">
          <p className="text-primary text-base font-medium mb-2">Destination</p>
          <p>CA</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReportCard;
