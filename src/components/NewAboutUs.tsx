import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBox, faUsers, faBuilding, faUser, faGlobe, faBus, faMapMarkerAlt, faWarehouse, faShippingFast } from '@fortawesome/free-solid-svg-icons';

const TransportLogistics: React.FC = () => {
  return (
    <section className="py-16 bg-white text-center container mx-auto mb-24">
      {/* Title Section */}
      <h2 className="text-5xl font-medium text-center text-rblue mb-16">
        Transport & <span className="text-blue-500">Logistics</span>
      </h2>
      
      {/* Description */}
      <p className="mt-4 text-nblue font-normal mx-auto w-3/4">
        Welcome to Poseidon Distribution Inc. (PDI). Based in Auburn, WA since 2017, PDI is a family-owned transportation company 
        that merges the capabilities of a large business with the warmth of the family-oriented work culture. Our skilled team provides 
        Full Truckload (FTL) services, including dry van, temperature-controlled reefer, and flatbed Conestoga freights.
      </p>
      
      {/* Icons Grid */}
      <div className="mt-12 space-y-16 w-1/2 mx-auto">
        {/* Icons Row 1 */}
        <div className="flex justify-between space-x-6 ">
          <FontAwesomeIcon icon={faTruck} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faBox} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faUsers} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faBuilding} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faUser} size="2x" className="text-blue-600" />
        </div>

        {/* Icons Row 2 (Middle) */}
        <div className="flex justify-around space-x-6">
          <FontAwesomeIcon icon={faGlobe} size="2x" className="text-primary" />
          <FontAwesomeIcon icon={faBus} size="2x" className="text-primary" />
          <FontAwesomeIcon icon={faShippingFast} size="2x" className="text-primary" />
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-primary" />
        </div>

        {/* Icons Row 3 */}
        <div className="flex justify-between space-x-6">
          <FontAwesomeIcon icon={faWarehouse} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faTruck} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faBox} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faBuilding} size="2x" className="text-blue-600" />
          <FontAwesomeIcon icon={faUser} size="2x" className="text-blue-600" />
        </div>
      </div>
    </section>
  );
};

export default TransportLogistics;
