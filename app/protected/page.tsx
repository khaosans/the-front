'use client';

import ProtectedLayout from "@/app/protected/layout";
import TaskBoard from "@/app/components/TaskBoard";

const ProtectedPage = () => {
    return (
        <ProtectedLayout>
            <TaskBoard />
        </ProtectedLayout>
    );
};

export default ProtectedPage;
