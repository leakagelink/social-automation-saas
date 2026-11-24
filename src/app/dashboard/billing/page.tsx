import { PRICING_PLANS, createCheckoutSessionStub, isStripeConfigured } from "@/server/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "./checkout-button";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const stripeReady = isStripeConfigured();
  const highlighted = searchParams.plan ?? "growth";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Stripe Checkout integration — configure keys in `.env.local`.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Stripe status
            <Badge variant={stripeReady ? "success" : "outline"}>
              {stripeReady ? "Configured" : "Demo mode"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Use test mode keys for development. Webhook: POST /api/webhooks/stripe
          </CardDescription>
        </CardHeader>
        <CardContent className="font-mono text-xs text-muted-foreground">
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={plan.id === highlighted ? "border-violet-500/50" : undefined}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-2xl font-bold">${plan.priceMonthly}/mo</p>
            </CardHeader>
            <CardContent>
              <CheckoutButton planId={plan.id} priceId={plan.priceId} />
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Stub message: {(await createCheckoutSessionStub("growth")).message}
      </p>
    </div>
  );
}