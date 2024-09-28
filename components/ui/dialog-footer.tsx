"use client"

import React from "react";
import { cn } from "@/utils/cn"; // Ensure this path is correct

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex justify-end space-x-2", className)} {...props} />
);

DialogFooter.displayName = "DialogFooter";

export default DialogFooter;