import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We cut our posting time from 12 hours a week to 90 minutes. Reels scripts alone are worth it.",
    name: "Priya S.",
    role: "D2C founder · placeholder",
  },
  {
    quote:
      "Finally one place for Instagram and Pinterest without juggling five tabs.",
    name: "Marcus L.",
    role: "Content lead · placeholder",
  },
  {
    quote:
      "The schedule + AI captions feel like a junior social manager on autopilot.",
    name: "Elena R.",
    role: "Agency owner · placeholder",
  },
];

const logos = ["BrandOne", "NovaShop", "CreatorCo", "PulseMedia", "GrowthLab"];

export function SocialProof() {
  return (
    <section id="proof" className="border-t border-border/50 bg-muted/20 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          Trusted by growing brands
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-60">
          {logos.map((logo) => (
            <span key={logo} className="text-lg font-semibold text-muted-foreground">
              {logo}
            </span>
          ))}
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="glass">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}