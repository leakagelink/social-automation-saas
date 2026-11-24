/**
 * Auth: Clerk (chosen for Next.js App Router, orgs, and webhooks).
 *
 * Demo mode: when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is unset, dashboard is open
 * with a mock user. Production: enable middleware.ts and ClerkProvider.
 */

export const AUTH_PROVIDER = "clerk" as const;

export function isClerkConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export const DEMO_USER = {
  id: "demo_user",
  email: "dheeraj@demo.socialflow.app",
  name: "Dheeraj",
};