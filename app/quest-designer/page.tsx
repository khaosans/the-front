import { Dialog, DialogTrigger, DialogContent, DialogDescription } from '@radix-ui/react-dialog';
import React from 'react';

function CustomDialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="dialog-header">{children}</div>;
}

const QuestDesignerPage: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>Open Dialog</button>
            </DialogTrigger>
            <DialogContent>
                <CustomDialogHeader>
                    <DialogDescription className="px-4">
                        Collaborate with our AI Lorekeeper to craft a legendary quest for our champions.
                    </DialogDescription>
                </CustomDialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default QuestDesignerPage;