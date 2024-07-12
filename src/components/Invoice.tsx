import React, { useState } from 'react';
import Button from '../components/Button';
import QuoteRequestModal from '../components/QuoteRequestModal';

const Invoice: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-2xl w-full p-4 md:p-10 border border-black-600 shadow-lg text-black">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">INVOICE</h1>
        <div className="flex flex-col md:flex-row justify-between mb-6 mt-6 text-black">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-2">
            <h2 className="font-bold">BILL TO</h2>
            <p className="font-normal text-sm mb-2">Customer Name:</p>
            <p className="font-normal text-sm mb-2">Address:</p>
            <p className="font-normal text-sm mb-2">Phone number:</p>
            <p className="font-normal text-sm mb-2">Email:</p>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-2">
            <p className="font-bold">Invoice No:</p>
            <p className="font-normal text-sm mb-2">Invoice Date:</p>
            <p className="font-normal text-sm mb-2">Due Date:</p>
            <p className="font-normal text-sm mb-2">Payment Method:</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-bold">SHIPMENT DETAILS</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-2">
              <p className="font-normal text-sm mb-2">Origin:</p>
              <p className="font-normal text-sm mb-2">Date of Shipment:</p>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-2">
              <p className="font-normal text-sm mb-2">Destination:</p>
              <p className="font-normal text-sm mb-2">BOL Number:</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border font-normal border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border font-normal border-gray-300 px-4 py-2 text-left">Miles/Qty</th>
                <th className="border font-normal border-gray-300 px-4 py-2 text-left">Rate/Cost</th>
                <th className="border font-normal border-gray-300 px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-3"></td>
                  <td className="border border-gray-200 px-4 py-3"></td>
                  <td className="border border-gray-200 px-4 py-3"></td>
                  <td className="border border-gray-200 px-4 py-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-2 text-justify">
            <h2 className="font-bold">Terms & Conditions:</h2>
            <p className="text-xs font-normal">
              This is to certify that the above details are properly classified and marked and are in proper condition
              for transportation according to applicable regulations.
            </p>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-32">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="font-normal text-sm">Subtotal:</p>
              <p></p>
            </div>
            <div className="flex flex-col md:flex-row justify-between bg-gray-200">
              <p className="font-normal text-sm ">Discount:</p>
              <p></p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p className="font-normal text-sm">Tax:</p>
              <p></p>
            </div>
            <div className="flex flex-col md:flex-row justify-between bg-gray-200">
              <p className="font-normal text-sm">Paid:</p>
              <p></p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-2 font-bold">
              <p className="font-normal text-sm">Balance Due:</p>
              <p></p>
            </div>
            <div className="border-t-2 border-gray-500 pt-2"/>
          
            <div className="flex flex-col md:flex-row justify-between mb-2 font-bold text-xl bg-gray-300">
              <p>Total:</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="border-t border-gray-500 pt-4">
            <p>Customer Name & Signature</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            label="Make Payment"
            size="small"
            bgColor="#252F70"
            hoverBgColor="white"
            onClick={openModal} type={''}          
          />
        </div>
      </div>
      {isModalOpen && <QuoteRequestModal isOpen={isModalOpen} />}
    </div>
  );
};

export default Invoice;
