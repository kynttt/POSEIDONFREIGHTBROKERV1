import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/pagination'; // Import Pagination component
import { fetchUsers } from '../../../lib/apiCalls'; // Import the API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface Shipper {
  _id: string; // Use _id as the ID field
  name: string;
  email: string;
  role: string;
}

const ShippersList: React.FC = () => {
  const [shippers, setShippers] = useState<Shipper[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const loadShippers = async () => {
      try {
        const data = await fetchUsers();
        
        setShippers(data);
      } catch (error) {
        console.error('Error fetching shippers:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadShippers();
  }, []);
  

  const totalPages = Math.ceil(shippers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedShippers = shippers.slice(startIndex, endIndex);

  const handleRowClick = (id: string) => {
    
    navigate(`/a/user-transaction/${id}`);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-light-grey p-4 rounded-lg shadow-lg h-full">
      <div>
        <h3 className="text-2xl font-medium mb-4 border-b-2 border-secondary flex justify-between items-center lg:pb-2">
          Users
          <span className="text-xs">
            <a href="#">View All</a>
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-b-2 border-secondary">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Business Email</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
          {displayedShippers.map((shipper) => (
  <tr
    key={shipper._id} // Use shipper._id as key
    className="cursor-pointer hover:bg-gray-100"
    onClick={() => handleRowClick(shipper._id)} // Pass shipper._id
  >
    <td className="px-4 py-2 text-secondary font-normal">{shipper.name}</td>
    <td className="px-4 py-2 text-secondary font-normal">{shipper.email}</td>
    <td className="px-4 py-2 text-secondary font-normal">{shipper.role}</td>
  </tr>
))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ShippersList;
