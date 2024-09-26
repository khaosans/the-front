'use client';


import React from "react";
import TaskBoard from "@/app/TaskBoard";
import ProtectedLayout from "@/app/protected/layout";

const DashboardPage = () => {
    return (
        <ProtectedLayout>
            <TaskBoard />
        </ProtectedLayout>
    );
};

export default DashboardPage;
