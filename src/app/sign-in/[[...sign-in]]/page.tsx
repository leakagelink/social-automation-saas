import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isClerkConfigured, AUTH_PROVIDER } from "@/lib/auth";

export default function SignInPage() {
  const clerkReady = isClerkConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Authentication via {AUTH_PROVIDER}.
            {clerkReady
              ? " Clerk components load when keys are set."
              : " Demo mode — continue to dashboard without keys."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!clerkReady && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
              Set <code className="text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
              <code className="text-xs">CLERK_SECRET_KEY</code> to enable Clerk.
            </p>
          )}
          <Button variant="gradient" asChild>
            <Link href="/dashboard">Continue to dashboard (demo)</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}