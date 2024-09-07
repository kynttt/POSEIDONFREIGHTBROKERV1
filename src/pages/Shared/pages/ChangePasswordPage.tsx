import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, logoutUser } from "../../../lib/apiCalls"; // Adjust the import path as needed
import { useAuthStore } from "../../../state/useAuthStore"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faLock } from "@fortawesome/free-solid-svg-icons";

const ChangePasswordPage: React.FC = () => {
  const { userId, userRole, logout } = useAuthStore((state) => ({
    userId: state.userId,
    userRole: state.role, // Assuming you have userRole in your Zustand store
    logout: state.logoutUpdate, // Assuming you have a logout function in your Zustand store
  })); // Get userId, userRole, and logout function from Zustand store

  const navigate = useNavigate(); // Initialize useNavigate

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!userId) {
      // Redirect to login if user is not authenticated
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) {
      setError("User is not authenticated.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await updatePassword(userId, currentPassword, newPassword); // Call API with userId, currentPassword, and newPassword
      setSuccess("Password successfully changed.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPrompt(true); // Show the prompt to the user
    } catch (error) {
      setError("Failed to update password. Please try again.");
    }
  };

  const handleStayLoggedIn = () => {
    setShowPrompt(false); // Hide the prompt
    if (userRole === "admin") {
      navigate("/a/admin-dashboard"); // Redirect to admin dashboard
    } else {
      navigate("/s/shipper-dashboard"); // Redirect to shipper dashboard
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API to log out
      logout(); // Clear Zustand state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle the error here, e.g., show a notification
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-grey m-2">
      <div className="w-full  max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-500" />
          Change Password
        </h2>
        {error && (
          <div className="mb-4 text-sm text-red-500 flex items-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-500 flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm bg-light-grey rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm bg-light-grey rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm bg-light-grey rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Update Password
          </button>
        </form>

        {showPrompt && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-md">
            <p className="text-lg font-medium text-gray-700 mb-4">Would you like to stay logged in or log out?</p>
            <div className="flex">
              <button
                onClick={handleStayLoggedIn}
                className="mr-4 w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
              >
                Stay Logged In
              </button>
              <button
                onClick={handleLogout}
                className="px-4 w-full py-2 font-medium border-2 border-secondary text-secondary rounded-md hover:bg-secondary hover:text-white focus:outline-none focus:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
