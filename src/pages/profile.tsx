import React, { useEffect, useRef, useState } from "react";
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
  faUserEdit,
  
  faCameraRetro, // Icon for Edit Profile
} from "@fortawesome/free-solid-svg-icons";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchProfilePicture,
  getUser,
  uploadProfilePicture,
} from "../lib/apiCalls";
import { User } from "../utils/types";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import queryClient from "../lib/queryClient";

const ProfileCard: React.FC = () => {
  const { isAuthenticated, userId } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input
  const [, setIsHovering] = useState(false); // State to manage hover effect
  const navigate = useNavigate(); // Initialize useNavigate
  // const [userData, setUserData] = useState<User | null>(null);

  // useEffect(() => {
  //   if (isAuthenticated && userId) {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axiosInstance.get(`/account`);
  //         // console.log("API Response:", response.data);

  //         setUserData(response.data.data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchUserData();
  //   }
  // }, [isAuthenticated, userId]);

  const { data, isLoading, isError, error } = useQuery<User, AxiosError>({
    queryKey: ["authUser", userId],
    queryFn: getUser,
    enabled: isAuthenticated ?? false,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const {
    data: profilePicture,
    isLoading: profilePictureLoading,
    isError: isProfilePictureError,
    error: profilePictureError,
  } = useQuery<string | null, AxiosError>({
    queryKey: ["profilePicture", userId],
    queryFn: () => fetchProfilePicture(userId!, data?.profilePicVersion ?? 0),
    enabled: !!data?._id,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });
  const { mutate: uploadProfilePic, isPending: isUploading } = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser", userId] }); // Invalidate the user query
      queryClient.invalidateQueries({ queryKey: ["profilePicture", userId] }); // Invalidate the profile picture query
      //  Refresh the page

      window.location.reload();

      notifications.show({
        title: "Success",
        message: "Profile picture updated successfully!",
        color: "green",
      });
      // Optionally refetch the profile picture after upload
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update profile picture.",
        color: "red",
      });
    },
  });
  // useEffect(() => {
  //   if (isError) {
  //     notifications.show({
  //       title: "Error",
  //       message: `${
  //         (error.response?.data as { message: string }).message ||
  //         "User with this email does not exist"
  //       }`,
  //       color: "red",
  //     });
  //   }
  // }, [isError, error]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Call the mutation to upload the profile picture
      uploadProfilePic(file);
    }
  };
  const handleChangePassword = () => {
    navigate("/change-password"); // Navigate to the change password page
  };

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Navigate to the edit profile page
  };

  const handleSettings = () => {
    navigate("/settings"); // Example: Navigate to settings page
  };
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (isProfilePictureError) {
      notifications.show({
        title: "Error",
        message: `${
          (profilePictureError.response?.data as { message: string }).message ||
          "Error fetching profile picture"
        }`,
        color: "red",
      });
    }
  }, [
    profilePicture,
    profilePictureLoading,
    isProfilePictureError,
    profilePictureError,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>Error: {(error.response?.data as { message: string }).message}</div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative">
      {/* Background Image */}
      <div
        className="bg-cover bg-center h-1/3 relative"
        style={{ backgroundImage: `url(${profileBgImage})` }}
      ></div>

      {/* Profile Picture */}
      {/* Profile Picture */}
<div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/3">
  <div
    className="relative w-32 h-32 md:w-40 md:h-40"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    {/* Profile Image */}
    <img
      className={`w-full h-full object-cover rounded-full border-4 border-white shadow-2xl ${
        isUploading || profilePictureLoading ? "opacity-50" : ""
      }`} // Reduce opacity during upload
      src={
        profilePicture && !profilePictureLoading && !profilePictureError
          ? profilePicture
          : profileImage
      }
      alt="Profile"
    />

    {/* Camera Icon - Lower Right */}
    <div
  className="absolute bottom-2 right-2 bg-gray-400 rounded-full p-2 cursor-pointer flex items-center justify-center w-8 h-8"
  onClick={handleEditClick}
>
  <FontAwesomeIcon icon={faCameraRetro} className="text-white text-md" />
</div>


    {/* Show loading spinner during upload */}
    {isUploading ||
      (profilePictureLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500 border-t-transparent"></div>
        </div>
      ))}
    {/* File input (hidden) */}
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      accept="image/*"
      className="hidden"
    />
  </div>
</div>


      {/* User Details */}
      <div className="flex-1  p-4 md:p-8 mt-16">
        <div className="text-center mb-4">
          <p className="md:text-5xl font-medium text-primary">
            {data?.name || "John Doe"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2 border-t border-secondary pt-2 mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center">
              <p className="md:ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                <span className="mr-2 text-gray-500">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                {data?.email || "jdoe@email.com"}
              </p>
            </div>
            <div className="flex items-center">
              <p className="ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                <span className="mr-2 text-gray-500">
                  <FontAwesomeIcon icon={faMobileScreenButton} />
                </span>
                {data?.phone || "123-456-7890"}
              </p>
            </div>
            <div className="flex items-center">
              <p className="ml-4 font-medium text-gray-500 py-2 px-4 rounded">
                <span className="mr-2 text-gray-500">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                {data?.companyName || "ABC Company"}
              </p>
            </div>
            <div className="flex gap-4 ml-auto">
              <button
                onClick={handleEditProfile}
                className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faUserEdit}
                  className="mr-2 text-gray-500 hover:text-white"
                />
                Edit Profile
              </button>
              <button
                onClick={handleChangePassword}
                className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="mr-2 text-gray-500 hover:text-white"
                />
                Change Password
              </button>
              <button
                onClick={handleSettings}
                className="flex items-center px-4 py-2 font-medium bg-grey text-gray-500 rounded shadow-lg hover:bg-secondary hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faCog}
                  className=" text-gray-500 hover:text-white"
                />
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;