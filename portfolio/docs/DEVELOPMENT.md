# Development Documentation

## Prerequisites

- **Node.js** 18+ (tested with 24.18.0)
- **npm** 9+ (tested with 11.16.0)
- **Git** 2.30+
- **VS Code** recommended with TypeScript + Tailwind extensions

## Local Setup

```bash
# Clone repository
git clone https://github.com/Mark-Jawahar/Jawahar-portfolio.git
cd Jawahar-portfolio/portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs at **http://localhost:3000**

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build (TypeScript + webpack) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |

## Development Server

```bash
npm run dev
```

- Runs on **http://localhost:3000**
- Turbopack for fast HMR
- Hot reload for components, styles, data
- `.env.local` loaded automatically

### Environment Variables (`.env.local`)

```bash
# Required for production URLs
NEXT_PUBLIC_APP_URL=https://jawaharp.vercel.app

# Optional integrations
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
WEB3FORMS_ACCESS_KEY=
NEXT_PUBLIC_GA_ID=
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (type-check + webpack) |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint check |
| `npx tsc --noEmit` | TypeScript type-check only |

## Testing

### Lint & Type-Check

```bash
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript type-check
npm run build         # Full build (includes both)
```

### Playwright E2E Testing

```bash
# Install Playwright (once)
npm install --save-dev @playwright/test
npx playwright install chromium

# Run tests
npx playwright test test-resume.spec.ts --reporter=line
npx playwright test test-production.spec.ts --reporter=line
```

**Test Files:**
- `test-resume.spec.ts` — Local dev server tests
- `test-production.spec.ts` — Production deployment tests

### Visual QA Checklist

#### Desktop (1440×900, Chrome 100%)
- [ ] Resume modal opens with smooth animation
- [ ] Resume image loads completely (no "Loading resume...")
- [ ] Image displays at ~998×1292px (large, readable)
- [ ] Complete resume visible without scrolling
- [ ] Card centered, portrait-oriented
- [ ] No internal black sidebars
- [ ] No clipping/cropping
- [ ] Header: "Resume | Download Resume | X"
- [ ] Smooth opening animation
- [ ] Close button works
- [ ] Backdrop click closes modal

#### Mobile (393×852, 375×667, 390×844, 414×896)
- [ ] Resume fills most width (small margins)
- [ ] Complete resume visible
- [ ] No horizontal overflow
- [ ] No scrolling
- [ ] Download/Close accessible
- [ ] Safe area respected
- [ ] Animation smooth

### Resume Viewer Tests

```bash
# Local
npx playwright test test-resume.spec.ts --project=chromium --reporter=line

# Production
npx playwright test test-production.spec.ts --project=chromium --baseURL=https://jawaharp.vercel.app --reporter=line
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `createPortal` error: "Target container is not a DOM element" | Ensure `mounted` guard in `ResumeOverlay` |
| Image stuck on "Loading resume..." | Check `onError` handler sets `isImageError=true` |
| Image not loading | Verify `/resumes/...webp` returns 200, `image/webp` |
| Mobile modal too wide | Check `.resume-modal` max-width at mobile breakpoint |
| Desktop resume too tall | Verify `.resume-modal` max-height at desktop breakpoint |
| Hydration mismatch | Check `mounted` guard in `ResumeOverlay` |
| Build fails on TypeScript | Run `npx tsc --noEmit` for details |

## Common Commands Reference

```bash
# Development
npm run dev                 # Start dev server
npm run build               # Production build
npm run lint                # Lint check
npx tsc --noEmit            # Type-check only

# Testing
npx playwright test                     # All tests
npx playwright test --project=chromium  # Chromium only
npx playwright test --headed            # Headed mode
npx playwright show-report              # View HTML report

# Vercel
npx vercel dev          # Local Vercel dev
npx vercel --prod       # Production deploy
vercel inspect <url>    # Inspect deployment
```

## Useful Paths

| Path | Description |
|------|-------------|
| `src/components/shared/ResumeOverlay.tsx` | Resume modal |
| `src/sections/resume.tsx` | Resume section + trigger |
| `src/app/globals.css` | Global styles, design system |
| `src/config/site.ts` | Site config, URLs, social |
| `src/data/experience.ts` | Career data |
| `src/config/site.ts` | Site config, URLs |
| `public/resumes/` | Resume assets |
| `src/app/globals.css` | Design system, responsive modal |

## Port Configuration

Default: `3000`

Override:
```bash
PORT=3001 npm run dev
```

## Common Issues

### "Target container is not a DOM element" (createPortal)
- Ensure `mounted` state guards `createPortal`
- Component only renders after `useEffect` sets `mounted=true`

### Image stuck on "Loading resume..."
- Check `onError` handler on `<img>`
- Verify WebP serves with `Content-Type: image/webp`
- Verify file exists at `/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp`

### Mobile viewport issues
- Check `viewport` meta in `layout.tsx`
- Verify `safe-area-inset-*` CSS variables
- Test with `dvh`/`svh` units

### Hydration errors
- Ensure `mounted` guard wraps `createPortal`
- No browser-only APIs in render path
- `useEffect` for client-only logic