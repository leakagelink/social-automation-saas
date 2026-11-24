import { PlanTier } from "./users";

export interface PricingPlan {
  id: PlanTier;
  name: string;
  priceMonthly: number;
  priceId: string; // Stripe Price ID placeholder
  features: string[];
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 29,
    priceId: "price_starter_placeholder",
    features: [
      "2 social accounts",
      "30 scheduled posts / mo",
      "AI captions & hashtags",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 79,
    priceId: "price_growth_placeholder",
    highlighted: true,
    features: [
      "All 5 platforms",
      "Unlimited scheduled posts",
      "Reels scripts + auto-post",
      "Meta Ads insights (read-only)",
      "Priority support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 199,
    priceId: "price_agency_placeholder",
    features: [
      "10 workspaces",
      "Team seats",
      "Ad automation rules",
      "API access",
      "Dedicated CSM",
    ],
  },
];

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
}

/**
 * Production: Stripe Checkout Session via /api/stripe/checkout
 */
export async function createCheckoutSessionStub(planId: PlanTier): Promise<{
  url: string;
  message: string;
}> {
  if (!isStripeConfigured()) {
    return {
      url: "#configure-stripe",
      message: `Demo mode: set STRIPE_* env vars to open Checkout for ${planId}.`,
    };
  }
  return {
    url: "/api/stripe/checkout?plan=" + planId,
    message: "Redirecting to Stripe Checkout…",
  };
}