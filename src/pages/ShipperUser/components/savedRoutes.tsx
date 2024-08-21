import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchUserBookings } from "../../../lib/apiCalls";
import { useNavigate } from "react-router-dom";
import { Booking, Quote } from "../../../utils/types";

const SavedRoutes = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const bookingsData = await fetchUserBookings(token);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingClick = (origin: string, destination: string) => {
    navigate('/requests', { state: { origin, destination } });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Saved Routes</h2>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bookings.map((booking, index: number) => (
            <button
              key={index}
              onClick={() => {
                // Check if booking.quote is an object
                if (booking._id && typeof booking.quote === 'object' && booking.quote !== null) {
                  handleBookingClick(booking.quote.origin, booking.quote.destination);
                }
              }}
              className="bg-light-grey text-left rounded-lg shadow p-4 md:p-6 mb-4 text-secondary font-normal grid grid-cols-3 gap-4 overflow-x-auto"
            >
              {typeof booking.quote === "object" && booking.quote !== null ? (
                <>
                  <div>
                    <h3 className="text-gray-600 text-primary">Origin</h3>
                    <p>{truncateText(booking.quote.origin, 20)}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-primary">Destination</h3>
                    <p>{truncateText(booking.quote.destination, 20)}</p>
                  </div>
                </>
              ) : (
                <div>
                  <p>Quote information is not available.</p>
                </div>
              )}
              <div className="flex items-center justify-between md:col-span-1">
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className="text-primary"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRoutes;
