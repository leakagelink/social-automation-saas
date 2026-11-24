"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Link2,
  LogOut,
  Megaphone,
  Plus,
  Settings2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Brand } from "./platform";
import { ThemeToggle } from "./marketing";
import { getDemoProfile } from "@/lib/profile";

export function ComingSoon({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-32px)] sm:max-w-md">
        <DialogHeader>
          <span className="feature-icon">
            <Sparkles size={22} />
          </span>
          <DialogTitle>{title} is coming soon.</DialogTitle>
          <DialogDescription className="pt-2 leading-relaxed">
            {children ??
              "This connection is not live yet. No account has been linked, and no content will be published."}
          </DialogDescription>
        </DialogHeader>
        <Button className="mt-2" onClick={() => onOpenChange(false)}>
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "/dashboard";
  const router = useRouter();
  const profile = getDemoProfile();
  const [notifications, setNotifications] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const nav = [
    ["/dashboard", LayoutDashboard, "Overview"],
    ["/dashboard/connect", Link2, "Accounts"],
    ["/dashboard/automation", Sparkles, "Automation"],
    ["/dashboard/ads", Megaphone, "Ads manager"],
    ["/dashboard/billing", CreditCard, "Billing"],
  ] as const;

  function logout() {
    setSigningOut(true);
    router.push("/sign-in");
    router.refresh();
  }

  const section =
    nav.find(([to]) => to === path)?.[2] ?? "Profile";

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Brand />
        <div className="mt-7 border border-border rounded-md px-3 py-3 flex gap-2 items-center">
          <span className="size-7 rounded bg-violet-soft text-primary grid place-items-center text-xs font-bold">
            {profile.display_name.charAt(0) || "S"}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">
              {profile.display_name || "My"} workspace
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Personal workspace
            </p>
          </div>
        </div>
        <nav className="dashboard-nav" aria-label="Workspace navigation">
          {nav.map(([to, Icon, label]) => (
            <Link
              href={to}
              className={path === to ? "active" : ""}
              key={to}
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="border border-border bg-violet-soft rounded-lg p-4 mb-5">
            <Sparkles size={18} className="text-primary mb-2" />
            <p className="text-sm font-semibold">Your next big thing.</p>
            <p className="text-xs text-muted-foreground mt-2 mb-3">
              Explore plans for more creative possibilities.
            </p>
            <Button asChild size="sm" className="w-full">
              <Link href="/dashboard/billing">
                Explore Growth <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start"
            disabled={signingOut}
            onClick={() => logout()}
          >
            <LogOut />
            {signingOut ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="dashboard-topbar">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Workspace <span className="mx-2">/</span>{" "}
            <span className="text-foreground">{section}</span>
          </span>
          <Link href="/" className="font-bold sm:hidden">
            SocialFlow<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              title="Notifications"
              aria-label="Notifications"
              onClick={() => setNotifications(true)}
            >
              <Bell size={18} />
            </Button>
            <Button asChild variant="ghost" className="gap-2 px-2">
              <Link href="/dashboard">
                <span className="size-7 bg-violet-soft text-primary rounded-full grid place-items-center text-xs font-bold">
                  {profile.display_name.charAt(0) || "S"}
                </span>
                <span className="hidden sm:block text-xs">
                  {profile.display_name || "Profile"}
                </span>
                <Settings2 size={14} />
              </Link>
            </Button>
          </div>
        </header>
        <main className="dashboard-main">
          {children}
          <div className="md:hidden mt-8">
            <Button
              variant="outline"
              disabled={signingOut}
              onClick={() => logout()}
            >
              <LogOut />
              Sign out
            </Button>
          </div>
        </main>
      </div>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent className="max-w-[calc(100%-32px)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>You&apos;re all caught up.</DialogTitle>
            <DialogDescription>
              No new notifications. Social publishing is not active in this
              preview.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DashboardHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="dashboard-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Stat({
  label,
  value,
  detail,
  icon: Icon = CalendarDays,
}: {
  label: string;
  value: string;
  detail: string;
  icon?: typeof CalendarDays;
}) {
  return (
    <div className="dashboard-panel">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        {label}
        <Icon size={18} />
      </div>
      <div className="font-bold text-3xl mt-4 mb-2">{value}</div>
      <p className="text-xs text-success">{detail}</p>
    </div>
  );
}

export function CreatePostButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      <Plus />
      Create post
    </Button>
  );
}