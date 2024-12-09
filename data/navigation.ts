import { LucideIcon } from "lucide-react";
import { Bot, SquareTerminal } from "lucide-react";

// User data interface
export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

// Main navigation item interface
export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon; // Use LucideIcon for the icon type
  isActive?: boolean;
  items?: SubNavItem[];
}

// Sub-navigation item interface
export interface SubNavItem {
  title: string;
  url: string;
}

// Admin navigation
export const adminNav: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal, // Replace with an actual LucideIcon
    isActive: true,
    items: [
      {
        title: "Analytics",
        url: "/admin/dashboard/analytics",
      },
      {
        title: "Settings",
        url: "/admin/dashboard/settings",
      },
    ],
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Bot, // Replace with an actual LucideIcon
    items: [
      {
        title: "All Users",
        url: "/admin/users/all",
      },
      {
        title: "Add User",
        url: "/admin/users/add",
      },
    ],
  },
];

// Lender navigation
export const lenderNav: NavItem[] = [
  {
    title: "My Loans",
    url: "/lender/loans",
    icon: SquareTerminal, // Replace with an actual LucideIcon
    isActive: true,
    items: [
      {
        title: "Current Loans",
        url: "/lender/loans/current",
      },
      {
        title: "Loan History",
        url: "/lender/loans/history",
      },
    ],
  },
  {
    title: "Profile",
    url: "/lender/profile",
    icon: Bot, // Replace with an actual LucideIcon
    items: [
      {
        title: "View Profile",
        url: "/lender/profile/view",
      },
      {
        title: "Edit Profile",
        url: "/lender/profile/edit",
      },
    ],
  },
];

// Initial user data
export const user: UserData = {
  name: "",
  email: "",
  avatar: "",
};
