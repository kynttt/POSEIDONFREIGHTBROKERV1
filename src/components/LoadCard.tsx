import React from 'react';
import Button from './Button';

interface CardProps {
    id: string;
    pickUp: string;
    drop: string;
    companyName: string;
    trailerType: string;
    trailerSize: string;
    loadPrice: number;
    onBookLoadClick?: () => void;
}

const LoadCard: React.FC<CardProps> = ({
    id,
    pickUp,
    drop,
    companyName,
    trailerType,
    trailerSize,
    loadPrice,
    onBookLoadClick,
}) => {
    return (
        <div className="bg-light-grey text-primary shadow-xl rounded-lg p-8 mb-4 text-xs my-8">
            <div className="grid grid-cols-8 gap-4">
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Post ID:</p>
                    </div>
                    <div>
                        <p className=" font-normal">{id}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Pick</p>
                    </div>
                    <div>
                        <p className=" font-normal">{pickUp}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Drop</p>
                    </div>
                    <div>
                        <p className=" font-normal">{drop}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Company Name</p>
                    </div>
                    <div>
                        <p className=" font-normal">{companyName}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Trailer Type</p>
                    </div>
                    <div>
                        <p className=" font-normal">{trailerType}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Trailer Size</p>
                    </div>
                    <div>
                        <p className=" font-normal">{trailerSize}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex items-center">
                        <p className="font-bold">Load Price</p>
                    </div>
                    <div>
                        <p className=" text-xl font-medium text-green">${loadPrice}</p>
                    </div>
                </div>

                
                <div className="flex items-center">
                <Button
                                    label="Book Load"
                                    size="medium"
                                    bgColor="#252F70"
                                    hoverBgColor="white"
                                    onClick={{}={}}
                                    className="extra-class-for-medium-button"
                                />
                </div>
            </div>
        </div>
    );
};

export default LoadCard;
