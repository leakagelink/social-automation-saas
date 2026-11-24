import { NextResponse } from "next/server";
import { PLATFORMS, type PlatformId } from "@/lib/platforms";

export async function GET(
  _req: Request,
  { params }: { params: { platform: string } }
) {
  const platform = params.platform as PlatformId;
  const config = PLATFORMS.find((p) => p.id === platform);

  if (!config) {
    return NextResponse.json({ error: "Unknown platform" }, { status: 404 });
  }

  const missing = config.envVars
    .map((v) => v.key)
    .filter((key) => !process.env[key]);

  return NextResponse.json({
    status: "oauth_stub",
    platform: config.name,
    message:
      missing.length > 0
        ? `Configure ${missing.join(", ")} then implement ${config.oauthPath}`
        : `Ready to redirect to ${config.name} OAuth consent screen.`,
    nextSteps: [
      "Register app in developer portal",
      "Set redirect URI to your deployment callback",
      "Request publish scopes and pass App Review",
      "On callback, encrypt refresh token via tokenVault.saveToken",
    ],
    authorizeUrl: `https://example.com/oauth/${platform}?stub=true`,
  });
}