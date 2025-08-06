import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      // Allow unauthenticated access to specific paths
      if (
        pathname.startsWith("/api/auth") ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/" ||
        pathname.startsWith("/api/videos")
      ) {
        return true;
      }

      // All other paths require authentication
      return !!token;
    },
  },
});

// Configuration to exclude static and public paths from middleware
export const config = {
  matcher: [
    /**
     * Match all request paths except the following:
     * - _next/static/*  → Next.js static files
     * - _next/image/*   → Next.js image optimization
     * - favicon.ico     → Favicon file
     * - public/*        → Public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
