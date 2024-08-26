'use client';

import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import React from "react";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import TodoList from "@/components/todo/TodoList";

export default async function NewProtectedPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const todos = [
        { title: "Todo 1", completed: false },
        { title: "Todo 2", completed: true },
        // Add more todos as needed
    ];

    return (
        <AuthenticatedLayout>
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
                    <TodoList todos={todos} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
