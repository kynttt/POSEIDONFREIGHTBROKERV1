import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faTruck,
  faSpinner,
  faTimesCircle,
  faSquareCheck,
  faCircleCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserBookings } from "../../../lib/apiCalls";
import { useNavigate } from "react-router-dom";
import { Booking, BookingStatus } from "../../../utils/types";

interface ShipperBookingsProps {
  onDataFetched: (data: Booking[]) => void;
  selectedDate: string | null;
}

const ShipperBookings = ({ onDataFetched, selectedDate }: ShipperBookingsProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<BookingStatus | "All">("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await fetchUserBookings();

        // Filter bookings by selectedDate if it is set
        const filteredByDate = selectedDate
          ? bookingsData.filter((booking: { quote: { pickupDate: string | number | Date } }) => {
              const pickupDate = new Date(booking.quote?.pickupDate).toLocaleDateString();
              return pickupDate === new Date(selectedDate).toLocaleDateString();
            })
          : bookingsData;

        setBookings(filteredByDate);
        onDataFetched(filteredByDate); // Notify parent about the filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [onDataFetched, selectedDate]);

  const handleBookingClick = (id: string) => {
    navigate(`/s/shipmentDetails/${id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Filter bookings based on selected category
  const filteredBookings =
    selectedCategory === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 lg:px-20">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Shipments</h2>

      <div className="p-4 rounded-md mb-6">
        {/* Filter Buttons Container */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          {/* Left Section - Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-0 justify-center sm:justify-start">
  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("All")}
  >
    All
  </button>

  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("Pending")}
  >
    <FontAwesomeIcon icon={faSpinner} className="mr-2" />
    Pending
  </button>

  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "Confirmed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("Confirmed")}
  >
    <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
    Confirmed
  </button>

  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "In Transit" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("In Transit")}
  >
    <FontAwesomeIcon icon={faTruck} className="mr-2" />
    In Transit
  </button>

  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "Delivered" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("Delivered")}
  >
    <FontAwesomeIcon icon={faSquareCheck} className="mr-2" />
    Delivered
  </button>

  <button
    className={`px-4 py-2 font-medium ${
      selectedCategory === "Cancelled" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-md`}
    onClick={() => setSelectedCategory("Cancelled")}
  >
    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
    Cancelled
  </button>
</div>


          {/* Right Section - Total count */}
          <div className="text-gray-600 font-normal text-sm sm:text-base">
            {filteredBookings.length} {selectedCategory === "All" ? "Bookings" : selectedCategory} Found
          </div>
        </div>
      </div>

      {/* Booking List */}
      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 font-normal my-4">No bookings found for this filter.</p>
              <button
                className="bg-blue-500 text-white px-4 py-4 rounded-md mx-auto my-28 flex items-center"
                onClick={() => navigate("/requests?page=form")}
              >
                <div className="bg-gray-700 rounded-full w-4 h-4 p-4 text-center flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faPlus} className="" />
                </div>
                Request Your First Quote
              </button>
            </div>
          ) : (
            filteredBookings.map((booking, index: number) => (
              <button
                key={index}
                onClick={() => {
                  if (booking._id) {
                    handleBookingClick(booking._id);
                  }
                }}
                className="bg-light-grey text-left rounded-lg shadow-lg p-4 md:p-6 mb-4 text-secondary font-normal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto"
              >
                {typeof booking.quote === "object" && booking.quote !== null ? (
                  <>
                    <div>
                      <h3 className="text-gray-600 text-primary">Pick Up Date</h3>
                      <p>{new Date(booking.quote.pickupDate).toLocaleDateString()}</p>
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-primary">Status</h3>
                    <p>{booking.status}</p>
                  </div>
                  <FontAwesomeIcon icon={faRightToBracket} className="text-primary w-6 h-6" />
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
