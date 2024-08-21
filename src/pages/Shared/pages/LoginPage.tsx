// LoginPage.tsx

import React, { useState } from "react";
import signupImage from "../../../assets/img/DeliveredPackage.gif";
import appleIcon from "../../../assets/img/apple.png";
import googleIcon from "../../../assets/img/googleicon.png";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../state/useAuthStore";
import { loginUser } from "../../../lib/apiCalls";

import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../../../utils/types";
import axios from "axios";
import { notifications } from "@mantine/notifications";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/signup");
  };
  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await loginUser(data.email, data.password);
      return response;
    },
    onSuccess: (data: LoginResponse) => {
      login({
        user: data.data,
      });
      if (data.data.role === "admin") {
        // navigate("/admin-dashboard");
        navigate("/a");
      } else {
        // navigate("/shipper-dashboard");
        navigate("/s");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          notifications.show({
            position: "top-right",
            title: "Something went wrong",
            message: "Invalid email or password",
            color: "red",
          });
        } else if (error.response.status === 409) {
          const userRole = error.response.data.data.role;

          notifications.show({
            position: "top-right",
            title: "User already logged in",
            message: "It means you are already logged in this device",
            color: "orange",
          });

          if (userRole === "admin") {
            navigate("/a");
          } else {
            navigate("/s");
          }
        } else if (error.response.status === 403) {
          notifications.show({
            position: "top-right",
            title: "Forbidden",
            message: error.response.data.message,
            color: "red",
          });
        } else {
          notifications.show({
            position: "top-right",
            title: "Something went wrong",
            message: "Please try again later",
            color: "red",
          });
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white flex h-screen md:px-36 justify-center items-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-full lg:max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-secondary flex flex-col justify-center items-center p-8">
          <h1 className="text-white text-2xl md:text-4xl mb-4 text-center">
            Freight Broker
          </h1>
          <img
            src={signupImage}
            alt="Freight Booker"
            className="w-3/4 md:w-full mx-auto"
          />
          <p className="text-white text-xl md:text-2xl mt-4 text-center">
            Transport Logistics
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary text-center">
              Sign In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-primary text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label
                    className="block text-primary text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="inline-block align-baseline font-medium text-sm text-blue-400 hover:text-blue-800 md:pl-10"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white h-10 font-thin"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <Button
                  label={mutation.isPending ? "Logging In..." : "Login"}
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  className="extra-class-for-medium-button"
                  type="submit"
                />
              </div>
            </form>
            <div className="mt-6 flex items-center">
              <div className="border-t-4 flex-grow border-secondary"></div>
              <span className="px-3 text-gray-600 font-normal">
                or continue
              </span>
              <div className="border-t-4 flex-grow border-secondary"></div>
            </div>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                Login with Google
              </button>
              <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
                Login with Apple
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                Don’t have an account?{" "}
                <a className="text-blue-400" onClick={handleSignUpClick}>
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
