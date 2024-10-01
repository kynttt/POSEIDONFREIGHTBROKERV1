import Truck1Image from '../../../../assets/img/truck1.png';
import Truck2Image from '../../../../assets/img/truck2.png';
import Truck3Image from '../../../../assets/img/truck3.png';
import Truck4Image from '../../../../assets/img/truck4.png';
import Truck5Image from '../../../../assets/img/truck5.png';

const FreightTrailerComponent = () => {
    return (
        <div className="bg-white">
            
            <div className="relative h-32 w-full overflow-hidden ">
    {/* Slanted background directly inline */}
    <div
        className="absolute inset-0 w-full h-full"
        style={{
            background: "linear-gradient(45deg, #FFCC00 50%, #1B4980 50%)",
        }}
    ></div>

    {/* Dark overlay for small screens */}
    <div className="absolute inset-0 bg-black opacity-50 md:hidden"></div>

    {/* Centered Text in Two Columns */}
    <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-center text-white px-8 z-10 md:py-0 py-4">
        {/* Left: Title */}
        <div className="w-full md:w-1/2 flex justify-center ">
            <h1 className="text-2xl md:text-3xl font-bold md:text-darkBlue text-white">Freight Trailer</h1>
        </div>

        {/* Right: Question */}
        <div className="w-full md:w-1/2 flex justify-center ">
            <p className="text-lg md:text-xl text-center md:text-right">What type of freight do you support?</p>
        </div>
    </div>
</div>


            <div className="mt-8">
                {/* Dry Van Section */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <img
                        src={Truck1Image}
                        alt="Dry Van"
                        className="w-full md:w-1/2 md:pl-16"
                    />
                    <div className="ml-0 md:ml-8 bg-darkBlue p-6 md:p-12 w-full md:w-1/2 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl font-bold text-lyellow">Dry Van</h2>
                        <p className="mt-2 text-white font-medium text-sm md:text-base">
                            A dry van is any truck trailer that is enclosed and protected from
                            the elements—think of your typical semi-truck or 'box' truck with
                            a door on the back. Although the cargo is protected from rain, it
                            is not temperature-controlled.
                        </p>
                    </div>
                </div>

                {/* Flat Bed Section */}
                <div className="flex flex-col md:flex-row-reverse items-center mb-8">
                    <img
                        src={Truck2Image}
                        alt="Flat Bed"
                        className="w-full md:w-1/2 md:pr-16"
                    />
                    <div className="ml-0 md:mr-8 bg-darkBlue p-6 md:p-12 w-full md:w-1/2 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl font-bold text-lyellow">Flat Bed</h2>
                        <p className="mt-2 text-white font-medium text-sm md:text-base">
                            Generally, a flatbed is used to load freights on its tip, sides, and rear. This kind of trailer has the capability to carry a maximum legal freight dimension and weight.
                        </p>
                    </div>
                </div>

                {/* Full Truck Load Section */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <img
                        src={Truck3Image}
                        alt="Full Truck Load"
                        className="w-full md:w-1/2 md:pl-16"
                    />
                    <div className="ml-0 md:ml-8 bg-darkBlue p-6 md:p-12 w-full md:w-1/2 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl font-bold text-lyellow">Full Truck Load</h2>
                        <p className="mt-2 text-white font-medium text-sm md:text-base">
                            An FTL (full truckload) is a type of trucking in which an entire truckload (usually 53' long trailer) is reserved for the transportation of the cargo. FTL service is used for shipments that can fill up an entire truck.
                        </p>
                    </div>
                </div>

                {/* Reefer Section */}
                <div className="flex flex-col md:flex-row-reverse items-center mb-8">
                    <img
                        src={Truck4Image}
                        alt="Reefer"
                        className="w-full md:w-1/2 md:pr-16"
                    />
                    <div className="ml-0 md:mr-8 bg-darkBlue p-6 md:p-12 w-full md:w-1/2 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl font-bold text-lyellow">Reefer (Refrigerated Trailer)</h2>
                        <p className="mt-2 text-white font-medium text-sm md:text-base">
                            A refrigerated trailer is meant to maintain the temperature during the transport of perishable and temperature-sensitive goods.
                        </p>
                    </div>
                </div>

                {/* Step Deck Section */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <img
                        src={Truck5Image}
                        alt="Step Deck"
                        className="w-full md:w-1/2 md:pl-16"
                    />
                    <div className="ml-0 md:ml-8 bg-darkBlue p-6 md:p-12 w-full md:w-1/2 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl font-bold text-lyellow">Step Deck</h2>
                        <p className="mt-2 text-white font-medium text-sm md:text-base">
                            A step deck trailer is also known as a drop deck trailer. These are simply flatbed trailers with a top and bottom deck. Step deck trailers are designed to haul freight that cannot be transported on a standard flatbed, because of height restrictions along the transport route.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreightTrailerComponent;
