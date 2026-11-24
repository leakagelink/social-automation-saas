"use client";

import { DEMO_USER } from "@/lib/auth";
import type { PlatformName } from "@/lib/socialflow";

export type AutomationTone =
  | "Friendly"
  | "Professional"
  | "Playful"
  | "Inspiring";

export type AutomationSettings = {
  niche: string;
  tone: AutomationTone;
  timezone: string;
  time: string;
  captions: boolean;
  hashtags: boolean;
  autopost: boolean;
  reels: boolean;
};

export const TIMEZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "UTC",
] as const;

export const DEFAULT_AUTOMATION: AutomationSettings = {
  niche: "Skincare & mindful living",
  tone: "Friendly",
  timezone: "Asia/Kolkata",
  time: "10:00",
  captions: true,
  hashtags: true,
  autopost: false,
  reels: false,
};

const STORAGE_KEY = "socialflow_automation_prefs";

export type WorkspaceProfile = {
  display_name: string;
  email: string;
  avatar_url?: string;
  preferences: AutomationSettings;
};

export function getDemoProfile(): WorkspaceProfile {
  const preferences = loadAutomationSettings();
  return {
    display_name: DEMO_USER.name,
    email: DEMO_USER.email,
    preferences,
  };
}

export function loadAutomationSettings(): AutomationSettings {
  if (typeof window === "undefined") return DEFAULT_AUTOMATION;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_AUTOMATION;
    return { ...DEFAULT_AUTOMATION, ...JSON.parse(raw) } as AutomationSettings;
  } catch {
    return DEFAULT_AUTOMATION;
  }
}

export function saveAutomationSettings(settings: AutomationSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function platformNameToId(name: PlatformName): string {
  return name === "X" ? "x" : name.toLowerCase();
}