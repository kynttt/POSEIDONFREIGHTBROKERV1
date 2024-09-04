import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import FaqsImage from "../assets/img/faqs.png";
import { Accordion, Flex, Image, Stack } from "@mantine/core";

const FAQsPage: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.5 });
  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.5,
  });

  const imageControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    if (imageInView) {
      imageControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [imageControls, imageInView]);

  useEffect(() => {
    if (contentInView) {
      contentControls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    }
  }, [contentControls, contentInView]);

  const faqs = [
    {
      question: "How are shipment quotes generated?",
      answer:
        "Quotes are generated by an algorithm that accounts for variations in distance and travel time.",
    },
    {
      question: "How are rates determined for shipping services?",
      answer:
        "Rates are determined based on factors such as shipment distance, size, weight, market demand, fuel costs, and carrier availability.",
    },
    {
      question:
        "What should I do if I have an issue after normal business hours?",
      answer:
        "Freight Broker is here to help you resolve issues no matter the time of day. Solution oriented, Friendly Agents and dispatches. We provide individualized, personal focused transportation service.",
    },
    {
      question: "How many loads per day does Freight Broker move?",
      answer:
        "We can help match you with over 10,000 loads per day from more than 14,000 shippers in our network. Our wide range of equipment ensures that we are well equipped to handle shipment of all shapes and sizes. Poseidon is your quality direct delivery carrier.",
    },
  ];

  const items = faqs.map((item) => (
    <Accordion.Item key={item.question} value={item.question}>
      <Accordion.Control className="font-medium text-primary mb-2">
        <QuestionComponent question={item.question} />
      </Accordion.Control>
      <Accordion.Panel className="text-white xs:text-xl md:text-3xl lg:text-xl font-thin mb-2 text-justify">
        {item.answer}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Flex
      className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] py-6 md:py-40 bg-accentBg"
      direction={{ xs: "column", lg: "row" }}
      gap={"4rem"}
    >
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: -20 }}
        animate={imageControls}
        className="w-full lg:w-1/3"
      >
        <Stack>
          <Stack className="text-left" gap={0.5}>
            {/* <h1 className="xs:text-2xl md:text-4xl lg:text-xl font-normal mb-1 text-white">
              FAQs
            </h1> */}
            <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-white mb-8">
              Frequently Asked Questions
            </h2>
          </Stack>
          <Image src={FaqsImage} alt="FAQs" />
        </Stack>
      </motion.div>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, x: 20 }}
        animate={contentControls}
        className="w-full lg:w-2/3"
      >
        <Flex
          w={{
            base: "100%",
          }}
          justify={"center"}
        >
          <Accordion
            radius="xs"
            defaultValue="How are shipment quotes generated?"
            w={"100%"}
          >
            {items}
          </Accordion>
        </Flex>
      </motion.div>
    </Flex>
  );
};

function QuestionComponent({ question }: { question: string }) {
  return <p className="xs:text-xl md:text-3xl lg:text-base text-teal">{question}</p>;
}

export default FAQsPage;
