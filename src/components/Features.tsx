import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import freightImage1 from "../assets/img/Carousel1.png"; // Replace with your actual image path
import freightImage2 from "../assets/img/Carousel2.png";
import freightImage3 from "../assets/img/Carousel3.png";
import bgImage from '../assets/img/bg-features.png';
import { Image, Stack } from "@mantine/core";

const FeaturesSection: React.FC = () => {
  const { ref: imageRef1, inView: imageInView1 } = useInView({ threshold: 0.5 });
  const { ref: imageRef2, inView: imageInView2 } = useInView({ threshold: 0.5 });
  const { ref: textRef1, inView: textInView1 } = useInView({ threshold: 0.5 });
  const { ref: textRef2, inView: textInView2 } = useInView({ threshold: 0.5 });
  const { ref: textRef3, inView: textInView3 } = useInView({ threshold: 0.5 });

  const imageControls1 = useAnimation();
  const imageControls2 = useAnimation();
  const textControls1 = useAnimation();
  const textControls2 = useAnimation();
  const textControls3 = useAnimation();

  useEffect(() => {
    if (imageInView1) {
      imageControls1.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [imageControls1, imageInView1]);

  useEffect(() => {
    if (imageInView2) {
      imageControls2.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [imageControls2, imageInView2]);

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
    <Stack
      id="services"
      className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] md:py-48 py-6 bg-white"
      justify="center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      <motion.div
        ref={imageRef1}
        initial={{ opacity: 0, x: -20 }}
        animate={imageControls1}
        className="w-full"
      >
        <Stack w={"100%"} gap={"3rem"}>
          <Stack className="text-left" gap={0.5} w={"100%"}>
            <h1 className="xs:text-2xl md:text-4xl lg:text-xl font-normal mb-1 text-rblue">
              Features
            </h1>
            <h2 className="xs:text-3xl md:text-6xl lg:text-8xl font-black text-rblue">
              HOW IT WORKS
            </h2>
          </Stack>
          <div className="relative">
          <Image src={freightImage1} alt="Freight" />
          <div className="absolute bg-rblue rounded-3xl p-14 right-28 -bottom-16 shadow-xl"></div>
          </div>
        </Stack>
      </motion.div>
      <motion.div
  ref={imageRef2}
  initial={{ opacity: 0, x: -20 }}
  animate={imageControls2}
  className="w-full"
>
  <Stack
    w={"100%"}
    h={"auto"} // Set the height to auto to adjust based on content
    gap={"3rem"}
    align="center" // Center align to ensure proper alignment
  >
    <Image
      src={freightImage2}
      alt="Freight"
      style={{
        height: '200px', // Set the height you want here
        width: 'auto', // Maintain aspect ratio
        objectFit: 'cover', // Ensures the image covers the area without distortion
      }}
    />
  </Stack>
</motion.div>

<Stack justify="center" align="center" gap={"5rem"}>

<Stack
  
  style={{ width: "100%", maxWidth: "1200px" }} // Adjust maxWidth as needed
>
  <Stack style={{ width: "100%" }}>
    <Image
      src={freightImage3}
      alt="Freight"
      style={{ width: "100%", height: "auto" }}
    />
  </Stack>

  <Stack
    
    style={{ width: "100%" }}
    align="center"
  >
    <FeatureCard
      title="FLAT RATE QUOTES"
      description="The freight quotes you’ll get are flat rates based on a shipment’s date, distance, and trailer type. These aren’t estimates, but actual market-based quotes you can book."
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
  </Stack>

  <FeatureCard
    title="GET 24/7 SUPPORT"
    description="We’ll keep you updated from the moment the BOL is generated to the second the carrier uploads the POD."
    customRef={textRef3}
    initial={{ opacity: 0, y: 40 }}
    animate={textControls3}
  />
</Stack>
</Stack>
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
  customRef?: React.Ref<HTMLDivElement>;
  initial?: Record<string, unknown>;
  animate?: AnimationControls;
}) {
  return (
    <motion.div
      ref={customRef}
      initial={initial as any}
      animate={animate}
      className="bg-rblue rounded-xl p-6"
    >
      <Stack w={"100%"} className="text-center">
        <h3 className="xs:text-xl md:text-4xl lg:text-xl font-bold text-primary text-white">
          {title}
        </h3>
        <p className="md:text-3xl lg:text-sm text-white font-normal py-4 px-4 text-center text-justify">
          {description}
        </p>
      </Stack>
    </motion.div>
  );
}

export default FeaturesSection;
