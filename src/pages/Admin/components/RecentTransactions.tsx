import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/pagination'; // Import the Pagination component
import { fetchBookings } from '../../../lib/apiCalls'; // Import the fetch function from your API calls file
import { Quote, BookingStatus } from '../../../utils/types';

// Define the BookingData interface to match the expected data structure
interface BookingData {
  _id: string; // Booking ID
  quote: {
    destination: string;
    deliveryDate: string;
    price: number;
  };
  status: string;
}

// Define the Booking interface to match the data structure from the API
interface Booking {
  _id?: string; // Make _id optional to match your schema
  quote: string | Quote;
  status: BookingStatus;
  carrier?: string | null;
  driver?: string | null;
  pickupTime?: string | null;
  deliveryTime?: string | null;
}

const RecentTransactions: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<BookingData[]>([]); // State to store bookings
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: Booking[] = await fetchBookings(); // Fetch data using your function
  
        // Convert the fetched data into the BookingData type and filter out bookings without deliveryDate
        const filteredBookings: BookingData[] = data
          .filter((booking) => booking._id && typeof booking.quote !== 'string' && (booking.quote as Quote).deliveryDate) // Ensure _id, quote, and deliveryDate are valid
          .map((booking) => ({
            _id: booking._id || '', // Provide a default value if _id is undefined
            quote: {
              destination: (booking.quote as Quote).destination,
              deliveryDate: formatDate((booking.quote as Quote).deliveryDate), // Format the delivery date
              price: (booking.quote as Quote).price,
            },
            status: booking.status,
          }));
  
        // Set the bookings state with filtered and transformed data
        setBookings(filteredBookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.'); // Set error state in case of failure
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'text-yellow-600';
      case 'Pending':
        return 'text-red-600';
      case 'Confirmed':
        return 'text-blue-500';
      default:
        return 'text-price';
    }
  };

  // Function to format date to 'YYYY-MM-DD'
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'N/A'; // Handle null or undefined cases
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  };

  // Calculate the range of bookings to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  return (
    <div className="bg-white md:px-20 md:py-8 p-4 rounded-2xl shadow-lg border">
      <h3 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-2   pb-2">
        Recent Transactions
      </h3>

      {loading ? (
        <p>Loading...</p> // Display loading indicator
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className='bg-light-grey'>
                <th className="px-2 sm:px-4 py-2 text-left">Booking ID</th>
                <th className="px-2 sm:px-4 py-2 text-left">Destination</th>
                <th className="px-2 sm:px-4 py-2 text-left">Delivery Date</th>
                <th className="px-2 sm:px-4 py-2 text-left">Price</th>
                <th className="px-2 sm:px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
            {displayedBookings.map((booking, index) => (
              <tr key={index} className="text-xs sm:text-base">
                <td className="px-2 sm:px-4 py-2 text-secondary font-normal break-words">{booking._id}</td>
                <td className="px-2 sm:px-4 py-2 text-secondary font-normal break-words">
                  {booking.quote.destination.length > 25
                    ? booking.quote.destination.substring(0, 25) + '...'
                    : booking.quote.destination}
                </td>
                <td className="px-2 sm:px-4 py-2 text-secondary font-normal">{booking.quote.deliveryDate}</td>
                <td className="px-2 sm:px-4 py-2 text-secondary font-normal">${booking.quote.price}</td>
                <td className={`px-2 sm:px-4 py-2 font-normal ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
