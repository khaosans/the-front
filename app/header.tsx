'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Home, ClipboardList, PlusCircle, Settings, LogOut, User, Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from "@/app/components/ui/sheet"; // Ensure this path is correct

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Taskboard', href: '/board', icon: ClipboardList },
  { name: 'New Project', href: '/new-project', icon: PlusCircle },
];

export function Header({ session }: { session: any }) { // Define session type appropriately
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-600 hover:bg-gray-100'
                      } rounded-md px-3 py-2 text-sm font-medium flex items-center`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                  {/* Add Login and Signup Links if not logged in */}
                  {!session && (
                    <>
                      <Link href="/login" className="text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">
                        Login
                      </Link>
                      <Link href="/signup" className="text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex-shrink-0">
              <span className="sr-only">Taskboard</span>
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-600 hover:bg-gray-100'
                  } rounded-md px-3 py-2 text-sm font-medium flex items-center`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {session && ( // Show user avatar or logout option if logged in
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/app/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
