import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server'; // Import Clerk's middleware and getAuth
import logger from '@/lib/logger'; // Import logger

// Use clerkMiddleware to handle authentication
export const middleware = clerkMiddleware((request: NextRequest) => {
  // Log the entire request object to inspect its properties
  logger.info('Middleware triggered');
  logger.info(`Request Object: ${JSON.stringify(request)}`);

  // Check if nextUrl is defined
  if (!request.nextUrl) {
    logger.error('nextUrl is undefined');
    return NextResponse.next(); // Proceed without authentication if nextUrl is not available
  }

  const publicRoutes = ["/", "/login(.*)", "/sign-up(.*)", "/api/(.*)"]; // Include API routes as public
  const isPublicRoute = publicRoutes.some(route => new RegExp(`^${route}`).test(request.nextUrl.pathname));

  // Check authentication using Clerk
  const { userId } = getAuth(request);
  logger.info(`Is Public Route: ${isPublicRoute}, User ID: ${userId}`);

  if (!isPublicRoute && !userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

// Configure the matcher to apply this middleware to specific routes
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Match all routes except those with a file extension or _next
    '/api/(.*)', // Match all API routes
  ],
};

