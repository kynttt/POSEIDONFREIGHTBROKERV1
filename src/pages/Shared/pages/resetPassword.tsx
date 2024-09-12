import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import axiosInstance from "../../../lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface ResetPasswordData {
  newPassword: string;
  token: string;
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState<string>("");

  const mutation = useMutation<void, AxiosError, ResetPasswordData>({
    mutationFn: async (data: ResetPasswordData) => {
      await axiosInstance.post("/account/reset-password?token=" + data.token, {
        newPassword: data.newPassword,
      });
    },
    onSuccess: () => {
      notifications.show({
        title: "Password Reset Successful",
        message: "You can now log in with your new password.",
        color: "green",
      });
      navigate("/login");
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: `${
          (error.response?.data as { message: string }).message ||
          "Something went wrong"
        }`,
        color: "red",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ newPassword, token: token as string });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="mb-1 flex items-center text-2xl font-semibold text-start text-primary">
          <FontAwesomeIcon icon={faLock} className="bg-grey w-4 h-4 rounded-full p-2 mr-2 text-primary" />
          Reset Password
        </h2>
        <p className="text-sm font-normal text-gray-500 mb-8">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full px-4 py-2 text-sm bg-light-grey rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full border-t px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary ${
              mutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          <a href="/login" className="text-blue-600 hover:underline text-sm font-medium">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
