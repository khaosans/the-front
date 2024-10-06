'use client';

<<<<<<< HEAD
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import TopBar from '@/components/TopBar';

interface LayoutProps {
    children: ReactNode;
}

<<<<<<< HEAD
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class">
                    <TopBar />
                    <div className="container mx-auto py-10">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
=======
	return (
		<div className={`min-h-screen flex flex-col ${getThemeClasses()}`}>
			<Header />
			<main className="flex-grow pb-20">{children}</main>
			<Footer />
			<ChatIcon onClick={() => setIsChatOpen(true)} />
			<CodeEditorIcon onClick={() => setIsEditorOpen(true)} />
			<ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
			{isEditorOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
					<div className="w-full max-w-4xl bg-gray-600 dark:bg-gray-800 p-3 rounded-lg relative">
						<Button
							className="absolute top-2 right-2 p-2"
							variant="ghost"
							onClick={() => setIsEditorOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
						<MonacoEditor
							onSave={(value) => {
								console.log('Saved:', value);
								setIsEditorOpen(false);
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
>>>>>>> parent of b07c47e (kebabo (#10))
};

export default RootLayout;
