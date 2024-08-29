import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import AboutImage from "../assets/img/aboutus.png";
import { Flex, Image, Stack } from "@mantine/core";

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
      className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] py-14 md:py-14 bg-darkBg"
      direction={{
        base: "column",
        lg: "row",
      }}
      gap={{
        base: "3rem",
        lg: "5rem",
      }}
      align={"center"}
    >
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: -20 }}
        animate={textControls}
        className="w-full lg:w-1/3"
      >
        <Stack
        
          w={{
            base: "100%",
          }}
          gap={"2rem"}
        >
          <Stack
            gap={0.5}
            w={{
              base: "100%",
              lg: "50%",
            }}
          >
            <h1 className="xs:text-2xl md:text-4xl lg:text-xl font-normal mb-1 text-white">
              ABOUT US
            </h1>
            <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-teal">
              Transport and Logistics
            </h2>
          </Stack>
          <p className="md:text-3xl lg:text-base text-white font-normal leading-relaxed text-justify">
            Welcome to Poseidon Distribution Inc. (PDI)! Based in Auburn, WA
            since 2017, PDI is a family-owned transportation company that merges
            the capabilities of a large business with the warmth of a
            family-oriented work culture. Our skilled team provides Full
            Truckload (FTL) services, including dry van, temperature-controlled
            reefer, and Flatbed Conestoga freights.
          </p>
        </Stack>
      </motion.div>

      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 20 }}
        animate={imageControls}
        className="w-full lg:w-2/3"
      >
        <Flex
          align={"center"}
          justify={"center"}
          w={{
            base: "100%",
          }}
        >
          <Image src={AboutImage} alt="About Us" />
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default AboutUs;
