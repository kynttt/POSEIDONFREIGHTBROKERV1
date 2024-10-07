import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import AboutImage from "../assets/img/about-img.jpg";
import AskIcon from "../assets/img/ask.png";
import { Flex, Stack, Box, Text } from "@mantine/core";

const AboutUs: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.5 });

  const imageControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (imageInView) {
      imageControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [imageControls, imageInView]);

  useEffect(() => {
    if (textInView) {
      textControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [textControls, textInView]);

  return (
    <Flex
      id="about"
      className="relative bg-white flex justify-end"
      direction={{
        base: "column",
        lg: "row",
      }}
      align={"center"}
      gap={"5rem"}
    >
      {/* Blue Box with Description */}
      <img
            src={AskIcon}
            alt="Questionmark-blue"
            className="shadow-lg h-auto object-cover rounded-3xl absolute -top-10 z-30"
  style={{ left: '29%' }}
          />
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: -20 }}
        animate={textControls}
        className="absolute left-0 lg:w-1/2 bg-rblue p-6 md:p-16 text-white rounded-r-3xl z-30 md:mt-40 top-72"
      >
        <Stack gap={"1rem"} className="px-16">
          <h1 className="text-lg xs:text-xl md:text-2xl font-semibold text-center">
            Transport and Logistics
          </h1>
          <Text className="text-sm xs:text-base md:text-lg leading-relaxed text-justify px-4 xs:px-8 md:pl-40 md:pr-10">
            Welcome to Poseidon Distribution Inc. (PDI)! Based in Auburn, WA
            since 2017, PDI is a family-owned transportation company that merges
            the capabilities of a large business with the warmth of a
            family-oriented work culture. Our skilled team provides Full
            Truckload (FTL) services, including dry van, temperature-controlled
            reefer, and Flatbed Conestoga freights.
          </Text>
        </Stack>
      </motion.div>

      {/* Image Overlay with Title */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 20 }}
        animate={imageControls}
        className="w-full xl:w-2/3 absolute -top-20 relative"
      >
        <Box className="relative overflow-visible">
          <img
            src={AboutImage}
            alt="About Us"
            className="w-[120%] h-auto object-cover rounded-l-3xl"
          />
          {/* Text on Image */}
          <Box className="absolute top-40 left-0 w-full h-full object-cover rounded-lg flex flex-col justify-center items-end text-white p-4 xs:p-8">
          <h1 className="text-2xl xs:text-xl md:text-2xl font-bold mb-2 text-end text-nblue md:mr-16">
            About Us
          </h1>
          <h2 className="text-3xl xs:text-5xl md:text-8xl font-extrabold text-white text-end md:mr-16">
            POSEIDON
          </h2>
</Box>

        </Box>
      </motion.div>
    </Flex>
  );
};

export default AboutUs;
