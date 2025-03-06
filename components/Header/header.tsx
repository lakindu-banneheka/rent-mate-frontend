"use client";

import Link from "next/link";
import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { authLinks } from "@/utils/auth";
import ProfileClient from "../auth/ProfileClient";
import { isUserAdmin } from "@/actions/isUserAdmin";
import { isUserLender } from "@/actions/isUserLender";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const session = useUser();
  const [isLender, setIsLender] = useState<boolean | null>(null); 
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status
  
  // is admin

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin(); 
      setIsAdmin(adminStatus); 
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const checkLenderStatus = async () => {
      const lenderStatus = await isUserLender(); 
      setIsLender(lenderStatus); 
    };

    checkLenderStatus();
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl">Rent Mate</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:ml-6 md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/browse"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md"
                  >
                    Products
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/categories"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md"
                  >
                    Categories
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/rent-history"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md"
                  >
                    Rent History
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div
              className={cn(
                "hidden md:flex items-center",
                isSearchOpen ? "w-64" : "w-auto"
              )}
            >
              <div className={cn("relative w-full")}>
                {isSearchOpen ? (
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-muted"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full"
                  >
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                )}
                {isSearchOpen && (
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div> */}

            {/* Notifications */}
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button> */}

            {/* Theme */}
              <ThemeToggle />

            {/* Profile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  {/* <SheetTitle>Profile</SheetTitle> */}
                  {session ? (
                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Profile Information
                      </h2>
                      <ProfileClient />
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Please login to see your profile information
                      </h2>
                    </div>
                  )}
                </SheetHeader>
                <div className="grid gap-4">
                  <nav className="grid gap-2 mt-10">
                    { isAdmin &&
                      <Link
                        href="/admin"
                        className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                      >
                        Admin Pannel
                      </Link>
                    }
                    { isLender && 
                      <Link
                        href="/lender"
                        className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                      >
                        Lender Panel
                      </Link>
                    }

                    {!session.user ? (
                      <Link
                        href={authLinks.login}
                        className="px-4 py-2 text-center bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Login
                      </Link>
                    ) : (
                      <Link
                        href={authLinks.logout}
                        className="px-4 py-2 text-center bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Logout
                      </Link>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4">
                  <nav className="grid gap-2">
                    <Link
                      href="/"
                      className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/categories"
                      className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/rent-history"
                      className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                    >
                      Rent History
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
