import React from "react";
import "../index.css"; // Ensure this file includes the @import for the Lexend font
// import Footer from '../components/Footer';
import TrailerTypes from "../components/TrailerTypes";

// TODO this page is now be part of the Shared since the ShipperUser and AdminUser will have access to it
// As soon as possible, we have to rename this page to TrailerOptionSharedPage
const TrailerOptionsPage: React.FC = () => {
  return (
    <div className="flex bg-gray-100 h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen">
          <TrailerTypes />
        </div>
      </div>
    </div>
  );
};

export default TrailerOptionsPage;
