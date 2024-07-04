
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import QuoteRequestModal from '../components/QuoteRequestModal';


const Invoice: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

  return (
    <div className="p-10 bg-white">
      <div className="max-w-2xl mx-auto bg-white p-10 border border-black-600 shadow-lg text-black">
        <h1 className="text-2xl font-bold mb-6">INVOICE</h1>
        <div className="flex justify-between mb-6 mt-12 text-black">
        <div className="w-1/2 pr-2">
            <h2 className="font-medium">BILL TO</h2>
            <p className="font-normal text-sm">Customer Name:</p>
            <p className="font-normal text-sm">Address:</p>
            <p className="font-normal text-sm">Phone number:</p>
            <p className="font-normal text-sm">Email:</p>
          </div>
          <div className="w-1/2 pl-20">
            <p className="font-medium">Invoice No:</p>
            <p className="font-normal text-sm">Invoice Date:</p>
            <p className="font-normal text-sm">Due Date:</p>
            <p className="font-normal text-sm">Payment Terms:</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-medium">SHIPMENT DETAILS</h2>
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <p className="font-normal text-sm">Origin:</p>
              <p className="font-normal text-sm">Date of Shipment:</p>
            </div>
            <div className="w-1/2 pl-20">
              <p className="font-normal text-sm">Destination:</p>
              <p className="font-normal text-sm">BOL Number:</p>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr>
              <th className="border font-normal border-gray-200 px-4 py-2 text-left">Description</th>
              <th className="border font-normal border-gray-200 px-4 py-2 text-left">Miles/Qty</th>
              <th className="border font-normal border-gray-200 px-4 py-2 text-left">Rate/Cost</th>
              <th className="border font-normal border-gray-200 px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-4 py-4"></td>
                <td className="border border-gray-200 px-4 py-4"></td>
                <td className="border border-gray-200 px-4 py-4"></td>
                <td className="border border-gray-200 px-4 py-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mb-6">
        <div className="w-1/2 pr-2">
            <h2 className="font-bold">Terms & Conditions:</h2>
            <p className="text-xs font-normal">
              This is to certify that the above details are properly classified and marked and are in proper condition
              for transportation according to applicable regulations.
            </p>
          </div>
          <div className="w-1/2 pl-24">
            <div className="flex justify-between">
              <p className="font-normal text-sm">Subtotal:</p>
              <p></p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-sm">Discount:</p>
              <p></p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-sm">Tax:</p>
              <p></p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-sm">Paid:</p>
              <p></p>
            </div>
            <div className="flex justify-between font-bold">
              <p className="font-normal text-sm">Balance Due:</p>
              <p></p>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <p>Total:</p>
              <p></p>
            </div>
          </div>
          
        </div>
        <div className="flex justify-between">
          <div className="border-t border-gray-200 pt-6">
            <p>Customer Name & Signature</p>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <p></p>
          </div>
          
        </div>
        <div className='flex justify-end'>
        <Button label="Make Payment" size="small" bgColor="#252F70" hoverBgColor="white" onClick={openModal} type={''} />
        </div>
      </div>
      {isModalOpen && <QuoteRequestModal isOpen={isModalOpen}  />}

    </div>
    
  );
};

export default Invoice;
