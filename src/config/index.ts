import {
  IconComponents,
  IconDashboard,
  IconLock,
  IconMoodSmile,
  IconSettings
} from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";

export const navLinks: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },

  {
    label: "Wallets",
    icon: IconComponents,
    initiallyOpened: false,
    links: [
      {
        label: "All Wallets",
        link: "/dashboard/wallets",
      },
      {
        label: "Create Wallets",
        link: "/dashboard/create-wallets",
      },
    ],
  },

  { label: "Settings", icon: IconSettings, link: "/dashboard/settings" },

  // {
  //   label: "Auth",
  //   icon: IconLock,
  //   initiallyOpened: true,
  //   links: [
  //     {
  //       label: "Login",
  //       link: "/login",
  //     },
  //     {
  //       label: "Register",
  //       link: "/register",
  //     },
  //   ],
  // },

  // {
  //   label: "Sample",
  //   icon: IconMoodSmile,
  //   initiallyOpened: true,
  //   links: [
  //     {
  //       label: "Landing",
  //       link: "/",
  //     },
  //   ],
  // },
];
