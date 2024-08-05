import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Button from "./Button";
import Modal from "./Modal";
import { Flex, Stack, TextInput } from "@mantine/core";

const FreightQuote: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full"
    >
      <Flex
        direction={{
          base: "column",
          xs: "column",
          sm: "row",
        }}
        justify={"center"}
        align="center"
        rowGap={20}
        columnGap={20}
        className="bg-freightquote-bg"
        w={"100%"}
        py={28}
      >
        <Stack
          w={{
            base: "100%",
            sm: "30%",
          }}
          className="text-center"
          align="center"
        >
          <h2 className="text-3xl font-black text-[#252F70]">GET A</h2>
          <h2 className="text-3xl font-black text-[#252F70]">FREIGHT QUOTE</h2>
        </Stack>
        <CalculatorComponent />
      </Flex>
    </motion.section>
  );
};

function CalculatorComponent() {
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    if (
      pickUp.trim() !== "" &&
      destination.trim() !== "" &&
      weight.trim() !== ""
    ) {
      setShowModal(true);
    } else {
      alert("Please fill in all fields before requesting a quote.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      setWeight(input);
    }
  };

  const handlePickUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickUp(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleTruckButtonClick = () => {
    navigate("/distance-calculator");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-[90%]"
    >
      <Stack
        justify="center"
        w="100%"
        className="bg-white shadow-2xl"
        gap={50}
        px="md"
        py="xl"
      >
        <h3 className="text-center text-lg font-black text-[#252F70]">
          Cost Calculator
        </h3>
        <Flex
          gap={20}
          justify={"center"}
          align={"center"}
          direction={{
            base: "column",
            sm: "row",
          }}
        >
          <TextInput
            type="text"
            label="Pick Up"
            className="text-[#252F70]"
            value={pickUp}
            onChange={handlePickUpChange}
          />
          <TextInput
            type="text"
            label="Destination"
            className="text-[#252F70]"
            value={destination}
            onChange={handleDestinationChange}
          />
          <TextInput
            type="text"
            label="Weight (lb)"
            className="text-[#252F70]"
            value={weight}
            onChange={handleWeightChange}
          />
          <Button
            label="Request a Quote"
            size="quoteButton"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={openModal}
            className="extra-class-for-medium-button"
            type={""}
          />
        </Flex>
      </Stack>
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
    </motion.div>
  );
}

export default FreightQuote;
