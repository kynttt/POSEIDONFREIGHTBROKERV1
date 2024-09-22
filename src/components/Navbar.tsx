import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";
import logo from "../assets/img/logo.png";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../lib/apiCalls";
import { LogoutResponse } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUpdate, isAuthenticated, role } = useAuthStore();
  const handleGetStartedClick = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal open/close
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShipperClick = () => {
    navigate("/login"); // Navigate to login if "As Shipper" is clicked
  };


  const mutation = useMutation<LogoutResponse, AxiosError, undefined>({
    mutationFn: logoutUser,
    onSuccess: () => {
      notifications.show({
        title: "Logout successful",
        message: "You have been logged out",
        color: "green",
      });
      logoutUpdate();
    },
    onMutate: () => {
      notifications.show({
        title: "Logging out",
        message: "Please wait...",
        color: "blue",
      });
    },
    onError: (error) => {
      if (error.response!.status === 400) {
        notifications.show({
          title: "Logout successful",
          message: "You have been logged out",
          color: "green",
        });
        logoutUpdate();
      } else {
        notifications.show({
          title: "Logout failed",
          message: (
            error.response!.data as {
              message: string;
            }
          ).message,
          color: "red",
        });
      }
    },
  });

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      window.location.hash = path;
    } else {
      navigate(path);
    }
    setIsOpen(false); // Close the menu on navigation
  };

  return (
    <>
      <nav
        className="container mx-auto   py-6"
        style={{
          background: "#fefefe",
        }}
      >
        <div className="flex justify-between items-center w-full ">
          <div className="flex">
            {/* Logo and Company Name */}
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 mr-4" // Adjust height and margin as necessary
            />
            <button
              className="text-rblue text-2xl lg:text-3xl font-bold hover:text-secondary"
              onClick={() => handleNavigation("/")}
            >
              Poseidon Freight
            </button>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button
              className="text-rblue focus:outline-none focus:text-rblue bg-[#252F70] rounded p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation links for medium screens and larger */}
          <div className="hidden lg:flex space-x-16 items-center">
            {!isAuthenticated ? (
              <>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("#about")}
                >
                  About Us
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("#services")}
                >
                  Services
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("#contacts")}
                >
                  Contacts
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/signup")}
                >
                  Create Account
                </button>
              </>
            ) : role === "admin" ? (
              <>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/a/load-board")}
                >
                  Loadboard
                </button>
                <button  
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/a/admin-dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/a/trailer-options")}
                >
                  Trucks
                </button>

                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/a/profile")}
                >
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/s/shipper-dashboard")}
                >
                  Dashboard
                </button>

                {/* <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary"
                  onClick={() => handleNavigation("/s/user-payables")}
                >
                  Accounts Payable
                </button> */}
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/s/trailer-options")}
                >
                  Trucks
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/requests")}
                >
                  Request A Quote
                </button>
                <button
                  className="text-rblue no-underline font-medium transition duration-300 hover:text-secondary focus:text-secondary  focus:font-bold"
                  onClick={() => handleNavigation("/s/profile")}
                >
                  Profile
                </button>
              </>
            )}
            {isAuthenticated && (
              <button
                className="text-rblue flex justify-center rounded items-center h-full border-2 px-12 py-3 border-rblue hover:bg-rblue hover:text-white"
                onClick={() => mutation.mutate(undefined)}
              >
                Logout
              </button>
            )}
            {!isAuthenticated && (
              <div className="relative">
              <button
                className="text-rblue flex justify-center rounded-lg items-center h-full border-2 px-12 py-3 border-rblue hover:bg-rblue hover:text-white"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
        
              {/* Dropdown Modal */}
              {isModalOpen && (
                <div className="absolute mt-2 w-full bg-white border border-rblue shadow-xl rounded-lg z-30">
                  <button
                    className="w-full text-left px-4 text-rblue py-2 hover:bg-rblue hover:text-white hover:rounded-t-lg"
                    onClick={handleShipperClick}
                  >
                    As Shipper
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    As Carrier <p className="text-xs font-light">(Coming Soon)</p>
                  </button>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Responsive Navigation Menu */}
          <Transition
            show={isOpen}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-300 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="lg:hidden absolute top-16 right-0 left-0 bg-[#7783D2] z-50 py-4 px-2 space-y-4 shadow-md mt-4 pl-4">
              {!isAuthenticated ? (
                <>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("/")}
                  >
                    Home
                  </button>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("#about")}
                  >
                    About
                  </button>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("#services")}
                  >
                    Services
                  </button>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("#contacts")}
                  >
                    Contacts
                  </button>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("#careers")}
                  >
                    Careers
                  </button>
                  <button
                    className="block text-rblue hover:text-[#003C9D] text-center transition duration-300"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Create Account
                  </button>
                </>
              ) : role === "admin" ? (
                <>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/a/load-board")}
                  >
                    Loadboard
                  </button>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/a/admin-dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/a/trailer-options")}
                  >
                    Trucks
                  </button>

                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/profile")}
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/s/shipper-dashboard")}
                  >
                    Dashboard
                  </button>

                  {/* <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/s/user-payables")}
                  >
                    Accounts Payable
                  </button> */}
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/s/trailer-options")}
                  >
                    Trucks
                  </button>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/requests")}
                  >
                    Request A Quote
                  </button>
                  <button
                    className="block text-rblue hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/s/profile")}
                  >
                    Profile
                  </button>
                </>
              )}
              {isAuthenticated && (
                <div className="flex justify-center items-center h-full">
                  <Button
                    label="LOGOUT"
                    size="small"
                    bgColor="#252F70"
                    hoverBgColor="white"
                    onClick={() => mutation.mutate(undefined)}
                    type=""
                  />
                </div>
              )}
              {!isAuthenticated && (
                <div className="flex justify-center items-center h-full">
                  <Button
                    label="LOGIN"
                    size="small"
                    bgColor="#252F70"
                    hoverBgColor="white"
                    onClick={() => navigate("/login")}
                    type=""
                  />
                </div>
              )}
            </div>
          </Transition>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
