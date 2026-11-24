import { DashboardBilling } from "@/components/socialflow/pages/dashboard-billing";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Your Subscription & SocialFlow Billing Overview",
  "Explore SocialFlow subscription plans and your billing overview. Compare Starter, Growth and Agency options. Checkout uses Stripe stubs until keys are configured.",
  "/dashboard/billing"
);

export default function BillingPage() {
  return <DashboardBilling />;
}