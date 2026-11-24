"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/socialflow";

export function PricingCards() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 border border-border rounded-lg bg-muted">
          <Button
            variant={annual ? "ghost" : "default"}
            size="sm"
            onClick={() => setAnnual(false)}
          >
            Monthly
          </Button>
          <Button
            variant={annual ? "default" : "ghost"}
            size="sm"
            onClick={() => setAnnual(true)}
          >
            Yearly <span className="text-[10px] ml-1">Save ~20%</span>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            className={`price-card ${i === 1 ? "recommended" : ""}`}
            key={plan.name}
          >
            {i === 1 && (
              <span className="recommend-label">Most popular</span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {plan.description}
            </p>
            <div className="mt-7 mb-1">
              <strong className="text-4xl font-bold">
                ${annual ? plan.yearly : plan.monthly}
              </strong>
              <span className="text-sm text-muted-foreground"> / month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              {annual
                ? `Billed $${plan.yearly * 12} annually`
                : "Billed monthly · USD"}
            </p>
            <Button
              variant={i === 1 ? "default" : "outline"}
              className="w-full"
              asChild
            >
              <Link href="/sign-up">
                Start free trial <ArrowRight />
              </Link>
            </Button>
            <ul className="space-y-4 mt-7">
              {plan.features.map((feature) => (
                <li className="flex gap-2 text-sm" key={feature}>
                  <Check size={16} className="text-success shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6">
        Illustrative plans · trial &amp; billing coming soon · available
        worldwide · cancel before renewal
      </p>
    </>
  );
}