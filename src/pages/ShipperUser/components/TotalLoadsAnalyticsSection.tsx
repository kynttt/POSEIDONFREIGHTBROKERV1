// Import React if necessary (for React versions before 17)
// import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define the type for an individual data entry in the chart
interface ChartData {
  date: string; // Adjust the type based on your data, e.g., string, Date, etc.
  value: number; // Adjust the type based on your data
}

// Define the type for the props of the TotalLoadsAnalyticsSection component
interface TotalLoadsAnalyticsSectionProps {
  data: ChartData[];
}

const TotalLoadsAnalyticsSection: React.FC<TotalLoadsAnalyticsSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 md:w-50%">
      <h2 className="text-xl font-semibold mb-4 font-semibold text-primary">Total Loads Analytics</h2>
      <div style={{ width: "100%", height: "15rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalLoadsAnalyticsSection;
