import "react-circular-progressbar/dist/styles.css";
import heroBanner from "../assets/img/cover-hero.png";

const HeroBanner = () => {
  return (
    <div className="relative text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Trucks"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay (Visible only on xs to md screens) */}
      <div className="absolute inset-0 bg-black opacity-60 sm:block md:block lg:opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between p-6 md:p-16 lg:p-32 h-[350px] md:h-[400px] lg:h-[700px] mx-4 md:mx-16 lg:mx-32">
        <div className="max-w-lg">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Fast Streamlines 3PL plus asset base logistics using{" "}
            <span className="text-yellow-500">Poseidon Freight</span>
          </h1>
          <p className="mb-8 font-normal leading-relaxed text-sm md:text-base lg:text-lg">
            Linking shippers and carriers with precision, reliability, and
            unparalleled expertise, guaranteeing your cargo moves safely and
            efficiently every mile.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-[#0F4B87] font-semibold py-2 md:py-3 px-8 md:px-10 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
