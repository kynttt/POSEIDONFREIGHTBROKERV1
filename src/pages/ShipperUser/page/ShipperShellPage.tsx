import {
  ActionIcon,
  AppShell,
  Flex,
  Popover,
  rem,
  useMatches,
  Indicator, // Import Indicator component from Mantine
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import HelpIcon from "../../../assets/help";
import NotificationModal from "../../../components/NotificationModal";
import { useState, useEffect } from "react"; // Import useState and useEffect for state management and side effects
import { listNotifications } from "../../../lib/apiCalls"; // Ensure this path is correct
import { useAuthStore } from "../../../state/useAuthStore";

export default function ShipperShellPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 120 });

  // State to track if there are new notifications
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const { userId, isAuthenticated } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
  }));

  // Check for new notifications immediately on component mount
  useEffect(() => {
    if (isAuthenticated && userId) {
      const checkForNotifications = async () => {
        try {
          const notifications = await listNotifications(userId); // Pass userId here
          // Determine if there are any unread notifications
          const unreadNotificationsExist = notifications.some(
            (notification) => !notification.isRead
          );
          setHasNewNotification(unreadNotificationsExist);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      checkForNotifications();
    }
  }, [isAuthenticated, userId]);

  return (
    <section>
      <AppShell
        layout="alt"
        header={{ height: 60, collapsed: !pinned, offset: false }}
        navbar={{
          width: {
            base: 250,
          },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <ShellHeader
            opened={opened}
            open={open}
            close={close}
            hasNewNotification={hasNewNotification}
            setHasNewNotification={setHasNewNotification}
          />
        </AppShell.Header>
        <AppShell.Navbar>
          <Sidebar close={close} closeVisible />
        </AppShell.Navbar>
        <AppShell.Main pt={`calc(${rem(50)} + var(--mantine-spacing-md))`}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </section>
  );
}

function ShellHeader({
  opened,
  open,
  close,
  hasNewNotification,
  setHasNewNotification,
}: {
  opened?: boolean;
  open?: () => void;
  close?: () => void;
  hasNewNotification: boolean;
  setHasNewNotification: (value: boolean) => void;
}) {
  const visible = useMatches({
    xs: false,
    lg: true,
  });

  // Handler to clear the notification state when the bell icon is clicked
  const handleNotificationClick = () => {
    setHasNewNotification(false); // Set to false to hide the red dot
  };

  return (
    <Flex justify="flex-end" p={"lg"} gap={"md"}>
      <Popover position="bottom-start">
        <Popover.Target>
          <Indicator
            size={10}
            color="red"
            offset={5}
            position="top-end"
            disabled={!hasNewNotification}
          >
            <ActionIcon
              variant="subtle"
              aria-label="Notifications"
              size="md"
              onClick={handleNotificationClick} // Attach click handler
            >
              <FontAwesomeIcon icon={faBell} />
            </ActionIcon>
          </Indicator>
        </Popover.Target>
        <Popover.Dropdown>
          <NotificationModal />
        </Popover.Dropdown>
      </Popover>
      {!visible && (
        <ActionIcon
          variant="subtle"
          aria-label="Menu"
          size="md"
          onClick={() => {
            opened ? close!() : open!();
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </ActionIcon>
      )}
      <ActionIcon variant="subtle" aria-label="Settings" size="sm">
        <HelpIcon />
      </ActionIcon>
    </Flex>
  );
}
