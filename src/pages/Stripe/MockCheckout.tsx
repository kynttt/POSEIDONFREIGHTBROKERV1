import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faCreditCard, faCalendar, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import QuoteRequestModal from '../../components/QuoteRequestModal';

const PaymentForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    

    // // Handler to close the modal
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    const envelopeIcon = faEnvelope as IconProp;
    const creditCardIcon = faCreditCard as IconProp;
    const calendarIcon = faCalendar as IconProp;
    const lockIcon = faLock as IconProp;
    const visaIcon = faCcVisa as IconProp;
    const mastercardIcon = faCcMastercard as IconProp;
    const amexIcon = faCcAmex as IconProp;
    const discoverIcon = faCcDiscover as IconProp;

    return (
        <div className="h-2/3 bg-white flex justify-center items-center ">
            {/* <div className='w-1/2'></div> */}
            <div className="max-w-lg w-full bg-white shadow-md  border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-secondary">Pay with card</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Contact information</label>
                        <div className="flex items-center mt-1 p-2 border border-gray-300 rounded">
                            <FontAwesomeIcon icon={envelopeIcon} className="text-gray-400 mr-2" />
                            <input type="email" placeholder="email@example.com" className="w-full focus:outline-none bg-transparent font-thin text-secondary" />
                        </div>
                        <div className="flex items-center mt-1 p-2 border border-gray-300 rounded">
                            <span className="text-gray-400 mr-2">🇵🇭</span>
                            <input type="text" placeholder="0905 123 4567" className="w-full focus:outline-none bg-transparent font-thin text-secondary" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Card information</label>
                        <div className="relative flex items-center p-2 border border-gray-300 rounded">
                            <input
                                type="text"
                                placeholder="1234 1234 1234 1234"
                                className="w-full focus:outline-none bg-transparent font-thin text-secondary "
                            />
                            <div className="absolute right-2 flex gap-2">
                                <FontAwesomeIcon icon={visaIcon} className="text-blue-600" />
                                <FontAwesomeIcon icon={mastercardIcon} className="text-red-600" />
                                <FontAwesomeIcon icon={amexIcon} className="text-blue-400" />
                                <FontAwesomeIcon icon={discoverIcon} className="text-orange-600" />
                            </div>
                        </div>

                        <div className="flex space-x-2 mt-1">
                            <div className="flex-1 flex items-center p-2 border border-gray-300 rounded">
                                <FontAwesomeIcon icon={calendarIcon} className="text-gray-400 mr-2" />
                                <input type="text" placeholder="MM / YY" className="w-full focus:outline-none bg-transparent font-thin text-secondary" />
                            </div>
                            <div className="flex-1 flex items-center p-2 border border-gray-300 rounded">
                                <FontAwesomeIcon icon={lockIcon} className="text-gray-400 mr-2" />
                                <input type="text" placeholder="CVC" className="w-full focus:outline-none bg-transparent font-thin text-secondary" />
                            </div>
                        </div>


                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Cardholder name</label>
                        <input type="text" placeholder="Full name on card" className="mt-1 p-2 border border-gray-300 rounded w-full bg-transparent font-thin text-secondary" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Billing address</label>
                        <select className="mt-1 p-2 border border-gray-300 rounded w-full bg-transparent">
                            <option>Philippines</option>
                        </select>
                        <input type="text" placeholder="Address" className="mt-1 p-2 border border-gray-300 rounded w-full bg-transparent font-thin text-secondary" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 bg-transparent">
                            <input type="checkbox" className="mr-2 bg-transparent" />
                            Securely save my information for 1-click checkout
                        </label>
                    </div>
                    <div>
            {/* <button 
                className="bg-secondary text-white py-4 px-4 rounded w-full" 
                onClick={openModal}
            >
                Pay
            </button> */}

            {/* Conditionally render the modal */}
            {isModalOpen && (
                <QuoteRequestModal isOpen={isModalOpen}  />
            )}
        </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
