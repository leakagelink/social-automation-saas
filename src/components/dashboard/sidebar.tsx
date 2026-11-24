"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Link2,
  Settings2,
  Megaphone,
  CreditCard,
  Sparkles,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/connect", label: "Connect accounts", icon: Link2 },
  { href: "/dashboard/automation", label: "Automation", icon: Settings2 },
  { href: "/dashboard/ads", label: "Ad Manager", icon: Megaphone },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card/50 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2 font-semibold">
        <Sparkles className="h-5 w-5 text-violet-400" />
        SocialFlow
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <p className="px-2 text-xs text-muted-foreground">Auth: Clerk (demo mode)</p>
    </aside>
  );
}