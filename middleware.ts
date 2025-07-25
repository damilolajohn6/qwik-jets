import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const isAdmin = token?.role === 'ADMIN'
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

        // Check if user is trying to access admin routes without admin role
        if (isAdminRoute && !isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/bookings/:path*',
        '/profile/:path*',
    ],
}