"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Target, TrendingUp, Users, Video } from "lucide-react";

const GOALS = [
  {
    id: "traffic",
    label: "Drive traffic",
    description: "Optimize for link clicks and profile visits",
    icon: TrendingUp,
  },
  {
    id: "engagement",
    label: "Boost engagement",
    description: "Likes, comments, and shares",
    icon: Users,
  },
  {
    id: "video",
    label: "Video views",
    description: "Reels and video view campaigns",
    icon: Video,
  },
  {
    id: "conversions",
    label: "Conversions",
    description: "Sales and lead events (pixel required)",
    icon: Target,
  },
];

export default function AdManagerPage() {
  const [metaConnected, setMetaConnected] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("traffic");
  const [autoRules, setAutoRules] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Ad Manager</h1>
        <p className="text-muted-foreground">
          Meta Ads connection stub and automation goals for paid amplification.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Meta Ads account</CardTitle>
            <CardDescription>
              Requires Marketing API access and Business Verification.
            </CardDescription>
          </div>
          <Badge variant={metaConnected ? "success" : "outline"}>
            {metaConnected ? "Connected (stub)" : "Not connected"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs">
            <p className="text-muted-foreground">Env vars:</p>
            <p>META_ADS_APP_ID, META_ADS_APP_SECRET, META_ADS_REDIRECT_URI</p>
            <p>META_SYSTEM_USER_TOKEN (optional, for advanced automation)</p>
          </div>
          <Button
            variant="gradient"
            onClick={() => setMetaConnected(true)}
          >
            Connect Meta Ads
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation goals</CardTitle>
          <CardDescription>
            Maps UI selections to campaign objectives (write access in Phase 5).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={`rounded-xl border p-4 text-left transition ${
                selectedGoal === goal.id
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <goal.icon className="mb-2 h-5 w-5 text-violet-400" />
              <p className="font-medium">{goal.label}</p>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rules engine</CardTitle>
          <CardDescription>Preview — pause or scale based on performance.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <Label>Enable automation rules (beta)</Label>
            <p className="text-sm text-muted-foreground">
              e.g. pause when CPA exceeds 2× target
            </p>
          </div>
          <Switch checked={autoRules} onCheckedChange={setAutoRules} />
        </CardContent>
      </Card>
    </div>
  );
}