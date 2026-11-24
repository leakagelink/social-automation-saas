import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/server/stripe";
import type { PlanTier } from "@/server/users";

export async function POST(req: Request) {
  const body = (await req.json()) as { planId: PlanTier; priceId: string };

  if (!isStripeConfigured()) {
    return NextResponse.json({
      url: "#configure-stripe",
      message: `Demo: add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to checkout for ${body.planId}.`,
    });
  }

  // Production: stripe.checkout.sessions.create({ mode: 'subscription', line_items: [...] })
  return NextResponse.json({
    url: `/dashboard/billing?success=stub&plan=${body.planId}`,
    message: "Wire Stripe SDK session creation here.",
  });
}