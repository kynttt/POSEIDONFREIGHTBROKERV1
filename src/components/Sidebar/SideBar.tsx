import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../state/useAuthStore";
import {
  ActionIcon,
  // Button,
  Flex,
  FloatingPosition,
  Menu,
  Stack,
  useMatches,
} from "@mantine/core";
import { navItems } from "./navItem";
import { faClose, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { LogoutResponse } from "../../utils/types";
import { logoutUser } from "../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import { driver } from "driver.js";
import "driver.js/dist/driver.css"; // Import the driver.js CSS
import profilePic from "../../assets/img/profilepic.jpg";
import "driver.js/dist/driver.css";

export default function Sidebar({
  close,
}: {
  closeVisible?: boolean;
  close?: () => void;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, role, name } = useAuthStore();
  const [isTourStarted, setIsTourStarted] = useState(false);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      close?.();
    },
    [navigate, close]
  );

  const getNavItems = () => {
    if (!isAuthenticated) {
      return navItems.guest;
    }
    return role === "admin" ? navItems.admin : navItems.user;
  };

  useEffect(() => {
    if (isAuthenticated && role === "user" && !isTourStarted) {
      const hasTourBeenShown = localStorage.getItem("tourShown");

      if (!hasTourBeenShown) {
        setIsTourStarted(true);

        const driverObj = driver({
          showProgress: true,
          steps: [
            {
              element: "#request-quote-tab",
              popover: {
                title: "Request a Quote",
                description:
                  "Click here to request a new quote for your shipping needs.",
                side: "right",
                align: "start",
              },
            },
            {
              element: "#dashboard-tab",
              popover: {
                title: "Dashboard",
                description:
                  "Navigate to your dashboard to view your activities.",
                side: "right",
                align: "start",
              },
            },
            {
              element: "#payables-tab",
              popover: {
                title: "Payables",
                description: "Check your payables and payment status here.",
                side: "right",
                align: "start",
              },
            },
            {
              element: "#trucks-tab",
              popover: {
                title: "Trucks",
                description: "View details of trucks in the fleet.",
                side: "right",
                align: "start",
              },
            },
            {
              element: "#routes-tab",
              popover: {
                title: "Your Routes",
                description:
                  "View and reuse your previous routes as templates for new shipments.",
                side: "right",
                align: "start",
              },
            },
            // Add more steps if needed
          ],
        });

        // Start the tour
        driverObj.drive();
        // Set flag in local storage after tour is started (if there's no callback for tour completion)
        localStorage.setItem("tourShown", "true");
        setIsTourStarted(false); // Reset the state
      }
    }
  }, [isTourStarted, role, isAuthenticated]);

  return (
    <Stack
      justify="space-between"
      className="h-screen px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 w-full"
    >
      <Stack>
        <Stack gap={"md"}>
          <Flex justify={"space-between"}>
            <a href="/">
              <h2 className="text-2xl text-secondary ">Freight Broker</h2>
            </a>
            <div className=" md:hidden xs:inline-flex">
              <ActionIcon
                variant="subtle"
                aria-label="Close Sidebar"
                size="md"
                color="gray"
                onClick={close}
                className="hidden"
              >
                <FontAwesomeIcon icon={faClose} />
              </ActionIcon>
            </div>
          </Flex>

          {/* <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              placeholder="Search"
            />
          </div> */}
        </Stack>

        <Stack mt={"sm"}>
          <nav>
            {getNavItems().map((item) => (
              <div
                key={item.label}
                id={
                  item.label === "Request Quote"
                    ? "request-quote-tab"
                    : item.label === "Dashboard"
                    ? "dashboard-tab"
                    : item.label === "Payables"
                    ? "payables-tab"
                    : item.label === "Trucks"
                    ? "trucks-tab"
                    : item.label === "Your Routes"
                    ? "routes-tab"
                    : undefined
                }
                className="w-full cursor-pointer flex items-center px-4 py-4 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                onClick={() => handleNavigation(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="font-medium ml-6 text-gray-500">
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </Stack>
      </Stack>

      <ProfileItem handleNavigation={handleNavigation} name={name} />
    </Stack>
  );
}

function ProfileItem({
  handleNavigation,
  name, // Accept userName as a prop
}: {
  handleNavigation: (path: string) => void;
  name: string | null; // Ensure userName is passed as a prop
}) {
  const { logoutUpdate, role } = useAuthStore();
  const mutation = useMutation<LogoutResponse, Error, undefined>({
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
      notifications.show({
        title: "Logout failed",
        message: error.message,
        color: "red",
      });
    },
  });

  const position: FloatingPosition = useMatches({
    xs: "top",
    lg: "right",
  }) as FloatingPosition;

  return (
    <Menu shadow="md" width={200} position={position} withArrow>
      <Menu.Target>
        <div className="flex items-center py-2 px-4 mx-1 mt-5 shadow rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src={profilePic} // Use the imported image
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
            {name || "John Doe"} {/* Display the user's name */}
          </span>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          variant="light"
          leftSection={
            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
          }
          onClick={() => {
            role === "admin"
              ? handleNavigation("/a/profile")
              : handleNavigation("/s/profile");
          }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          variant="transparent"
          color="red"
          leftSection={
            <FontAwesomeIcon icon={faSignOut} className="text-red-500" />
          }
          onClick={() => {
            mutation.mutate(undefined);
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
