# Deployment Documentation

## Overview

- **Repository**: https://github.com/Mark-Jawahar/Jawahar-portfolio
- **Vercel Project**: `mark-jawahars-projects/jawahar`
- **Production Domain**: `https://jawaharp.vercel.app/`
- **Framework**: Next.js 16 (App Router)
- **Build Tool**: Turbopack (dev), webpack (production)

## Vercel Project Configuration

| Setting | Value |
|---------|-------|
| Project Name | `jawahar` |
| Framework Preset | Next.js |
| Root Directory | `portfolio` |
| Build Command | `next build` |
| Output Directory | `.next` (default) |
| Install Command | `npm install` |
| Development Command | `npm run dev` |

## Environment Variables (Vercel Dashboard)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Production URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Optional |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Optional |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Optional |
| `CLERK_SECRET_KEY` | Clerk secret key | Optional |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms contact form | Optional |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | Optional |

## Build Process

```bash
# Local production build
npm run build

# Vercel build (automatic on push)
vercel --prod
```

**Build Steps:**
1. `npm install` — Install dependencies
2. `next build` — TypeScript check + webpack production build
3. Static page generation (all routes static)
4. Asset optimization (images, fonts, CSS)
4. Deploy to Vercel edge network

### Build Output

```
Route (app)
┌ ○ /                    # Static
├ ○ /_not-found          # Static
├ ƒ /api/contact         # Dynamic (serverless function)
├ ○ /robots.txt          # Static
└ ○ /sitemap.xml         # Static
```

## Deployment Flow

```
git push origin main
    ↓
GitHub Actions / Vercel Git Integration
    ↓
Vercel builds (npm install → next build)
    ↓
Deploy to Vercel Edge Network
    ↓
Aliased to: https://jawaharp.vercel.app/
```

## Production Domain

| Domain | Purpose |
|--------|---------|
| `https://jawaharp.vercel.app/` | Primary production URL |
| `https://jawahar-*.vercel.app` | Preview deployments |

**DNS**: Managed by Vercel (automatic SSL, CDN, edge caching)

## Environment-Specific Configuration

### `site.ts` Configuration

```typescript
const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";
export const siteUrl = (
  configuredUrl && !/^https?:\/\/localhost/.test(configuredUrl)
    ? configuredUrl
    : "https://jawaharp.vercel.app"
).replace(/\/$/, "");
```

- Production: `NEXT_PUBLIC_APP_URL=https://jawaharp.vercel.app`
- Local: Falls back to `https://jawaharp.vercel.app` (but localhost detected)
- Preview: Uses Vercel deployment URL

## Vercel Configuration Files

### `.vercel/project.json` (auto-generated)
```json
{
  "projectId": "prj_...",
  "orgId": "team_...",
  "settings": {
    "framework": "nextjs",
    "rootDirectory": "portfolio"
  }
}
```

### `vercel.json` (optional, if needed)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## GitHub Integration

- **Repository**: `Mark-Jawahar/Jawahar-portfolio`
- **Branch**: `main`
- **Auto-deploy**: Enabled on push to `main`
- **Preview Deployments**: Enabled for PRs

## Deployment Commands

```bash
# Local preview deploy
npx vercel

# Production deploy
npx vercel --prod

# Inspect deployment
vercel inspect <deployment-url>

# View logs
vercel logs <deployment-url>

# Rollback
vercel rollback <deployment-url>
```

## GitHub Actions (if configured)

No custom GitHub Actions workflows currently. Deployment handled by Vercel Git integration.

## Environment-Specific Behavior

| Environment | `siteUrl` | Notes |
|-------------|-----------|-------|
| Local (`localhost:3000`) | `https://jawaharp.vercel.app` | Fallback |
| Preview (`*.vercel.app`) | Vercel deployment URL | Auto-detected |
| Production (`jawaharp.vercel.app`) | `https://jawaharp.vercel.app` | From `NEXT_PUBLIC_APP_URL` |

## Asset Handling

| Asset Type | Location | Serving |
|------------|----------|---------|
| Static images | `public/images/` | Vercel static CDN |
| Resume WebP | `public/resumes/*.webp` | Vercel static CDN |
| Resume PDF (download) | `public/resumes/*.pdf` | Vercel static CDN |
| Fonts | `next/font` (Geist) | Google Fonts CDN |
| JS/CSS | `.next/static/` | Vercel Edge CDN |

## Cache Headers (Vercel Defaults)

| Asset | Cache-Control |
|-------|---------------|
| Static assets (images, fonts) | `public, max-age=31536000, immutable` |
| HTML | `no-cache, must-revalidate` |
| API routes | `no-cache` |

## Monitoring & Observability

- **Vercel Analytics** — Enabled via dashboard
- **Vercel Speed Insights** — Enabled via dashboard
- **Google Analytics** — Via `NEXT_PUBLIC_GA_ID` (optional)
- **Vercel Function Logs** — Available in dashboard

## Rollback Procedure

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>

# Or promote previous deployment to production
vercel promote <deployment-url>
```

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| Build fails on TypeScript | Check `npx tsc --noEmit` locally |
| Build fails on lint | Run `npm run lint` locally |
| Assets 404 | Verify `public/` files committed |
| Wrong domain in sitemap | Check `siteUrl` in `config/site.ts` |
| Wrong domain in robots.txt | Check `siteUrl` in `robots.ts` |
| Environment variables missing | Add in Vercel dashboard → Settings → Environment Variables |
| Build timeout | Check for infinite loops, heavy computations |
| Image optimization errors | Verify `next/image` usage, check `next.config.ts` |

## Useful Links

- [Vercel Dashboard](https://vercel.com/mark-jawahars-projects/jawahar)
- [GitHub Repository](https://github.com/Mark-Jawahar/Jawahar-portfolio)
- [Production Site](https://jawaharp.vercel.app/)
- [Vercel Docs](https://vercel.com/docs)