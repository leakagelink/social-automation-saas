import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Start your 14-day trial. Wire Clerk SignUp here when keys are configured.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="gradient" asChild>
            <Link href="/dashboard">Start trial (demo)</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Already have an account?</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}