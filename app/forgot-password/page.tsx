'use client';

import dynamic from 'next/dynamic';
import Link from "next/link";

// Create a client-side only version of the ForgotPassword component
const ForgotPasswordForm = dynamic(() => import('@/components/forgot-password-form'), {
  ssr: false,
});

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Forgot Password
      </h2>
      <ForgotPasswordForm />
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Back to Login
      </Link>
    </div>
  );
}
