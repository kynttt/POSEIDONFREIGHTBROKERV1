import React from 'react';

interface Transaction {
  loadNumber: string;
  truckType: string;
  amountPaid: string;
  paymentMethod: string;
  dateTime: string;
}

const ProfileTransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <div className="border rounded-lg mb-4 p-4 shadow-md bg-white hover:shadow-lg transition duration-300">
    <div className="mb-2">
      <span className="font-bold text-primary">Load number: </span>
      {transaction.loadNumber}
    </div>
    <div className="mb-2">
      <span className="font-bold text-primary">Truck Type & Size: </span>
      {transaction.truckType}
    </div>
    <div className="mb-2">
      <span className="font-bold text-primary">Amount Paid: </span>
      {transaction.amountPaid}
    </div>
    <div className="mb-2">
      <span className="font-bold text-primary">Payment Method: </span>
      {transaction.paymentMethod}
    </div>
    <div className="mb-2">
      <span className="font-bold text-primary">Date & Time: </span>
      {transaction.dateTime}
    </div>
  </div>
);

export default ProfileTransactionCard;
