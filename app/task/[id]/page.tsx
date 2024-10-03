'use client';

import React from 'react';
import { useRouter } from 'next/router';

const TaskPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Task ID: {id}</h1>
            {/* Your task page content */}
        </div>
    );
};

export default TaskPage;