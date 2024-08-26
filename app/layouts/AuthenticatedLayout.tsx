import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-purple-950 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Your App Name</h1>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 mt-16 px-4">
        {children}
      </main>
    </div>
  );
}