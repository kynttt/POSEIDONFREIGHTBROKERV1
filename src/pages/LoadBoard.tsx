import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import LoadCard from "../components/LoadCard";
import SideBar from "../components/SideBar";
import { useAuthStore } from "../state/useAuthStore";
import { fetchBookings } from "../lib/apiCalls";
import { useSearchParams } from "react-router-dom";

type CardProps = {
  pickupDate: Date;
  id: string;
  pickUp: string;
  status: string;
  drop: string;
  maxWeight: number;
  companyName: string;
  trailerType: string;
  distance: number;
  trailerSize: string;
  loadPrice: number;
  commodity: string;
  onBookLoadClick: () => void;
};

const LoadBoard: React.FC = () => {
  const { isAuthenticated } = useAuthStore(); // Use Zustand store
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [trailerType, setTrailerType] = useState("");
  const [loadCards, setLoadCards] = useState<CardProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLoadCards, setFilteredLoadCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const queryPickUpLocation = (searchParams.get("pickUpLocation") || "").toLowerCase();
    const queryDeliveryLocation = (searchParams.get("deliveryLocation") || "").toLowerCase();
    const queryPickUpDate = searchParams.get("pickUpDate") || null;
    const queryTrailerType = searchParams.get("trailerType") || "";
    const queryRadius = searchParams.get("radius") || "";

    setPickUpLocation(queryPickUpLocation);
    setDeliveryLocation(queryDeliveryLocation);
    setPickUpDate(queryPickUpDate ? new Date(queryPickUpDate) : null);
    setTrailerType(queryTrailerType);

    const filtered = loadCards.filter((load) => {
      return (
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
      );
    });

    setFilteredLoadCards(filtered);
  }, [searchParams, loadCards]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        if (token) {
          const quotes = await fetchBookings(token);
          setLoadCards(quotes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., redirect to login if unauthorized)
      }
    };

    fetchData();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const params = {
        pickUpLocation,
        deliveryLocation,
        pickUpDate: pickUpDate ? pickUpDate.toISOString().split("T")[0] : "",
        trailerType,
      };

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value != null && value !== ""
        )
      );

      setSearchParams(filteredParams);
    },
    [
      pickUpLocation,
      deliveryLocation,
      pickUpDate,
      trailerType,
      setSearchParams,
    ]
  );

  const handleClear = useCallback(() => {
    setPickUpLocation("");
    setDeliveryLocation("");
    setPickUpDate(null);
    setTrailerType("");
    setSearchParams({});
  }, [setSearchParams]);

  const handleButtonClick = useCallback(() => {
    const event = new Event('submit', { bubbles: true });
    const form = document.querySelector('form');
    form?.dispatchEvent(event);
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar isAuthenticated={isAuthenticated} />

      <div className="flex-1 bg-white min-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit} className="lg:mx-16 py-10 px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold lg:mb-20 text-secondary">
              FIND LOADS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mb-2 md:mb-8">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                PICK UP
              </h3>
              <div className="flex flex-wrap mb-4">
                <div className="w-3/4 pr-2">
                  <label className="block text-primary font-normal mb-2">
                    Pick Up Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pickUpLocation}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                    placeholder="Enter Pick Up Location"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-primary font-normal mb-2">
                  Pick Up Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DatePicker
                    selected={pickUpDate}
                    onChange={(date) => setPickUpDate(date)}
                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                    placeholderText="MM/DD/YYYY"
                    dateFormat="MM/dd/yyyy"
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() =>
                      (
                        document.querySelector(
                          ".react-datepicker-wrapper input"
                        ) as HTMLInputElement
                      )?.focus()
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 md:mb-8 lg:pl-8">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                DROP
              </h3>
              <div className="flex flex-wrap mb-4">
                <div className="w-3/4 pr-2">
                  <label className="block text-primary font-normal mb-2">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
                    placeholder="Enter Delivery Location"
                  />
                </div>
              </div>
            </div>

            <div className="mb-2 md:mb-8 lg:pl-8">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                ADDITIONAL DETAILS
              </h3>
              <div className="mb-4">
                <label className="block text-primary font-normal mb-2">
                  Trailer Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={trailerType}
                  onChange={(e) => setTrailerType(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin text-black"
                >
                  <option className="text-primary font-normal" value="">
                    Select Trailer Type
                  </option>
                  <option className="text-primary font-normal" value="Flat Bed">
                    Flat Bed
                  </option>
                  <option className="text-primary font-normal" value="Dry Van">
                    Dry Van
                  </option>
                  <option
                    className="text-primary font-normal"
                    value="Refrigerated"
                  >
                    Refrigerated
                  </option>
                  <option className="text-primary font-normal" value="Stepdeck">
                    Step Deck
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              label="Search"
              size="large"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleButtonClick}
              className="extra-class-for-medium-button"
              type={""}
            />

            <Button
              label="Clear"
              size="large"
              bgColor="#252F70"
              hoverBgColor="white"
              onClick={handleClear}
              className="extra-class-for-medium-button"
              type={""}
            />
          </div>

          {/* <div>
            <div className="flex justify-end">
              <a href="#" className="text-blue-500 hover:underline">
                Sort & Filter
              </a>
            </div>
          </div> */}

          <div className="mt-8 flex md:justify-end gap-8 text-secondary font-normal">
            <p >Total Loads: {loadCards.length}</p>
            <p>Filtered Loads: {filteredLoadCards.length}</p>
          </div>

          {filteredLoadCards.map((load: any) => (
            <LoadCard
              key={load.id}
              id={load.id}
              pickUp={load.pickUp}
              status={load.status}
              drop={load.drop}
              maxWeight={load.maxWeight}
              companyName={load.companyName}
              trailerType={load.trailerType}
              distance={load.distance}
              trailerSize={load.trailerSize}
              commodity={load.commodity}
              price={load.price}
              pickupDate={load.pickupDate} // Pass pickUpDate here
              onBookLoadClick={load.onBookLoadClick}
            />
          ))}
        </form>
      </div>
    </div>
  );
};

export default LoadBoard;
