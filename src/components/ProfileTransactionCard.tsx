import React from 'react';

interface Transaction {
  loadNumber: string;
  trailerType: string;
  trailerSize: string;
  price: string;
  paymentMethod: string;
  pickupDate: string;
}

interface ProfileTransactionCardProps {
  transaction: Transaction;
}

const ProfileTransactionCard: React.FC<ProfileTransactionCardProps> = ({ transaction }) => {
  return (
    <div className="border rounded-lg mb-4 p-4 shadow-md bg-white hover:shadow-lg transition duration-300">
      <div className="mb-2">
        <span className="font-bold text-primary">Load number: </span>
        {transaction.loadNumber}
      </div>
      <div className="mb-2">
        <span className="font-bold text-primary">Truck Type & Size: </span>
        {transaction.trailerType} - {transaction.trailerSize}
      </div>
      <div className="mb-2">
        <span className="font-bold text-primary">Amount Paid: </span>
        {transaction.price}
      </div>
      <div className="mb-2">
        <span className="font-bold text-primary">Payment Method: </span>
        {transaction.paymentMethod}
      </div>
      <div className="mb-2">
        <span className="font-bold text-primary">Date & Time: </span>
        {transaction.pickupDate}
      </div>
    </div>
  );
};

export default ProfileTransactionCard;
