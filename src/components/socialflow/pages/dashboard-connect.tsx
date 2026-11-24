"use client";

import { useState } from "react";
import { Link2, ShieldCheck } from "lucide-react";
import { DashboardHeading, ComingSoon } from "@/components/socialflow/dashboard";
import { PlatformIcon } from "@/components/socialflow/platform";
import { CheckList } from "@/components/socialflow/marketing";
import { Button } from "@/components/ui/button";
import { platforms } from "@/lib/socialflow";
import { platformNameToId } from "@/lib/profile";

const PLATFORM_COPY: Record<string, { blurb: string; items: string[] }> = {
  Instagram: {
    blurb: "Feed posts, captions, and reels.",
    items: ["Official OAuth connection planned", "You choose the permissions"],
  },
  Facebook: {
    blurb: "Page posts and Meta campaigns.",
    items: ["Official OAuth connection planned", "You choose the permissions"],
  },
  YouTube: {
    blurb: "Videos, Shorts, and descriptions.",
    items: ["Official OAuth connection planned", "You choose the permissions"],
  },
  Pinterest: {
    blurb: "Pins, boards, and fresh ideas.",
    items: ["Official OAuth connection planned", "You choose the permissions"],
  },
  X: {
    blurb: "Your thoughts. On schedule.",
    items: ["Official OAuth connection planned", "You choose the permissions"],
  },
};

export function DashboardConnect() {
  const [platform, setPlatform] = useState("");
  const [connecting, setConnecting] = useState<string | null>(null);

  async function tryConnect(name: string) {
    const id = platformNameToId(name as (typeof platforms)[number]);
    setConnecting(name);
    try {
      const res = await fetch(`/api/oauth/${id}/start`);
      const data = await res.json();
      if (data.status === "oauth_stub") {
        alert(data.message ?? "OAuth stub — see README for production steps.");
      } else {
        setPlatform(name);
      }
    } finally {
      setConnecting(null);
    }
  }

  return (
    <>
      <DashboardHeading
        title="Your world, connected."
        description="Bring your favorite social platforms into one flow."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((name) => {
          const copy = PLATFORM_COPY[name];
          return (
            <article className="feature-item" key={name}>
              <div className="flex justify-between mb-5">
                <PlatformIcon name={name} />
                <span className="status-pill pending">Not connected</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{name}</h2>
              <p className="text-sm text-muted-foreground mb-5">{copy.blurb}</p>
              <CheckList items={copy.items} />
              <Button
                className="w-full mt-6"
                variant="outline"
                disabled={connecting === name}
                onClick={() => void tryConnect(name)}
              >
                <Link2 />
                {connecting === name ? "Connecting…" : `Connect ${name}`}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Stub OAuth via Next API · no live publishing
              </p>
            </article>
          );
        })}
      </div>
      <div className="flex items-start gap-3 text-muted-foreground text-sm border-t border-border pt-6 mt-7">
        <ShieldCheck className="text-success shrink-0" />
        <p>
          Never share your social account password. Connections use official
          permissions and can be revoked from the provider.
        </p>
      </div>
      <ComingSoon
        open={Boolean(platform)}
        onOpenChange={(open) => {
          if (!open) setPlatform("");
        }}
        title={`${platform} connection`}
      />
    </>
  );
}