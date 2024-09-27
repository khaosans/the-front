import { Header } from './header';
import Footer from './footer'; // Changed to default import
import { getStoredTheme, setTheme } from '@/lib/theme';
import { ClientThemeWrapper } from './ClientThemeWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <ClientThemeWrapper>
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </ClientThemeWrapper>
            </body>
        </html>
    );
}
