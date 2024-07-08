import { useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faSearch,
  faArrowUpFromBracket,
  faPlus,
  faEllipsisV,
  faList,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

const LegalPage = () => {
  const [isListView, setIsListView] = useState(true); // State to track view mode
  const [showActionsIndex, setShowActionsIndex] = useState(null); // State to track which ellipsis was clicked

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

  const handleEllipsisClick = (index) => {
    // Toggle the state to show/hide actions
    setShowActionsIndex(showActionsIndex === index ? null : index);
  };

  return (
    <nav>
      <Navbar isAuthenticated={false} />

      <div className="p-4 sm:p-6 md:p-8 min-full">
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 mb-4 px-4 sm:px-6 md:px-12">
          <div className="mb-4 md:mb-8">
            <h2 className="text-sm font-light text-secondary">
              Hello Legal Team,
            </h2>
            <h2 className="text-xl font-medium text-secondary">Good Morning</h2>
          </div>

          <div className="relative w-full md:w-auto mt-4 md:mt-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search File"
              className="w-full md:w-64 text-sm font-normal border rounded py-3 px-4 pl-8 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="flex justify-end items-start mt-4 px-4 sm:px-6 md:px-12 mb-6">
          <div className="flex items-end gap-4">
            <button className="text-sm font-normal text-gray-400 flex items-end gap-2 border border-gray-400 rounded px-3 py-2">
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              Upload Files
            </button>
            <button className="text-sm text-gray-400 flex items-end gap-2 border border-gray-400 rounded px-2 py-2 font-normal">
              <FontAwesomeIcon icon={faPlus} />
              Create New
            </button>
          </div>
        </div>

        <div className="mb-12 px-4 sm:px-6 md:px-32">
          <h3 className="text-xl font-medium text-secondary mb-8">
            All Folders
          </h3>
          <div className="flex gap-4 overflow-x-auto gap-x-12">
            {folders.map((folder) => (
              <div
                key={folder}
                className="text-sm flex-shrink-0 border-2 border-secondary rounded-lg p-4 text-center text-primary"
                style={{
                  minWidth: "150px",
                  maxWidth: "150px",
                  minHeight: "100px",
                }}
              >
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className="mt-1 text-3xl mb-2 text-gray-500 hover:text-secondary"
                />
                <p>{folder}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Files Start Here */}

        <div className="mb-8 px-4 sm:px-6 md:px-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-secondary mb-6">
              Recent Files
            </h3>
            <div className="flex items-center justify-between gap-4">
              <FontAwesomeIcon
                icon={faList}
                className={`text-gray-500 hover:text-blue-700 cursor-pointer text-xl ${
                  isListView ? "text-blue-700" : ""
                }`}
                onClick={() => setIsListView(true)}
              />
              <FontAwesomeIcon
                icon={faTh}
                className={`text-gray-500 hover:text-blue-700 cursor-pointer text-xl ${
                  !isListView ? "text-blue-700" : ""
                }`}
                onClick={() => setIsListView(false)}
              />
            </div>
          </div>

          {/* ListView */}
          {isListView ? (
            <div className="pl-20 flex flex-col md:flex-row md:gap-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-12"
                        />
                        <span>Type</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      File Name
                    </th>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      File Size
                    </th>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr
                      key={index}
                      className="hover:bg-primary hover:text-secondary transition-colors duration-300 text-center"
                    >
                      <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-12"
                          />
                          <span>{file.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
                        {file.name}
                      </td>
                      <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
                        {file.size}
                      </td>
                      <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
                        {file.date}
                      </td>
                      <td className="py-2 px-10 text-left text-sm font-normal text-secondary relative">
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          className="mt-1 text-xl mb-2 text-gray-500 hover:text-secondary cursor-pointer"
                          onClick={() => handleEllipsisClick(index)}
                        />
                        {/* Actions section */}
                        {showActionsIndex === index && (
                          <div className="absolute right-4 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded">
                            <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
                              View
                            </p>
                            <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
                              Download
                            </p>
                            <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
                              Print
                            </p>
                            <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
                              Delete
                            </p>
                            <p className="text-blue-500 hover:text-blue-700 cursor-pointer">
                              Rename
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Actions section */}
              <div className="mt-10 flex flex-col gap-4">
                <span className="text-2xl font-normal text-blue-500">
                  Actions
                </span>
                <span className="block w-full text-left text-sm font-normal text-blue-500 hover:text-blue-700">
                  View
                </span>
                <span className="block w-full text-left text-sm font-normal text-blue-500 hover:text-blue-700">
                  Download
                </span>
                <span className="block w-full text-left text-sm font-normal text-blue-500 hover:text-blue-700">
                  Print
                </span>
                <span className="block w-full text-left text-sm font-normal text-blue-500 hover:text-blue-700">
                  Delete
                </span>
                <span className="block w-full text-left text-sm font-normal text-blue-500 hover:text-blue-700">
                  Rename
                </span>
              </div>
              
            </div>
          ) : (
            // GridView
            <div className="flex flex-wrap gap-4">
  {files.map((file, index) => (
    <div
      key={index}
      className="relative flex-shrink-0 bg-white border rounded-lg p-4 w-40 hover:bg-primary hover:text-secondary transition-colors duration-300"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
        />
        <span>{file.type}</span>
      </div>
      <div className="text-sm font-normal text-secondary mt-2">
        <p className="font-semibold">{file.name}</p>
        <p>{file.size}</p>
        <p>{file.date}</p>
      </div>
      <FontAwesomeIcon
        icon={faEllipsisV}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-secondary cursor-pointer"
        onClick={() => handleEllipsisClick(index)}
      />
      {/* Actions section */}
      {showActionsIndex === index && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded">
          <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
            View
          </p>
          <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
            Download
          </p>
          <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
            Print
          </p>
          <p className="text-blue-500 hover:text-blue-700 cursor-pointer mb-1">
            Delete
          </p>
          <p className="text-blue-500 hover:text-blue-700 cursor-pointer">
            Rename
          </p>
        </div>
      )}
    </div>
  ))}
</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LegalPage;
