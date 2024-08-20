import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill1Wave,
  faTruckFront,
  faCalendarDay,
  faBuilding,
  faBox,
  faRuler,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
// import QuoteRequestModal from '../components/QuoteRequestModal';
import { fetchQuoteDetails } from "../../lib/apiCalls"; // Import API calls
import { useQuery } from "@tanstack/react-query";

const ShipmentDetailsConfirmation: React.FC = () => {
  // const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const quoteId = searchParams.get("quoteId");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookingDetails", quoteId],
    queryFn: () => fetchQuoteDetails(quoteId),
    refetchOnWindowFocus: false,
    staleTime: 600000, // 10 minutes
    gcTime: 1800000, // 30 minutes
  });
  // console.log('Quote ID:', quoteId);

  // const handleNextClick = () => {
  //   if (data && quoteId) {
  //     const token = localStorage.getItem('authToken');
  //     bookQuote(quoteId, token || '')
  //       .then(() => {
  //         // Console log removed
  //         navigate('/payment', {
  //           state: {
  //             price: data.price,
  //             origin: data.origin,
  //             destination: data.destination
  //           }
  //         });
  //       })
  //       .catch(error => console.error('Error creating booking:', error));
  //   }
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   navigate('/');
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="flex h-screen w-full mx-auto">
      <div className="bg-white flex-1 p-4 lg:p-20 text-primary overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          Shipment Details Confirmation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12">
                <h3 className="text-lg text-secondary font-medium">
                  <span className="text-gray-500 mr-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  Pickup Location
                </h3>
                <p className="text-gray-500 py-4">{data.origin}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12">
                <h3 className="text-lg text-secondary font-medium">
                  <span className="text-gray-500 mr-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  Drop-off Location
                </h3>
                <p className="text-gray-500 py-4">{data.destination}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-12 md:mt-8">
              <h3 className="text-lg text-secondary font-medium mb-4">
                Other Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faTruckFront} />
                    </span>
                    Trailer Type
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.trailerType}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faCalendarDay} />
                    </span>
                    Date
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.pickupDate
                      ? new Date(data.pickupDate).toLocaleDateString()
                      : "TBA"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faRuler} />
                    </span>
                    Size (ft.)
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.trailerSize}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faBuilding} />
                    </span>
                    Company Name
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.companyName}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faBoxOpen} />
                    </span>
                    Commodity
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.commodity}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">
                    <span className="text-gray-500 mr-2">
                      <FontAwesomeIcon icon={faBox} />
                    </span>
                    Packaging
                  </h4>
                  <p className="text-gray-500 py-4 font-medium">
                    {data.packaging}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 md:col-span-1 lg:p-12 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg text-secondary font-medium">
                <span className="text-gray-500 mr-2">
                  <FontAwesomeIcon icon={faMoneyBill1Wave} />
                </span>
                Total Shipment Price
              </h3>
              <p className="text-5xl font-bold py-4">
                ${data.price.toLocaleString()}
              </p>
              <h4 className="font-medium text-secondary md:mt-8">
                <span className="text-gray-500 mr-2">
                  <FontAwesomeIcon icon={faMoneyBill1Wave} />
                </span>
                Taxes and other fees
              </h4>
              <p className="text-gray-500 py-4 font-medium">$ 0.00</p>
            </div>
            {/* <a
              href={""}
              className="text-blue-500 underline mt-2 block"
            >
              Download BOL
            </a> */}
          </div>
        </div>

        <div className="flex gap-8 lg:mt-16">
          <Button
            label="Next"
            size="homeButton"
            bgColor="#252F70"
            fontStyle="normal"
            onClick={() => navigate("/requests/payment?quoteId=" + quoteId)}
            className="extra-class-for-medium-button"
            type=""
          />
          <Button
            label="Back"
            size="homeButton"
            bgColor="#252F70"
            fontStyle="normal"
            onClick={() => navigate(-1)} // Use navigate(-1) for the Back button
            className="extra-class-for-medium-button"
            type=""
          />
        </div>
      </div>

      {/* {showModal && <QuoteRequestModal isOpen={showModal} />} */}
    </div>
  );
};

export default ShipmentDetailsConfirmation;