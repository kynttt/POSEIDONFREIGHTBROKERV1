import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from '../components/userDashboardCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/useAuthStore';
import SideBar from '../components/SideBar';
import { fetchUserInvoices } from '../lib/apiCalls'; // Import the new API call

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const { isAuthenticated, role } = useAuthStore();
  const userId = useAuthStore(state => state.userId);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        try {
          const token = useAuthStore.getState().token;

          if (!token) {
            console.error('No authentication token found');
            return;
          }

          const invoices = await fetchUserInvoices(userId, token); // Use the new API call
          setData(invoices);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
          } else {
            console.error('Unexpected Error:', error);
          }
        }
      };

      fetchData();
    }
  }, [isAuthenticated, role, userId]);

  const handleQuoteButtonClick = () => {
    navigate('/payment-option');
  };

  return (
    <>
      <div className='flex h-screen'>
        <SideBar isAuthenticated={isAuthenticated} />

        <div className="flex-1 pt-8 bg-white sm:pt-16 lg:pt-24 overflow-y-auto pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-secondary">Accounts Payable</h2>

            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-10 border">
              <div className="flex flex-col sm:flex-row lg:justify-start border-b-2 border-gray-200 mb-4 sm:mb-6">
                <Button
                  label="Open Invoices"
                  size="small"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={() => { }}
                  className="mr-2 mb-2 sm:mb-0"
                  type={''}
                />
                <Button
                  label="Past Invoices"
                  size="small"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={() => { }}
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
                        rate={item.amountDue}
                        paid={item.paid}
                        balance={item.amountDue}
                        invoiceDate={item.dateIssued}
                        deliveryDate={item.quote?.pickupDate || 'N/A'}
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
                  onClick={() => { }}
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
      </div>
    </>
  );
};

export default UserDashboard;
