import {
  MarketingLayout,
  PageTitle,
  FAQ,
  CTABand,
} from "@/components/socialflow/marketing";
import { PricingCards } from "@/components/socialflow/pricing";
import { Check, X } from "lucide-react";
import { buildMetadata, faqSchema } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Social Media Scheduling Tools & Pricing | SocialFlow",
  "Compare SocialFlow plans for creators, brands and agencies. Explore social media scheduling tools, AI captions and reels with clear pricing and creative control.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <MarketingLayout>
        <PageTitle
          label="Simple plans. Serious momentum."
          title="A little investment. A lot more flow."
          description="From your first consistent week to your next big brand. Find a plan that grows with you."
        />
        <section className="section">
          <div className="site-container">
            <PricingCards />
          </div>
        </section>
        <section className="section bg-muted">
          <div className="site-container max-w-3xl">
            <div className="section-heading">
              <span className="kicker">Make the switch</span>
              <h2>Same creativity. Fewer manual steps.</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 pr-4">Your workflow</th>
                    <th className="px-4">Manual posting</th>
                    <th className="px-4 text-primary">SocialFlow · planned</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["One unified calendar", false],
                    ["Captions with a head start", false],
                    ["Approve before publishing", true],
                    ["Niche-based hashtag drafts", false],
                    ["Organic and paid in one place", false],
                  ].map(([label, manual]) => (
                    <tr className="border-b border-border" key={String(label)}>
                      <td className="py-5 pr-4">{label}</td>
                      <td className="px-4">
                        {manual ? (
                          <Check size={17} className="text-success" />
                        ) : (
                          <X size={17} className="text-muted-foreground" />
                        )}
                      </td>
                      <td className="px-4">
                        <Check size={17} className="text-success" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <FAQ />
        <CTABand />
      </MarketingLayout>
    </>
  );
}