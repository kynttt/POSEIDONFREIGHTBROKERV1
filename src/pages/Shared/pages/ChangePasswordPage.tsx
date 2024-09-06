import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../../lib/apiCalls"; // Adjust the import path as needed
import { useAuthStore } from "../../../state/useAuthStore"; // Adjust the import path as needed

const ChangePasswordPage: React.FC = () => {
  const { userId, logout } = useAuthStore((state) => ({
    userId: state.userId,
    logout: state.logoutUpdate, // Assuming you have a logout function in your Zustand store
  })); // Get userId and logout function from Zustand store

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
      navigate('/login');
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
    navigate('/s/shipper-dashboard'); // Redirect to dashboard
  };

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Change Password</h2>
        {error && (
          <div className="mb-4 text-sm text-red-500">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-500">
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
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update Password
          </button>
        </form>

        {showPrompt && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-md">
            <p className="text-lg font-medium text-gray-700 mb-4">Would you like to stay logged in or log out?</p>
            <button
              onClick={handleStayLoggedIn}
              className="mr-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Stay Logged In
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
