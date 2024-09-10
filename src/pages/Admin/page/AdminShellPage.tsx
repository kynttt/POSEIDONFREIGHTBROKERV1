import {
  ActionIcon,
  AppShell,
  Flex,
  Popover,
  rem,
  useMatches,
  Indicator, // Import Indicator component
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import NotificationModal from "../../../components/NotificationModal";
import { useState, useEffect } from "react"; // Import useState and useEffect for state management and side effects
import { listNotifications } from "../../../lib/apiCalls"; // Ensure this path is correct
import { useAuthStore } from "../../../state/useAuthStore";

export default function AdminShellPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 120 });

  // State to track if there are new notifications
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

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
          // Count unread notifications
          const unreadNotifications = notifications.filter(
            (notification) => !notification.isRead
          );
          setUnreadNotificationCount(unreadNotifications.length);
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
            unreadNotificationCount={unreadNotificationCount}
            setUnreadNotificationCount={setUnreadNotificationCount}
          />
        </AppShell.Header>
        <AppShell.Navbar>
          <Sidebar close={close} />
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
  unreadNotificationCount,
  setUnreadNotificationCount,
}: {
  opened?: boolean;
  open?: () => void;
  close?: () => void;
  unreadNotificationCount: number;
  setUnreadNotificationCount: (value: number) => void;
}) {
  const visible = useMatches({
    xs: false,
    lg: true,
  });

  // Handler to clear the notification count when the bell icon is clicked
  const handleNotificationClick = () => {
    setUnreadNotificationCount(0); // Clear unread notification count
  };

  return (
    <Flex justify="flex-end" p={"lg"} gap={"md"}>
      <Popover position="bottom-start">
        <Popover.Target>
          <Indicator
            label={unreadNotificationCount > 0 ? unreadNotificationCount : null}
            size={15}
            color="red"
            offset={5}
            position="top-end"
            disabled={unreadNotificationCount === 0}
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
    </Flex>
  );
}
