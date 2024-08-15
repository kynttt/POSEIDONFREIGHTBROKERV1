import {
  faTableColumns,
  faMoneyCheckDollar,
  faCalculator,
  faUser,
  faTruckFront,
  faListUl,
  faTruckFast,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavItem {
  label: string;
  path: string;
  icon: IconDefinition; // Icon from FontAwesome
}

export interface NavItems {
  guest: NavItem[];
  admin: NavItem[];
  user: NavItem[];
}

export const navItems: NavItems = {
  guest: [
    { label: "Home", path: "/", icon: faTableColumns },
    { label: "Create Account", path: "/signup", icon: faUser },
  ],
  admin: [
    { label: "Dashboard", path: "/a/admin-dashboard", icon: faTableColumns },
    { label: "Load Board", path: "/a/load-board", icon: faListUl },
    { label: "Documents", path: "/a/legal-page", icon: faFolderOpen },
    { label: "Transactions", path: "/a/report-details", icon: faTruckFast },
    { label: "Trucks", path: "/a/trailer-options", icon: faTruckFront },
    // { label: "Notification", path: "/a/notification", icon: faBell },
  ],
  user: [
    { label: "Dashboard", path: "/s/shipper-dashboard", icon: faTableColumns },
    { label: "Payables", path: "/s/user-payables", icon: faMoneyCheckDollar },
    { label: "Trucks", path: "/s/trailer-options", icon: faTruckFront },
    {
      label: "Request Quote",
      path: "/requests",
      icon: faCalculator,
    },
    // { label: "Notification", path: "/s/notification", icon: faBell },
  ],
};
