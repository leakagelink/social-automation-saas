import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";

interface ContentPreviewProps {
  type: "post" | "reel";
  platform: string;
  caption: string;
  hashtags: string[];
}

export function ContentPreview({
  type,
  platform,
  caption,
  hashtags,
}: ContentPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {type === "reel" ? "Reel" : "Post"} preview · {platform}
        </CardTitle>
        <Badge variant="outline">Mock generated</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[9/16] max-h-80 w-full overflow-hidden rounded-lg bg-gradient-to-br from-violet-900/40 to-fuchsia-900/30">
          {type === "reel" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ReelPlayOverlay />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
            <p className="line-clamp-3 text-sm text-white">{caption}</p>
            <p className="mt-1 text-xs text-violet-200">{hashtags.join(" ")}</p>
          </div>
        </div>
        {type === "post" && (
          <div className="mt-4 flex gap-6 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <MessageCircle className="h-4 w-4" />
            <Share2 className="h-4 w-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReelPlayOverlay() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
      <Play className="h-6 w-6 fill-white text-white" />
    </div>
  );
}