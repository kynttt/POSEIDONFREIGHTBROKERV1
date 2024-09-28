// import React, { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { motion, useAnimation } from "framer-motion";
// import carriersImage from "../assets/img/carriers.png";
// import shippersImage from "../assets/img/shippers.png";
// import { Flex, Stack, Image } from "@mantine/core";

// // Banner data array
// const bannerData = [
//   {
//     imgSrc: carriersImage,
//     title: "Carriers",
//     description: "Reliable carriers for all your freight needs.",
//   },
//   {
//     imgSrc: shippersImage,
//     title: "Shippers",
//     description: "Connecting shippers with trusted partners.",
//   },
// ];

// const SeamlessFreightServices: React.FC = () => {
//   return (
//     <Stack
//       w={"100%"}
//       className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] pb-24 pt-[5rem] "
//       justify="center"
//     >
//       <Stack className="text-center" gap={0.5}>
        
//         <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black font-normal text-rblue mb-16">
//           Seamless Freight Services
//         </h2>
//       </Stack>
//       <Flex
//         w="100%"
//         direction={{ xs: "column", lg: "row" }}
//         justify={"center"}
//         gap={120}
//       >
//         {bannerData.map((banner, index) => (
//           <Banner
//             key={index}
//             imgSrc={banner.imgSrc}
//             title={banner.title}
//             description={banner.description}
//             delay={index * 0.3} // Stagger delay for each banner
//           />
//         ))}
//       </Flex>
//     </Stack>
//   );
// };

// function Banner({
//   imgSrc,
//   title,
//   description,
//   delay,
// }: {
//   imgSrc: string;
//   title: string;
//   description: string;
//   delay: number;
// }) {
//   const controls = useAnimation();
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//     triggerOnce: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.5, delay },
//       });
//     }
//   }, [controls, inView, delay]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//     >
//       <Stack
//         align="center"
//         w="120%"
//         gap={10}
//         className="hover transition-shadow duration-300 w-full shadow-lg rounded-3xl"
//       >
//         <div className="relative w-full overflow-hidden group max-w-lg"> {/* Added max-w-sm to match image size */}
//           {/* Image with light opacity */}
//           <Image
//             src={imgSrc}
//             alt={title}
//             w="120%"
//             fit="cover"
//             className="group-hover:opacity-100 transition-opacity duration-300 rounded-lg" // Rounded image
//           />
//           {/* Blue overlay that fades out on hover */}
//           <div className="absolute inset-0 bg-[#A3C6FF] opacity-80 group-hover:opacity-0 transition-opacity duration-300 rounded-3xl"></div> {/* Rounded overlay */}
//           {/* Title */}
//           <h3 className="absolute inset-0 flex justify-center items-center text-3xl font-semibold text-rblue group-hover:opacity-0 transition-opacity duration-300">
//             {title}
//           </h3>

//           {/* Description appears on hover */}
//           <p className="absolute bottom-0 w-full flex rounded-b-3xl p-10 justify-center items-center bg-rblue  py-4 text-center text-xl font-normal text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             {description}
//           </p>
//         </div>
//       </Stack>
//     </motion.div>
//   );
// }

// export default SeamlessFreightServices;
import React from 'react';
import carriersImage from "../assets/img/carriers.jpg";
import shippersImage from "../assets/img/shippers.png";

const ServiceCards: React.FC = () => {
  return (
    <div id="services" className="flex flex-col items-center justify-center py-16 bg-white">
      <h2 className="text-5xl font-medium text-center text-rblue mb-10 lg:mb-28">
        Seamless Freight Service
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto px-2">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={carriersImage}
            alt="Carriers"
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Fast Delivery</h3>
            <p className="text-nblue font-normal">
              Tailored Carrier Services to Fit Your Business.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={shippersImage}
            alt="Shippers"
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Monitored 24/7</h3>
            <p className="text-nblue font-normal">
              Driving your business forward with Expert Logistic Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
