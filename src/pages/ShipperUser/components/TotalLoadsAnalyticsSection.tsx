import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const TotalLoadsAnalyticsSection = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 md:w-50%">
      <h2 className="text-xl font-semibold mb-4 font-semibold text-primary">Total Loads Analytics</h2>
      <div style={{ width: "100%", height: "15rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={370} height={150} data={data}>
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
