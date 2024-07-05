import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <nav className="flex justify-end mt-2" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="h-5 w-5" />
      </button>

      {/* Display truncated first pages and ellipsis if necessary */}
      {currentPage <= 3 ? (
        // Display first 5 pages if current page is within the first 3
        Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === pageNumber ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {pageNumber}
            </button>
          );
        })
      ) : (
        // Display truncated first pages with ellipsis
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            1
          </button>
          <span className="px-4 py-2 text-sm">...</span>
        </>
      )}

      {/* Display last three pages when currentPage is near the end */}
      {currentPage > 3 && (
        Array.from({ length: 3 }, (_, index) => {
          const pageNumber = totalPages - 2 + index;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === pageNumber ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {pageNumber}
            </button>
          );
        })
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <FontAwesomeIcon icon={faAngleRight} className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
