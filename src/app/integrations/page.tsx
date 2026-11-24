import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  MarketingLayout,
  PageTitle,
  CTABand,
  CheckList,
} from "@/components/socialflow/marketing";
import { PlatformIcon } from "@/components/socialflow/platform";
import { Button } from "@/components/ui/button";
import { platforms, buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Instagram & Social Platform Integrations | SocialFlow",
  "Explore SocialFlow integrations for Instagram, Facebook, X, YouTube and Pinterest. Discover planned auto posting, reels, captions and secure account connections.",
  "/integrations"
);

const INTEGRATION_ITEMS: Record<string, string[]> = {
  Instagram: [
    "Professional-account feed posts",
    "Reels planning & approval",
    "AI captions and niche hashtags",
  ],
  Facebook: [
    "Page content scheduling",
    "Post captions and media",
    "Meta ads rules preview",
  ],
  YouTube: [
    "Video and Shorts planning",
    "Titles and descriptions",
    "Scheduled video publishing",
  ],
  Pinterest: [
    "Pin scheduling",
    "Board-oriented planning",
    "Descriptions and destination links",
  ],
  X: [
    "Scheduled text and media",
    "Platform-ready captions",
    "A unified content queue",
  ],
};

export default function IntegrationsPage() {
  return (
    <MarketingLayout>
      <PageTitle
        label="Your world, connected"
        title="All your platforms. Finally in sync."
        description="A home for your Instagram, Facebook, X, YouTube, and Pinterest content. Official connections, thoughtful automation."
      />
      <section className="section">
        <div className="site-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((name) => (
              <article className="feature-item" key={name}>
                <div className="flex justify-between mb-5">
                  <PlatformIcon name={name} />
                  <span className="status-pill pending">Coming soon</span>
                </div>
                <h2 className="text-xl font-bold mb-5">
                  {name === "X" ? "X / Twitter" : name}
                </h2>
                <CheckList items={INTEGRATION_ITEMS[name]} />
                <Button asChild variant="link" className="px-0 mt-6">
                  <Link href="/dashboard/connect">
                    Explore connection <ArrowRight />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
          <div className="flex gap-3 items-start mt-10 max-w-2xl mx-auto text-sm text-muted-foreground">
            <ShieldCheck className="text-success shrink-0" />
            <p>
              Connections will use official OAuth permissions, never your social passwords. Account
              eligibility, platform approval, and API limits apply.
            </p>
          </div>
        </div>
      </section>
      <CTABand />
    </MarketingLayout>
  );
}