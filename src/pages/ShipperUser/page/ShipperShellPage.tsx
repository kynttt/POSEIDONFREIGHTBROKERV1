import {
  ActionIcon,
  AppShell,
  Flex,
  Popover,
  rem,
  useMatches,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import HelpIcon from "../../../assets/help";
import NotificationModal from "../../../components/NotificationModal";
export default function ShipperShellPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const pinned = useHeadroom({ fixedAt: 120 });

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
          <ShellHeader opened={opened} open={open} close={close} />
        </AppShell.Header>
        )
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
    <Flex justify="flex-end" p={"lg"} gap={"md"}>
      {" "}
      <ActionIcon variant="subtle" aria-label="Settings" size="sm">
        <HelpIcon />
      </ActionIcon>
      <Popover position="bottom-start">
        <Popover.Target>
          <ActionIcon variant="subtle" aria-label="Settings" size="md">
            <FontAwesomeIcon icon={faBell} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown >
          <NotificationModal />
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
