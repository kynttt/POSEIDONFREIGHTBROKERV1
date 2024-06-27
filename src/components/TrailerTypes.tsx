import React from 'react';
import reeferImage from '../assets/img/reefer.png';
import flatBedImage from '../assets/img/flatbed.png';
import truckLoadImage from '../assets/img/truckload.png';
import dryVanImage from '../assets/img/dryvan.png';

const TrailerTypes: React.FC = () => {
    return (
        <div className='bg-white text-primary py-16'>
            <div>
                <h1 className="text-center text-2xl font-thin ">TRAILERS</h1>
                <h1 className="text-center text-2xl font-bold mb-8">What type of freight do you support?</h1>
            </div>
            <div className="mx-auto px-4 sm:px-2 sm:px-2 md:px-16 py-8 bg-white text-primary flex justify-center items-center">
                <div className="container grid grid-cols-1 xl:grid-cols-1 gap-8">
                    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 p-4 sm:p-8 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 shadow shadow-xl">
                        <img src={reeferImage} alt="Reefer Trailer" className="w-full h-auto my-4 md:col-span-1 self-center" />
                        <div className="md:col-span-1 flex flex-col justify-center px-4 sm:px-8 md:px-12">
                            <h2 className="text-2xl font-semibold text-secondary text-left my-4">Reefer (Refrigerated Trailer)</h2>
                            <p className="text-left text-xl font-medium text-justify">
                                A refrigerated trailer is meant to maintain the temperature during the transport of perishable and temperature-sensitive goods.
                            </p>
                        </div>
                    </div>
                    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 p-4 sm:p-8 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 shadow shadow-xl">
                        <div className="md:col-span-1 flex flex-col justify-center px-4 sm:px-8 md:px-12">
                            <h2 className="text-2xl font-semibold text-secondary text-left my-4">Flat Bed</h2>
                            <p className="text-left text-xl font-medium text-justify">
                                Generally, a flatbed is used to load freights on its tip, sides, and rear. This kind of trailer has the capability to carry a maximum legal freight dimension and weight.
                            </p>
                        </div>
                        <img src={flatBedImage} alt="Flat Bed Trailer" className="w-full h-auto my-4 md:col-span-1 self-center" />
                    </div>
                    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 p-4 sm:p-8 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 shadow shadow-xl">
                        <img src={truckLoadImage} alt="Full Truck Load Trailer" className="w-full h-auto my-4 md:col-span-1 self-center" />
                        <div className="md:col-span-1 flex flex-col justify-center px-4 sm:px-8 md:px-12">
                            <h2 className="text-2xl font-semibold text-secondary text-left my-4">Full Truck Load</h2>
                            <p className="text-left text-xl font-medium text-justify">
                                An FTL (full truckload) is a type of trucking in which an entire truckload (usually 53' long trailer) is reserved for the transportation of the cargo. FTL service is used for shipments that can fill up an entire truck.
                            </p>
                        </div>
                    </div>
                    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 p-4 sm:p-8 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 shadow shadow-xl">
                        <div className="md:col-span-1 flex flex-col justify-center px-4 sm:px-8 md:px-12">
                            <h2 className="text-2xl font-semibold text-secondary text-left my-4">Dry Van</h2>
                            <p className="text-left text-xl font-medium text-justify">
                                A dry van is any truck trailer that is enclosed and protected from the elements—think of your typical semi-truck or 'box' truck with a door on the back. Although the cargo is protected from rain, it is not temperature-controlled.
                            </p>
                        </div>
                        <img src={dryVanImage} alt="Dry Van Trailer" className="w-full h-auto my-4 md:col-span-1 self-center" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrailerTypes;
