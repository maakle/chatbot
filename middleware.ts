import type { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder (static assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)',
  ],
};
