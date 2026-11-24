import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-12 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to automate your social growth?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Join creators using SocialFlow to stay consistent across every channel.
        </p>
        <Button variant="gradient" size="lg" className="mt-8" asChild>
          <Link href="/dashboard">Get started free</Link>
        </Button>
      </div>
      <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} SocialFlow. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
        </div>
      </footer>
    </section>
  );
}