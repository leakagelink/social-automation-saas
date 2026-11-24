import { HomePageContent } from "@/components/socialflow/pages/home-page";
import { organizationJsonLd } from "@/lib/socialflow";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/socialflow";

export const metadata: Metadata = buildMetadata(
  "Social Media Automation Tools for Creators | SocialFlow",
  "Explore social media automation tools for daily posts, AI captions, reels and Meta ads. Plan five platforms in one SocialFlow workspace and keep creative control.",
  "/"
);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <HomePageContent />
    </>
  );
}