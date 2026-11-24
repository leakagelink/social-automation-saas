export type PlatformId =
  | "facebook"
  | "instagram"
  | "x"
  | "youtube"
  | "pinterest";

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  description: string;
  color: string;
  envVars: { key: string; description: string }[];
  oauthPath: string;
  supportsReels: boolean;
}

export const PLATFORMS: PlatformConfig[] = [
  {
    id: "facebook",
    name: "Facebook",
    description: "Pages, feed posts, and reels via Meta Graph API.",
    color: "bg-blue-600",
    oauthPath: "/api/oauth/facebook",
    supportsReels: true,
    envVars: [
      { key: "META_APP_ID", description: "Meta app ID" },
      { key: "META_APP_SECRET", description: "Meta app secret" },
      { key: "META_REDIRECT_URI", description: "OAuth callback URL" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Business/Creator accounts linked to a Facebook Page.",
    color: "bg-gradient-to-br from-purple-600 to-pink-500",
    oauthPath: "/api/oauth/instagram",
    supportsReels: true,
    envVars: [
      { key: "META_APP_ID", description: "Shared Meta app (IG publish scopes)" },
      { key: "META_APP_SECRET", description: "Meta app secret" },
      { key: "META_REDIRECT_URI", description: "OAuth callback URL" },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    description: "Posts and media via X API v2 with OAuth 2.0 PKCE.",
    color: "bg-zinc-100 text-zinc-900",
    oauthPath: "/api/oauth/x",
    supportsReels: false,
    envVars: [
      { key: "X_CLIENT_ID", description: "OAuth 2.0 client ID" },
      { key: "X_CLIENT_SECRET", description: "Client secret (confidential clients)" },
      { key: "X_REDIRECT_URI", description: "Callback URL" },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Uploads and Shorts via YouTube Data API.",
    color: "bg-red-600",
    oauthPath: "/api/oauth/youtube",
    supportsReels: true,
    envVars: [
      { key: "GOOGLE_CLIENT_ID", description: "Google Cloud OAuth client" },
      { key: "GOOGLE_CLIENT_SECRET", description: "Client secret" },
      { key: "GOOGLE_REDIRECT_URI", description: "Callback URL" },
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    description: "Pins and boards via Pinterest API v5.",
    color: "bg-red-700",
    oauthPath: "/api/oauth/pinterest",
    supportsReels: false,
    envVars: [
      { key: "PINTEREST_APP_ID", description: "Pinterest app ID" },
      { key: "PINTEREST_APP_SECRET", description: "App secret" },
      { key: "PINTEREST_REDIRECT_URI", description: "Callback URL" },
    ],
  },
];

export function getPlatform(id: PlatformId): PlatformConfig {
  const p = PLATFORMS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown platform: ${id}`);
  return p;
}