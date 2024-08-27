'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Input } from '@/components/forms/input';
import { SubmitButton } from '@/components/forms/submit-button';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { theme } = useTheme();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      toast.success('Logged in successfully');
      router.push('/taskboard');
    } catch (error: any) {
      toast.error(error.message);
      reset({ password: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
        </div>
        <FormProvider {...methods}>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="Email address"
                required
              />
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <SubmitButton isLoading={isLoading}>Sign in</SubmitButton>
            </div>
          </form>
        </FormProvider>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : ''
              }`}
            >
              <Image
                src="/images/google.svg"
                alt="Google logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}