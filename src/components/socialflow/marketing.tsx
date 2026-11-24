"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brand } from "./platform";
import { faqs } from "@/lib/socialflow";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      title={dark ? "Use light theme" : "Use dark theme"}
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setDark(!dark);
      }}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </Button>
  );
}

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname() ?? "/";
  const navigation = [
    ["/features", "Features"],
    ["/integrations", "Integrations"],
    ["/pricing", "Pricing"],
    ["/blog", "Resources"],
  ] as const;

  return (
    <>
      <header className="site-header">
        <div className="site-container h-full flex items-center justify-between">
          <Brand />
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {navigation.map(([to, label]) => (
              <Link
                className={`nav-link ${path.startsWith(to) ? "active" : ""}`}
                key={to}
                href={to}
              >
                {label}
                {label === "Resources" && (
                  <ChevronDown className="inline ml-1" size={12} />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button asChild className="hero-primary hidden sm:inline-flex">
              <Link href="/sign-up">
                Start free trial <ArrowRight size={15} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav
            aria-label="Mobile navigation"
            className="absolute top-full bg-background w-full border-b border-border px-6 py-5 flex flex-col gap-5"
          >
            {navigation.map(([to, label]) => (
              <Link
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {label}
              </Link>
            ))}
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <ThemeToggle />
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-container">
          <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
            <div>
              <Brand />
              <p className="text-sm text-muted-foreground mt-4 max-w-64 leading-relaxed">
                Less busywork. More good content.
                <br />
                Your social presence, in one flow.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Product</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link href="/features">Features</Link>
                <Link href="/integrations">Integrations</Link>
                <Link href="/pricing">Pricing</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Resources</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link href="/blog">The SocialFlow journal</Link>
                <Link href="/blog/how-to-automate-social-media-posts">
                  Automation guide
                </Link>
                <Link href="/dashboard">Your workspace</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Legal</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link href="/privacy">Privacy policy</Link>
                <Link href="/terms">Terms of service</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-5 flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
            <span>© 2026 SocialFlow. All rights reserved.</span>
            <span>Built for creators. Made for consistency.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export function FAQ() {
  return (
    <section className="section">
      <div className="site-container max-w-3xl">
        <div className="section-heading">
          <span className="kicker">A little clarity</span>
          <h2>Good questions. Straight answers.</h2>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map(([q, a], i) => (
            <AccordionItem value={String(i)} key={q}>
              <AccordionTrigger className="text-sm text-left font-semibold py-5">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="cta-band">
      <span className="kicker">Your next chapter starts here</span>
      <h2 className="mt-3">Make room for what you love creating.</h2>
      <p className="text-muted-foreground text-sm mb-6">
        One workspace for your posts, reels, hashtags, and ads.
      </p>
      <Button size="lg" asChild className="hero-primary">
        <Link href="/sign-up">
          Start free trial <ArrowRight />
        </Link>
      </Button>
      <p className="text-xs text-muted-foreground mt-4">
        Create your account today · publishing &amp; billing coming soon
      </p>
    </section>
  );
}

export function PageTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-title">
      <div className="site-container">
        <span className="kicker">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          className="flex gap-2 text-sm text-muted-foreground"
          key={item}
        >
          <Check size={16} className="text-success shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}