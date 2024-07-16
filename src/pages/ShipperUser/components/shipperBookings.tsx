import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const ShipperBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const bookingsResponse = await axios.get('http://localhost:5000/api/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(bookingsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally handle error state or display an error message
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Shipments</h2>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {bookings.map((booking: any, index: number) => (
            <button
              key={index}
              className="bg-light-grey text-left items-center rounded-lg shadow p-4 md:p-6 mb-4 text-secondary font-normal grid grid-cols-6 gap-4 overflow-x-auto"
            >
              <div>
                <h3 className="text-gray-600 text-primary">Load Number</h3>
                <p>{booking.quote?._id}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-primary">Delivery Date & Time</h3>
                <p>{booking.quote?.pickupDate}</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-primary">Origin</h3>
                <p>{booking.quote?.origin}</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-primary">Destination</h3>
                <p>{booking.quote?.destination}</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-primary">Distance</h3>
                <p>{booking.quote?.distance}</p>
              </div>
              <div className="flex items-center justify-between md:col-span-1">
                <div>
                  <h3 className="text-gray-600 text-primary">Status</h3>
                  <p>{booking.status}</p>
                </div>
                <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary" />
              </div>
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default ShipperBookings;
