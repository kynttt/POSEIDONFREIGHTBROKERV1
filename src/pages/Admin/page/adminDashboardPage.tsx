import React from "react";
import OverviewSection from "../components/OverviewSection";
import ShipmentsAnalytics from "../components/ShipmentsAnalytics";
import ShippersList from "../components/ShippersList";
import RecentTransactions from "../components/RecentTransactions";
// import overviewData from "../data/overviewData.json";
// import transactionsData from "../data/transactionsData.json";

const AdminDashboard: React.FC = () => {
  // const [overview] = useState(overviewData);
  // const [transactions] = useState(transactionsData);

  return (
    <div className="flex h-full">
      <div className="flex-1 pt-8 lg:px-18  pb-16 text-primary overflow-y-auto" style={{
    background: `
      radial-gradient(circle at 15% 25%, rgba(255, 99, 132, 0.2), transparent 60%),
      radial-gradient(circle at 85% 20%, rgba(54, 162, 235, 0.7), transparent 60%),
      radial-gradient(circle at 40% 80%, rgba(75, 192, 192, 0.3), transparent 60%),
      radial-gradient(circle at 70% 70%, rgba(255, 206, 86, 0.3), transparent 60%),
      radial-gradient(circle at 30% 40%, rgba(153, 102, 255, 0.3), transparent 60%)
    `,
  }}>
        <div className=" mx-4 lg:mx-20  ">
          <h6 className="text-medium font-medium text-secondary">
            Hello Admin!
          </h6>
          <h1 className="text-2xl font-semibold mb-6 text-secondary">
            Good Morning
          </h1>
          <h6 className="text-medium font-semibold text-secondary mb-8 pl-6">
            Overview
          </h6>

          {/* OverviewSection component */}
          <OverviewSection />

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* ShipmentsAnalytics component */}
            <div className="lg:col-span-2">
              <ShipmentsAnalytics />
            </div>

            {/* ShippersList component */}
            <div className="lg:col-span-1">
              <ShippersList />
            </div>
          </div>

          {/* RecentTransactions component */}
          <div className="mt-8">
            <RecentTransactions  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
