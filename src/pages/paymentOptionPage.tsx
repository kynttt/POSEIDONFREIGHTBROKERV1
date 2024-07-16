import axios from 'axios'; // Import axios or your HTTP client
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import QuoteRequestModal from '../components/QuoteRequestModal';

const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PaymentComponent: React.FC = () => {
    const [selectedAccount, setSelectedAccount] = useState('Installment');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { price, quoteId } = location.state || { price: 0, quoteId: null }; // Destructure price and quoteId from location.state

    const openModal = async () => {
        if (!quoteId) {
            console.error('No quoteId found in location state');
            return;
        }

        const token = localStorage.getItem('authToken'); // Retrieve JWT token from local storage or wherever it's stored after login

        if (!token) {
            console.error('No token found');
            // Handle token absence as needed, possibly redirect to login
            return;
        }

        const bookingData = {
            quote: quoteId, // Pass the quoteId as the value of 'quote' field
            // Add any other relevant data needed for booking
        };

        try {
            const response = await axios.post('http://localhost:5000/api/bookings/', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}` // Send JWT token in the Authorization header
                }
            });
            console.log('Booking successful:', response.data);
            setIsModalOpen(true); // Open modal on successful booking
        } catch (error) {
            console.error('Error booking:', error);
            // Handle error as needed
        }
    };

    const handleCancel = () => {
        window.history.back(); // Go back to the previous page
    };

    const handlePaymentTermClick = (term: string) => {
        navigate('/invoice'); // Navigate to invoice page or handle payment terms
    };

    return (
        <>
            <div className="bg-white sm:pt-16 lg:pt-24 min-h-screen pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-secondary">Payment Method</h2>

                    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-10 border shadow">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-primary text-lg mb-2 font-normal" htmlFor="account">
                                    Select Payment <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="account"
                                    name="account"
                                    value={selectedAccount}
                                    onChange={(e) => setSelectedAccount(e.target.value)}
                                    className="block appearance-none lg:w-1/2 w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option>Stripe</option>
                                    <option>Bank</option>
                                    <option>Paypal</option>
                                    <option>Payment Terms</option>
                                    <option>Others...</option>
                                </select>
                            </div>

                            {selectedAccount === 'Payment Terms' && (
                                <div>
                                    <label className="block text-primary text-lg mb-2 font-normal lg:ml-60">Select Payment Terms <span className="text-red-500">*</span></label>
                                    <div className="flex space-x-8 justify-end">
                                        <Button label="3 months" size="medium" bgColor="#252F70" hoverBgColor="white" onClick={() => handlePaymentTermClick('3 months')} type={''} />
                                        <Button label="6 months" size="medium" bgColor="#252F70" hoverBgColor="white" onClick={() => handlePaymentTermClick('6 months')} type={''} />
                                        <Button label="9 months" size="medium" bgColor="#252F70" hoverBgColor="white" onClick={() => handlePaymentTermClick('9 months')} type={''} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <p className="text-right text-primary font-medium mt-8">PAYMENT TOTAL: <span className='text-secondary'>${price.toFixed(2)}</span></p>
                        </div>

                        <div className="overflow-x-auto">
                            <h1 className='text-secondary text-lg mb-2 font-normal border-t-4 border-secondary pt-4'>Review Payment</h1>
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b text-gray-500">
                                        <th className="px-4 py-2 text-left font-medium">Customer PO</th>
                                        <th className="px-4 py-2 text-left font-medium">Freight Broker PO</th>
                                        <th className="px-4 py-2 text-left font-medium">Rate/Cost</th>
                                        <th className="px-4 py-2 text-left font-medium">Balance</th>
                                        <th className="px-4 py-2 text-left font-medium">Pay Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b text-primary">
                                        <td className="px-4 py-2">{generateRandomNumber(1000, 9999)}</td>
                                        <td className="px-4 py-2">{generateRandomNumber(1000, 9999)}</td>
                                        <td className="px-4 py-2">${price.toFixed(2)}</td>
                                        <td className="px-4 py-2">${price.toFixed(2)}</td>
                                        <td className="lg:px-4 py-2">
                                            <input
                                                type="text"
                                                value={`$${price.toFixed(2)}`}
                                                readOnly
                                                className="block w-full bg-white border border-gray-200 text-blue-500 py-2 lg:px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-28">
                            <p className="text-primary text-lg font-normal border-t-4 border-secondary pt-4">
                                <span className='text-black text-lg mb-2 font-normal'>Note:</span> No Limitation of carrier liability applies to this shipment, unless set forth in the Transportation Agreement between the parties.
                            </p>
                            <div className="text-gray-500 text-xs grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 mt-8">
                                <p className="lg:col-span-1 border-2 p-4 text-primary text-sm font-normal text-justify">
                                    Received, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable,
                                    to the rates, classifications, and rules that have been established by the carrier and are applicable to the shipment, as well as to all applicable
                                    state and federal regulations.
                                </p>
                                <p className="lg:col-span-3 border-2 p-4 text-primary text-sm font-normal text-justify">
                                    The carrier shall not make delivery of this shipment without payment of charges and all other lawful fees. If a motor carrier, freight forwarder, broker
                                    or other transportation service provider accepts this shipment from anyone other than the shipper listed hereon, it agrees to seek payment of all charges
                                    exclusively from this entity from which it accepted the shipment (i.e., the broker) and expressly waives any other collection rights or remedies otherwise
                                    available to it, including any right to seek payment of the transportation charges from the consignee or consignor.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-start space-x-4 mt-8">
                            <Button label="Book" size="medium" bgColor="#252F70" hoverBgColor="white" onClick={openModal} type={''} />
                            <Button label="Cancel" size="medium" bgColor="#252F70" hoverBgColor="white" onClick={handleCancel} type={''} />
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <QuoteRequestModal isOpen={isModalOpen} />}
        </>
    );
};

export default PaymentComponent;
