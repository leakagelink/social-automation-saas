import { MarketingLayout, PageTitle } from "@/components/socialflow/marketing";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Privacy Policy & Account Data Overview | SocialFlow",
  "Review the SocialFlow privacy policy draft for account profiles, sign-in and planned social integrations. Understand data handling before using the product preview.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <PageTitle
        label="Your trust matters"
        title="Privacy policy"
        description="Draft policy · legal review required before commercial launch · updated November 24, 2026"
      />
      <article className="article-body">
        <h2>About this draft</h2>
        <p>
          This is a preliminary policy shell, not a complete legal notice. SocialFlow must finalize
          its business identity, contact details, retention periods, processor list, and jurisdiction
          before launch.
        </p>
        <h2>Account information</h2>
        <p>
          This Next.js app uses Clerk for production authentication (when keys are set). In demo
          mode, no account data leaves your browser except optional local preference storage.
          Profile data in the preview is illustrative.
        </p>
        <h2>Social account connections</h2>
        <p>
          Social publishing integrations are not active in this preview. OAuth stubs under{" "}
          <code className="text-xs">src/app/api/oauth</code> return messages only until platform apps
          are configured.
        </p>
        <h2>Payments and AI</h2>
        <p>
          Stripe checkout is stubbed until keys are configured. Caption examples and queues are
          illustrative unless server AI keys are enabled.
        </p>
        <h2>Your choices</h2>
        <p>
          You can clear browser-stored automation preferences and sign out at any time. Data export,
          deletion requests, and retention details require legal review before launch.
        </p>
      </article>
    </MarketingLayout>
  );
}