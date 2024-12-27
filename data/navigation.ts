import { BarChart2, ClipboardList, FileText, LayoutDashboard, LucideIcon, Package, PlusSquare, Settings, Tag, Tags, UserPlus, Users } from "lucide-react";
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
  icon?: LucideIcon; 
  isActive?: boolean;
  items?: SubNavItem[];
}

// Sub-navigation item interface
export interface SubNavItem {
  title: string;
  url: string;
  icon?: LucideIcon
}

// Admin navigation
export const adminNav: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/",
    icon: LayoutDashboard, 
    isActive: true,
    items: [
      {
        icon: BarChart2,
        title: "Analytics",
        url: "/admin/dashboard/analytics",
      },
      {
        icon: Settings,
        title: "Settings",
        url: "/admin/dashboard/settings",
      },
    ],
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users, 
    isActive: true,
    items: [
      {
        icon: Users,
        title: "All Users",
        url: "/admin/users/all",
      },
      {
        icon: UserPlus,
        title: "Add User",
        url: "/admin/users/add",
      },
    ],
  },
  {
    title: "Item Management",
    url: "/admin/items",
    icon: Package, 
    isActive: true,
    items: [
      {
        icon: Package,
        title: "All Item",
        url: "/admin/items",
      },
      {
        icon: PlusSquare,
        title: "Add Item",
        url: "/admin/items/add",
      },
      {
        icon: Tags,
        title: "Item Categories",
        url: "/admin/categories",
      },
      {
        icon: Tag,
        title: "Add New Category",
        url: "/admin/categories/add",
      },
    ],
  },
  {
    title: "Rentals",
    url: "/admin/rentals",
    icon: FileText, 
    isActive: true,
    items: [
      {
        icon: FileText,
        title: "Active Rentals",
        url: "/admin/rentals",
      },
      {
        icon: ClipboardList,
        title: "Rental Logs",
        url: "/admin/rentals/logs",
      },
    ],
  },
];

// Lender navigation
export const lenderNav: NavItem[] = [
  {
    title: "My Loans",
    url: "/lender/loans",
    icon: SquareTerminal, 
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
    icon: Bot,
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
