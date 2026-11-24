"use client";

import { PLATFORMS } from "@/lib/platforms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ConnectAccountsPage() {
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  async function handleConnect(platformId: string) {
    const res = await fetch(`/api/oauth/${platformId}/start`);
    const data = await res.json();
    alert(data.message ?? "OAuth stub — see README for production steps.");
    if (data.status === "oauth_stub") {
      setConnected((prev) => ({ ...prev, [platformId]: true }));
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Connect accounts</h1>
        <p className="text-muted-foreground">
          OAuth stubs per platform. Configure env vars before going to production.
        </p>
      </div>

      <div className="grid gap-6">
        {PLATFORMS.map((platform) => (
          <Card key={platform.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${platform.color}`}
                  >
                    {platform.name.slice(0, 2)}
                  </span>
                  {platform.name}
                </CardTitle>
                <CardDescription className="mt-2">{platform.description}</CardDescription>
              </div>
              <Badge variant={connected[platform.id] ? "success" : "outline"}>
                {connected[platform.id] ? "Connected (stub)" : "Not connected"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConnectPlatformButton platformId={platform.id} onConnect={handleConnect} />
              <EnvVarsList envVars={platform.envVars} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ConnectPlatformButton({
  platformId,
  onConnect,
}: {
  platformId: string;
  onConnect: (id: string) => void;
}) {
  return (
    <Button variant="outline" onClick={() => onConnect(platformId)}>
      <ExternalLink className="mr-2 h-4 w-4" />
      Connect {platformId}
    </Button>
  );
}

function EnvVarsList({
  envVars,
}: {
  envVars: { key: string; description: string }[];
}) {
  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
        Required environment variables
      </p>
      <ul className="space-y-1 font-mono text-xs">
        {envVars.map((v) => (
          <li key={v.key}>
            <span className="text-violet-400">{v.key}</span>
            <span className="text-muted-foreground"> — {v.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}