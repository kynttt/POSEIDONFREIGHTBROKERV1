import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import freightImage from "../assets/img/freight.png";
import { Flex, Image, Stack } from "@mantine/core";

const FeaturesSection: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: textRef1, inView: textInView1 } = useInView({ threshold: 0.5 });
  const { ref: textRef2, inView: textInView2 } = useInView({ threshold: 0.5 });
  const { ref: textRef3, inView: textInView3 } = useInView({ threshold: 0.5 });

  const imageControls = useAnimation();
  const textControls1 = useAnimation();
  const textControls2 = useAnimation();
  const textControls3 = useAnimation();

  useEffect(() => {
    if (imageInView) {
      imageControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [imageControls, imageInView]);

  useEffect(() => {
    if (textInView1) {
      textControls1.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [textControls1, textInView1]);

  useEffect(() => {
    if (textInView2) {
      textControls2.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [textControls2, textInView2]);

  useEffect(() => {
    if (textInView3) {
      textControls3.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
  }, [textControls3, textInView3]);

  return (
    <Stack className="p-10 lg:p-20" justify="center">
      <Flex
        direction={{
          base: "column",
          lg: "row",
        }}
        gap={{
          base: "3rem",
          lg: "5rem",
        }}
      >
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: -20 }}
          animate={imageControls}
          className="lg:w-1/2 w-full"
        >
          <Stack w={"100%"} gap={"3rem"}>
            <Stack className="text-left" gap={0.5} w={"100%"}>
              <h1 className="text-base md:text-xl lg:text-xl font-normal mb-1 text-[#252F70]">
                FEATURES
              </h1>
              <h2 className="text-4xl md:text-4xl lg:text-4xl font-black text-[#252F70]">
                How it works
              </h2>
            </Stack>
            <Image src={freightImage} alt="Freight" />
          </Stack>
        </motion.div>

        <Stack justify="center" align="center" gap={"5rem"}>
          <Flex
            justify={"center"}
            align={{
              base: "center",
              lg: "flex-start",
            }}
            gap={"5rem"}
            direction={{
              base: "column",
              lg: "row",
            }}
          >
            <FeatureCard
              title="FLAT RATE QUOTES"
              description="The freight quotes you’ll get are flat rates based on a shipment’s
              date, distance, and trailer type. These aren’t estimates, but
              actual market-based quotes you can book."
              customRef={textRef1}
              initial={{ opacity: 0, x: -20 }}
              animate={textControls1}
            />

            <FeatureCard
              title="BOOK SHIPMENTS INSTANTLY"
              description="Booking at your quoted rate only takes a couple of clicks. If you don’t have an account, creating one takes less than 5 minutes."
              customRef={textRef2}
              initial={{ opacity: 0, x: 20 }}
              animate={textControls2}
            />
          </Flex>
          <FeatureCard
            title="GET 24/7 SUPPORT"
            description="We’ll keep you updated from the moment the BOL is generated to the second the carrier uploads the POD."
            customRef={textRef3}
            initial={{ opacity: 0, y: 40 }}
            animate={textControls3}
          />
        </Stack>
      </Flex>
    </Stack>
  );
};

function FeatureCard({
  title,
  description,
  customRef,
  initial,
  animate,
}: {
  title: string;
  description: string;
  customRef?: any;
  initial?: any;
  animate?: any;
}) {
  return (
    <motion.div
      ref={customRef}
      initial={initial}
      animate={animate}
      className="lg:w-1/3 w-full "
    >
      <Stack w={"100%"}>
        <h3 className="text-lg font-bold text-primary text-center">{title}</h3>
        <p className="mt-2 font-normal text-base text-gray-500 py-2 text-center">
          {description}
        </p>
      </Stack>
    </motion.div>
  );
}

export default FeaturesSection;
