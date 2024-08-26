import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import TodoList from "@/components/todo/TodoList";

export default function BoardPage() {
    return (
        <AuthenticatedLayout>
            <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-2xl mb-4">Welcome to the new protected page</h2>
                    <p>This content is only visible to authenticated users.</p>
                    <TodoList />
                </main>
            </div>
        </AuthenticatedLayout>
    );
}