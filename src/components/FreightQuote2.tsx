import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"; // Import useInView for scroll effect
import Button from "./Button";
import Modal from "./Modal";

const FreightQuoteMini: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
//   const [weight, setWeight] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate(); // Get navigate function from React Router

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

//   const openModal = () => {
//     // Check if all required inputs are populated
//     if (
//       pickUp.trim() !== "" &&
//       destination.trim() !== ""
//     ) {
//       setShowModal(true);
//     } else {
//       alert("Please fill in all fields before requesting a quote.");
//     }
//   };

  const closeModal = () => {
    setShowModal(false);
  };

//   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const input = event.target.value;
//     // Only update state if input is numeric or empty (allowing backspace/delete)
//     if (/^\d*$/.test(input)) {
//       setWeight(input);
//     }
//   };

  const handlePickUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickUp(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleTruckButtonClick = () => {
    // Navigate to '/quote-details' when a truck button is clicked
    navigate("/requests");
  };

  return (
    <>
      <div
        ref={ref}
        className={`flex  items-center  
                    transition-transform duration-1000 ${
                      inView
                        ? "transform-none opacity-100"
                        : "transform translate-y-20 opacity-0"
                    }`}
      >
        {/* <div className="flex flex-col w-full "> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
  <div>
    <input
      type="text"
      placeholder="Pick Up"
      value={pickUp}
      onChange={handlePickUpChange}
      className="text-rblue border border-rblue border-opacity-2 rounded px-4 py-2 bg-transparent h-16 w-full font-normal"
    />
  </div>
  <div>
    <input
      type="text"
      placeholder="Destination"
      value={destination}
      onChange={handleDestinationChange}
      className="text-rblue border border-rblue border-opacity-2 rounded px-4 py-2 bg-transparent h-16 w-full font-normal"
    />
  </div>
  <div>
    <button
      onClick={handleTruckButtonClick}
      className="text-white bg-rblue flex justify-center rounded items-center w-full h-full px-12 py-3 hover:border-rblue hover:bg-white hover:text-rblue hover:border-2 " // Add margin-top to separate from inputs if needed
    >Request a Quote</button>
  </div>
</div>


        {/* </div> */}
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-12 py-8">
            <div className="flex flex-col space-y-8 items-center">
              <Button
                label="Full Truckload"
                size="truckButton"
                bgColor="grey"
                onClick={handleTruckButtonClick}
                type={""}
              />
              <Button
                label="Refrigerated Trailer"
                size="truckButton"
                bgColor="grey"
                onClick={handleTruckButtonClick}
                type={""}
              />
            </div>
            <div className="flex flex-col space-y-8 items-center">
              <Button
                label="Dry Van"
                size="truckButton"
                bgColor="grey"
                onClick={handleTruckButtonClick}
                type={""}
              />
              <Button
                label="Flatbed"
                size="truckButton"
                bgColor="grey"
                onClick={handleTruckButtonClick}
                type={""}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FreightQuoteMini;
