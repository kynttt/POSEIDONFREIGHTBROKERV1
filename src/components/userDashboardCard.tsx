import React from 'react';



interface DashboardCardProps {
  customerPO: string;
  freightBrokerPO: string;
  rate: string;
  paid: string;
  balance: string;
  invoiceDate: string;
  deliveryDate: string;
  status: string;
}

const UserDashboardCard: React.FC<DashboardCardProps> = ({
  customerPO,
  freightBrokerPO,
  rate,
  paid,
  balance,
  invoiceDate,
  deliveryDate,
  status
}) => {
 


  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <input type="checkbox" />
      </td>
      <td className="px-4 py-4 font-normal text-secondary">{customerPO}</td>
      <td className="px-4 py-4 font-normal text-secondary">{freightBrokerPO}</td>
      <td className="px-4 py-4 font-normal text-secondary">{rate}</td>
      <td className="px-4 py-4 font-normal text-secondary">{paid}</td>
      <td className="px-4 py-4 font-normal text-secondary">{balance}</td>
      <td className="px-4 py-4 font-normal text-secondary">{invoiceDate}</td>
      <td className="px-4 py-4 font-normal text-secondary">{deliveryDate}</td>
      <td className="px-4 py-4 text-secondary">{status}</td>
    </tr>
  );
};

export default UserDashboardCard;
