import { DashboardConnect } from "@/components/socialflow/pages/dashboard-connect";
import { buildMetadata } from "@/lib/socialflow";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata(
  "Connect Your Social Platform Accounts | SocialFlow",
  "Explore secure SocialFlow account connections for Instagram, Facebook, X, YouTube and Pinterest. Official publishing integrations are coming soon to your workspace.",
  "/dashboard/connect"
);

export default function ConnectAccountsPage() {
  return <DashboardConnect />;
}