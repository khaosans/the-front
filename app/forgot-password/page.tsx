'use client';

import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/forms/submit-button";
import { Label } from "@/components/forms/label";
import { Input } from "@/components/forms/input";
import { FormMessage, Message } from "@/components/forms/form-message";
import { headers } from "next/headers";
import { encodedRedirect } from "@/utils/utils";
import React, { useState } from "react";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const forgotPassword = async (formData: FormData) => {
    "use server";

    const email = formData.get("email")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email) {
      return encodedRedirect("error", "/forgot-password", "Email is required");
    }

    setIsLoading(true); // Set loading state to true

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    setIsLoading(false); // Reset loading state

    if (error) {
      console.error(error.message);
      return encodedRedirect(
        "error",
        "/forgot-password",
        "Could not reset password"
      );
    }

    return encodedRedirect(
      "success",
      "/forgot-password",
      "Check your email for a link to reset your password."
    );
  };

  return (
    <div className="flex flex-col flex-1 p-4 w-full items-center">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        Back
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md p-4" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await forgotPassword(formData);
      }}>
        <h1 className="text-2xl font-medium">Forgot Password</h1>
        <p className="text-sm text-foreground/60">
          Enter your email to receive a password reset link.
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton isLoading={isLoading}>Send Reset Link</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
