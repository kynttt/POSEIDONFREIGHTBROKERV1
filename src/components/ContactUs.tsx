import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Flex, Stack, Textarea, TextInput } from "@mantine/core";
import { AiFillStar } from "react-icons/ai"; // Import star icons

const ContactForm: React.FC = () => {
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.5 });
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.5 });

  const formControls = useAnimation();
  const mapControls = useAnimation();

  const [rating, setRating] = useState(0); // State to track rating
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const handleRatingClick = (rate: number) => {
    setRating(rate); // Set the clicked star as the rating
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { name, email, phone, message } = formData;
    const mailtoLink = `mailto:tech@pdienterprise.com?subject=Feedback&body=Name: ${encodeURIComponent(
      name
    )}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(
      phone
    )}%0ARating: ${rating}%0AMessage: ${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

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
            <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-darkBlue lg:mb-6">
              Drop us your feedback
            </h2>

            {/* Star Rating Section */}
            <div className="mt-4 ">
              <h3 className="text-darkBlue font-semibold text-lg mb-4">
                Rate our services
              </h3>
              <div className="flex justify-center items-center md:space-x-10 space-x-2 mb-8 ">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => handleRatingClick(star)} // Set rating on click
                    className="text-5xl"
                    whileTap={{ y: -10 }} // Add "jump" animation on click
                    animate={{ y: star <= rating ? -5 : 0 }} // Keep selected stars slightly raised
                    transition={{ type: "spring", stiffness: 300, damping: 12 }} // Smooth jumping transition
                  >
                    {star <= rating ? (
                      <AiFillStar className="text-lyellow" /> // Filled star
                    ) : (
                      <AiFillStar className="text-gray-200" /> // Outline star
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </Stack>

          <Stack>
            <TextInput
              variant="filled"
              placeholder="Name"
              size="lg"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextInput
              variant="filled"
              placeholder="Email"
              size="lg"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextInput
              variant="filled"
              placeholder="Phone Number"
              size="lg"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Textarea
              variant="filled"
              size="lg"
              placeholder="Tell us your message"
              autosize
              minRows={8}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            <button
              className="text-white flex justify-center rounded items-center h-full hover:border-2 px-12 py-3 hover:border-darkBlue hover:bg-white bg-darkBlue hover:text-darkBlue"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Stack>
        </Stack>
      </motion.div>
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0, x: 20 }}
        animate={mapControls}
        className="xs:w-full lg:w-1/2  xs:h-[300px] lg:h-full"
      >
        <h2 className="xs:text-3xl md:text-6xl lg:text-4xl font-black text-darkBlue lg:mb-8">
          Our Location
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2705.8242246418104!2d-122.23099992322068!3d47.298234509220336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549058759e5a35ef%3A0x737cc87bb84238e0!2s1020%20A%20St%20SE%20%23%207%2C%20Auburn%2C%20WA%2098002%2C%20USA!5e0!3m2!1sen!2sph!4v1719465675435!5m2!1sen!2sph"
          className="border-0 rounded-md w-full h-full md:mt-4"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </Flex>
  );
};

export default ContactForm;
