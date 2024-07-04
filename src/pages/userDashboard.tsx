import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/userDashboardCard';
import userBookingData from './userBookingData.json';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/useAuth';

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const { isAuthenticated, role } = useAuth(); // Destructure role from useAuth hook

    // Log the authentication state and role when the component renders
    useEffect(() => {
        console.log('User authenticated?', isAuthenticated);
        console.log('User role:', role);
        setData(userBookingData);
    }, [isAuthenticated, role]);

    const handleQuoteButtonClick = () => {
        navigate('/payment-option');
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <div className="pt-8 bg-white sm:pt-16 lg:pt-24 min-h-screen pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-secondary">Accounts Payable</h2>

                    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-10 border">
                        <div className="flex flex-col sm:flex-row lg:justify-start border-b-2 border-gray-200 mb-4 sm:mb-6">
                            <Button
                                label="Open Invoices"
                                size="small"
                                bgColor="#252F70"
                                hoverBgColor="white"
                                onClick={() => {}}
                                className="mr-2 mb-2 sm:mb-0"
                                type={''}
                            />
                            <Button
                                label="Past Invoices"
                                size="small"
                                bgColor="#252F70"
                                hoverBgColor="white"
                                onClick={() => {}}
                                className="mr-2 mb-2 sm:mb-0"
                                type={''}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100 border-b text-primary">
                                        <th className="px-4 py-2 text-left font-medium">Select</th>
                                        <th className="px-4 py-2 text-left font-medium">Customer PO</th>
                                        <th className="px-4 py-2 text-left font-medium">FreightBroker PO</th>
                                        <th className="px-4 py-2 text-left font-medium">Rate</th>
                                        <th className="px-4 py-2 text-left font-medium">Paid</th>
                                        <th className="px-4 py-2 text-left font-medium">Balance</th>
                                        <th className="px-4 py-2 text-left font-medium">Invoice Date</th>
                                        <th className="px-4 py-2 text-left font-medium">Delivery Date</th>
                                        <th className="px-4 py-2 text-left font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <DashboardCard
                                            key={index}
                                            customerPO={item.customerPO}
                                            freightBrokerPO={item.freightBrokerPO}
                                            rate={item.rate}
                                            paid={item.paid}
                                            balance={item.balance}
                                            invoiceDate={item.invoiceDate}
                                            deliveryDate={item.deliveryDate}
                                            status={item.status}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                        <div className="mb-4 sm:mb-0 flex space-x-2">
                            <Button
                                label="Pay Selected"
                                size="medium"
                                bgColor="#252F70"
                                hoverBgColor="white"
                                onClick={handleQuoteButtonClick}
                                className="mr-2 mb-2 sm:mb-0"
                                type={''}
                            />
                            <Button
                                label="Clear"
                                size="medium"
                                bgColor="#252F70"
                                hoverBgColor="white"
                                onClick={() => {}}
                                className="mr-2 mb-2 sm:mb-0"
                                type={''}
                            />
                        </div>
                        <div className="text-primary flex flex-col sm:flex-row sm:space-x-4 lg:justify-end">
                            <div className="flex flex-col items-start sm:items-end text-right">
                                <p className="text-gray-500 font-normal">Total Selected:</p>
                                <p className="text-primary font-medium">$804.20</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end text-right">
                                <p className="text-gray-500 font-normal">Outstanding Balance:</p>
                                <p className="text-primary font-medium">$804.20</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end text-right">
                                <p className="text-gray-500 font-normal">Total Rate:</p>
                                <p className="text-primary font-medium">$804.20</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end text-right">
                                <p className="text-gray-500 font-normal">Total Paid:</p>
                                <p className="text-primary font-medium">$0.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
