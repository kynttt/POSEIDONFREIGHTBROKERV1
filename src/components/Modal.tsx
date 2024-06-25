// Modal.tsx

import React from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode; // Define children prop explicitly
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-4xl mx-auto my-12">
        {/* Modal content */}
        <div className="relative bg-white shadow-md rounded-lg p-6 sm:p-8">
          {/* Modal header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#7783D2] text-center w-full mb-4">
              SELECT A SERVICE
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="">
            {React.Children.map(children, (child, index) => (
              <div key={index} className="col-span-1">
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
