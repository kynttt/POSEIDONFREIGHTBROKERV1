import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../state/useAuthStore'; // Adjust the path as needed
import { getUserInvoices } from '../../../lib/apiCalls'; // Adjust the path as needed
import { notifications } from '@mantine/notifications';

interface Invoice {
  id: string;
  amount: number; // In cents
  amount_paid: number; // In cents
  currency: string;
  status: string;
  created: number; // Timestamp
  description: string | null;
  pdfUrl?: string; // Optional field for PDF URL
}

const InvoicesList = () => {
  const { isAuthenticated, userId } = useAuthStore();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!isAuthenticated || !userId) return;

      try {
        const response = await getUserInvoices(userId);
        console.log('Response Data:', response.data); // Log response data

        if (response.data && Array.isArray(response.data.data)) {
          console.log('Invoices Data:', response.data.data); // Log invoices data
          setInvoices(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          notifications.show({
            title: 'Error',
            message: 'Unexpected response format when fetching invoices.',
            color: 'red',
          });
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        notifications.show({
          title: 'Error',
          message: 'Unable to fetch invoices.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [isAuthenticated, userId]);

  if (loading) return <div>Loading...</div>;

  const formatAmount = (amount: number | null | undefined) => {
    if (amount == null || isNaN(amount)) {
      return '0.00';
    }
    return (amount / 100).toFixed(2);
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Amount Due</th>
              <th className="border border-gray-300 p-2">Amount Paid</th>
              <th className="border border-gray-300 p-2">Currency</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Created</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Document</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border border-gray-300 p-2">{invoice.id}</td>
                <td className="border border-gray-300 p-2">
                  {formatAmount(invoice.amount)}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatAmount(invoice.amount_paid)} 
                </td>
                <td className="border border-gray-300 p-2">{invoice.currency.toUpperCase()}</td>
                <td className="border border-gray-300 p-2 capitalize">{invoice.status}</td>
                <td className="border border-gray-300 p-2">{new Date(invoice.created * 1000).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{invoice.description || 'No Description'}</td>
                <td className="border border-gray-300 p-2">
                  {invoice.pdfUrl ? (
                    <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Document
                    </a>
                  ) : (
                    'No Document'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicesList;
