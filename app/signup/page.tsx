'use client';

import { ThemeProvider } from 'next-themes';
import SignUpForm from '../../components/SignUpForm';

export default function SignUp() {
	return (
		<ThemeProvider attribute="class">
			<SignUpForm />
		</ThemeProvider>
	);
}