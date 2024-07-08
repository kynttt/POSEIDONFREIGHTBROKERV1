import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faArrowsSpin, faSackDollar, faTruck } from '@fortawesome/free-solid-svg-icons';

interface OverviewData {
    totalShipments: number;
    inTransit: number;
    revenue: number;
    delivered: number;
}

const OverviewSection: React.FC<{ data: OverviewData }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:px-8 md:mb-8">
            <div className="bg-light-grey p-4 rounded-lg shadow-lg">
                <div className="flex justify-start">
                    <FontAwesomeIcon icon={faBox} className="text-2xl mb-2 text-black" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-primary">Total Shipments</h3>
                    <p className="text-2xl">{data.totalShipments}</p>
                </div>
            </div>
            <div className="bg-light-grey p-4 rounded-lg shadow-lg">
                <div className="flex justify-start">
                    <FontAwesomeIcon icon={faArrowsSpin} className="text-2xl mb-2 text-black" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-primary">In Transit</h3>
                    <p className="text-2xl">{data.inTransit}</p>
                </div>
            </div>
            <div className="bg-light-grey p-4 rounded-lg shadow-lg">
                <div className="flex justify-start">
                    <FontAwesomeIcon icon={faSackDollar} className="text-2xl mb-2 text-black" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-primary">Revenue</h3>
                    <p className="text-2xl">$ {data.revenue}</p>
                </div>
            </div>
            <div className="bg-light-grey p-4 rounded-lg shadow-lg">
                <div className="flex justify-start">
                    <FontAwesomeIcon icon={faTruck} className="text-2xl mb-2 text-black" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-primary">Delivered</h3>
                    <p className="text-2xl">{data.delivered}</p>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
