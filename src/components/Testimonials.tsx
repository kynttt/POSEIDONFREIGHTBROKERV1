import { useEffect, useRef } from 'react';
import pic1 from '../assets/img/testimonial1.png';
import pic2 from '../assets/img/testimonial2.png';
import pic3 from '../assets/img/testimonial3.jpg';
import pic4 from '../assets/img/testimonial4.jpg';

const TrustedByAmazon = () => {
  const testimonials = [
    {
      image: pic2,
      review: "Thanks to this service, we streamlined our shipping process and reduced costs significantly. Highly recommend!",
      name: "Emily Carter",
      role: "Logistics Manager",
    },
    {
      image: pic1,
      review: "The team provided exceptional support and communication throughout our freight journey. It made all the difference!",
      name: "James Smith",
      role: "Operations Director",
    },
    {
      image: pic4,
      review: "Reliable and efficient! Our shipments have never been smoother since we started using this brokerage.",
      name: "Sarah Johnson",
      role: "Supply Chain Coordinator",
    },
    {
      image: pic3,
      review: "Their expertise in freight logistics has transformed our business operations. We couldn't be happier with the results!",
      name: "Michael Thompson",
      role: "Warehouse Supervisor",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleAnimation = () => {
      scrollContainer.scrollLeft += 1;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // Reset scroll when reaching half of the duplicated content
      }
      requestAnimationFrame(handleAnimation);
    };

    const animationId = requestAnimationFrame(handleAnimation);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const TestimonialCard = ({ image, review, name, role }: { image: string; review: string; name: string; role: string; }) => (
    <div className="flex bg-white rounded-lg p-6 shadow-md max-w-[300px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px]">
      <img src={image} alt={name} className="md:flex hidden rounded-md w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 mx-auto object-cover" />
      <div className='text-left pl-2 sm:pl-4 md:pl-6 lg:pl-8 flex flex-col justify-between'>
        <p className="md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-nblue font-normal">"{review}"</p>
        <div>
          <h4 className="mt-2 text-sm sm:text-base md:text-lg text-nblue font-semibold">{name}</h4>
          <p className="text-xs sm:text-sm md:text-base text-nblue font-normal">{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 lg:px-32 lg:my-32 my-24">
      <div className="relative max-w-full mx-auto text-center bg-blue-100 p-2 py-8 sm:py-12 md:py-16 rounded-xl z-30">
        <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-20 md:w-40 bg-gradient-to-r from-blue-100 to-transparent pointer-events-none rounded-l-lg z-30"></div>
        <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-20 md:w-40 bg-gradient-to-l from-blue-100 to-transparent pointer-events-none rounded-r-lg z-30"></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center text-rblue">Trusted by Amazon</h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-nblue font-normal">
          We are a reliable Amazon Linehaul Contractor. Fantastic Ratings
        </p>

        {/* Reviews - Horizontal scroll for all screens */}
        <div
          className="mt-10 lg:mt-24 overflow-hidden cursor-grab"
          ref={scrollRef}
        >
          <div className="flex space-x-4 sm:space-x-6 pb-4 w-max">
            {/* Duplicate the testimonials array for seamless looping */}
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[400px]" key={index}>
                <TestimonialCard
                  image={testimonial.image}
                  review={testimonial.review}
                  name={testimonial.name}
                  role={testimonial.role}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-blue-500">98%</h3>
            <p className="text-sm sm:text-base md:text-lg text-nblue font-normal">On-Time Delivery Rate</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-blue-500">10,000+</h3>
            <p className="text-sm sm:text-base md:text-lg text-nblue font-normal">Shipments Handled</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-blue-500">45+</h3>
            <p className="text-sm sm:text-base md:text-lg text-nblue font-normal">Carrier Partnerships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByAmazon;
