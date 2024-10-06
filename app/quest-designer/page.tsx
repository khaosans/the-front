'use client';

import React from 'react';
import { DialogHeader, DialogDescription } from '@/components/ui/dialog';
import Documentation from '@/components/documentation';

const QuestDesignerPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <DialogHeader>
                <DialogDescription className="px-4">
                    Collaborate with our AI Lorekeeper to craft a legendary quest for our champions.
                </DialogDescription>
            </DialogHeader>
            <Documentation />
        </div>
    );
};

export default QuestDesignerPage;