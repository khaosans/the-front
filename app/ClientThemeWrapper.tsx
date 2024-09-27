'use client';

import React, { useEffect } from 'react';
import { getStoredTheme, setTheme } from '@/lib/theme';

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const storedTheme = getStoredTheme();
        setTheme(storedTheme);
    }, []);

    return <>{children}</>;
}