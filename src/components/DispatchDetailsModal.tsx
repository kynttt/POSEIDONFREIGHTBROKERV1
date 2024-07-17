import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
// import dispatchDetailsData from './dispatchDetails.json';

interface DispatchDetailsModalProps {
    id: string;
    pickUp: string;
    drop: string;
    maxWeight: number;
    trailerType: string;
    trailerSize: string;
    distance: number;
    companyName: string;
    commodity: string;
    pickupDate: Date;
    onClose: () => void;
}

const DispatchDetailsModal: React.FC<DispatchDetailsModalProps> = ({ pickUp, drop, maxWeight, trailerType, trailerSize, distance, companyName, commodity, pickupDate, onClose }) => {
    const navigate = useNavigate();
    // const [dispatchDetails, setDispatchDetails] = useState<any>({});
    // const [additionalDetails, setAdditionalDetails] = useState<any>({});
    const formattedPickupDate = pickupDate ? new Date(pickupDate).toLocaleDateString() : '';

    // useEffect(() => {
    //     setDispatchDetails(dispatchDetailsData.dispatchDetails);
    //     setAdditionalDetails(dispatchDetailsData.additionalDetails);
    // }, []);

    const handleButtonClick = () => {
        navigate('/bill-lading');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-end z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="border rounded-lg shadow-lg bg-white p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 overflow-y-auto h-screen py-8 relative">
                <button
                    onClick={onClose}
                    className="absolute text-primary top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                >
                    X
                </button>
                <h2 className="text-xl font-medium text-secondary mb-5 text-center md:text-left">
                    Dispatched Details
                </h2>
                <div className="overflow-x-auto shadow-lg p-8 rounded-lg">
                    <div className="flex flex-wrap md:grid md:grid-cols-1 gap-4 mb-6 items-center">
                        <div className="text-left w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-lg font-medium mb-6">Pick</p>
                            <p className="text-base mb-1 text-primary">{pickUp}</p>
                            <p className="text-sm font-medium text-primary">{formattedPickupDate}</p>
                        </div>
                        <div className="text-center w-full md:w-auto hidden md:block">
                            <FontAwesomeIcon icon={faAnglesDown} className="text-3xl text-secondary" />
                        </div>
                        <div className="text-center w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-left text-gray-500 text-lg font-medium mb-6">Drop</p>
                            <p className="text-left text-base mb-1 text-primary">{drop}</p>
                            {/* <p className="text-sm font-medium text-primary">{dispatchDetails.drop?.date}</p> */}
                        </div>
                        {/* <div className="text-center w-full md:w-auto md:mt-4">
                            <p className="text-gray-500 text-lg font-medium mb-2">3 Total Stops</p>
                            <p className="text-base text-primary">{dispatchDetails.totalStops} stops</p>
                        </div>
                        <div className="text-center w-full md:w-auto py-3">
                            <p className="text-xl font-medium text-primary">{dispatchDetails.emptyMiles}</p>
                        </div> */}
                        <div className="text-left w-full md:w-auto">
                            <p className="text-gray-500 text-lg font-medium mb-2">Max. Weight</p>
                            <p className="text-xl font-medium text-primary">{maxWeight} lbs</p>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-t lg:border-secondary lg:border-2 mb-6 hidden md:block" />

                <h2 className="text-xl font-medium text-secondary mb-5 text-center md:text-left">Additional Details</h2>
                <div className="overflow-x-auto shadow-lg p-8 rounded-lg">
                    <div className="flex flex-wrap md:grid gap-4 items-center">
                        <div className="text-left w-full md:w-auto pb-2 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Trailer Type & Size</p>
                            <p className="text-primary">{trailerType} - {trailerSize}ft</p>
                        </div>
                        <div className="text-left w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Distance</p>
                            <p className="text-primary">{distance}</p>
                        </div>
                        <div className="text-left w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Company Name</p>
                            <p className="text-primary">{companyName}</p>
                        </div>
                        <div className="text-left w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Commodity</p>
                            <p className="text-primary">{commodity}</p>
                        </div>
                        {/* <div className="text-center w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Drop Empty</p>
                            <p className="text-primary">{additionalDetails.dropEmpty}</p>
                        </div>
                        <div className="text-center w-full md:w-auto pb-4 md:pb-0">
                            <p className="text-gray-500 text-base font-medium mb-2">Pick Empty</p>
                            <p className="text-primary">{additionalDetails.pickEmpty}</p>
                        </div> */}
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button
                        label="Proceed to BOL"
                        size="xl"
                        bgColor="#252F70"
                        hoverBgColor="white"
                        onClick={handleButtonClick} type={''}                    />
                </div>
            </div>
        </div>
    );
};

export default DispatchDetailsModal;
