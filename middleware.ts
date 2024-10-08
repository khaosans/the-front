import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the user is authenticated
    const isAuthenticated = request.cookies.get('authToken'); // Adjust this based on your auth logic

    // Define unprotected paths
    const unProtectedPaths = ['/login', '/signup'];
    // Define paths that require authentication
    const protectedPaths = ['/dashboard', '/profile'];

    // If the user is not authenticated and trying to access a protected path
    if (!isAuthenticated && protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If the user is authenticated and trying to access unprotected paths, redirect to dashboard
    if (isAuthenticated && unProtectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/login'], // Adjust as necessary
};