import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faSearch, faUpload, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const LegalPage = () => {
  const folders = [
    "Contracts",
    "Official Documents",
    "Invoices",
    "BOL",
    "Agreements",
    "Receiver BOL Copy",
    "Carrier BOL Copy",
  ];

  const files = [
    { type: "PDF", name: "Contract.pdf", size: "48 mb", date: "MM/DD/YYYY" },
    { type: "DOCS", name: "Contract.doc", size: "48 mb", date: "MM/DD/YYYY" },
    { type: "PDF", name: "Contract.pdf", size: "48 mb", date: "MM/DD/YYYY" },
    { type: "DOCS", name: "Contract.doc", size: "48 mb", date: "MM/DD/YYYY" },
  ];

  return (
    <nav>
    <Navbar isAuthenticated={false} />
    
    <div className="p-8 min-full">
      <div className="flex justify-between items-start mb-4 px-12">
  <div className="mb-8">
    <h1 className="text-2xl font-semibold text-blue-600">Hello Legal Team,</h1>
    <h2 className="text-xl text-blue-600">Good Morning</h2>
  </div>

  <div className="relative">
    <input
      type="text"
      placeholder="Search File"
      className="border rounded py-2 px-3 pr-10 focus:outline-none focus:shadow-outline"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
    </div>
  </div>
</div>

<div className="flex justify-end items-start mt-4 px-12">
  <div className="flex items-end gap-4">
    <button className="text-blue-600 flex items-end gap-2 border border-blue-600 rounded px-3 py-1">
      <FontAwesomeIcon icon={faUpload} />
      Upload Files
    </button>
    <button className="text-blue-600 flex items-end gap-2 border border-blue-600 rounded px-3 py-1">
      <FontAwesomeIcon icon={faPlus} />
      Create New
    </button>
  </div>
</div>


      
<div className="mb-8 px-24">
  <h3 className="text-lg font-semibold text-blue-600 mb-4">All Folders</h3>
  <div className="flex gap-4 overflow-x-auto gap-x-12">
    {folders.map((folder) => (
      <div key={folder} className="flex-shrink-0 border border-blue-600 rounded-lg p-4 text-center text-blue-600" style={{ minWidth: '150px', maxWidth: '150px', minHeight: '100px' }}>
        <FontAwesomeIcon icon={faFolder} className="text-3xl mb-2" />
        <p>{folder}</p>
      </div>
    ))}
  </div>
</div>


      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-600">Recent Files</h3>
        </div>
        
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">File Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">File Size</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-sm">{file.type}</td>
                <td className="py-2 px-4 text-sm">{file.name}</td>
                <td className="py-2 px-4 text-sm">{file.size}</td>
                <td className="py-2 px-4 text-sm">{file.date}</td>
                <td className="py-2 px-4 text-sm text-blue-600 flex gap-2 items-center">
                  <span className="cursor-pointer">View</span>
                  <span className="cursor-pointer">Download</span>
                  <span className="cursor-pointer">Print</span>
                  <span className="cursor-pointer">Delete</span>
                  <span className="cursor-pointer">Rename</span>
                  <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </nav>
  );
};

export default LegalPage;
