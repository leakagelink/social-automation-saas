"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentPreview } from "@/components/dashboard/content-preview";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AutomationPage() {
  const [niche, setNiche] = useState("personal finance");
  const [topic, setTopic] = useState("saving habits");
  const [slots, setSlots] = useState(["09:00", "18:00"]);
  const [toggles, setToggles] = useState({
    captions: true,
    hashtags: true,
    autoPost: false,
    reels: true,
  });

  const previewCaption = `3 ${topic} tips for ${niche} starters you can use today.`;
  const previewTags = ["#moneytips", "#finance", "#socialflow"];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Automation settings</h1>
        <p className="text-muted-foreground">
          Niche, schedule, and toggles that drive your content pipeline.
        </p>
      </div>

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content focus</CardTitle>
              <CardDescription>Niche and topic inform AI generation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="niche">Niche</Label>
                <Input
                  id="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Current topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Posting schedule</CardTitle>
              <CardDescription>Timezone: Asia/Calcutta (default)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className="rounded-md border border-border bg-muted/50 px-3 py-1 text-xs hover:border-violet-500/50"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <span key={slot} className="rounded-lg bg-primary/20 px-3 py-1 text-sm">
                    {slot}
                  </span>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSlots([...slots, "12:00"])}
                >
                  + Add slot
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automation toggles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(
                [
                  ["captions", "AI captions", "Generate on-brand captions"],
                  ["hashtags", "Hashtag packs", "Attach curated hashtag sets"],
                  ["autoPost", "Auto-post", "Publish without manual approval"],
                  ["reels", "Reels mode", "Include reel scripts and vertical previews"],
                ] as const
              ).map(([key, title, desc]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <Switch
                    checked={toggles[key]}
                    onCheckedChange={(v) =>
                      setToggles((t) => ({ ...t, [key]: v }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button variant="gradient">Save automation settings</Button>
        </TabsContent>
        <TabsContent value="preview">
          <div className="grid gap-6 lg:grid-cols-2">
            <ContentPreview
              type="post"
              platform="Facebook"
              caption={previewCaption}
              hashtags={toggles.hashtags ? previewTags : []}
            />
            {toggles.reels && (
              <ContentPreview
                type="reel"
                platform="Instagram"
                caption={previewCaption}
                hashtags={previewTags}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}