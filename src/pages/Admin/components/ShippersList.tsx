import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/pagination'; // Import Pagination component
import { fetchUsers } from '../../../lib/apiCalls'; // Import the API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface Shipper {
  _id: string; // Use _id as the ID field
  name: string;
  email: string;
  role: string;
  profilePicUrl?: string; // Add profilePicUrl
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

  const fallbackImages = [
    "https://avatar.iran.liara.run/public/8",
    "https://avatar.iran.liara.run/public/21",
    "https://avatar.iran.liara.run/public/9",
    "https://avatar.iran.liara.run/public/50",
    "https://avatar.iran.liara.run/public/54",
    "https://avatar.iran.liara.run/public/63",
    "https://avatar.iran.liara.run/public/60",
    "https://avatar.iran.liara.run/public/90"
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white md:p-8 p-4 rounded-2xl shadow-lg h-full border">
      <div>
        <h3 className="text-2xl font-medium mb-4  flex justify-between items-center lg:pb-2">
          Users
          <span className="text-xs">
            <a href="#">View All</a>
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full  border-secondary">
          <thead className='bg-light-grey '>
            <tr >
              <th className="px-4 py-2 text-left ">Profile</th> {/* New column for profile picture */}
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {displayedShippers.map((shipper) => (
              <tr
                key={shipper._id} // Use shipper._id as key
                className="cursor-pointer hover:bg-gray-100 "
                onClick={() => handleRowClick(shipper._id)} // Pass shipper._id
              >
                <td className="px-4 "> {/* Profile Picture Cell */}
                  <img
                    src={shipper.profilePicUrl && shipper.profilePicUrl.startsWith("http")
                      ? shipper.profilePicUrl
                      : `${process.env.REACT_APP_SERVER_URL}/api/${shipper.profilePicUrl}`
                    }
                    alt={shipper.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy" // Lazy loading for performance
                    onError={(e) => {
                      e.currentTarget.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-secondary font-normal">{shipper.name}</td>
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
