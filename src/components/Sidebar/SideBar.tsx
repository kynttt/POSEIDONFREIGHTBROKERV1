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
import { useSidebarStore } from "../../hooks/useSidebarStore";
import { motion } from "framer-motion";

export default function Sidebar({
  close,
}: {
  closeVisible?: boolean;
  close?: () => void;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, role, name } = useAuthStore();
  const [isTourStarted, setIsTourStarted] = useState(false);
  const { enable, isExtend, setIsExtend, setEnable } = useSidebarStore();

  const isMobile = useMatches({ xs: true, md: false });

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
    setEnable(!isMobile);
  }, [setEnable, isMobile]);

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
  const getTabId = (label: string) => {
    switch (label) {
      case "Request Quote":
        return "request-quote-tab";
      case "Dashboard":
        return "dashboard-tab";
      case "Payables":
        return "payables-tab";
      case "Trucks":
        return "trucks-tab";
      case "Your Routes":
        return "routes-tab";
      default:
        return undefined;
    }
  };
  return (
    <Stack
      onMouseEnter={() => {
        setIsExtend(true);
      }}
      onMouseLeave={() => setIsExtend(false)}
      justify="space-between"
      className="h-screen px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 w-full"
    >
      <Stack className="w-full ">
        <Stack gap={"md"}>
          <Flex justify={isExtend ? "space-between" : "center"}>
            <a href="/">
              <h2 className="text-2xl text-secondary">
                {/* Show 'F' when not expanded, otherwise show 'Freight Broker' */}
                {isExtend ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Freight Broker
                  </motion.span>
                ) : (
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full p-5">
                    F
                  </span>
                )}
              </h2>
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
        </Stack>

        <Stack mt={"sm"} className="w-full">
          <nav className="w-full">
            {getNavItems().map((item) => (
              <div
                key={item.label}
                id={getTabId(item.label)}
                className="cursor-pointer flex items-center rounded-md text-gray-500 hover:bg-gray-100 transition duration-300 px-4 py-4 "
                onClick={() => handleNavigation(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} />
                {enable ? (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isExtend ? 1 : 0,
                      x: isExtend ? 0 : -20,
                    }}
                    transition={{ duration: 0.08 }}
                    className={`ml-6 font-medium ${
                      isExtend ? "block" : "hidden"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                ) : (
                  <span className="ml-6">{item.label}</span> // Always show if `enable` is false
                )}
              </div>
            ))}
            {/* {getNavItems().map((item) => (
              <div
                key={item.label}
                id={getTabId(item.label)}
                className="w-full cursor-pointer flex items-center px-4 py-4 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                onClick={() => handleNavigation(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="font-medium ml-6 text-gray-500">
                  {item.label}
                </span>
              </div>
            ))} */}
          </nav>
        </Stack>
      </Stack>

      <ProfileItem handleNavigation={handleNavigation} name={name} />
    </Stack>
  );
}

function ProfileItem({
  handleNavigation,
  name,
}: {
  handleNavigation: (path: string) => void;
  name: string | null;
}) {
  const { logoutUpdate, role } = useAuthStore();
  const { enable, isExtend } = useSidebarStore();

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
        <div className="flex items-center py-2 px-2  shadow rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer w-full">
          <img
            className={`object-cover rounded-full ${
              isExtend ? "w-10 h-10" : "w-8 h-8"
            }`}
            src={profilePic}
            alt="avatar"
          />

          {enable ? (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isExtend ? 1 : 0,
                x: isExtend ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
              className={`mx-2 font-medium text-gray-800 dark:text-gray-200 ${
                isExtend ? "block" : "hidden"
              }`}
            >
              {name || "John Doe"}
            </motion.span>
          ) : (
            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
              {name || "John Doe"}
            </span>
          )}
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
