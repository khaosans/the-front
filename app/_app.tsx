import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext'; // Updated import path

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;