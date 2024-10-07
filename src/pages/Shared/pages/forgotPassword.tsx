import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import axiosInstance from "../../../lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation<void, AxiosError, ForgotPasswordData>({
    mutationFn: async (data: ForgotPasswordData) => {
      await axiosInstance.post("/account/forgot-password", data); // Assuming your backend API route
    },
    onSuccess: () => {
      notifications.show({
        title: "Email Sent",
        message: "Please check your inbox for the reset password link.",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: `${
          (error.response?.data as { message: string }).message ||
          "User with this email does not exist"
        }`,
        color: "red",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="mb-1 flex items-center text-2xl font-semibold text-start text-primary">
          <FontAwesomeIcon icon={faExclamation} className="bg-grey w-4 h-4 rounded-full p-2 mr-2 text-primary" />
          Forget Password
        </h2>
        <p className="text-sm font-normal text-gray-500 mb-8">
          Enter your email address and we will send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
                : "bg-primary hover:bg-secondary  focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {mutation.isPending ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;
