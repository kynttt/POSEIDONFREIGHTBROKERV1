import {
  ActionIcon,
  AppShell,
  Drawer,
  Flex,
  Popover,
  useMatches,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import notifications from "../../../components/notifications.json";
import { useDisclosure } from "@mantine/hooks";
export default function AdminShellPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const headerVisible = useMatches({
    xs: false,
    md: true,
  });
  const asideVisible = useMatches({
    xs: true,

    lg: false,
  });
  // const [opened, { toggle }] = useDisclosure();
  return (
    <section>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        padding={0}
      >
        <Sidebar close={close} closeVisible />
      </Drawer>
      <AppShell
        header={{ height: 60, collapsed: headerVisible }}
        navbar={{
          width: {
            base: 250,
          },
          breakpoint: "sm",
          collapsed: {
            mobile: asideVisible,
            desktop: asideVisible,
          },
        }}
      >
        {!headerVisible && (
          <AppShell.Header>
            <ShellHeader opened={opened} open={open} close={close} />
          </AppShell.Header>
        )}
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>

        <AppShell.Main>
          {headerVisible && <ShellHeader />}
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
}: {
  opened?: boolean;
  open?: () => void;
  close?: () => void;
}) {
  const visible = useMatches({
    xs: false,
    lg: true,
  });
  return (
    <Flex justify="flex-end" p={"lg"} gap={!visible ? "md" : 0}>
      <Popover position="bottom-start">
        <Popover.Target>
          <ActionIcon variant="subtle" aria-label="Settings" size="md">
            <FontAwesomeIcon icon={faBell} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between  p-2 h-20 "
            >
              <div className="flex items-center">
                <div className="bg-primary text-white rounded-full p-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 6.293a1 1 0 010 1.414L8.414 16l-4.707-4.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-primary">
                    {notification.title}
                  </h3>
                  <p className="text-secondary font-light">
                    {notification.message}
                  </p>
                </div>
              </div>
              <span className="text-gray-600 text-sm font-light">
                {notification.time}
              </span>
            </div>
          ))}
        </Popover.Dropdown>
      </Popover>{" "}
      {!visible && (
        <ActionIcon
          variant="subtle"
          aria-label="Settings"
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
