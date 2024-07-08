import React, { useEffect, useState } from 'react';
import OverviewSection from '../components/OverviewSection';
import ShipmentsAnalytics from '../components/ShipmentsAnalytics';
import ShippersList from '../components/ShippersList';
import RecentTransactions from '../components/RecentTransactions';
import overviewData from '../data/overviewData.json';
import shippersData from '../data/shippersData.json';
import transactionsData from '../data/transactionsData.json';
import { useAuth } from '../../../components/useAuth';
import SideBar from '../../../components/SideBar';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  const [overview, setOverview] = useState(overviewData);
  const [shippers, setShippers] = useState(shippersData);
  const [transactions, setTransactions] = useState(transactionsData);

  return (
    <div className="flex h-screen">
      <SideBar isAuthenticated={isAuthenticated} />

      <div className="flex-1 pt-8 lg:px-18 bg-white pb-16 text-primary overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-32">
          <h6 className="text-medium font-semibold text-secondary">Hello Admin!</h6>
          <h1 className="text-2xl font-semibold mb-6 text-secondary">Good Morning</h1>
          <h6 className="text-medium font-semibold text-secondary mb-8 pl-6">Overview</h6>

          {/* OverviewSection component */}
          <OverviewSection data={overview} />

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* ShipmentsAnalytics component */}
            <div className="lg:col-span-2">
              <ShipmentsAnalytics />
            </div>

            {/* ShippersList component */}
            <div className="lg:col-span-1">
              <ShippersList shippers={shippers} />
            </div>
          </div>

          {/* RecentTransactions component */}
          <div className="mt-8">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
