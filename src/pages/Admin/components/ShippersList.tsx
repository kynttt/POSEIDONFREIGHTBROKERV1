import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../../components/pagination'; // Import Pagination component

interface Shipper {
  name: string;
  email: string;
}

const ShippersList: React.FC<{ shippers: Shipper[] }> = ({ shippers }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(shippers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedShippers = shippers.slice(startIndex, endIndex);

  return (
    <div className="bg-light-grey p-4 rounded-lg shadow-lg">
      <div>
        <h3 className="text-2xl font-medium mb-4 border-b-2 border-secondary flex justify-between items-center lg:pb-2">
          Shippers
          <span className="text-xs">
            <a href="#">View All</a>
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-b-2 border-secondary">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Business Emails</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedShippers.map((shipper, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-secondary font-normal">{shipper.name}</td>
                <td className="px-4 py-2 text-secondary font-normal">{shipper.email}</td>
                <td className="px-4 py-2 text-secondary flex justify-center">
                  <button className="text-secondary focus:outline-none">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Pagination component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default ShippersList;
