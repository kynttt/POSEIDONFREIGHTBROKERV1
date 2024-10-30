import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSearch,
  faUndoAlt,
  faSpinner,
  faCircleCheck,
  faTruck,
  faSquareCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../components/Button";
import LoadCard from "../../../components/LoadCard";
import { fetchBookings } from "../../../lib/apiCalls";
import { useSearchParams } from "react-router-dom";
import { BookingPaymentStatus, BookingStatus } from "../../../utils/types";

type CardProps = {
  pickupDate: Date;
  id: string;
  pickUp: string;
  status: BookingStatus;
  drop: string;
  maxWeight: number;
  companyName: string;
  trailerType: string;
  distance: number;
  trailerSize: string;
  price: number;
  commodity: string;
  paymentStatus: BookingPaymentStatus;
  onBookLoadClick: () => void;
};

const LoadBoard: React.FC = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [trailerType, setTrailerType] = useState("");
  const [loadCards, setLoadCards] = useState<CardProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLoadCards, setFilteredLoadCards] = useState<CardProps[]>([]);
  const [activeTab, setActiveTab] = useState<BookingStatus>("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = await fetchBookings();
        const cards: CardProps[] = bookings.map((book) => ({
          id: book.id || "",
          pickUp: book.quote!.origin,
          status: book.status,
          drop: book.quote!.destination,
          paymentStatus: book.paymentStatus,
          maxWeight: book.quote!.maxWeight,
          companyName: book.quote!.companyName,
          trailerType: book.quote!.trailerType,
          distance: book.quote!.distance,
          trailerSize: book.quote!.trailerSize.toString(),
          commodity: book.quote!.commodity,
          price: book.quote!.price,
          pickupDate: new Date(book.quote!.pickupDate),
          onBookLoadClick: () => {},
        }));
        setLoadCards(cards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const queryPickUpLocation =
      searchParams.get("pickUpLocation")?.toLowerCase() || "";
    const queryDeliveryLocation =
      searchParams.get("deliveryLocation")?.toLowerCase() || "";
    const queryPickUpDate = searchParams.get("pickUpDate") || null;
    const queryTrailerType = searchParams.get("trailerType") || "";
    const queryRadius = searchParams.get("radius") || "";

    setFilteredLoadCards(
      loadCards.filter(
        (load) =>
          (queryPickUpLocation
            ? load.pickUp.toLowerCase().includes(queryPickUpLocation)
            : true) &&
          (queryDeliveryLocation
            ? load.drop.toLowerCase().includes(queryDeliveryLocation)
            : true) &&
          (queryPickUpDate
            ? new Date(load.pickupDate).toDateString() ===
              new Date(queryPickUpDate).toDateString()
            : true) &&
          (queryTrailerType ? load.trailerType === queryTrailerType : true) &&
          (queryRadius ? load.distance <= parseInt(queryRadius) : true)
      )
    );
  }, [searchParams, loadCards]);

  const handleSubmit = useCallback(() => {
    const params = {
      pickUpLocation,
      deliveryLocation,
      pickUpDate: pickUpDate ? pickUpDate.toISOString().split("T")[0] : "",
      trailerType,
    };
    setSearchParams(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.fromEntries(Object.entries(params).filter(([_, value]) => value))
    );
  }, [
    pickUpLocation,
    deliveryLocation,
    pickUpDate,
    trailerType,
    setSearchParams,
  ]);

  const handleClear = useCallback(() => {
    setPickUpLocation("");
    setDeliveryLocation("");
    setPickUpDate(null);
    setTrailerType("");
    setSearchParams({});
  }, [setSearchParams]);

  const loadStatusTabs = [
    { label: "Pending", icon: faSpinner, status: "pending" },
    { label: "Revise", icon: faEdit, status: "revised" },
    { label: "Confirmed", icon: faCircleCheck, status: "confirmed" },
    { label: "In Transit", icon: faTruck, status: "inTransit" },
    { label: "Delivered", icon: faSquareCheck, status: "delivered" },
    {
      label: "Cancelled ",
      icon: faUndoAlt,
      status: "cancelled",
    },
  ];

  const filteredCardsByTab = filteredLoadCards.filter(
    (load) => load.status === activeTab
  );
  return (
    <div className="flex h-full  ">
      <div className="flex-1 max-w-screen b min-h-screen overflow-y-auto grid grid-cols-1 lg:grid-cols-4 " style={{
    background: `
      radial-gradient(circle at 15% 25%, rgba(255, 99, 132, 0.2), transparent 20%),
      radial-gradient(circle at 85% 20%, rgba(54, 162, 235, 0.3), transparent 70%),
      radial-gradient(circle at 40% 80%, rgba(75, 192, 192, 0.3), transparent 20%),
      radial-gradient(circle at 70% 70%, rgba(255, 206, 86, 0.3), transparent 20%),
      radial-gradient(circle at 30% 40%, rgba(153, 102, 255, 0.3), transparent 20%)
    `,
  }}>
        <div className="lg:col-span-3 lg:my-8 lg:mx-8 py-10 px-4 lg:px-4 bg-transparent rounded-lg w-full">
          <div className="tabs flex flex-wrap gap-4">
            {loadStatusTabs.map((tab) => (
              <button
                key={tab.status}
                className={`tab ${
                  activeTab === tab.status
                    ? "active bg-blue-500 text-white"
                    : "border border-gray-500 hover:bg-blue-500 hover:border-blue-500"
                } py-2 px-4 rounded text-gray-500 hover:text-white transition-all duration-300 flex items-center text-sm md:text-base`}
                onClick={() => setActiveTab(tab.status as BookingStatus)}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-right font-medium text-lg text-primary my-4 mx-4">
            {`${filteredCardsByTab.length} ${activeTab} Load(s) Found`}
          </div>

          <div className="load-cards mt-8">
            {filteredCardsByTab.length > 0 ? (
              filteredCardsByTab.map((load) => (
                <LoadCard key={load.id} {...load} />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-8">
                No loads found
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-1 py-10 md:px-8 md:ml-6 px-4 rounded-lg mb-8 bg-gray-200"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold lg:mb-8 text-rblue flex items-center">
              <FontAwesomeIcon icon={faSearch} className="mr-4" /> FIND LOADS
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-2 md:mb-8 rounded-lg bg-white p-4">
              <h3 className="text-lg font-semibold text-rblue mb-4">PICK UP</h3>
              <label className="block text-primary font-normal mb-2">
                Pick Up Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
                className="w-full border-gray-300 p-2 rounded-md bg-gray-100"
                placeholder="Enter Pick Up Location"
              />

              <label className="block text-primary font-normal mb-2 mt-4">
                Pick Up Date <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={pickUpDate}
                  onChange={(date) => setPickUpDate(date)}
                  className="relative w-full pr-10 border-gray-300 p-2 rounded-md bg-gray-100"
                  placeholderText="MM/DD/YYYY"
                  dateFormat="MM/dd/yyyy"
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="absolute inset-y-0 right-3 text-secondary cursor-pointer"
                />
              </div>
            </div>

            <div className="mb-2 md:mb-8 rounded-lg bg-white p-4">
              <h3 className="text-lg font-semibold text-rblue mb-4">DROP</h3>
              <label className="block text-primary font-normal mb-2">
                Delivery Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full border-gray-300 p-2 rounded-md bg-gray-100"
                placeholder="Enter Delivery Location"
              />
            </div>

            <div className="mb-2 md:mb-8 rounded-lg bg-white p-4">
              <h3 className="text-lg font-semibold text-rblue mb-4">
                ADDITIONAL DETAILS
              </h3>
              <label className="block text-primary font-normal mb-2">
                Trailer Type <span className="text-red-500">*</span>
              </label>
              <select
                value={trailerType}
                onChange={(e) => setTrailerType(e.target.value)}
                className="w-full border-gray-300 p-2 rounded-md bg-gray-100"
              >
                <option value="">Select Trailer Type</option>
                <option value="Flat Bed">Flat Bed</option>
                <option value="Dry Van">Dry Van</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Stepdeck">Step Deck</option>
              </select>
            </div>
          </div>

          <div className="text-center flex gap-4">
            <Button
              label="Search"
              size="large"
              onClick={handleSubmit}
              type={""}
            />
            <Button
              label="Clear"
              size="large"
              onClick={handleClear}
              type={""}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadBoard;
