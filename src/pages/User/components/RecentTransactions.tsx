import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../../components/pagination'; // Import the Pagination component

interface Transaction {
  loadNumber: string;
  deliveryAddress: string;
  deliveryDate: string;
  amount: number;
  status: string;
}

const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN TRANSIT':
        return 'text-yellow-600';
      case 'PENDING':
        return 'text-red-600';
      case 'READY':
        return 'text-green-500';
      default:
        return 'text-gray-600';
    }
  };

  // Calculate the range of transactions to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="bg-light-grey p-4 rounded-lg shadow-lg">

      <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-0 border-b-2 border-secondary pb-2">Recent Transactions</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-b-2 border-secondary">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left">Load number</th>
              <th className="px-4 py-2 text-left">Delivery Address</th>
              <th className="px-4 py-2 text-left">Delivery Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-secondary font-normal">{transaction.loadNumber}</td>
                <td className="px-4 py-2 text-secondary font-normal">{transaction.deliveryAddress}</td>
                <td className="px-4 py-2 text-secondary font-normal">{transaction.deliveryDate}</td>
                <td className="px-4 py-2 text-secondary font-normal">$ {transaction.amount}</td>
                <td className={`px-4 py-2 font-normal ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default RecentTransactions;
