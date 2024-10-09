import "react-circular-progressbar/dist/styles.css";
import heroBanner from "../assets/img/cover-hero.webp";
// import rectangle from "../assets/img/Rectangle 114.png";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" relative text-white md:py-0  xs:py-10 ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="Trucks"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Overlay (Visible only on xs to md screens) */}
        <div className="absolute inset-0 bg-black opacity-50 sm:block md:block lg:opacity-20 "></div>

        {/* Content */}
        <div className="lg:pl-48 px-8  relative z-10 flex items-center justify-between    h-[350px] md:h-[400px] lg:h-[700px]  ">
          <div className="max-w-xl">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-8  leading-tight">
            <span className="text-yellow-500">24/7</span> Customer Services And 3PL + Asset Base Logistics With{" "}
              <span className="text-yellow-500">Poseidon Freight</span>
            </h1>
            <p className="mb-12 lg:mb-16 font-normal leading-relaxed text-sm md:text-base lg:text-xl">
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
              {/* <button className="border-2 border-yellow-500 text-yellow-500 font-semibold py-2 px-6 sm:py-3 sm:px-8 md:py-3 md:px-10 rounded flex justify-center items-center w-full md:w-auto">
                <i className="fas fa-phone-alt mr-3 text-yellow-500"></i>
                253-269-1300
              </button> */}
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default HeroBanner;