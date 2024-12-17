'use client'

import Link from "next/link"
import { Search, Bell, User, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
                  <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
                    Categories
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/rent-history" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
                    Rent History
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className={cn("hidden md:flex items-center", 
              isSearchOpen ? "w-64" : "w-auto")}>
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
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

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
                  <SheetTitle>Profile</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4">
                  <nav className="grid gap-2">
                    <Link
                      href="/profile"
                      className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors"
                    >
                      Settings
                    </Link>
                    <Button variant="outline" className="mt-2">
                      Sign Out
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
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
  )
}

