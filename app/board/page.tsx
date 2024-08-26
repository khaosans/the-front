// `app/board/page.tsx`
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TodoList from "@/components/todo/TodoList";

export default async function BoardPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <div className="py-6 font-medium bg-purple-950 text-white text-center">
                    This is a new protected page that you can only see as an authenticated user
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-2xl mb-4">Welcome to the new protected page</h2>
                    <p>This content is only visible to authenticated users.</p>
                    <TodoList />
                </main>
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Powered by{" "}
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>
                </p>
            </footer>
        </div>
    );
}
