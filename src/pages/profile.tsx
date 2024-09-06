import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/img/profilepic.jpg";
import profileBgImage from "../assets/img/profilebg.jpg";
import { useAuthStore } from "../state/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEdit,
  faEnvelope,
  faMobileScreenButton,
  faCog,
  faUserEdit, // Icon for Edit Profile
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../utils/types";
import axiosInstance from "../lib/axiosInstance";

const ProfileCard: React.FC = () => {
  const { isAuthenticated, userId } = useAuthStore();
  const navigate = useNavigate(); // Initialize useNavigate
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(`/account`);
          // console.log("API Response:", response.data);

          setUserData(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, userId]);

  const handleChangePassword = () => {
    navigate('/change-password'); // Navigate to the change password page
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Navigate to the edit profile page
  };

  const handleSettings = () => {
    navigate('/settings'); // Example: Navigate to settings page
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative bg-cover bg-center h-1/2" style={{ backgroundImage: `url(${profileBgImage})` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pt-4">
          <img
            className="w-32 h-32 md:w-52 md:h-52 object-cover rounded-full border-4 border-white shadow-2xl mb-4"
            src={profileImage}
            alt="Profile"
          />
        </div>
      </div>

      <div className="flex-1 bg-light-grey p-4 md:p-8">
        <div className="text-left mb-4">
          <div className="flex justify-center mb-4">
            <p className="md:text-5xl font-medium text-primary">
              {userData?.name || "John Doe"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2 border-t border-secondary pt-2 mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <p className="md:ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                  <span className="mr-2 text-gray-500">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  {userData?.email || "jdoe@email.com"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                  <span className="mr-2 text-gray-500">
                    <FontAwesomeIcon icon={faMobileScreenButton} />
                  </span>
                  {userData?.phone || "123-456-7890"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                  <span className="mr-2 text-gray-500">
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  {userData?.companyName || "ABC Company"}
                </p>
              </div>
              <div className="flex gap-4 ml-auto">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
                >
                  <FontAwesomeIcon icon={faUserEdit} className="mr-2 text-gray-500 hover:text-white" />
                  Edit Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2 text-gray-500 hover:text-white" />
                  Change Password
                </button>
                <button
                  onClick={handleSettings}
                  className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2 text-gray-500 hover:text-white" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
