'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const supabase = createClientComponentClient();

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/settings', label: 'Settings' },
		{ href: '/profile', label: 'Profile' },
		{ href: '/taskboard', label: 'Taskboard' },
	];

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push('/login');
	};

	return (
		<header className="bg-white shadow-sm">
			<nav className="container mx-auto px-4 py-3 flex justify-between items-center">
				<div className="flex items-center">
					<Link href="/dashboard" className="text-xl font-bold text-primary mr-8">
						Quantumlabs
					</Link>
					<ul className="flex space-x-4">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										pathname === item.href
											? "text-primary"
											: "text-muted-foreground"
									)}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<Button variant="ghost" size="sm" onClick={handleLogout} className="text-blue-600 hover:text-blue-700">
					Logout
				</Button>
			</nav>
		</header>
	);
}
