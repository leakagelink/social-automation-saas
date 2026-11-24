"use client";

import { useState, type FormEvent } from "react";
import { Check, Clapperboard, Hash, Save, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeading } from "@/components/socialflow/dashboard";
import { PostPreview } from "@/components/socialflow/preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DEFAULT_AUTOMATION,
  loadAutomationSettings,
  saveAutomationSettings,
  TIMEZONES,
  type AutomationSettings,
  type AutomationTone,
} from "@/lib/profile";

const TONES: AutomationTone[] = [
  "Friendly",
  "Professional",
  "Playful",
  "Inspiring",
];

export function DashboardAutomation() {
  const [settings, setSettings] = useState<AutomationSettings>(() =>
    typeof window !== "undefined" ? loadAutomationSettings() : DEFAULT_AUTOMATION
  );
  const [tab, setTab] = useState("Feed post");
  const [caption, setCaption] = useState(
    "Small moments, big glow. A little self-care goes a long way. ✨"
  );
  const [busy, setBusy] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      saveAutomationSettings(settings);
      toast.success("Your preferences are saved. Publishing remains off.");
    } finally {
      setBusy(false);
    }
  }

  function draft() {
    const opening =
      settings.tone === "Professional"
        ? "A thoughtful approach to"
        : settings.tone === "Playful"
          ? "A little more fun, a little more"
          : settings.tone === "Inspiring"
            ? "Make space for what matters:"
            : "Small moments, big possibilities:";
    setCaption(
      `${opening} ${settings.niche.toLowerCase()}. What’s one thing you’re making time for today? ✨`
    );
    toast.info(
      "Sample caption refreshed. Live AI generation uses server stubs when wired."
    );
  }

  return (
    <>
      <DashboardHeading
        title="Set your flow."
        description="Your niche, your voice, your rhythm."
      />
      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-7">
        <form onSubmit={submit} className="space-y-6">
          <section className="dashboard-panel">
            <h2 className="mb-6">Your creative direction</h2>
            <label htmlFor="niche" className="field-label">
              Niche or topic
            </label>
            <Input
              id="niche"
              required
              maxLength={200}
              value={settings.niche}
              onChange={(e) =>
                setSettings({ ...settings, niche: e.target.value })
              }
              placeholder="e.g. fitness, skincare, travel"
            />
            <div className="mt-5">
              <label htmlFor="tone" className="field-label">
                Caption tone
              </label>
              <select
                id="tone"
                className="native-select"
                value={settings.tone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    tone: e.target.value as AutomationTone,
                  })
                }
              >
                {TONES.map((tone) => (
                  <option key={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </section>
          <section className="dashboard-panel">
            <h2 className="mb-6">Your posting rhythm</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="timezone" className="field-label">
                  Timezone
                </label>
                <select
                  className="native-select"
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                >
                  {TIMEZONES.map((zone) => (
                    <option key={zone}>{zone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="post-time" className="field-label">
                  Daily posting time
                </label>
                <Input
                  id="post-time"
                  type="time"
                  value={settings.time}
                  onChange={(e) =>
                    setSettings({ ...settings, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Daily at {settings.time} · {settings.timezone}. Preferences stored
              locally in this preview (Clerk user prefs TBD).
            </p>
          </section>
          <section className="dashboard-panel">
            <h2 className="mb-4">Make it your own</h2>
            {(
              [
                {
                  key: "captions" as const,
                  label: "AI captions",
                  detail: "A first draft in your voice.",
                  Icon: Sparkles,
                },
                {
                  key: "hashtags" as const,
                  label: "Smart hashtags",
                  detail: "Ideas tailored to your niche.",
                  Icon: Hash,
                },
                {
                  key: "autopost" as const,
                  label: "Auto-post preference",
                  detail: "Publishing coming soon. Approval required.",
                  Icon: Zap,
                },
                {
                  key: "reels" as const,
                  label: "Reels workflow",
                  detail: "Short-form content, from idea to approval.",
                  Icon: Clapperboard,
                },
              ] as const
            ).map(({ key, label, detail, Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-4 border-b border-border last:border-0"
              >
                <div className="flex gap-3 items-center">
                  <Icon className="text-primary" size={20} />
                  <div>
                    <label htmlFor={`toggle-${key}`} className="text-sm font-semibold">
                      {label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">{detail}</p>
                  </div>
                </div>
                <Switch
                  id={`toggle-${key}`}
                  checked={settings[key]}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, [key]: checked })
                  }
                />
              </div>
            ))}
          </section>
          <Button type="submit" disabled={busy}>
            <Save />
            {busy ? "Saving…" : "Save preferences"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Saved in browser localStorage in demo mode. Nothing will be published.
          </p>
        </form>
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold">Content preview</h2>
            <span className="status-pill pending">Sample</span>
          </div>
          <div className="flex gap-2 mb-5">
            {["Feed post", "Reel"].map((value) => (
              <Button
                variant={tab === value ? "default" : "outline"}
                size="sm"
                onClick={() => setTab(value)}
                key={value}
              >
                {value}
              </Button>
            ))}
          </div>
          <div className="flex justify-center">
            <PostPreview caption={caption} reel={tab === "Reel"} />
          </div>
          <div className="mt-6">
            <label htmlFor="caption-edit" className="field-label">
              Make the caption yours
            </label>
            <Textarea
              id="caption-edit"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-3"
              disabled={!settings.niche.trim()}
              onClick={draft}
            >
              <Sparkles />
              Refresh sample caption
            </Button>
            <p className="text-xs text-muted-foreground mt-4 flex gap-2">
              <Check size={14} className="text-success" />
              Use <code className="text-[10px]">src/server/ai-content.ts</code>{" "}
              for live generation when API keys are configured.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}