import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import axiosInstance from "../../../lib/axiosInstance";

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
          "Something went wrong"
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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we will send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
              mutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {mutation.isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
