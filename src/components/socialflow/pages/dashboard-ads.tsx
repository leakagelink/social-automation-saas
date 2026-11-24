"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Eye,
  Link2,
  MousePointerClick,
  ShoppingBag,
  Users,
} from "lucide-react";
import { DashboardHeading, ComingSoon } from "@/components/socialflow/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlatformIcon } from "@/components/socialflow/platform";

export function DashboardAds() {
  const [goal, setGoal] = useState("Traffic");
  const [cpa, setCpa] = useState(20);
  const [roas, setRoas] = useState(3);
  const [scale, setScale] = useState(15);
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardHeading
        title="Organic meets paid."
        description="A smarter campaign plan, right alongside your content."
      />
      <div className="flex flex-wrap items-center justify-between gap-5 border-y border-border py-6 mb-7">
        <div className="flex items-center gap-3">
          <PlatformIcon name="Facebook" />
          <div>
            <h2 className="font-bold">Meta Ads Manager</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Not connected · campaign execution coming soon
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Link2 />
          Connect Meta
        </Button>
      </div>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <section className="dashboard-panel">
          <h2 className="mb-5">What&apos;s your campaign goal?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              [MousePointerClick, "Traffic", "More people on your website."],
              [Users, "Engagement", "More meaningful interactions."],
              [Eye, "Video views", "Let your story reach further."],
              [ShoppingBag, "Conversions", "Turn interest into action."],
            ].map(([Icon, label, detail]) => {
              const GoalIcon = Icon as typeof MousePointerClick;
              return (
                <Button
                  key={String(label)}
                  type="button"
                  variant={goal === label ? "default" : "outline"}
                  className="h-auto py-4 px-4 justify-start whitespace-normal text-left"
                  onClick={() => setGoal(String(label))}
                >
                  <GoalIcon className="shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold">{String(label)}</span>
                    <span className="block text-[10px] opacity-80 mt-1">{String(detail)}</span>
                  </span>
                </Button>
              );
            })}
          </div>
          <h2 className="mt-8 mb-5">Your guardrails</h2>
          <div className="space-y-5">
            <div>
              <label className="field-label" htmlFor="cpa">
                Pause when CPA exceeds (USD)
              </label>
              <Input
                type="number"
                id="cpa"
                min={1}
                max={10000}
                value={cpa}
                onChange={(e) => setCpa(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="roas">
                Scale when ROAS is above
              </label>
              <Input
                type="number"
                id="roas"
                min={0.1}
                max={100}
                step={0.1}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="scale">
                Increase daily budget by (%)
              </label>
              <Input
                id="scale"
                type="number"
                min={1}
                max={100}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-5">Your rules, at a glance.</h2>
          <div className="feature-item mb-4">
            <BarChart3 size={22} className="text-primary mb-3" />
            <span className="status-pill pending">Preview only</span>
            <h3 className="mt-4">Protect your budget.</h3>
            <p>
              For your {goal.toLowerCase()} campaign, pause when cost per acquisition exceeds{" "}
              <strong>${cpa || 0}</strong>.
            </p>
          </div>
          <div className="feature-item">
            <ArrowUpRight size={22} className="text-success mb-3" />
            <span className="status-pill pending">Preview only</span>
            <h3 className="mt-4">Make room for what works.</h3>
            <p>
              When return on ad spend exceeds <strong>{roas || 0}×</strong>, increase daily budget by{" "}
              <strong>{scale || 0}%</strong>.
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-5">
            Rules are temporary previews. No campaign or budget is changed. Server stubs live in{" "}
            <code className="text-[10px]">src/server/stripe.ts</code> for billing only.
          </p>
        </section>
      </div>
      <ComingSoon open={open} onOpenChange={setOpen} title="Meta Ads Manager" />
    </>
  );
}