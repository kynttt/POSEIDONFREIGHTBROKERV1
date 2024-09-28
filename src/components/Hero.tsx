import "react-circular-progressbar/dist/styles.css";
import heroBanner from "../assets/img/cover-hero.png";
import rectangle from "../assets/img/Rectangle 114.png";

const HeroBanner = () => {
  return (
    <>
      <div className=" relative text-white md:py-0  xs:py-10 ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="Trucks"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay (Visible only on xs to md screens) */}
        <div className="absolute inset-0 bg-black opacity-50 sm:block md:block lg:opacity-20 "></div>

        {/* Content */}
        <div className="lg:pl-48 px-10  relative z-10 flex items-center justify-between    h-[350px] md:h-[400px] lg:h-[700px]  ">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4  leading-tight">
              24/7 Customer services and 3PL plus asset base logistics with{" "}
              <span className="text-yellow-500">Poseidon Freight</span>
            </h1>
            <p className="mb-12 lg:mb-24 font-normal leading-relaxed text-sm md:text-base lg:text-lg">
              Linking shippers and carriers with precision, reliability, and
              unparalleled expertise, guaranteeing your cargo moves safely and
              efficiently every mile.
            </p>
            <p className="text-lg font-normal mb-2">Contact Us</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-[#0F4B87] font-semibold py-2 md:py-3 px-8 md:px-10 rounded flex justify-center items-center">
              <i className="fas fa-phone-alt mr-3 "></i>
              253-269-1300
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-screen h-full">
        {/* Background Image */}
        <div className="relative">
          <img
            src={rectangle}
            alt="Trucks"
            className="w-full h-[220px] object-cover"
          />
        </div>
        {/* Overlay (Visible only on xs to md screens) */}
        <div className="absolute inset-0 bg-black opacity-50 sm:block md:block lg:opacity-20 "></div>

        {/* Content on top of the image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          Book your truck in under {" "}
            <span className="text-yellow-500">5 MINUTES </span> and receive{" "}
            <span className="text-yellow-500">INSTANT, COMPETITIVE</span> quotations.
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
