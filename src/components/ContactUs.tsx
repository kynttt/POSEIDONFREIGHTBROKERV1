import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Flex, Stack, Textarea, TextInput, Button } from "@mantine/core";

const ContactForm: React.FC = () => {
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.5 });
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.5 });

  const formControls = useAnimation();
  const mapControls = useAnimation();

  useEffect(() => {
    if (formInView) {
      formControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [formControls, formInView]);

  useEffect(() => {
    if (mapInView) {
      mapControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [mapControls, mapInView]);

  return (
    <Flex
    id="contacts"
      className="xs:p-[2rem] md:p-[8rem] lg:p-[12rem] w-full bg-white"
      direction={{ base: "column", lg: "row" }}
      align={"center"}
      gap={"4rem"}
      h={{
        lg: "100vh",
      }}
    >
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, x: -20 }}
        animate={formControls}
        className="w-full lg:w-1/2"
      >
        <Stack
          w={{
            base: "100%",
          }}
        >
          <Stack className="text-left" gap={0.5} w={"100%"}>
            <h1 className="xs:text-2xl md:text-4xl lg:text-xl font-normal mb-1 text-rblue">
              Contact Us
            </h1>
            <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-rblue lg:mb-6">
              Drop us a line
            </h2>
          </Stack>
          <Stack>
            <TextInput variant="filled" placeholder="Name" size="lg"/>
            <TextInput
              variant="filled"
              placeholder="Email"
              size="lg"
              type="email"
            />
            <TextInput
              variant="filled"
              placeholder="Phone Number"
              size="lg"
              type="tel"
            />
            <Textarea
              variant="filled"
              size="lg"
              placeholder="Message"
              autosize
              minRows={10}
            />
            <button className="text-white flex justify-center rounded items-center h-full hover:border-2 px-12 py-3 hover:border-rblue hover:bg-white bg-rblue hover:text-rblue">Submit</button>
          </Stack>
        </Stack>
      </motion.div>
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0, x: 20 }}
        animate={mapControls}
        className="xs:w-full lg:w-1/2  xs:h-[300px] lg:h-full"
      >
        <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-rblue lg:mb-8">
              Our Location
            </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2705.8242246418104!2d-122.23099992322068!3d47.298234509220336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549058759e5a35ef%3A0x737cc87bb84238e0!2s1020%20A%20St%20SE%20%23%207%2C%20Auburn%2C%20WA%2098002%2C%20USA!5e0!3m2!1sen!2sph!4v1719465675435!5m2!1sen!2sph"
          className="border-0 rounded-md w-full h-4/5 md:mt-4"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </Flex>
  );
};

export default ContactForm;
