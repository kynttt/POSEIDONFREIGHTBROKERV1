import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";

import NotificationModal from "./NotificationModal";

interface NavbarProps {
  isAuthenticated: boolean; // Prop to determine if user is authenticated
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated, role } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext to clear authentication state
    navigate("/login"); // Redirect to login page after logout
  };

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      window.location.hash = path;
    } else {
      navigate(path);
    }
    setIsOpen(false); // Close the menu on navigation
  };
  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <nav
        className="xs:px-[2rem] md:px-[8rem] lg:px-[12rem] py-8 w-full  "
        style={{
          background: "linear-gradient(-180deg, #7783D2 5%, #adb4e4 79%)",
        }}
      >
        <div className="flex justify-between items-center w-full ">
          <button
            className="text-white text-2xl lg:text-3xl font-medium hover:text-[#252F70]"
            onClick={() => handleNavigation("/")}
          >
            Freight Logistics
          </button>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button
              className="text-white focus:outline-none focus:text-white bg-[#252F70] rounded p-2"
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
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </button>
                <button
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("#about")}
                >
                  About Us
                </button>
                <button
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("#services")}
                >
                  Services
                </button>
                <button
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("#contacts")}
                >
                  Contacts
                </button>
                <button
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("#careers")}
                >
                  Careers
                </button>
                <button
                  className="text-white no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/signup")}
                >
                  Create Account
                </button>
              </>
            ) : role === "admin" ? (
              <>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/load-board")}
                >
                  Loadboard
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/admin-dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/trailer-options")}
                >
                  Trucks
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={handleNotificationClick}
                >
                  Notifications
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/profile")}
                >
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/shipper-dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={handleNotificationClick}
                >
                  Notification
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/user-payables")}
                >
                  Accounts Payable
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/trailer-options")}
                >
                  Trucks
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/distance-calculator")}
                >
                  Request A Quote
                </button>
                <button
                  className="text-primary no-underline font-medium transition duration-300 hover:text-[#252F70]"
                  onClick={() => handleNavigation("/profile")}
                >
                  Profile
                </button>
              </>
            )}
            {isAuthenticated && (
              <Button
                label="LOGOUT"
                size="medium"
                bgColor="#252F70"
                hoverBgColor="white"
                onClick={handleLogout}
                type=""
              />
            )}
            {!isAuthenticated && (
              <div className="flex justify-center items-center h-full">
                <Button
                  label="Get Started"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={() => navigate("/login")}
                  type=""
                />
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
            <div className="lg:hidden absolute top-16 right-0 left-0 bg-[#7783D2] z-20 py-4 px-2 space-y-4 shadow-md mt-4 pl-4">
              {!isAuthenticated ? (
                <>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/")}
                  >
                    Home
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("#about")}
                  >
                    About
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("#services")}
                  >
                    Services
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("#contacts")}
                  >
                    Contacts
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("#careers")}
                  >
                    Careers
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Create Account
                  </button>
                </>
              ) : role === "admin" ? (
                <>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/load-board")}
                  >
                    Loadboard
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/admin-dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/trailer-options")}
                  >
                    Trucks
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/notification")}
                  >
                    Notifications
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/profile")}
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/shipper-dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/notification")}
                  >
                    Notifications
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/user-payables")}
                  >
                    Accounts Payable
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/trailer-options")}
                  >
                    Trucks
                  </button>
                  <button
                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/distance-calculator")}
                  >
                    Request A Quote
                  </button>
                  <button
                    className="block text-primary hover:text-[#252F70] text-center transition duration-300"
                    onClick={() => handleNavigation("/profile")}
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
                    onClick={handleLogout}
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
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
