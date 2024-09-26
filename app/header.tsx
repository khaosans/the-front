'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export function Header() {
	const pathname = usePathname();

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/settings', label: 'Settings' },
		{ href: '/profile', label: 'Profile' },
		{ href: '/taskboard', label: 'Taskboard' },

	];

	return (
		<header className="bg-white shadow-sm">
			<nav className="container mx-auto px-4 py-3">
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
			</nav>
		</header>
	);
}
