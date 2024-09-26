'use client';

import ProtectedLayout from "@/app/components/ProtectedLayout"; // Ensure this path is correct
import Header from "@/app/components/Header";
import TaskBoard from "@/app/components/TaskBoard";

const DashboardPage = () => {
    return (
        <ProtectedLayout>
            <TaskBoard />
        </ProtectedLayout>
    );
};

export default DashboardPage;
