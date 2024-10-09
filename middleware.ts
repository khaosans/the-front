import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const publicRoutes = ["/", "/login(.*)", "/sign-up(.*)"];
  const isPublicRoute = publicRoutes.some(route => new RegExp(`^${route}`).test(request.nextUrl.pathname));

  // Check authentication
  const isAuthenticated = checkAuthentication(request);

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

function checkAuthentication(request: NextRequest): boolean {
  // Implement your authentication check here
  const token = request.cookies.get('session-token'); // Adjust based on your authentication method
  return token ? true : false; // Placeholder: replace with actual authentication check
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};