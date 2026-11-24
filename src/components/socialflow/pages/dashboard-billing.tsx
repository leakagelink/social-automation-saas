"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { DashboardHeading, ComingSoon } from "@/components/socialflow/dashboard";
import { PricingCards } from "@/components/socialflow/pricing";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/app/dashboard/billing/checkout-button";

export function DashboardBilling() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardHeading
        title="More room for your next idea."
        description="A plan that fits your creative ambitions."
      />
      <section className="mb-10 border-y border-border py-6 flex flex-wrap gap-6 justify-between items-center">
        <div>
          <span className="status-pill pending mb-3">Stripe stub</span>
          <h2 className="text-xl font-bold">No active paid subscription</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Use the Stripe checkout stub below when keys are configured in{" "}
            <code className="text-xs">.env.local</code>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setOpen(true)}>
            <CreditCard />
            Checkout preview
          </Button>
          <CheckoutButton planId="growth" priceId="price_growth_placeholder" />
        </div>
      </section>
      <PricingCards />
      <div className="flex gap-3 text-sm text-muted-foreground mt-10 border-t border-border pt-6">
        <ShieldCheck size={20} className="text-success shrink-0" />
        <p>
          Checkout hits <code className="text-xs">POST /api/stripe/checkout</code>. Without Stripe
          env vars, the API returns a demo message — same behavior as the previous billing page.
        </p>
      </div>
      <ComingSoon open={open} onOpenChange={setOpen} title="Subscription checkout">
        Paid plans aren&apos;t active yet without Stripe keys. No payment is collected and no
        subscription will be created.
      </ComingSoon>
    </>
  );
}