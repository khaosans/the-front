import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // ... existing redirect logic ...
    }
  }

  // Add this new route for Google sign-in
  if (searchParams.get("provider") === "google") {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`
      }
    });

    if (error) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}