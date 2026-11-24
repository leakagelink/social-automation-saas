import { DashboardAds } from "@/components/socialflow/pages/dashboard-ads";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Meta Ads Automation & Campaign Rule Preview | SocialFlow",
  "Preview SocialFlow Meta ads automation with campaign goals, CPA pause thresholds and ROAS scale rules. No campaigns are launched or modified in this workspace.",
  "/dashboard/ads"
);

export default function AdsPage() {
  return <DashboardAds />;
}