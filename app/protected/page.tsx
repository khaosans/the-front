'use client';

import ProtectedLayout from "@/app/protected/layout";
import React from "react";
import Taskboard from "@/app/taskboard";

const ProtectedPage = () => {
    return (
        <ProtectedLayout>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Protected Task Board</h1>
                <Taskboard />
            </main>
        </ProtectedLayout>
    );
};

export default ProtectedPage;
