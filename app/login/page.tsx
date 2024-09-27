'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from '@/types/supabase';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();

	const onSubmit = async (data: FormData) => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});
			if (error) throw error;
			router.push('/dashboard');
		} catch (error) {
			console.error('Error logging in:', error);
			alert('Error logging in. Please try again.');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Login to Quantumlabs</CardTitle>
					<CardDescription>Enter your email and password to log in</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Email"
									{...register("email", { required: "Email is required" })}
								/>
								{errors.email && <p className="text-red-500">{errors.email.message}</p>}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Password"
								{...register("password", { required: "Password is required" })}
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">Log in</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
