import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserBookingById } from "../../../lib/apiCalls"; // Import the API function
import Pagination from "../../../components/pagination"; // Import Pagination component

interface Transaction {
  id: string;
  origin: string;
  destination: string;
  price: number;
  pickupDate: string;
  deliveryDate: string;
  pickupTime: string;
  deliveryTime: string;
  carrier: string;
  status: string;
}

const UserTransactionsList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve user ID from URL params
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadTransactions = async () => {
      if (id) {
        try {
          const data = await fetchUserBookingById(id); // Fetch transactions based on user ID
          setTransactions(data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTransactions();
  }, [id]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const renderNoData = (value: string | number) => {
    return value ? value : <span className="text-red-500">No data</span>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-light-grey p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl text-primary font-medium mb-4 border-b-2 border-secondary">
        User Transactions
      </h3>
      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-red-500 text-center">No data yet</div>
        ) : (
          <>
            <table className="min-w-full text-primary border-b-2 border-secondary">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Transaction ID</th>
                  <th className="px-4 py-2 text-left">Origin</th>
                  <th className="px-4 py-2 text-left">Destination</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Pickup Date</th>
                  <th className="px-4 py-2 text-left">Delivery Date</th>
                  <th className="px-4 py-2 text-left">Pickup Time</th>
                  <th className="px-4 py-2 text-left">Delivery Time</th>
                  <th className="px-4 py-2 text-left">Carrier</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedTransactions.map((transaction) => (
                  <tr className="border-b-2" key={transaction.id}>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {transaction.origin}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {transaction.destination}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      ${transaction.price}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {new Date(transaction.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {new Date(transaction.deliveryDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {renderNoData(transaction.pickupTime)}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {renderNoData(transaction.deliveryTime)}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {renderNoData(transaction.carrier)}
                    </td>
                    <td className="px-4 py-2 text-secondary font-normal">
                      {renderNoData(transaction.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserTransactionsList;
