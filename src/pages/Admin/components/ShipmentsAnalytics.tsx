import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import shipmentsData from "../data/shipmentsData.json"; // Assuming shipmentsData.json is correctly structured

const ShipmentsBarChart: React.FC = () => {
  const { labels, datasets } = shipmentsData;

  // Format data for recharts
  const chartData = labels.map((label, index) => {
    const dataObject: { [key: string]: number | string } = { name: label };
    datasets.forEach((dataset, datasetIndex) => {
      dataObject[`series${datasetIndex + 1}`] = dataset.data[index];
    });
    return dataObject;
  });

  // Define colors for each series
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#87cefa",
    "#da70d6",
  ]; // Example colors for series

  return (
    <div className="bg-light-grey p-4 sm:p-6 md:p-4 md:pb-8 rounded-lg h-64 sm:h-80 md:h-96 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-medium mb-4 border-b-2 border-secondary lg:pb-2">
        Shipments Over Time (Bar Chart)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {datasets.map((dataset, index) => (
            <Bar
              key={dataset.label}
              dataKey={`series${index + 1}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShipmentsBarChart;
