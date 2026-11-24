import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  CreditCard,
  LayoutDashboard,
  Link2,
  Megaphone,
  MoreHorizontal,
  Plus,
  Sparkles,
} from "lucide-react";
import { Brand, PlatformIcon } from "./platform";

/** Remote preview asset from Lovable build; replace with local `/socialflow-content.png` when available. */
export const contentPhoto =
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80";

export function CalendarPreview({
  large = false,
  offset = 0,
}: {
  large?: boolean;
  offset?: number;
}) {
  return (
    <div className="mini-calendar">
      <div className="flex items-center justify-between mb-4">
        <strong className={large ? "text-sm" : "text-xs"}>November 2026</strong>
        <div className="flex gap-3 text-muted-foreground">
          <ChevronLeft size={13} />
          <ChevronRight size={13} />
        </div>
      </div>
      <div className="calendar-grid">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="text-center text-[9px] text-muted-foreground pb-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <div
            key={i}
            className={`calendar-cell ${
              [2, 5, 9, 12, 16, 18, 23, 25].includes(i + offset)
                ? "has-post"
                : ""
            } ${large ? "min-h-20 md:min-h-24" : ""}`}
          >
            <span>{i + 1}</span>
            {[2, 5, 9, 12, 16, 18, 23, 25].includes(i + offset) && (
              <div className="calendar-post" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPreview() {
  const menu = [
    [LayoutDashboard, "Overview"],
    [Link2, "Connected accounts"],
    [Sparkles, "Automation"],
    [Clapperboard, "Reels studio"],
    [Megaphone, "Ads manager"],
    [CreditCard, "Billing"],
  ] as const;

  return (
    <div
      className="preview-wrap reveal reveal-delay"
      aria-label="SocialFlow dashboard sample"
    >
      <div className="preview-dashboard">
        <aside className="preview-sidebar">
          <Brand />
          <div className="mt-6 mb-4 border border-border rounded-md px-2 py-2 flex items-center gap-2">
            <span className="size-6 rounded bg-violet-soft text-primary grid place-items-center font-bold">
              A
            </span>
            <span>Alex&apos;s workspace</span>
            <span className="ml-auto text-muted-foreground">⌄</span>
          </div>
          <div className="text-[8px] text-muted-foreground px-3 mb-2">
            WORKSPACE
          </div>
          {menu.map(([Icon, label], i) => (
            <div
              className={`preview-sidebar-item ${i === 0 ? "selected" : ""}`}
              key={label}
            >
              <Icon size={14} />
              {label}
            </div>
          ))}
          <div className="mt-10 mx-2 text-[9px] text-muted-foreground">
            ✦ Growth plan <span className="text-primary">↗</span>
          </div>
        </aside>
        <div className="preview-body">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-bold text-lg">
                Good morning, Alex <span aria-hidden="true">☀️</span>
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Your social presence is growing. Keep the momentum.
              </p>
            </div>
            <span className="bg-primary text-primary-foreground flex gap-1 items-center rounded px-3 py-2 text-[9px]">
              <Plus size={11} /> Create post
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Scheduled posts", "24", "+8 this week"],
              ["Total followers", "12.8k", "↗ 18.6%"],
              ["Engagement rate", "4.8%", "↗ 2.4%"],
            ].map(([label, value, change]) => (
              <div className="preview-stat" key={label}>
                <div className="text-[10px] text-muted-foreground flex justify-between">
                  {label}
                  <ArrowUpRight size={12} />
                </div>
                <div className="flex justify-between items-end">
                  <strong>{value}</strong>
                  <span className="text-[8px] text-success mb-1">{change}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="preview-content">
            <CalendarPreview />
            <div className="mini-calendar">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs">Today&apos;s queue</strong>
                <span className="text-[9px] text-primary">View all →</span>
              </div>
              {[
                "A little self-care goes a long way ✨",
                "Your daily dose of inspiration",
                "New week, fresh possibilities",
              ].map((text, i) => (
                <div className="queue-row" key={text}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="queue-photo"
                    src={contentPhoto}
                    alt="Scheduled skincare campaign post"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-semibold">
                        {i === 1 ? "Facebook" : "Instagram"}
                      </span>
                      <span className="text-[8px] text-muted-foreground">
                        · {i + 10}:00 AM
                      </span>
                    </div>
                    <p className="text-[9px] truncate max-w-40 mt-1">{text}</p>
                    <span className="text-[8px] text-success">● Scheduled</span>
                  </div>
                  <MoreHorizontal
                    size={12}
                    className="ml-auto text-muted-foreground"
                  />
                </div>
              ))}
              <div className="mt-3 text-[8px] text-muted-foreground">
                Illustrative data · product preview
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-success">
        <span className="size-8 bg-success-soft text-success rounded-full grid place-items-center">
          <Check size={17} />
        </span>
        <div>
          <strong className="text-xs">Your next post? Already handled.</strong>
          <p className="text-[10px] text-muted-foreground mt-1">
            More creating. Less scheduling.
          </p>
        </div>
      </div>
      <div className="floating-ai">
        <span className="size-8 bg-violet-soft text-primary rounded-md grid place-items-center">
          <Sparkles size={17} />
        </span>
        <div>
          <strong className="text-xs">Made for your voice</strong>
          <p className="text-[10px] text-muted-foreground">
            AI-powered. You-approved.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PostPreview({
  caption,
  reel = false,
}: {
  caption: string;
  reel?: boolean;
}) {
  return (
    <div className={`post-preview ${reel ? "reel" : ""}`}>
      <div className="flex items-center gap-2 px-3 py-3">
        <span className="size-7 bg-violet-soft text-primary rounded-full grid place-items-center text-xs font-bold">
          S
        </span>
        <span className="text-xs font-semibold">yourbrand</span>
        <PlatformIcon name="Instagram" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={contentPhoto} alt="Skincare product content preview for Instagram" />
      <div className="p-4">
        <p className="text-sm leading-relaxed">{caption}</p>
        <p className="text-xs text-primary mt-3">
          #DailyInspiration #YourBrand #SmallMoments
        </p>
        <p className="text-[10px] text-muted-foreground mt-4">
          Sample content · not published
        </p>
      </div>
    </div>
  );
}