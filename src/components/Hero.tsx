import React, { useRef, useEffect } from "react";
import { NeatGradient } from "@firecms/neat";
import "react-circular-progressbar/dist/styles.css";

const HeroBanner: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef3 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef4 = useRef<HTMLCanvasElement | null>(null);
  const gradientRef1 = useRef<NeatGradient | null>(null);
  const gradientRef2 = useRef<NeatGradient | null>(null);
  const gradientRef3 = useRef<NeatGradient | null>(null);
  const gradientRef4 = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (canvasRef1.current) {
      gradientRef1.current = new NeatGradient({
        ref: canvasRef1.current,
        colors: [
          { color: "#02FFE2", enabled: true },
          { color: "#C108FE", enabled: true },
          { color: "#0459FE", enabled: true },
          { color: "#6084F0", enabled: true },
          { color: "#a2d2ff", enabled: false },
        ],
        speed: 4,
        horizontalPressure: 3,
        verticalPressure: 3,
        waveFrequencyX: 2,
        waveFrequencyY: 4,
        waveAmplitude: 5,
        shadows: 0,
        highlights: 2,
        colorBrightness: 1,
        colorSaturation: 3,
        wireframe: false,
        colorBlending: 5,
        backgroundColor: "#003FFF",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }

    if (canvasRef2.current) {
      gradientRef2.current = new NeatGradient({
        ref: canvasRef2.current,
        colors: [
          { color: "#02FFE2", enabled: true },
          { color: "#C108FE", enabled: true },
          { color: "#0459FE", enabled: true },
          { color: "#6084F0", enabled: true },
          { color: "#a2d2ff", enabled: false },
        ],
        speed: 4,
        horizontalPressure: 3,
        verticalPressure: 3,
        waveFrequencyX: 2,
        waveFrequencyY: 4,
        waveAmplitude: 5,
        shadows: 0,
        highlights: 2,
        colorBrightness: 1,
        colorSaturation: 3,
        wireframe: false,
        colorBlending: 5,
        backgroundColor: "#003FFF",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }

    if (canvasRef3.current) {
      gradientRef3.current = new NeatGradient({
        ref: canvasRef3.current,
        colors: [
          { color: "#02FFE2", enabled: true },
          { color: "#C108FE", enabled: true },
          { color: "#0459FE", enabled: true },
          { color: "#6084F0", enabled: true },
          { color: "#a2d2ff", enabled: false },
        ],
        speed: 4,
        horizontalPressure: 3,
        verticalPressure: 3,
        waveFrequencyX: 2,
        waveFrequencyY: 4,
        waveAmplitude: 5,
        shadows: 0,
        highlights: 2,
        colorBrightness: 1,
        colorSaturation: 3,
        wireframe: false,
        colorBlending: 5,
        backgroundColor: "#003FFF",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }

    if (canvasRef4.current) {
      gradientRef4.current = new NeatGradient({
        ref: canvasRef4.current,
        colors: [
          { color: "#02FFE2", enabled: true },
          { color: "#C108FE", enabled: true },
          { color: "#0459FE", enabled: true },
          { color: "#6084F0", enabled: true },
          { color: "#a2d2ff", enabled: false },
        ],
        speed: 4,
        horizontalPressure: 3,
        verticalPressure: 3,
        waveFrequencyX: 2,
        waveFrequencyY: 4,
        waveAmplitude: 5,
        shadows: 0,
        highlights: 2,
        colorBrightness: 1,
        colorSaturation: 3,
        wireframe: false,
        colorBlending: 5,
        backgroundColor: "#003FFF",
        backgroundAlpha: 1,
        resolution: 1,
      });
    }

    return () => {
      gradientRef1.current?.destroy();
      gradientRef2.current?.destroy();
      gradientRef3.current?.destroy();
      gradientRef4.current?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-[90vh] text-center flex flex-col justify-center items-center">
      <canvas
        ref={canvasRef1}
        className="absolute top-0 left-0 w-1/2 h-full z-0 rounded-full"
        style={{ isolation: "isolate", clipPath: "circle(20%)" }}
      />
      <canvas
        ref={canvasRef2}
        className="absolute  bottom-2xl left-2 w-1/5 h-full z-0 rounded-full"
        style={{ isolation: "isolate", clipPath: "circle(20%)" }}
      />
      <canvas
        ref={canvasRef3}
        className="absolute top-0 right-0 w-1/2 h-full z-0 rounded-full"
        style={{ isolation: "isolate", clipPath: "circle(20%)" }}
      />
      <canvas
        ref={canvasRef4}
        className="absolute bottom-2xl right-2 w-1/5 h-full z-0 rounded-full"
        style={{ isolation: "isolate", clipPath: "circle(20%)" }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-3xl" />
      <div className="relative z-20 lg:w-1/2 flex flex-col justify-center items-center lg:mb-36">
        {/* Heading Section */}
        <div className="my-12 lg:w-1/2 text-center z-30 leading-loose">
          <h1 className="text-4xl md:text-5xl font-black text-rblue mb-8">
            Driving Your 
          </h1>
          <h1 className="text-4xl md:text-5xl font-black text-rblue mb-8">
            Business F➤rward
          </h1>
        </div>

        {/* Descriptive Text */}
        <div className="text-center z-30">
          <p className="italic font-normal text-lg sm:text-xl text-nblue">
            Connecting Shippers and Carriers with Precision, Reliability, and Unmatched Expertise,
            Ensuring Your Cargo Moves Safely and Efficiently Across Every Mile.
          </p>
        </div>
      </div>

      {/* Freight Quote Section */}
      {/* Uncomment the section below to include the Freight Quote component */}
      {/* <div className="shadow-2xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/5 border border-purple-50 border-opacity-5 rounded-2xl absolute bottom-20 sm:bottom-28 md:bottom-16 left-1/2 transform -translate-x-1/2 py-8 sm:py-10 md:py-12 px-6 sm:px-12 lg:px-20 z-20 bg-white">
        <FreightQuote2 />
      </div> */}
    </div>
  );
};

export default HeroBanner;
