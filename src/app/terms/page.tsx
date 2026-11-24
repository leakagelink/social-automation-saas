import { MarketingLayout, PageTitle } from "@/components/socialflow/marketing";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Terms of Service & Product Preview Rules | SocialFlow",
  "Read the SocialFlow terms of service draft covering account access, responsible use and the product preview. Social publishing and paid billing are not yet active.",
  "/terms"
);

export default function TermsPage() {
  return (
    <MarketingLayout>
      <PageTitle
        label="A clear starting point"
        title="Terms of service"
        description="Draft terms · legal review required before commercial launch · updated November 24, 2026"
      />
      <article className="article-body">
        <h2>Preview status</h2>
        <p>
          SocialFlow is currently a product preview. Publishing, reels generation, Meta campaign
          execution, subscriptions, and trials are not operational unless explicitly configured.
        </p>
        <h2>Your account</h2>
        <p>
          Keep your sign-in information secure, provide information you have permission to use, and do
          not share your account credentials. You are responsible for content and profile information
          you submit.
        </p>
        <h2>Responsible use</h2>
        <p>
          Respect platform policies, intellectual property, privacy, and applicable laws. Do not use
          the service for spam, impersonation, unauthorized account access, or deceptive content.
        </p>
        <h2>Planned subscriptions</h2>
        <p>
          Prices and plan features are illustrative until Stripe billing launches. Billing cadence,
          cancellation, refund rules, taxes, and fair-use limits must be finalized before accepting
          payments.
        </p>
        <h2>Availability and changes</h2>
        <p>
          The preview may change and may be interrupted. Do not rely on sample queues as a publishing
          service. Final service commitments require legal review.
        </p>
      </article>
    </MarketingLayout>
  );
}