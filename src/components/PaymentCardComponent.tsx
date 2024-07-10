import React, { useState, useEffect } from "react";
import paymentsData from "../pages/accountingPaymentsData.json"; // Import JSON data

const PaymentCard: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]); // State to hold table data

  useEffect(() => {
    // Simulate fetching or setting table data from an API or local storage
    setTableData(paymentsData);
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto md:overflow-y-hidden">
      <table className="bg-gray-200 rounded-lg shadow-md overflow-hidden text-primary w-full">
        <thead className="bg-white border-t border-b border-l border-r">
          <tr className="text-center">
            <th className="py-4 px-4">Freight PO</th>
            <th className="py-4 px-4">Pay Status</th>
            <th className="py-4 px-4">Estimated Paid Date</th>
            <th className="py-4 px-4">Paid Date</th>
            <th className="py-4 px-4">Invoice Number</th>
            <th className="py-4 px-4">Documents</th>
            <th className="py-4 px-4">Paid Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr
              key={index}
              className="bg-gray-100 border-b border-gray-200 text-center text-base font-normal text-secondary rounded-lg shadow-md py-3"
            >
              <td className="py-4 px-4 mb-2">{data.freightPO}</td>
              <td className="py-4 px-4">{data.payStatus}</td>
              <td className="py-4 px-4">{data.estimatedPaidDate}</td>
              <td className="py-4 px-4">{data.paidDate}</td>
              <td className="py-4 px-4">{data.invoiceNumber}</td>
              <td className="py-4 px-4">{data.documents}</td>
              <td className="py-4 px-4">{data.paidTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentCard;
