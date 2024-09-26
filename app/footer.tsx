'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modal';
import { Button } from "@/components/ui/button";

export function Footer() {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const footerItems = [
        { href: 'privacy', label: 'Privacy Policy' },
        { href: 'terms', label: 'Terms of Service' },
        { href: 'contact', label: 'Contact Us' },
    ];

    const modalContent = {
        privacy: {
            title: 'Privacy Policy',
            content: 'This is our privacy policy. We respect your privacy and are committed to protecting it.',
        },
        terms: {
            title: 'Terms of Service',
            content: 'These are our terms of service. By using our service, you agree to these terms.',
        },
        contact: {
            title: 'Contact Us',
            content: 'You can contact us at support@quantumlabs.com or call us at 1-800-QUANTUM.',
        },
    };

    const handleOpenChange = (open: boolean, href: string) => {
        setOpenModal(open ? href : null);
    };

    return (
        <footer className="bg-white shadow-sm mt-auto">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    © 2023 Quantumlabs. All rights reserved.
                </div>
                <ul className="flex space-x-4">
                    {footerItems.map((item) => (
                        <li key={item.href}>
                            <Dialog open={openModal === item.href} onOpenChange={(open) => handleOpenChange(open, item.href)}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                                    >
                                        {item.label}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{modalContent[item.href].title}</DialogTitle>
                                    </DialogHeader>
                                    <p>{modalContent[item.href].content}</p>
                                    <Button onClick={() => setOpenModal(null)} className="mt-4">Close</Button>
                                </DialogContent>
                            </Dialog>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
