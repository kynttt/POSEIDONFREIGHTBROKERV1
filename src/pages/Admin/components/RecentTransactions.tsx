import React, { useState, useEffect } from "react";
import Pagination from "../../../components/pagination"; // Import the Pagination component
import { fetchBookings } from "../../../lib/apiCalls"; // Import the fetch function from your API calls file
import { Booking, BookingStatus, Quote } from "../../../utils/types";
import { toBookStatusTitle } from "../../../components/googleMap/utils";

// Define the BookingData interface to match the expected data structure
interface BookingData {
  id: string; // Booking ID
  quote: {
    destination: string;
    deliveryDate: string;
    price: number;
  };
  status: BookingStatus;
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
        const filteredBookings: BookingData[] = data.map((booking) => ({
          id: booking.id || "", // Provide a default value if id is undefined
          quote: {
            destination: booking.quote?.destination ?? "", // Provide a default value if destination is undefined
            deliveryDate: formatDate((booking.quote as Quote).deliveryDate), // Format the delivery date
            price: (booking.quote as Quote).price,
          },
          status: booking.status,
        }));

        console.log("filteredBookings", filteredBookings);
        // Set the bookings state with filtered and transformed data
        setBookings(filteredBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later."); // Set error state in case of failure
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

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "inTransit":
        return "text-yellow-600";
      case "pending":
        return "text-red-600";
      case "confirmed":
        return "text-blue-500";
      default:
        return "text-price";
    }
  };

  // Function to format date to 'YYYY-MM-DD'
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A"; // Handle null or undefined cases
    if (typeof date === "string") {
      date = new Date(date);
    }
    return date.toISOString().split("T")[0];
  };

  // Calculate the range of bookings to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  return (
    <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg md:px-20 md:py-8 p-4 rounded-2xl shadow-lg border">
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
              <tr className="bg-light-grey">
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
                  <td className="px-2 sm:px-4 py-2 text-secondary font-normal break-words">
                    {booking.id}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-secondary font-normal break-words">
                    {booking.quote.destination.length > 25
                      ? booking.quote.destination.substring(0, 25) + "..."
                      : booking.quote.destination}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-secondary font-normal">
                    {booking.quote.deliveryDate}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-secondary font-normal">
                    ${booking.quote.price}
                  </td>
                  <td
                    className={`px-2 sm:px-4 py-2 font-normal ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {toBookStatusTitle(booking.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
