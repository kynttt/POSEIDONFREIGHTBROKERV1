import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookingDetails } from '../lib/apiCalls';

import SideBar from '../components/SideBar';
import { useAuthStore } from '../state/useAuthStore';

const ShipmentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the id from the URL
    // const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore(); // Use useAuth hook to get isAuthenticated

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.slice(0, maxLength)}...`;
    };

    useEffect(() => {
        const fetchBookingDetail = async () => {
            try {
                if (!id) {
                    console.error('No ID provided');
                    return;
                }

                const bookingData = await fetchBookingDetails(id);
                setBooking(bookingData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBookingDetail();
    }, [id]);

    // const handleConfirmBooking = () => {
    //     navigate('/booking-successful');
    // };

    if (loading) return <p className="text-gray-500">Loading booking details...</p>;

    if (!booking) return <p className="text-gray-500">No booking found.</p>;

    return (
        <div className='flex h-screen'>
            <SideBar isAuthenticated={isAuthenticated} />
            <nav className='flex-1 bg-white overflow-y-auto lg:px-20'>
                <div className='flex flex-col lg:flex-row justify-evenly w-full '>

                    <div className='w-full lg:w-1/2'>

                        <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
                            <h1 className="text-2xl font-medium mb-8 mt-4 text-secondary">Shipment Summary</h1>
                        </div>

                        {/* Pick Up Details */}
                        <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto ">
                            <h2 className="text-xl  mb-4 text-secondary">Pick Up Details</h2>
                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-base  " htmlFor="facilityName">
                                        Facility / Company Name
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.companyName}</p>
                                </div>

                                <div className="w-full sm:w-1/2 sm:pl-2">
                                    <label className="block text-primary text-base " htmlFor="facilityAddress">
                                        Facility Address
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{truncateText(booking.origin, 30)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-base  " htmlFor="appointment">
                                        Appointment <span className="text-red-600">*</span>
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{new Date(booking.pickupDate).toLocaleString()}</p>
                                </div>
                            </div>

                        </div>

                        <hr className="border-t lg:border-1 w-full max-w-screen-2xl mx-auto hidden md:block" />

                        {/* Delivery Details */}
                        <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto border-b">
                            <h2 className="text-xl  mb-4 text-secondary">Delivery Details</h2>
                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-base " htmlFor="facilityName">
                                        Facility / Company Name
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.companyName}</p>
                                </div>

                                <div className="w-full sm:w-1/2 sm:pl-2">
                                    <label className="block text-primary text-base " htmlFor="facilityAddress">
                                        Facility Address
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{truncateText(booking.destination, 30)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-base  " htmlFor="appointment">
                                        Appointment <span className="text-red-600">*</span>
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.deliveryDate ? new Date(booking.deliveryDate).toLocaleString() : 'TBA'}</p>
                                </div>
                            </div>

                            
                        </div>

                        {/* Additional Shipment Details */}
                        <div className="bg-light-grey p-6 w-full max-w-screen-2xl mx-auto">
                            <h2 className="text-xl mb-4 text-secondary">Additional Shipment Details</h2>
                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-base font-bold " htmlFor="customerReference">
                                        Customer Reference # <span className="text-red-600">*</span>
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.notes || 'N/A'}</p>

                                    <label className="block text-primary text-base font-bold mt-2" htmlFor="commodity">
                                        Commodity
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.commodity}</p>

                                    <label className="block text-primary text-base font-bold mt-2" htmlFor="packaging">
                                        Packaging 
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.packaging || 'TBA'}</p>
                                    <label className="block text-primary text-base mt-2" htmlFor="notes">
                                        Additional Notes
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.notes || 'N/A'}</p>
                            
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label className="block text-primary text-base font-bold " htmlFor="weight">
                                        Weight
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.maxWeight}</p>

                                    <label className="block text-primary text-base font-bold mt-2" htmlFor="total">
                                        Truck Type
                                    </label>
                                    <p className='text-secondary text-sm font-medium'>{booking.trailerType}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Carrier */}
                    <div className='w-full lg:w-1/3 flex justify-center lg:pt-32 bg-white '>
                        <div className="bg-white p-6 w-full max-w-screen-2xl mx-auto">
                            <h2 className="text-xl mb-2 text-secondary">Carrier</h2>
                            <div className="flex flex-col sm:flex-row mb-4 border-b py-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-sm font-bold " htmlFor="customerReference">
                                        Carrier Name
                                    </label>
                                    <p className='text-secondary text-base font-medium'>{booking.carrier || 'TBA'}</p>

                                    <label className="block text-primary text-sm font-bold " htmlFor="commodity">
                                        Driver
                                    </label>
                                    <p className='text-secondary text-base font-medium'>{booking.driver || 'TBA'}</p>
                                </div>
                            </div>

                            <h2 className="text-xl mb-4 text-secondary ">Rate</h2>
                            <div className="flex flex-col sm:flex-row mb-4 border-b">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-sm font-bold" htmlFor="customerReference">
                                        Base Rate 
                                    </label>
                                    <p className='text-secondary text-base font-medium'>$ {booking.price || 'N/A'}</p>

                                    <label className="block text-primary text-sm font-bold " htmlFor="commodity">
                                        Distance
                                    </label>
                                    <p className='text-secondary text-base font-medium mb-4'>{booking.distance}</p>
                                </div>
                            </div>

                            <h2 className="text-xl mb-2 text-secondary">Documents</h2>
                            <div className="flex flex-col sm:flex-row mb-4 border-b py-4">
                                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                    <label className="block text-primary text-sm font-bold " htmlFor="customerReference">
                                        Bill of Lading (BOL) <span className="text-red-600">*</span>
                                    </label>
                                    <p className='text-secondary text-base font-medium'>{booking.bol || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default ShipmentDetails;
