import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router-dom";

export default function ShipmentRequestShellPage() {
  return (
    <div className="flex w-full h-screen">
      <Aside />
      <Outlet />
    </div>
  );
}
function Aside() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="dark:bg-gray-900 dark:border-gray-700 w-1/5 flex flex-col  h-screen p-5 ">
      {/* Back Button */}
      <div
        className="flex items-center text-white cursor-pointer mb-8 mt-20"
        onClick={handleBackClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span>Return Back</span>
      </div>

      {/* Title */}
      <h1 className="text-white text-2xl font-semibold mb-4">
        Manage Your Freight Quote Requests
      </h1>

      {/* Description */}
      <p className="text-gray-300 text-sm">
        Easily manage and track your freight quotes. Get detailed estimates
        based on your cargo and route.
      </p>
    </div>
  );
}
