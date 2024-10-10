import "react-circular-progressbar/dist/styles.css";
import heroBanner from "../assets/img/hero-cover.png";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative text-white md:py-0 xs:py-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 h-full w-full">
            <div
              className="bg-darkBlue relative sm:-mr-32 z-10 h-48 sm:h-auto hidden md:block"
              style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 0 100%)" }}
            >
              {/* Empty Div */}
            </div>
            <img
              src={heroBanner}
              alt="Trucks"
              className="w-full h-full object-cover sm:-ml-0 z-0"
              loading="lazy"
            />
          </div>
        </div>


        {/* Overlay (Visible only on xs to md screens) */}
        <div className="absolute inset-0 bg-black opacity-70 sm:block md:block lg:opacity-20 "></div>

        {/* Content */}
        <div className="container mx-auto   relative z-10 flex items-center justify-between h-[350px] md:h-[400px] lg:h-[700px] lg:mb-0 mb-8">
          <div className="max-w-xl w-full sm:w-auto">
            {/* Animated Title */}
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-8 leading-tight mt-4 overflow-hidden">
              <span className="text-yellow-500 text-3xl md:text-5xl block-reveal-animation">24/7</span> Customer Services And 3PL + Asset Base Logistics With{" "}
              <span className="text-yellow-500 block-reveal-animation">Poseidon Freight</span>
            </h1>

            {/* Animated Paragraph */}
            <p className="mb-12 lg:mb-16 font-normal leading-relaxed text-sm md:text-base lg:text-xl block-reveal-animation">
              Linking shippers and carriers with precision, reliability, and
              unparalleled expertise, guaranteeing your cargo moves safely and
              efficiently every mile.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/requests")}
                className="bg-yellow-500 hover:bg-yellow-300 text-[#0F4B87] font-semibold py-2 px-6 sm:py-3 sm:px-8 md:py-3 md:px-10 rounded flex justify-center items-center w-full md:w-auto"
              >
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for animation */}
      <style>{`
        @keyframes block-reveal {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          50% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        .block-reveal-animation {
          display: inline-block;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: block-reveal 1s ease forwards;
          animation-delay: 0.3s;
        }

        h1 .block-reveal-animation:nth-child(1) {
          animation-delay: 0.5s;
        }

        h1 .block-reveal-animation:nth-child(2) {
          animation-delay: 0.7s;
        }

        p.block-reveal-animation {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
