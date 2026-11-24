import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-6 gap-1 border border-violet-500/30 bg-violet-500/10 text-violet-300">
          <Zap className="h-3 w-3" />
          New — Reels + Meta Ads automation
        </Badge>
        <h1 className="animate-fade-up text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          One dashboard.{" "}
          <span className="gradient-text">Five platforms.</span>{" "}
          Zero burnout.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:100ms]">
          SocialFlow schedules posts, writes captions, and drafts reel scripts for Facebook,
          Instagram, X, YouTube, and Pinterest—while you focus on creating.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/dashboard">
              Start 14-day trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#pricing">See pricing</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required in demo mode · Cancel anytime
        </p>
      </div>
    </section>
  );
}