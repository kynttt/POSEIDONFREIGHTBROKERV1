import pic1 from '../assets/img/testimonial1.png';
import pic2 from '../assets/img/testimonial2.png';
import pic3 from '../assets/img/testimonial3.jpg';
import pic4 from '../assets/img/testimonial4.jpg';

const TrustedByAmazon = () => {
const slideAnimation = `
    @keyframes slide {
        0% { transform: translateX(-75%); } /* Start from the left */
        100% { transform: translateX(0); } /* Move to the right */
    }
`;

  return (
    <div className="w-full relative">
      {/* Injecting the animation style directly */}
      <style>
        {slideAnimation}
      </style>

      {/* Blue Section */}
      <div style={{ backgroundColor: '#1B4980' }} className="text-white py-16 min-h-[40vh]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Trusted by Amazon</h2>
          <p className="text-white font-normal leading-normal mt-2">
            We are a reliable Amazon Linehaul Contractor. Fantastic Ratings
          </p>
        </div>
      </div>

      {/* Testimonials with sliding animation */}
      <div className="absolute left-0 right-0 mx-auto transform translate-y-[-50%] flex justify-center overflow-hidden ">
        <div
          className="flex"
          style={{
            animation: 'slide 15s linear infinite',
            display: 'flex',
            width: '400%', // Total width for four sets of testimonials
          }}
        >
          {/* Testimonial Cards */}
          {[pic1, pic2, pic3, pic4].map((pic, index) => (
            <div
              key={index}
              className="relative bg-white text-black rounded-xl shadow-lg p-6 max-w-xl flex items-center h-70 gap-6 mx-4 my-8" // Increased height
              style={{ flexShrink: 0, width: 'calc(37% - 1rem)' }} // Increased width
            >
              <img
                className="rounded-sm w-[250px] h-[250px] object-cover" // Added object-cover for consistent sizing
                src={pic}
                alt={`Testimonial ${index + 1}`}
              />
              <div className="flex flex-col justify-between h-full py-3">
                <p className="font-normal text-rblue ">"
                  {index === 0 
                    ? "The team provided exceptional support and communication throughout our freight journey. It made all the difference!" 
                    : index === 1 
                    ? "Thanks to this service, we streamlined our shipping process and reduced costs significantly. Highly recommend!"
                    : index === 2
                    ? "Their professionalism and quick responses made our partnership easy and enjoyable!"
                    : "A reliable service that consistently meets our needs and exceeds expectations!"}"
                </p>
                <div>
                  <p className="font-bold text-rblue">{index === 0 ? "Grey Mudson" : index === 1 ? "Madison Blue" : index === 2 ? "John Doe" : "Jane Smith"}</p>
                  <p className="text-sm text-rblue font-normal">Business Owner</p>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicated Testimonial Cards for Infinite Effect */}
          {[pic1, pic2, pic3, pic4].map((pic, index) => (
            <div
              key={index + 4} // ensure unique key
              className="relative bg-white text-black rounded-xl shadow-lg p-6 max-w-xl flex items-center h-80 gap-6 mx-4 my-8" // Increased height
              style={{ flexShrink: 0, width: 'calc(37% - 1rem)' }} // Increased width
            >
              <img
                className="rounded-sm w-[250px] h-[250px] object-cover" // Added object-cover for consistent sizing
                src={pic}
                alt={`Testimonial ${index + 1}`}
              />
              <div className="flex flex-col justify-between h-full py-3">
                <p className="font-normal text-rblue ">"
                  {index === 0 
                    ? "The team provided exceptional support and communication throughout our freight journey. It made all the difference!" 
                    : index === 1 
                    ? "Thanks to this service, we streamlined our shipping process and reduced costs significantly. Highly recommend!"
                    : index === 2
                    ? "Their professionalism and quick responses made our partnership easy and enjoyable!"
                    : "A reliable service that consistently meets our needs and exceeds expectations!"}
                    "
                </p>
                <div>
                  <p className="font-bold text-rblue">{index === 0 ? "Grey Mudson" : index === 1 ? "Madison Blue" : index === 2 ? "John Doe" : "Jane Smith"}</p>
                  <p className="text-sm text-rblue font-normal">Business Owner</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white text-center py-32 mt-32">
        <div className="flex justify-center space-x-16">
          {/* Statistic 1 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">89%</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>

          {/* Statistic 2 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">5000+</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>

          {/* Statistic 3 */}
          <div>
            <p className="text-5xl font-bold text-blue-900">45+</p>
            <p className="text-gray-600">Lorem ipsum dolor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByAmazon;
