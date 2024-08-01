  import React, { useEffect, useState } from 'react';
  import { useLocation } from 'react-router-dom'; // Import useLocation to access location state
  import SideBar from '../components/SideBar';
  import { useAuthStore } from '../state/useAuthStore';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faLocationDot, faMoneyBill1Wave, faTruckFront, faCalendarDay, faBuilding, faBox, faRuler } from '@fortawesome/free-solid-svg-icons';
  import Button from "../components/Button";

  interface ShipmentDetailsProps {
    origin: string;
    destination: string;
    price: number;
    pickupDate: string;
    trailerType: string;
    trailerSize: string;
    companyName: string;
    commodity: string;
    bolLink: string;
  }

  const ShipmentDetailsConfirmation: React.FC = () => {
    const { isAuthenticated } = useAuthStore();
    const [data, setData] = useState<ShipmentDetailsProps | null>(null);
    const location = useLocation(); // Use useLocation to access location state

    // Extract quoteId from location state
    const quoteId = location.state?.quoteId;

    useEffect(() => {
      if (quoteId) {
        const token = localStorage.getItem('authToken'); // Or however you're storing your token
        fetch(`http://localhost:5000/api/quotes/${quoteId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Assuming a Bearer token is required
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setData(data))
          .catch(error => console.error('Error fetching shipment data:', error));
      }
    }, [quoteId]);

    if (!data) {
      return <div>Loading...</div>; // Return a loading state or placeholder
    }

    return (
      <div className="flex w-full mx-auto">
        <SideBar isAuthenticated={isAuthenticated} />
        <div className='bg-white flex-1 p-4 lg:p-20 text-primary'>
          <h2 className="text-2xl font-bold mb-6">Shipment Details Confirmation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <div className='grid gap-8 md:grid-cols-2'>
                <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12">
                  <h3 className="text-lg text-secondary font-medium">
                    <span className='text-gray-500 mr-2'>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    Pickup Location
                  </h3>
                  <p className='text-gray-500 py-4'>{data.origin}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12">
                  <h3 className="text-lg text-secondary font-medium">
                    <span className='text-gray-500 mr-2'>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    Drop-off Location
                  </h3>
                  <p className='text-gray-500 py-4'>{data.destination}</p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12 md:mt-8">
                <h3 className="text-lg text-secondary font-medium mb-4">Other Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-secondary">
                      <span className='text-gray-500 mr-2'>
                        <FontAwesomeIcon icon={faTruckFront} />
                      </span>
                      Trailer Type
                    </h4>
                    <p className='text-gray-500 py-4 font-medium'>{data.trailerType}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary">
                      <span className='text-gray-500 mr-2'>
                        <FontAwesomeIcon icon={faCalendarDay} />
                      </span>
                      Date & Time
                    </h4>
                    <p className='text-gray-500 py-4 font-medium'>{data.pickupDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary">
                      <span className='text-gray-500 mr-2'>
                        <FontAwesomeIcon icon={faRuler} />
                      </span>
                      Size (ft.)
                    </h4>
                    <p className='text-gray-500 py-4 font-medium'>{data.trailerSize}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary">
                      <span className='text-gray-500 mr-2'>
                        <FontAwesomeIcon icon={faBuilding} />
                      </span>
                      Company Name
                    </h4>
                    <p className='text-gray-500 py-4 font-medium'>{data.companyName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary">
                      <span className='text-gray-500 mr-2'>
                        <FontAwesomeIcon icon={faBox} />
                      </span>
                      Commodity
                    </h4>
                    <p className='text-gray-500 py-4 font-medium'>{data.commodity}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 md:col-span-1 lg:p-12 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg text-secondary font-medium">
                  <span className='text-gray-500 mr-2'>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} />
                  </span>
                  Total Shipment Price
                </h3>
                <p className="text-5xl font-bold py-4">${data.price.toLocaleString()}</p>
                <h4 className="font-medium text-secondary md:mt-8">
                  <span className='text-gray-500 mr-2'>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} />
                  </span>
                  Taxes and other fees
                </h4>
                <p className='text-gray-500 py-4 font-medium'>{data.pickupDate}</p>
              </div>
              <a href={data.bolLink} className="text-blue-500 underline mt-2 block">Download BOL</a>
            </div>
          </div>

          <div className="flex gap-8 lg:mt-16">
            <Button
              label="Next"
              size="homeButton"
              bgColor="#252F70"
              fontStyle="normal"
              onClick={() => {}}
              className="extra-class-for-medium-button"
              type=""
            />
            <Button
              label="Back"
              size="homeButton"
              bgColor="#252F70"
              fontStyle="normal"
              onClick={() => {}}
              className="extra-class-for-medium-button"
              type=""
            />
          </div>
        </div>
      </div>
    );
  };

  export default ShipmentDetailsConfirmation;
