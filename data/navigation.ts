import { FileText, LucideIcon, Package, PlusSquare, Tag, Tags, Users } from "lucide-react";

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
  // {
  //   title: "Dashboard",
  //   url: "/admin/",
  //   icon: LayoutDashboard, 
  //   isActive: true,
  //   items: [
  //     {
  //       icon: BarChart2,
  //       title: "Dashboard",
  //       url: "/admin/",
  //     },
  //   ],
  // },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users, 
    isActive: true,
    items: [
      {
        icon: Users,
        title: "All Users",
        url: "/admin/users",
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
        title: "Rentals",
        url: "/admin/rentals",
      }
    ],
  },
];

// Lender navigation
export const lenderNav: NavItem[] = [
  {
    title: "Item Management",
    url: "/lender/items",
    icon: Package, 
    isActive: true,
    items: [
      {
        icon: Package,
        title: "All Item",
        url: "/lender/items",
      },
      {
        icon: PlusSquare,
        title: "Add Item",
        url: "/lender/items/add",
      },
      {
        icon: Tags,
        title: "Item Categories",
        url: "/lender/categories",
      },
    ],
  },
  {
    title: "Rentals",
    url: "/lender/rentals",
    icon: FileText, 
    isActive: true,
    items: [
      {
        icon: FileText,
        title: "Rentals",
        url: "/lender/rentals",
      },
      // {
      //   icon: ClipboardList,
      //   title: "Rental Logs",
      //   url: "/lender/rentals/logs",
      // },
    ],
  },
];

// Initial user data
export const user: UserData = {
  name: "",
  email: "",
  avatar: "",
};
