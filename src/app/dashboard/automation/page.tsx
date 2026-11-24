import { DashboardAutomation } from "@/components/socialflow/pages/dashboard-automation";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Social Content Automation & Posting Schedule | SocialFlow",
  "Set your SocialFlow niche, caption tone and posting schedule. Save your preferences and preview feed posts, hashtags and reels before live publishing integrations.",
  "/dashboard/automation"
);

export default function AutomationPage() {
  return <DashboardAutomation />;
}