import type { Metadata } from "next";
import {
  CalendarDays,
  Clapperboard,
  Hash,
  Layers,
  Megaphone,
  Sparkles,
} from "lucide-react";

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://socialflow.app";

export const platforms = [
  "Instagram",
  "Facebook",
  "X",
  "YouTube",
  "Pinterest",
] as const;
export type PlatformName = (typeof platforms)[number];

export const capabilities = [
  {
    icon: CalendarDays,
    title: "Show up. Every single day.",
    description:
      "Plan once and keep your feed fresh. Schedule posts across all five platforms from one calendar.",
    label: "Auto daily posting",
  },
  {
    icon: Sparkles,
    title: "Your voice. An AI head start.",
    description:
      "Turn a small idea into scroll-stopping captions that sound like you, not like everyone else.",
    label: "AI caption generator",
  },
  {
    icon: Hash,
    title: "Find your next audience.",
    description:
      "Pair every post with relevant, niche-based hashtags. Less guesswork, more discovery.",
    label: "Smart hashtags",
  },
  {
    icon: Clapperboard,
    title: "From idea to reel. Effortlessly.",
    description:
      "Generate, fine-tune, and approve short-form content in one seamless creative workflow.",
    label: "Reels pipeline",
  },
  {
    icon: Megaphone,
    title: "Organic meets paid.",
    description:
      "Keep your Meta campaigns in the same workspace. Preview smarter rules for your next campaign.",
    label: "Meta ads automation",
  },
  {
    icon: Layers,
    title: "One place. Five platforms.",
    description:
      "Trade five tabs for one clear workspace. Built for creators, growing brands, and small agencies.",
    label: "Unified workspace",
  },
];

export const plans = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 15,
    description: "Build your rhythm.",
    features: [
      "2 social accounts",
      "100 scheduled posts / month",
      "AI captions & smart hashtags",
      "Content calendar",
      "Approval queue",
    ],
  },
  {
    name: "Growth",
    monthly: 49,
    yearly: 39,
    description: "More reach. Less busywork.",
    features: [
      "All 5 social platforms",
      "Unlimited scheduled posts",
      "AI captions — fair-use limits apply",
      "Reels generation & editing",
      "Meta ads rules preview",
      "Advanced analytics",
    ],
  },
  {
    name: "Agency",
    monthly: 99,
    yearly: 79,
    description: "Great work, together.",
    features: [
      "Everything in Growth",
      "5 team seats",
      "Priority support",
      "Shared approval workflows",
      "Multi-workspace — coming soon",
    ],
  },
];

export const faqs: [string, string][] = [
  [
    "What is social media automation?",
    "Social media automation helps plan, prepare, and schedule content without repeating the same manual steps every day. SocialFlow brings that workflow into one workspace.",
  ],
  [
    "How do I automate social media posts?",
    "Connect eligible accounts, choose your topics and schedule, then review your content in an approval queue before publishing. Platform connections are coming soon in this preview.",
  ],
  [
    "Can I automate Instagram posts?",
    "The planned workflow supports eligible Instagram professional accounts through official APIs. Publishing depends on platform permissions and account eligibility.",
  ],
  [
    "Which social platforms will SocialFlow support?",
    "SocialFlow is designed for Facebook, Instagram, X, YouTube, and Pinterest. These publishing connections are not live yet.",
  ],
  [
    "How does the AI caption generator work?",
    "The planned caption workflow uses your niche, tone, and post context to draft captions. You keep the final say. Current caption previews are illustrative, not live AI output.",
  ],
  [
    "Can I approve content before it goes live?",
    "Yes. Approval is central to the planned workflow, so you can edit captions, review media, and choose what is ready to publish.",
  ],
  [
    "What are social media automation tools best used for?",
    "They are useful for consistent scheduling, content planning, and repetitive preparation. Real conversations, editorial judgment, and customer care still need a human touch.",
  ],
  [
    "Can I automate social media for an agency?",
    "The Agency plan is designed around team seats and shared approvals. Multiple client workspaces are planned for a future release.",
  ],
  [
    "Can I cancel my subscription anytime?",
    "The planned subscriptions are month-to-month or annual and can be canceled before renewal. Billing and free-trial activation are not enabled in this preview.",
  ],
  [
    "Are my connected accounts secure?",
    "The planned connections use official OAuth permissions rather than asking for your social passwords. No social account tokens are collected by this preview.",
  ],
];

export function buildMetadata(
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website"
): Metadata {
  const url = `${siteOrigin}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url,
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: url,
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SocialFlow",
      url: siteOrigin,
      founder: { "@type": "Person", name: "Dheeraj Tagde" },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SocialFlow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Social media automation and scheduling workspace. Product preview; publishing integrations are coming soon.",
    },
    faqSchema(),
  ];
}