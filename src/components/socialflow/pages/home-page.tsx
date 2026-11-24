"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Link2,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MarketingLayout,
  FAQ,
  CTABand,
} from "@/components/socialflow/marketing";
import { PlatformIcon } from "@/components/socialflow/platform";
import { DashboardPreview } from "@/components/socialflow/preview";
import { PricingCards } from "@/components/socialflow/pricing";
import { capabilities, platforms } from "@/lib/socialflow";

const testimonials = [
  {
    quote:
      "“I want to spend my time creating, not copying the same post into five different apps. This is the workspace I wish I had from day one.”",
    name: "Maya R.",
    role: "Lifestyle creator",
    initials: "MR",
  },
  {
    quote:
      "“Organic content and paid campaigns finally feel like part of the same plan. That’s a much better way to build a small brand.”",
    name: "Arjun S.",
    role: "D2C founder",
    initials: "AS",
  },
  {
    quote:
      "“One calendar, fewer tabs, and a clear approval queue. Exactly the kind of calm our small team needs.”",
    name: "Olivia K.",
    role: "Agency lead",
    initials: "OK",
  },
];

export function HomePageContent() {
  const [testimonial, setTestimonial] = useState(0);
  const current = testimonials[testimonial] ?? testimonials[0];

  return (
    <MarketingLayout>
      <section className="hero">
        <div className="site-container">
          <div className="reveal">
            <span className="eyebrow">
              <span className="text-primary">
                <Sparkles size={13} />
              </span>
              Your content. Your voice. A little more flow.
              <ArrowRight size={12} className="text-muted-foreground" />
            </span>
            <h1>
              SocialFlow. Your social presence,
              <br />
              <span className="gradient-text">on autopilot.</span>
            </h1>
            <p className="hero-description">
              Posts, reels, captions, hashtags, and ads — finally in one place.
              <br className="hidden sm:block" /> Less juggling apps. More
              creating what matters.
            </p>
            <div className="hero-actions">
              <Button size="lg" className="hero-primary h-12" asChild>
                <Link href="/sign-up">
                  Start free trial <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12" asChild>
                <Link href="/features">
                  <Play size={15} /> See it in action
                </Link>
              </Button>
            </div>
            <div className="tiny-checks">
              <span>
                <Check size={12} /> No credit card required
              </span>
              <span>
                <Check size={12} /> You stay in control
              </span>
              <span>
                <Check size={12} /> Setup in minutes
              </span>
            </div>
            <div className="platform-row">
              {platforms.map((name) => (
                <div key={name} className="flex items-center gap-1.5">
                  <PlatformIcon name={name} />
                  <span className="platform-label text-xs font-medium text-muted-foreground">
                    {name === "X" ? "X / Twitter" : name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>
      <section className="trust-band">
        <div className="site-container">
          <p className="text-xs text-muted-foreground">
            Built for ambitious creators &amp; D2C brands
          </p>
          <div className="logo-strip" aria-label="Illustrative brand logos">
            <span>Layers</span>
            <span>⌘ quotient</span>
            <span>◒ Circooles</span>
            <span>✳ Sisyphus</span>
            <span>Catalog</span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-4">
            Illustrative brands · not endorsements
          </p>
        </div>
      </section>
      <section className="section">
        <div className="site-container">
          <div className="section-heading">
            <span className="kicker">Less effort. More momentum.</span>
            <h2>Five platforms. One effortless flow.</h2>
            <p>
              Social media automation tools that give your creativity room to
              breathe.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Link2,
                title: "Connect your world",
                description:
                  "Bring your favorite social accounts together. One secure connection, one clear workspace.",
              },
              {
                icon: Sparkles,
                title: "Set your flow",
                description:
                  "Choose your niche, find your voice, and set a schedule. Your content plan starts taking shape.",
              },
              {
                icon: TrendingUp,
                title: "Create. Approve. Grow.",
                description:
                  "Review every post before it goes live. Build consistency without giving up creative control.",
              },
            ].map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="text-center relative">
                <span className="mx-auto size-14 rounded-lg bg-violet-soft text-primary grid place-items-center">
                  <Icon size={24} />
                </span>
                <p className="text-[10px] uppercase text-muted-foreground mt-4 mb-2">
                  Step 0{i + 1}
                </p>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-72 mx-auto">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-muted border-y border-border">
        <div className="site-container">
          <div className="section-heading">
            <span className="kicker">Your unfair creative advantage</span>
            <h2>A full toolkit. Not another full-time job.</h2>
            <p>Everything you need to keep showing up — without burning out.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {capabilities.map(({ icon: Icon, title, description, label }) => (
              <Link href="/features" key={title} className="feature-item">
                <span className="feature-icon">
                  <Icon size={22} />
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  {label}
                </span>
                <h3 className="mt-2">{title}</h3>
                <p>{description}</p>
                <ArrowRight className="text-primary mt-5" size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="kicker">Consistency changes everything</span>
            <h2 className="text-3xl font-bold my-4">
              Less “I should post.”
              <br />
              More “It’s already planned.”
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Turn a scattered week into a content rhythm. Plan posts, review
              captions, and build your presence one thoughtful day at a time.
            </p>
            <div className="flex flex-wrap gap-5 mt-6 text-xs">
              <span className="flex gap-2 items-center">
                <ShieldCheck size={16} className="text-success" />
                Official OAuth planned
              </span>
              <span className="flex gap-2 items-center">
                <Check size={16} className="text-success" />
                Approval-first workflow
              </span>
            </div>
          </div>
          <ResourceChart />
        </div>
      </section>
      <section className="section bg-muted border-y border-border">
        <div className="site-container">
          <div className="section-heading">
            <span className="kicker">A plan for your next big thing</span>
            <h2>Small start. Big possibilities.</h2>
            <p>Choose the space your creativity needs.</p>
          </div>
          <PricingCards />
        </div>
      </section>
      <section className="section">
        <div className="site-container">
          <div className="section-heading">
            <span className="kicker">For people who love creating</span>
            <h2>More time for the work that’s yours.</h2>
          </div>
          {current && (
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex gap-1 text-primary justify-center mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
                {current.quote}
              </blockquote>
              <div className="flex justify-center items-center gap-3 mt-6">
                <span className="size-10 bg-violet-soft text-primary rounded-full grid place-items-center text-xs font-bold">
                  {current.initials}
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold">{current.name}</p>
                  <p className="text-xs text-muted-foreground">{current.role}</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-5 mt-5">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Previous testimonial"
                  onClick={() => setTestimonial((testimonial + 2) % 3)}
                >
                  <ChevronLeft />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {testimonial + 1} / 3
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Next testimonial"
                  onClick={() => setTestimonial((testimonial + 1) % 3)}
                >
                  <ChevronRight />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Sample personas and illustrative testimonials
              </p>
            </div>
          )}
        </div>
      </section>
      <FAQ />
      <CTABand />
      <Button asChild className="sticky-trial md:hidden hero-primary">
        <Link href="/sign-up">
          Start free trial <ArrowRight />
        </Link>
      </Button>
    </MarketingLayout>
  );
}

function ResourceChart() {
  const heights = [28, 40, 35, 54, 49, 75, 90, 85, 110, 126, 138, 145];
  return (
    <div className="dashboard-panel">
      <div className="flex justify-between text-xs mb-7">
        <span className="font-semibold">A more consistent content rhythm</span>
        <span className="status-pill">Illustrative</span>
      </div>
      <div className="flex items-end gap-3 h-36 border-b border-border pb-0">
        {heights.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/80 rounded-t"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-3">
        <span>Scattered posting</span>
        <span>A steady weekly plan</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-6">
        Conceptual visual. Not a promise of follower or revenue growth.
      </p>
    </div>
  );
}