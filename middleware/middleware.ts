// middleware.ts (in your Next.js app root)
/*import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // Get the token from cookies
    const token = request.cookies.get('token');
    
    const isAdminPath = path.startsWith('/admin');
    const isLoginPath = path === '/admin/login';
    
    if (isAdminPath && !isLoginPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    if (isLoginPath && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};*/