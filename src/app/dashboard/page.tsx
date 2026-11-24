import { DashboardOverview } from "@/components/socialflow/pages/dashboard-overview";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Your Social Content Dashboard & Calendar | SocialFlow",
  "Review your SocialFlow workspace calendar, content queue and platform overview. Plan new content and explore an approval-first social media automation workflow.",
  "/dashboard"
);

export default function DashboardPage() {
  return <DashboardOverview />;
}