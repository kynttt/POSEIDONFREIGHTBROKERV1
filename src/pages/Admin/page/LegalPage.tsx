// LegalPage.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowUpFromBracket,
  faPlus,
  faEllipsisV,
  faList,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import Folder from "../../../components/LegalFolder";
import foldersData from "../../../components/legalFolders.json";
import filesData from "../../../components/legalFiles.json";

const LegalPage = () => {
  const [isListView, setIsListView] = useState(true); // State to track view mode
  const [showActionsIndex, setShowActionsIndex] = useState<number | null>(null); // State to track which ellipsis was clicked

  const folders: string[] = foldersData;
  const files = filesData;

  const handleEllipsisClick = (index: number) => {
    setShowActionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleActionClick = (action: string, index: number) => {
    console.log(`Action '${action}' clicked for index ${index}`);
    setShowActionsIndex(null);
    // Implement action logic here
  };

  const handleListViewClick = () => {
    setShowActionsIndex(null);
    setIsListView(true);
  };

  const handleGridViewClick = () => {
    setShowActionsIndex(null);
    setIsListView(false);
  };

  return (
    <div className="flex h-full bg-white">
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 mb-4 px-4 sm:px-6 md:px-12">
          <div className="mb-4 md:mb-8 md:ml-15">
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

        <div className="mb-12 px-4 sm:px-6 md:px-12">
          <h3 className="text-xl font-medium text-secondary mb-8">
            All Folders
          </h3>
          {/* Conditionally render scrollable div on smaller screens */}
          <div className="flex md:flex-wrap gap-4 md:justify-center overflow-x-auto md:overflow-visible">
            {folders.map((folder, index) => (
              <Folder key={index} name={folder} />
            ))}
          </div>
        </div>

        <div className="mb-8 px-4 sm:px-6 md:px-12">
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
                onClick={handleListViewClick}
              />
              <FontAwesomeIcon
                icon={faTh}
                className={`text-gray-500 hover:text-blue-700 cursor-pointer text-xl ${
                  !isListView ? "text-blue-700" : ""
                }`}
                onClick={handleGridViewClick}
              />
            </div>
          </div>

          {isListView ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-base text-primary font-semibold">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
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
                      className=" hover:text-secondary transition-colors duration-300 text-center"
                    >
                      <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
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
                        {showActionsIndex === index && (
                          <div className="absolute -top-14 right-20 mt-2 -top-12 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded z-20 text-base font-normal">
                            <p
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() => handleActionClick("view", index)}
                            >
                              View
                            </p>
                            <p
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() =>
                                handleActionClick("download", index)
                              }
                            >
                              Download
                            </p>
                            <p
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() => handleActionClick("print", index)}
                            >
                              Print
                            </p>
                            <p
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() => handleActionClick("delete", index)}
                            >
                              Delete
                            </p>
                            <p
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() => handleActionClick("rename", index)}
                            >
                              Rename
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 bg-white border rounded-lg p-4 w-40 hover:text-secondary transition-colors duration-300"
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
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-secondary cursor-pointer z-10"
                    onClick={() => handleEllipsisClick(index)}
                  />
                  {showActionsIndex === index && (
                    <div className="absolute top-5 right-0 mt-2 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded z-20 text-base font-normal">
                      <p
                        className="text-gray-500 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleActionClick("view", index)}
                      >
                        View
                      </p>
                      <p
                        className="text-gray-500 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleActionClick("download", index)}
                      >
                        Download
                      </p>
                      <p
                        className="text-gray-500 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleActionClick("print", index)}
                      >
                        Print
                      </p>
                      <p
                        className="text-gray-500 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleActionClick("delete", index)}
                      >
                        Delete
                      </p>
                      <p
                        className="text-gray-500 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleActionClick("rename", index)}
                      >
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
    </div>
  );
};

export default LegalPage;
