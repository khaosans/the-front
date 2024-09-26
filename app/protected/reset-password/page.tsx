'use client';

import { FormMessage, Message } from "@/components/forms/form-message";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";
import { SubmitButton } from "@/components/forms/submit-button";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const resetPassword = async (formData: FormData) => {
    "use server";
    const supabase = createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
      encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password and confirm password are required",
      );
      return;
    }

    if (password !== confirmPassword) {
      encodedRedirect(
        "error",
        "/protected/reset-password",
        "Passwords do not match",
      );
      return;
    }

    setIsLoading(true); // Set loading state to true

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setIsLoading(false); // Reset loading state

    if (error) {
      encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password update failed",
      );
      return;
    }

    encodedRedirect("success", "/protected/reset-password", "Password updated");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await resetPassword(formData);
      }}>
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <p className="text-sm text-foreground/60">
          Please enter your new password below.
        </p>

        <Label htmlFor="password">New Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          required
        />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <SubmitButton type="submit" isLoading={isLoading}>Reset Password</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
