// components/Folder.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

interface FolderProps {
  name: string;
}

const Folder: React.FC<FolderProps> = ({ name }) => {
  return (
    <div className="bg-white text-sm flex-shrink-0 border-2 border-secondary rounded-lg p-4 text-center text-primary" style={{ minWidth: "150px", maxWidth: "150px", minHeight: "100px" }}>
      <FontAwesomeIcon icon={faFolderOpen} className="mt-1 text-3xl mb-2 text-gray-500 hover:text-secondary" />
      <p>{name}</p>
    </div>
  );
};

export default Folder;
