import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../state/useAuthStore";
import {
  ActionIcon,
  Flex,
  FloatingPosition,
  Menu,
  Stack,
  useMatches,
} from "@mantine/core";
import { navItems } from "./navItem";
import {
  faClose,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { LogoutResponse } from "../../utils/types";
import { logoutUser } from "../../lib/apiCalls";
import { notifications } from "@mantine/notifications";

export default function Sidebar({
  closeVisible = false,
  close,
}: {
  closeVisible?: boolean;
  close?: () => void;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuthStore();

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

  return (
    <>
      {/* Sidebar */}
      <Stack
        justify="space-between"
        className={` h-screen px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700  w-full`}
      >
        <Stack>
          <Stack gap={"md"}>
            <Flex justify={"space-between"}>
              <a href="/">
                <h2 className="text-2xl text-secondary">Freight Broker</h2>
              </a>
              {closeVisible && (
                <ActionIcon
                  variant="subtle"
                  aria-label="Settings"
                  size="md"
                  color="gray"
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faClose} />
                </ActionIcon>
              )}
            </Flex>

            <div className="relative ">
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
            </div>
          </Stack>

          <Stack mt={"sm"}>
            <nav>
              {getNavItems().map((item) => (
                <div
                  key={item.label}
                  className="w-full flex items-center px-4 py-4  text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
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

        <ProfileItem handleNavigation={handleNavigation} />
      </Stack>
    </>
  );
}
function ProfileItem({
  handleNavigation,
}: {
  handleNavigation: (path: string) => void;
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
  const position: FloatingPosition | undefined = useMatches({
    xs: "top",
    lg: "right",
  });
  return (
    <Menu shadow="md" width={200} position={position} withArrow>
      <Menu.Target>
        <div className="flex items-center px-4 -mx-2 mt-5">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
            John Doe
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
        {/* <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Transfer my data
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
