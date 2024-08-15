import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Modal from "./Modal";
import { Flex, Stack, TextInput, Button } from "@mantine/core";

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
      className="xs:px-[2rem] md:px-[8rem]  lg:px-[12rem] bg-freightquote-bg md:py-8"
    >
      <Flex
        direction={{
          xs: "column",
          lg: "row",
        }}
        align="center"
        gap={"5rem"}
        w={"100%"}
        py={28}
      >
        <Stack
          w={{
            xs: "100%",
            lg: "30%",
          }}
          justify="center"
        >
          <h2 className="xs:text-xl md:text-5xl lg:text-3xl  font-black text-primary">
            GET A
          </h2>
          <h2 className="xs:text-xl md:text-5xl lg:text-3xl  font-black text-primary">
            FREIGHT QUOTE
          </h2>
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
    navigate("/requests");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="xs:w-full lg:w-70%"
    >
      <Stack
        justify="center"
        w="100%"
        className="bg-white shadow-2xl rounded-lg"
        gap={50}
        px="md"
        py="xl"
      >
        <h3 className="text-center xs:text-xl md:text-5xl  md:text-3xl font-black text-primary">
          Cost Calculator
        </h3>
        <Flex
          gap={20}
          justify={"center"}
          align={"flex-end"}
          w={{
            xs: "100%",
            lg: undefined,
          }}
          direction={{
            xs: "column",
            lg: "row",
          }}
        >
          <TextInput
            w={{
              xs: "100%",
              lg: undefined,
            }}
            type="text"
            label="Pick Up"
            className="text-[#252F70]"
            value={pickUp}
            onChange={handlePickUpChange}
          />
          <TextInput
            w={{
              xs: "100%",
              lg: undefined,
            }}
            type="text"
            label="Destination"
            className="text-[#252F70]"
            value={destination}
            onChange={handleDestinationChange}
          />
          <TextInput
            w={{
              xs: "100%",
              lg: undefined,
            }}
            type="text"
            label="Weight (lb)"
            className="text-[#252F70]"
            value={weight}
            onChange={handleWeightChange}
          />
          <Button
            onClick={openModal}
            className="extra-class-for-medium-button"
            fullWidth
          >
            Request a Quote
          </Button>
        </Flex>
      </Stack>
      {showModal && (
        <Modal closeModal={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-12 py-8">
            <div className="flex flex-col space-y-8 items-center">
              <Button
                c={"gray"}
                size="truckButton"
                onClick={handleTruckButtonClick}
              >
                Full Truckload
              </Button>
              <Button
                size="truckButton"
                c={"gray"}
                onClick={handleTruckButtonClick}
              >
                Refrigerated Trailer
              </Button>
            </div>
            <div className="flex flex-col space-y-8 items-center">
              <Button
                size="truckButton"
                c={"gray"}
                onClick={handleTruckButtonClick}
              >
                Dry Van
              </Button>
              <Button
                size="truckButton"
                c={"gray"}
                onClick={handleTruckButtonClick}
              >
                Flatbed
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </motion.div>
  );
}

export default FreightQuote;
