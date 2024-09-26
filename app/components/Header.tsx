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
import { CardDescription } from "@/app/components/ui/card-description"; // Updated import
import { CardFooter } from "@/app/components/ui/card-footer"; // Updated import

// ... rest of the code remains unchanged ...