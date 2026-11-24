import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentPreview } from "@/components/dashboard/content-preview";
import { getContentService } from "@/server/ai-content";
import { PLATFORMS } from "@/lib/platforms";
import { ArrowRight, Radio } from "lucide-react";

export default async function DashboardPage() {
  const content = await getContentService().generate({
    niche: "fitness",
    topic: "morning routines",
    tone: "casual",
    platform: "instagram",
    includeHashtags: true,
    includeReelScript: true,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Dheeraj</h1>
        <p className="text-muted-foreground">
          Your automation command center for five platforms.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Connected accounts" value="0 / 5" href="/dashboard/connect" />
        <StatCard label="Scheduled this week" value="0" href="/dashboard/automation" />
        <StatCard label="Plan" value="Trial" href="/dashboard/billing" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ContentPreview
          type="post"
          platform="Instagram"
          caption={content.caption}
          hashtags={content.hashtags}
        />
        <ContentPreview
          type="reel"
          platform="Instagram"
          caption={content.reelScript?.split("\n")[0] ?? content.caption}
          hashtags={content.hashtags}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-violet-400" />
            Quick start
          </CardTitle>
          <CardDescription>Connect platforms to unlock publishing.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <span
              key={p.id}
              className="rounded-full border border-border px-3 py-1 text-xs capitalize"
            >
              {p.name}
            </span>
          ))}
          <Button className="ml-auto" variant="gradient" asChild>
            <Link href="/dashboard/connect">
              Connect accounts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition hover:border-violet-500/40">
        <CardHeader className="pb-2">
          <CardDescription>{label}</CardDescription>
          <CardTitle className="text-2xl">{value}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}