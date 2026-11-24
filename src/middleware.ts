import { NextResponse } from "next/server";

/**
 * Clerk middleware (production):
 * import { clerkMiddleware } from '@clerk/nextjs/server'
 * export default clerkMiddleware()
 *
 * Enabled when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set — install @clerk/nextjs first.
 */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in(.*)", "/sign-up(.*)"],
};