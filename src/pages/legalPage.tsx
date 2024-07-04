import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faSearch,
  faArrowUpFromBracket,
  faPlus,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

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

      <div className="p-4 sm:p-6 md:p-8 min-full">
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 mb-4 px-4 sm:px-6 md:px-12">
          <div className="mb-4 md:mb-8">
            <h2 className="text-sm font-light text-secondary">
              Hello Legal Team,
            </h2>
            <h2 className="text-xl font-medium text-secondary">Good Morning</h2>
          </div>

          <div className="relative w-full md:w-auto mt-4 md:mt-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search File"
              className="w-full md:w-64 text-sm font-normal border rounded py-3 px-4 pl-10 focus:outline-none focus:shadow-outline"
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

        <div className="mb-8 px-4 sm:px-6 md:px-32">
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

        <div className="mb-8 px-4 sm:px-6 md:px-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-secondary mb-6">
              Recent Files
            </h3>
          </div>

          <div className="flex gap-4">
            <div className="w-12 flex flex-col items-center">
              {files.map((file, index) => (
                <input
                  key={index}
                  type="box"
                  className="h-4 w-4 text-blue-600 border border-gray-400 focus:ring-blue-500 mb-2"
                />
              ))}
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    File Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    File Size
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index} className="hover:bg-primary hover:text-secondary transition-colors duration-300 text-center">
                    <td className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      {file.type}
                    </td>
                    <td className="py-3 px-4 text-left text-sm text-gray-600">
                      {file.name}
                    </td>
                    <td className="py-3 px-4 text-left text-sm text-gray-600">
                      {file.size}
                    </td>
                    <td className="py-3 px-4 text-left text-sm text-gray-600">
                      {file.date}
                    </td>
                    <td className="py-3 px-4 text-left text-sm text-gray-600">
                      Action {index + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LegalPage;
