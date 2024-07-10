// TableComponent.tsx
import React from "react";

interface TableProps {
  data: {
    invoice: string;
    transactionType: string;
    loadDate: string;
    paidTotal: number;
  }[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="bg-white rounded-lg shadow-md p-4 mb-5 w-full md:w-11/12 text-primary">
        <div className="py-1">
          <div className="flex flex-wrap text-base font-semibold">
            <div className="w-full md:w-1/4 px-4">Invoice</div>
            <div className="w-full md:w-1/4 px-4 md:pl-15">Transaction Type</div>
            <div className="w-full md:w-1/4 px-4 md:pl-15">Load Date</div>
            <div className="w-full md:w-1/4 flex justify-center md:justify-end items-center md:pr-4">
              <div>Paid Total</div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-96 md:max-h-full">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-200 rounded-lg shadow-md p-4 mb-5 w-full md:w-11/12">
            <div className="py-1">
              <div className="flex flex-wrap text-base font-normal text-secondary">
                <div className="w-full md:w-1/4 px-4">{item.invoice}</div>
                <div className="w-full md:w-1/4 px-4 md:pl-15">{item.transactionType}</div>
                <div className="w-full md:w-1/4 px-4 md:pl-15">{item.loadDate}</div>
                <div className="w-full md:w-1/4 flex justify-center md:justify-end items-center md:pr-4">
                  <div>${item.paidTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
