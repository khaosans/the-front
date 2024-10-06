'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Documentation from '@/components/documentation';

export default function QuestDesigner() {
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quest Designer</DialogTitle>
                    <DialogDescription>
                        Design your quest here.
                    </DialogDescription>
                </DialogHeader>
                <Documentation />
            </DialogContent>
        </Dialog>
    );
}