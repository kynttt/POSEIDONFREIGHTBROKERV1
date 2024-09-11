import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import carriersImage from "../assets/img/carriers.png";
import shippersImage from "../assets/img/shippers.png";
import { Flex, Stack, Image } from "@mantine/core";

// Banner data array
const bannerData = [
  {
    imgSrc: carriersImage,
    title: "Carriers",
    description: "Reliable carriers for all your freight needs.",
  },
  {
    imgSrc: shippersImage,
    title: "Shippers",
    description: "Connecting shippers with trusted partners.",
  },
];

const SeamlessFreightServices: React.FC = () => {
  return (
    <Stack
      w={"100%"}
      className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] py-32"
      justify="center"
    >
      <Stack className="text-center" gap={0.5}>
        <h1 className="xs:text-2xl md:text-4xl lg:text-xl font-normal mb-1 text-rblue">
          Services
        </h1>
        <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-rblue mb-8">
          Seamless Freight Services
        </h2>
      </Stack>
      <Flex
        w="100%"
        direction={{ xs: "column", lg: "row" }}
        justify={"center"}
        gap={30}
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
    >
      <Stack
        align="center"
        w="100%"
        gap={20}
        className="hover transition-shadow duration-300 w-full"
      >
        <div className="relative w-full overflow-hidden group max-w-lg"> {/* Added max-w-sm to match image size */}
          {/* Image with light opacity */}
          <Image
            src={imgSrc}
            alt={title}
            w="100%"
            fit="cover"
            className="group-hover:opacity-100 transition-opacity duration-300 rounded-lg" // Rounded image
          />
          {/* Blue overlay that fades out on hover */}
          <div className="absolute inset-0 bg-[#A3C6FF] opacity-80 group-hover:opacity-0 transition-opacity duration-300 rounded-3xl"></div> {/* Rounded overlay */}
          {/* Title */}
          <h3 className="absolute inset-0 flex justify-center items-center text-3xl font-semibold text-rblue group-hover:opacity-0 transition-opacity duration-300">
            {title}
          </h3>

          {/* Description appears on hover */}
          <p className="absolute bottom-0 w-full flex rounded-b-3xl p-10 justify-center items-center bg-rblue  py-4 text-center text-xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
      </Stack>
    </motion.div>
  );
}

export default SeamlessFreightServices;
