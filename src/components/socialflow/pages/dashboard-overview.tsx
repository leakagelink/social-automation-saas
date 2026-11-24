"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Users,
} from "lucide-react";
import {
  DashboardHeading,
  Stat,
  CreatePostButton,
} from "@/components/socialflow/dashboard";
import { CalendarPreview, contentPhoto } from "@/components/socialflow/preview";
import { PlatformIcon } from "@/components/socialflow/platform";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getDemoProfile } from "@/lib/profile";
import { platforms, type PlatformName } from "@/lib/socialflow";

const initialRows = [
  {
    id: 1,
    title: "A little self-care goes a long way ✨",
    platform: "Instagram" as PlatformName,
    time: "Nov 24, 10:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "New week. Fresh possibilities.",
    platform: "Facebook" as PlatformName,
    time: "Nov 24, 12:30 PM",
    status: "Needs approval",
  },
  {
    id: 3,
    title: "Behind the glow: our morning routine",
    platform: "YouTube" as PlatformName,
    time: "Nov 25, 09:00 AM",
    status: "Draft",
  },
];

export function DashboardOverview() {
  const profile = getDemoProfile();
  const [tab, setTab] = useState("Calendar");
  const [month, setMonth] = useState(0);
  const [composer, setComposer] = useState(false);
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState("All");
  const firstName = profile.display_name.split(" ")[0] || "creator";

  return (
    <>
      <DashboardHeading
        title={`Good morning, ${firstName} ☀️`}
        description="Your next good idea starts here."
        action={<CreatePostButton onClick={() => setComposer(true)} />}
      />
      <p className="text-xs text-muted-foreground bg-violet-soft text-primary p-3 rounded-md mb-6">
        Sample workspace data · no posts are scheduled or published. Edits here
        are temporary previews.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Scheduled posts" value="24" detail="8 more than last week · sample" />
        <Stat label="Total followers" value="12.8k" detail="↑ 18.6% · illustrative" icon={Users} />
        <Stat label="Engagement rate" value="4.8%" detail="↑ 2.4% · illustrative" icon={ArrowUpRight} />
        <Stat label="Reels in review" value="3" detail="Ready for a creative touch · sample" icon={Clapperboard} />
      </div>
      <section className="mt-7">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex gap-2">
            {["Calendar", "List"].map((value) => (
              <Button
                key={value}
                variant={tab === value ? "default" : "outline"}
                size="sm"
                onClick={() => setTab(value)}
              >
                {value}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Previous month" onClick={() => setMonth(month - 1)}>
              <ChevronLeft />
            </Button>
            <span className="text-sm min-w-32 text-center">
              {new Date(2026, 10 + month, 1).toLocaleDateString("en", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button variant="ghost" size="icon" aria-label="Next month" onClick={() => setMonth(month + 1)}>
              <ChevronRight />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setMonth(0)}>
              Today
            </Button>
          </div>
        </div>
        {tab === "Calendar" ? (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
            <CalendarPreview large offset={month * 2} />
            <section className="dashboard-panel">
              <div className="flex justify-between mb-4">
                <h2>Today&apos;s queue</h2>
                <span className="text-xs text-muted-foreground">3 posts</span>
              </div>
              {rows.slice(0, 3).map((row) => (
                <div className="queue-row" key={row.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={contentPhoto} alt="Sample skincare post" className="queue-photo" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <PlatformIcon name={row.platform} />
                      <span className="text-xs font-semibold">{row.platform}</span>
                    </div>
                    <p className="text-xs truncate mt-1">{row.title}</p>
                    <span className={`status-pill mt-2 ${row.status !== "Scheduled" ? "pending" : ""}`}>
                      {row.status}
                    </span>
                  </div>
                  {row.status === "Needs approval" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Approve ${row.title}`}
                      onClick={() =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id ? { ...r, status: "Scheduled" } : r
                          )
                        )
                      }
                    >
                      <Check />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="link" className="px-0 mt-4" onClick={() => setTab("List")}>
                View content queue <ArrowRight />
              </Button>
            </section>
          </div>
        ) : (
          <section className="dashboard-panel">
            <div className="flex flex-wrap gap-2 mb-6">
              {["All", "Draft", "Needs approval", "Scheduled"].map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={filter === value ? "default" : "ghost"}
                  onClick={() => setFilter(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[570px]">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-3 font-medium">Content</th>
                    <th className="font-medium">Platform</th>
                    <th className="font-medium">Scheduled time</th>
                    <th className="font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .filter((row) => filter === "All" || row.status === filter)
                    .map((row) => (
                      <tr key={row.id} className="border-b border-border">
                        <td className="py-4 pr-4">{row.title}</td>
                        <td>{row.platform}</td>
                        <td className="text-muted-foreground text-xs">{row.time}</td>
                        <td>
                          <span className={`status-pill ${row.status !== "Scheduled" ? "pending" : ""}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>
      <div className="mt-7 flex flex-wrap justify-between items-center gap-5 border-t border-border pt-6">
        <div>
          <h2 className="font-bold">A great week starts with a plan.</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your niche and make your content rhythm your own.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/automation">
            Set your flow <ArrowRight />
          </Link>
        </Button>
      </div>
      <Dialog open={composer} onOpenChange={setComposer}>
        <DialogContent className="max-w-[calc(100%-32px)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>A fresh idea.</DialogTitle>
            <DialogDescription>
              Create a temporary sample draft. This won&apos;t be published or saved to your account.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setRows([
                ...rows,
                {
                  id: Date.now(),
                  title: title || caption,
                  platform: platforms[0],
                  time: "Not scheduled",
                  status: "Draft",
                },
              ]);
              setComposer(false);
              setTitle("");
              setCaption("");
              setTab("List");
            }}
          >
            <label htmlFor="post-title" className="field-label">
              Post title
            </label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A small moment worth sharing"
              required
            />
            <label htmlFor="post-caption" className="field-label">
              Caption
            </label>
            <Textarea
              id="post-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What’s the story?"
              required
            />
            <Button type="submit">Add sample draft</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}