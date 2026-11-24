"use client";

import { Button } from "@/components/ui/button";
import { PlanTier } from "@/server/users";

export function CheckoutButton({
  planId,
  priceId,
}: {
  planId: PlanTier;
  priceId: string;
}) {
  async function handleCheckout() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, priceId }),
    });
    const data = await res.json();
    if (data.url && !data.url.startsWith("#")) {
      window.location.href = data.url;
    } else {
      alert(data.message ?? "Configure Stripe env vars to enable checkout.");
    }
  }

  return (
    <Button variant="gradient" className="w-full" onClick={handleCheckout}>
      Subscribe
    </Button>
  );
}