# SocialFlow

Multi-platform social media automation SaaS for **Facebook, Instagram, X, YouTube, and Pinterest**.

Built for Dheeraj as a production-oriented reference app: marketing site, dashboard, OAuth stubs, automation UI, Stripe-ready billing, and backend module interfaces.

## Stack

- **Next.js 14** App Router, TypeScript, Tailwind CSS
- **shadcn-style** UI (Radix primitives)
- **Clerk** for authentication (documented; demo mode without keys)
- **Stripe** for subscriptions (checkout stub)

Architecture and compliance: see Project store  
`/cursor/stores/bc-dfe6297d-98ef-49a0-ade3-e8bbd590f9fc/docs/architecture-plan.md`

## Quick start

```bash
cd social-automation-saas
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

- **Landing:** `/`
- **Dashboard:** `/dashboard`
- **Connect:** `/dashboard/connect`
- **Automation:** `/dashboard/automation`
- **Ads:** `/dashboard/ads`
- **Billing:** `/dashboard/billing`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Environment variables

Copy `.env.example` to `.env.local`. All variables are documented there.

**Minimum for demo:** none — the app runs in demo mode.

**Auth (Clerk):** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`  
Install `@clerk/nextjs`, wrap root layout with `ClerkProvider`, and replace `middleware.ts` with `clerkMiddleware()` per [Clerk Next.js docs](https://clerk.com/docs/quickstarts/nextjs).

**Billing (Stripe):** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`  
Implement `stripe.checkout.sessions.create` in `src/app/api/stripe/checkout/route.ts` and add `src/app/api/webhooks/stripe/route.ts`.

**Per-platform OAuth:** see each card on `/dashboard/connect` and `.env.example`.

## Backend modules

| Module | Path | Purpose |
|--------|------|---------|
| Users | `src/server/users.ts` | Clerk sync, plan tier |
| Tokens | `src/server/tokens.ts` | Encrypted OAuth token pattern |
| Scheduler | `src/server/scheduler.ts` | Queue / CRON sketch |
| AI content | `src/server/ai-content.ts` | Captions, hashtags, reel scripts |
| Stripe | `src/server/stripe.ts` | Plans and checkout helper |

## Roadmap: real OAuth

1. Create developer apps on each platform; set redirect URLs to `https://your-domain/api/oauth/{platform}/callback`.
2. Implement callback routes: exchange code, store encrypted refresh token via `tokenVault`.
3. **Meta:** App Review for `instagram_content_publish`, `pages_manage_posts`; Business assets for IG.
4. **X:** OAuth 2.0 PKCE; confirm API tier for posting.
5. **YouTube:** Google Cloud project, OAuth consent screen, quota increase for uploads.
6. **Pinterest:** Business account; v5 API pin creation scopes.

## Roadmap: video generation & editing pipeline

1. **Ingest:** User upload or licensed stock to S3/R2.
2. **Transcode:** FFmpeg workers or Cloudinary/Mux for 9:16, 1:1, 16:9.
3. **Templates:** Remotion or template JSON for captions, hooks, progress bars.
4. **AI:** Script from `ai-content`; optional TTS (ElevenLabs, etc.) with license checks.
5. **Review:** Dashboard preview + approval queue before `publishQueue.enqueue`.
6. **Publish:** Platform adapters with resumable upload (YouTube) and Graph API video endpoints (Meta).

## Production gaps

- Meta App Review and Marketing API approval  
- X API pricing and rate limits  
- YouTube quota and Data API compliance  
- Real KMS encryption (replace dev stub in `tokens.ts`)  
- Worker fleet for BullMQ/Inngest consumers  
- Content moderation before auto-post  

## License

Private / reference implementation for SocialFlow.