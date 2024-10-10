import Image1 from "../assets/img/booking4.jpg"; // Import your image
import Step1Img from "../assets/img/step1.png"; // Import Step 1 image
import Step2Img from "../assets/img/step2.png"; // Import Step 2 image
import Step3Img from "../assets/img/step3.png"; // Import Step 3 image
import Step4Img from "../assets/img/step4.png"; // Import Step 4 image
import Step5Img from "../assets/img/step5.png"; // Import Step 5 image

const BookingProcess = () => {
  return (

    <div className="relative lg:h-auto md:h-1/2 w-full overflow-hidden pt-24">
      {/* Overlay Dark */}
      {/* <div className="absolute inset-0 bg-black opacity-25 z-20"></div> */}
      
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Image1})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Yellow Rectangle with Text */}
        <div className="md:flex hidden absolute top-0 md:top-36 bg-lyellow text-darkBlue md:p-0 md:pl-72 lg:pr-20 rounded-md w-11/12 md:w-auto z-30">
          <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold leading-tight lg:leading-normal">
            We make your booking <br /> easy transaction
          </h1>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <div className="py-8 md:py-16 bg-white bg-opacity-10 md:bg-opacity-50 backdrop-filter backdrop-blur-lg w-full">
            <div className="w-full md:w-4/5 lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 lg:gap-16 text-center mx-auto items-start">
            {/* Step 1 */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="text-darkBlue p-4 flex items-center justify-center space-x-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">1</span>
                <img src={Step1Img} alt="Step 1" className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl" />
              </div>
              <div className="mx-2 md:mx-0 md:text-left md:ml-4">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-darkBlue">Sign up or Login</h3>
                <p className="font-medium text-sm sm:text-base text-darkBlue ">
                  Create an account for registration as personal or company freight booking.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="text-darkBlue p-4 flex items-center justify-center space-x-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">2</span>
                <img src={Step2Img} alt="Step 2" className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl" />
              </div>
              <div className="mx-2 md:mx-0 md:text-left md:ml-6">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-darkBlue">Get Instant Quote</h3>
                <p className="font-medium text-sm sm:text-base text-darkBlue">
                  Fill the pick-up and drop-off location and trailer type of your choice.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="text-darkBlue p-4 flex items-center justify-center space-x-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">3</span>
                <img src={Step3Img} alt="Step 3" className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl" />
              </div>
              <div className="mx-2 md:mx-0 md:text-left md:ml-6">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-darkBlue">Book Haulage</h3>
                <p className="font-medium text-sm sm:text-base text-darkBlue">
                  Fill up the needed information of your haulage from its weight, height, etc.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="text-darkBlue p-4 flex items-center justify-center space-x-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">4</span>
                <img src={Step4Img} alt="Step 4" className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl" />
              </div>
              <div className="mx-2 md:mx-0 md:text-left md:ml-6">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-darkBlue">Online Payment</h3>
                <p className="font-medium text-sm sm:text-base text-darkBlue">
                  Complete your payment and finalize the booking process.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="text-darkBlue p-4 flex items-center justify-center space-x-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">5</span>
                <img src={Step5Img} alt="Step 5" className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl" />
              </div>
              <div className="mx-2 md:mx-0 md:text-left md:ml-8">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-darkBlue">Confirmation</h3>
                <p className="font-medium text-sm sm:text-base text-darkBlue">
                  Receive confirmation of your haulage booking.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default BookingProcess;
