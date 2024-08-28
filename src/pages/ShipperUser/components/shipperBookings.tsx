import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchUserBookings } from "../../../lib/apiCalls";
import { useNavigate } from "react-router-dom";
import { Booking } from "../../../utils/types";

interface ShipperBookingsProps {
  onDataFetched: (data: Booking[]) => void;
  selectedDate: string | null; // Add selectedDate to props
}

const ShipperBookings = ({ onDataFetched, selectedDate }: ShipperBookingsProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await fetchUserBookings();
        
        // Filter bookings by selectedDate if it is set
        const filteredBookings = selectedDate
          ? bookingsData.filter((booking: { quote: { pickupDate: string | number | Date; }; }) => {
              const pickupDate = new Date(booking.quote?.pickupDate).toLocaleDateString();
              return pickupDate === new Date(selectedDate).toLocaleDateString();
            })
          : bookingsData;

        setBookings(filteredBookings);
        onDataFetched(filteredBookings); // Notify parent about the filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [onDataFetched, selectedDate]); // Include selectedDate in the dependency array

  const handleBookingClick = (id: string) => {
    navigate(`/s/shipmentDetails/${id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Shipments</h2>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found for the selected date.</p>
          ) : (
            bookings.map((booking, index: number) => (
              <button
                key={index}
                onClick={() => {
                  if (booking._id) {
                    handleBookingClick(booking._id);
                  }
                }}
                className="bg-light-grey text-left rounded-lg shadow p-4 md:p-6 mb-4 text-secondary font-normal grid grid-cols-5 gap-4 overflow-x-auto"
              >
                {typeof booking.quote === "object" && booking.quote !== null ? (
                  <>
                    <div>
                      <h3 className="text-gray-600 text-primary">Pick Up Date</h3>
                      <p>
                        {new Date(booking.quote.pickupDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-primary">Origin</h3>
                      <p>{truncateText(booking.quote.origin, 20)}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-primary">Destination</h3>
                      <p>{truncateText(booking.quote.destination, 20)}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-primary">Distance</h3>
                      <p>{booking.quote.distance} miles</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p>Quote information is not available.</p>
                  </div>
                )}
                <div className="flex items-center justify-between md:col-span-1">
                  <div>
                    <h3 className="text-gray-600 text-primary">Status</h3>
                    <p>{booking.status}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    className="text-primary"
                  />
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShipperBookings;
