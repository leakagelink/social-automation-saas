import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Sparkles } from "lucide-react";
import {
  MarketingLayout,
  PageTitle,
  CTABand,
} from "@/components/socialflow/marketing";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Social Media Automation Guides & Ideas | SocialFlow",
  "Read practical social media automation guides from SocialFlow. Learn how to plan consistent posts, use AI captions thoughtfully and build a creative content rhythm.",
  "/blog"
);

export default function BlogIndexPage() {
  return (
    <MarketingLayout>
      <PageTitle
        label="The SocialFlow journal"
        title="Fresh ideas. A clearer content plan."
        description="Practical reads for creators and brands who want to show up consistently — and still sound like themselves."
      />
      <section className="section">
        <div className="site-container grid md:grid-cols-3 gap-6">
          <Link
            className="feature-item"
            href="/blog/how-to-automate-social-media-posts"
          >
            <span className="feature-icon">
              <CalendarDays size={22} />
            </span>
            <span className="kicker">The fundamentals · 6 min read</span>
            <h2 className="text-xl font-bold my-4">
              How to automate social media posts without losing your voice
            </h2>
            <p>
              A practical guide to scheduling, approvals, and a content rhythm that leaves room for
              real conversation.
            </p>
            <span className="text-primary text-sm flex gap-2 mt-6">
              Read the guide <ArrowRight size={16} />
            </span>
          </Link>
          <article className="feature-item">
            <span className="feature-icon">
              <BookOpen size={22} />
            </span>
            <span className="kicker">Up next</span>
            <h2 className="text-xl font-bold my-4">
              What is social media automation? A creator&apos;s first guide
            </h2>
            <p>
              Understand which tasks to automate, what to keep human, and how to build a consistent
              publishing workflow.
            </p>
            <p className="mt-6 text-xs">Article outline · coming soon</p>
          </article>
          <article className="feature-item">
            <span className="feature-icon">
              <Sparkles size={22} />
            </span>
            <span className="kicker">Up next</span>
            <h2 className="text-xl font-bold my-4">
              How to use social media automation mindfully
            </h2>
            <p>
              Bring intention to scheduled content. Learn how to review your drafts and keep
              authentic conversations at the center.
            </p>
            <p className="mt-6 text-xs">Article outline · coming soon</p>
          </article>
        </div>
      </section>
      <CTABand />
    </MarketingLayout>
  );
}