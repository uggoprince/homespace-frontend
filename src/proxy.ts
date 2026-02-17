import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile'];

// Routes that should redirect to home if already authenticated
const authRoutes = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for token in cookies (set by client-side auth)
  // Note: In Phase 4, we'll implement proper cookie-based auth
  // For now, this is a placeholder that allows all routes
  // The actual auth check happens client-side in AuthProvider

  // Check if trying to access protected routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if trying to access auth routes
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // For now, we allow all routes and let client-side handle auth
  // In Phase 4, we'll add proper server-side auth checks with cookies

  const response = NextResponse.next();

  // Set pathname in header for layout to access
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};
