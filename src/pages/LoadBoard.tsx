import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import LoadCard from "../components/LoadCard";
import SideBar from "../components/SideBar";
import { useAuthStore } from "../state/useAuthStore";
import { fetchQuotes } from "../lib/apiCalls";
import { useSearchParams } from "react-router-dom";

type CardProps = {
  pickupDate: Date;
  id: string;
  pickUp: string;
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
  const [radius, setRadius] = useState("");

  // ! This is disabled because it is not used in the code
  //   const [availableDeliveryLocations, setAvailableDeliveryLocations] = useState<
  //     string[]
  //   >([]);
  const [loadCards, setLoadCards] = useState<CardProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryPickUpLocation = searchParams.get("pickUpLocation") || "";
    const queryDeliveryLocation = searchParams.get("deliveryLocation") || "";
    const queryPickUpDate = searchParams.get("pickUpDate") || null;
    const queryTrailerType = searchParams.get("trailerType") || "";
    const queryRadius = searchParams.get("radius") || "";
    const [filteredLoadCards, setFilteredLoadCards] = useState<CardProps[]>([]);

    setPickUpLocation(queryPickUpLocation);
    setDeliveryLocation(queryDeliveryLocation);
    setPickUpDate(queryPickUpDate ? new Date(queryPickUpDate) : null);
    setTrailerType(queryTrailerType);
    setRadius(queryRadius);

    const filtered = loadCards.filter((load) => {
      return (
        (queryPickUpLocation
          ? load.pickUp.includes(queryPickUpLocation)
          : true) &&
        (queryDeliveryLocation
          ? load.drop.includes(queryDeliveryLocation)
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
  const radiusOptions = useMemo(
    () => ["10 mi", "20 mi", "30 mi", "40 mi", "50 mi"],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        // ! This is disabled because it is not used in the code
        // if (pickUpLocation && token) {
        //   const deliveryLocations = await fetchDeliveryLocations(
        //     pickUpLocation,
        //     token
        //   );
        //   setAvailableDeliveryLocations(deliveryLocations);
        // }

        if (token) {
          const quotes = await fetchQuotes(token);
          setLoadCards(quotes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., redirect to login if unauthorized)
      }
    };

    fetchData();
  }, [pickUpLocation]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParams({
        pickUpLocation,
        deliveryLocation,
        pickUpDate: pickUpDate ? pickUpDate.toISOString().split("T")[0] : "",
        trailerType,
        radius,
      });
    },
    [
      pickUpLocation,
      deliveryLocation,
      pickUpDate,
      trailerType,
      radius,
      setSearchParams,
    ]
  );

  const handleClear = useCallback(() => {
    setPickUpLocation("");
    setDeliveryLocation("");
    setPickUpDate(null);
    setTrailerType("");
    setRadius("");
    setSearchParams({});
  }, [setSearchParams]);

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
            <div className="mb-8 md:mb-0">
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

            <div className="mb-8 md:mb-0 lg:pl-8">
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
                <div className="mb-4 mt-4">
                  <label className="block text-primary font-normal mb-2">
                    Radius (mi) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin"
                  >
                    <option className="text-primary font-normal" value="">
                      Select Radius
                    </option>
                    {radiusOptions.map((option) => (
                      <option
                        className="text-primary font-normal"
                        key={option}
                        value={parseInt(option)}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-8 md:mb-0 lg:pl-8">
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
              onClick={handleSubmit}
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

          <div>
            <div className="flex justify-end">
              <a href="#" className="text-blue-500 hover:underline">
                Sort & Filter
              </a>
            </div>
          </div>

          {filteredLoadCards.map((load) => (
            <LoadCard
              key={load.id}
              id={load.id}
              pickUp={load.pickUp}
              drop={load.drop}
              maxWeight={load.maxWeight}
              companyName={load.companyName}
              trailerType={load.trailerType}
              distance={load.distance}
              trailerSize={load.trailerSize}
              commodity={load.commodity}
              loadPrice={load.loadPrice}
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
