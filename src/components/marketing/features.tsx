import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Hash,
  Megaphone,
  Sparkles,
  Video,
  Link2,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Connect all five",
    description:
      "OAuth-ready flows for Meta, X, Google, and Pinterest with encrypted token storage.",
  },
  {
    icon: Sparkles,
    title: "AI captions & hashtags",
    description:
      "Niche-aware copy that matches your brand voice—approve before anything goes live.",
  },
  {
    icon: Calendar,
    title: "Smart scheduling",
    description:
      "Timezone-aware posting windows. Queue once, publish everywhere.",
  },
  {
    icon: Video,
    title: "Reels pipeline",
    description:
      "Scripts, previews, and platform-specific exports for short-form video.",
  },
  {
    icon: Hash,
    title: "Hashtag intelligence",
    description:
      "Curated sets with blocklists so you stay clear of shadowbans and spam flags.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads goals",
    description:
      "Connect ad accounts and map automation goals to traffic, views, and conversions.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/50 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Built for creators who ship</h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to automate social—without losing your voice.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="glass border-white/5 transition hover:border-violet-500/30">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}