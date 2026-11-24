import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { SocialProof } from "@/components/marketing/social-proof";
import { Pricing } from "@/components/marketing/pricing";
import { CtaFooter } from "@/components/marketing/cta-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <CtaFooter />
      </main>
    </div>
  );
}