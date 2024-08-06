import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import carriersImage from "../assets/img/carriers.png";
import brokersImage from "../assets/img/brokers.png";
import shippersImage from "../assets/img/shippers.png";
import { Flex, Stack, Image } from "@mantine/core";

// Banner data array
const bannerData = [
  {
    imgSrc: carriersImage,
    title: "Carriers",
    description: "Tailored Carrier Services to Fit Your Business",
  },
  {
    imgSrc: brokersImage,
    title: "Brokers",
    description: "Driving Your Business Forward with Expert Logistics Support",
  },
  {
    imgSrc: shippersImage,
    title: "Shippers",
    description: "Optimizing Your Shipping Process for Maximum Efficiency",
  },
];

const SeamlessFreightServices: React.FC = () => {
  return (
    <Stack w={"100%"} className="p-10 lg:p-20" justify="center">
      <Stack className="text-left" gap={0.5}>
        <h1 className="text-base md:text-xl lg:text-xl font-normal mb-1 text-[#252F70]">
          SERVICES
        </h1>
        <h2 className="text-4xl md:text-4xl lg:text-4xl font-black text-[#252F70]">
          Seamless Freight Services
        </h2>
      </Stack>
      <Flex
        w="100%"
        direction={{ base: "column", sm: "row" }}
        justify={"center"}
        gap={100}
      >
        {bannerData.map((banner, index) => (
          <Banner
            key={index}
            imgSrc={banner.imgSrc}
            title={banner.title}
            description={banner.description}
            delay={index * 0.3} // Stagger delay for each banner
          />
        ))}
      </Flex>
    </Stack>
  );
};

function Banner({
  imgSrc,
  title,
  description,
  delay,
}: {
  imgSrc: string;
  title: string;
  description: string;
  delay: number;
}) {
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
        transition: { duration: 0.5, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full"
    >
      <Stack align="center" w="100%" gap={50}>
        <Image src={imgSrc} alt={title} />
        <Stack w="100%" align="center" className="text-center">
          <p className="text-sm md:text-base lg:text-lg text-primary">
            {title}
          </p>
          <p className="text-lg font-light text-gray-500 mx-auto">
            {description}
          </p>
        </Stack>
      </Stack>
    </motion.div>
  );
}

export default SeamlessFreightServices;
