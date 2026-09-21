# Quick Reference Card

## Essential Commands

```bash
# Development
cd portfolio
npm install
npm run dev          # http://localhost:3000

# Quality
npm run lint
npx tsc --noEmit
npm run build

# Testing
npx playwright test --project=chromium
```

## Key Files

| File | Purpose |
|------|---------|
| `src/components/shared/ResumeOverlay.tsx` | Resume modal |
| `src/sections/resume.tsx` | Resume section trigger |
| `src/app/globals.css` | Design system, responsive modal |
| `src/config/site.ts` | Site config, URLs |
| `public/resumes/*.webp` | Display asset (3400×4400) |
| `public/resumes/*.pdf` | Download asset |

## Resume Viewer Key Points

- **Image**: 3400×4400 WebP, 335KB
- **Desktop**: Height-constrained (calc(100vh - 176px))
- **Mobile**: Width-constrained (90vw, max 640px)
- **No PDF.js** — native `<img onLoad/onError>`
- **States**: loading → loaded | error
- **Error**: "Unable to load resume."

## Animation

- Open: 400ms, scale 0.96→1, y: 8→0
- Close: 300ms, scale 1→0.97, y: 0→6
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- No bounce, no flash

## Commands Quick Reference

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # Lint check
npx tsc --noEmit     # Type-check
npx playwright test  # E2E tests
npx vercel --prod    # Deploy
```

## Key Assets

```
public/resumes/
├── Jawahar_A_Bcom_BCA.pdf                    # Download (178KB)
├── Jawahar_A_Bcom_BCA_GlassMorphism.pdf      # Source (217KB)
└── Jawahar_A_Bcom_BCA_GlassMorphism.webp     # Display (335KB, 3400×4400)
```

## Responsive Breakpoints

| Breakpoint | Constraint |
|------------|------------|
| ≤639px     | Width: min(90vw, 640px) |
| ≥640px     | Height: calc(100vh - 176px) |

## Test Commands

```bash
npx playwright test test-resume.spec.ts --reporter=line
npx playwright test test-production.spec.ts --reporter=line
```

## Production URL

**https://jawaharp.vercel.app/**