import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  MarketingLayout,
  PageTitle,
  CTABand,
} from "@/components/socialflow/marketing";
import { DashboardPreview, PostPreview } from "@/components/socialflow/preview";
import { Button } from "@/components/ui/button";
import { capabilities, buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Automate Instagram Posts & AI Captions | SocialFlow",
  "Explore how to automate Instagram posts with SocialFlow. Preview AI captions, niche hashtags, reels and an approval-first calendar for five social media platforms.",
  "/features"
);

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <PageTitle
        label="Built around your creative rhythm"
        title="Your ideas deserve a better workflow."
        description="Automate Instagram posts, plan your next reel, and bring your content together — without handing over your voice."
      />
      <section className="section">
        <div className="site-container">
          <DashboardPreview />
        </div>
      </section>
      <section className="section bg-muted border-y border-border">
        <div className="site-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ title, description, icon: Icon, label }) => (
              <article className="feature-item" key={title}>
                <span className="feature-icon">
                  <Icon size={22} />
                </span>
                <span className="kicker">{label}</span>
                <h2 className="text-xl font-bold mt-3 mb-3">{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="kicker">Your final say. Every time.</span>
            <h2 className="text-3xl font-bold mt-4 mb-5">
              An AI caption generator.
              <br />
              Not a replacement for you.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Choose your niche and tone. Review a feed post or 9:16 reel. Edit every word, then
              send your content to the approval queue.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Live generation and publishing are coming soon. Current previews use sample content.
            </p>
            <Button asChild>
              <Link href="/sign-up">
                Find your flow <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <PostPreview caption="Small moments, big glow. A little self-care goes a long way. ✨" />
          </div>
        </div>
      </section>
      <CTABand />
    </MarketingLayout>
  );
}