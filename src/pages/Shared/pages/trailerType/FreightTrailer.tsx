import Truck1Image from '../../../../assets/img/truck1.png';
import Truck2Image from '../../../../assets/img/truck2.png';
import Truck3Image from '../../../../assets/img/truck3.png';
import Truck4Image from '../../../../assets/img/truck4.png';
import Truck5Image from '../../../../assets/img/truck5.png';


const FreightTrailerComponent = () => {
    return (
        <div className="bg-white">
            <div className="relative h-32 w-full overflow-hidden">
                {/* Slanted background directly inline */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: "linear-gradient(45deg, #FFCC00 50%, #1B4980 50%)",
                    }}
                ></div>

                {/* Centered Text in Two Columns */}
                <div className="absolute inset-0 flex justify-between items-center text-white px-8">
                    {/* Left: Title */}
                    <div className="w-1/2 flex justify-center">
                        <h1 className="text-3xl font-bold text-darkBlue">Freight Trailer</h1>
                    </div>

                    {/* Right: Question */}
                    <div className="w-1/2 flex justify-center">
                        <p className="text-xl">What type of freight do you support?</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {/* Dry Van Section */}
                <div className="flex items-center mb-8">
                    <img
                        src={Truck1Image} // Replace with actual path or use a public image URL
                        alt="Dry Van"
                        className="w-1/2"
                    />
                    <div className="ml-8 bg-darkBlue p-12 w-1/2">
                        <h2 className="text-xl font-bold text-lyellow">Dry Van</h2>
                        <p className="mt-2 text-white font-medium">
                            A dry van is any truck trailer that is enclosed and protected from
                            the elements—think of your typical semi-truck or 'box' truck with
                            a door on the back. Although the cargo is protected from rain, it
                            is not temperature-controlled.
                        </p>
                    </div>
                </div>

                {/* Flat Bed Section */}
                <div className="flex items-center mb-8">

                    <div className="ml-8 bg-darkBlue p-12 w-1/2">
                        <h2 className="text-xl font-bold text-lyellow">Flat Bed</h2>
                        <p className="mt-2 text-white font-medium">
                            Generally, a flatbed is used to load freights on its tip, sides, and rear. This kind of trailer has the capability to carry a maximum legal freight dimension and weight.
                        </p>
                    </div>
                    <img
                        src={Truck2Image} // Replace with actual path or use a public image URL
                        alt="Dry Van"
                        className="w-1/2"
                    />
                </div>

                {/* Full Truck Load Section */}
                <div className="flex items-center mb-8">
                    <img
                        src={Truck3Image} // Replace with actual path or use a public image URL
                        alt="Dry Van"
                        className="w-1/2"
                    />
                    <div className="ml-8 bg-darkBlue p-12 w-1/2">
                        <h2 className="text-xl font-bold text-lyellow">Full Truck Load</h2>
                        <p className="mt-2 text-white font-medium">
                            An FTL (full truckload) is a type of trucking in which an entire truckload (usually 53' long trailer) is reserved for the transportation of the cargo. FTL service is used for shipments that can fill up an entire truck.
                        </p>
                    </div>
                </div>

                {/* Reefer Section */}
                <div className="flex items-center mb-8">

                    <div className="ml-8 bg-darkBlue p-12 w-1/2">
                        <h2 className="text-xl font-bold text-lyellow">Reefer (Refrigerated Trailer)</h2>
                        <p className="mt-2 text-white font-medium">
                            A refrigerated trailer is meant to maintain the temperature during the transport of perishable and temperature-sensitive goods.
                        </p>
                    </div>
                    <img
                        src={Truck4Image} // Replace with actual path or use a public image URL
                        alt="Dry Van"
                        className="w-1/2"
                    />
                </div>

                {/* Step Deck Section */}
                <div className="flex items-center mb-8">
                    <img
                        src={Truck5Image} // Replace with actual path or use a public image URL
                        alt="Dry Van"
                        className="w-1/2"
                    />
                    <div className="ml-8 bg-darkBlue p-12 w-1/2">
                        <h2 className="text-xl font-bold text-lyellow">Step Deck</h2>
                        <p className="mt-2 text-white font-medium">
                            A step deck trailer is also known as a drop deck trailer. These are simply flatbed trailers with a top and bottom deck . Step deck trailers are designed to haul freight that cannot be transported on a standard flatbed, because of height restrictions along the transport route.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreightTrailerComponent;
