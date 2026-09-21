# Architecture Documentation

## App Structure & Routing

This portfolio uses **Next.js 16 App Router** with a single-page layout composed of vertically stacked sections.

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers, metadata, fonts
│   ├── page.tsx            # Single-page portfolio (all sections)
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles, design system, utilities
│   ├── not-found.tsx       # 404 page
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # sitemap.xml generation
├── components/
│   ├── shared/             # Shared across pages (Header, ResumeOverlay, SmoothScroll)
│   ├── ui/                 # shadcn/ui components (Button, Card, etc.)
│   └── liquid-glass-card.tsx
├── sections/               # Page sections (composed in page.tsx)
│   ├── hero.tsx
│   ├── about.tsx
│   ├── impact.tsx
│   ├── how-i-work.tsx
│   ├── journey.tsx
│   ├── case-studies.tsx
│   ├── resume.tsx
│   └── contact.tsx
├── data/                   # Static data (experience, metrics, case studies)
├── config/                 # Site configuration (site.ts)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, SEO, motion
├── config/                 # Site configuration
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
├── providers/              # React context providers
└── lib/seo.ts              # SEO utilities
```

## Section Composition (page.tsx)

The main page composes sections vertically:

```tsx
<Hero />
<About />
<Impact />
<HowIWork />
<Journey />
<CaseStudies />
<Resume />
<Contact />
```

Each section is a self-contained component with its own animation (Framer Motion `whileInView`).

## Component Organization

### Shared Components (`components/shared/`)
- `Header.tsx` — Fixed header with navigation, smooth scroll
- `ResumeOverlay.tsx` — Modal resume viewer (image-based, no PDF.js)
- `SmoothScroll.tsx` — Lenis smooth scroll wrapper

### Section Components (`sections/`)
Each section is a self-contained component:
- `Hero` — Headline, metrics, CTAs, profile image
- `About` — Bio, core focus areas, approach principles
- `Impact` — Animated counters, metrics
- `HowIWork` — 5 principles with icons
- `Journey` — Expandable timeline (work + education)
- `CaseStudies` — Grid of 6 case studies with hover effects
- `Resume` — Profile card + "View Resume" button → `ResumeOverlay`
- `Contact` — Links, social, email form

### UI Components (`components/ui/`)
- `Button`, `Card`, `Sheet`, `Badge`, `Sheet`, `SectionBadge`
- Liquid Glass card components

## Configuration & Data

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Site metadata, social links, navigation, resume URLs |
| `src/data/experience.ts` | Work history, education, metrics, case studies |
| `src/data/metrics.ts` | Impact counters |
| `src/config/seo.ts` | SEO metadata helpers |
| `src/lib/seo.ts` | JSON-LD, Open Graph, sitemap generation |

## Data Flow

```
site.ts (config) → sections → components
       ↓
   data files (experience.ts, metrics.ts)
       ↓
   section components → page.tsx → layout.tsx
```

Static data is imported at build time — no runtime fetching for portfolio content.

## Resume Viewer Architecture

**Component**: `src/components/shared/ResumeOverlay.tsx`

**Flow:**
1. User clicks "View Resume" in Resume section
2. `Resume` section opens `ResumeOverlay` via `AnimatePresence`
3. `ResumeOverlay` renders via `createPortal` to `document.body`
4. `<img>` loads `/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp`
5. Native `onLoad`/`onError` handlers manage state (`loading` → `loaded` | `error`)
5. No PDF.js — pure `<img>` with native `onLoad`/`onError`

**State Machine:**
```
loading → loaded (show image)
loading → error (show "Unable to load resume.")
```

**Responsive Sizing:**
- Mobile (≤639px): Width-constrained (max-width: 90vw, max 640px)
- Desktop (≥640px): Height-constrained (max-height: calc(100vh - 176px))
- Image aspect ratio preserved: 3400/4400 = 0.773

## Styling System

### Liquid Glass (`globals.css`)
- `.glass` / `.liquid-glass` — Base material
- `.glass-panel` — Elevated panels, modals
- `.glass-card` — Interactive cards with hover lift
- `.resume-modal` — Responsive modal sizing (desktop height-constrained, mobile width-constrained)

### Color System (oklch)
| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `oklch(0.02 0 0)` | Deep black #050505 |
| `--foreground` | `oklch(0.96 0 0)` | Pearl white |
| `--accent` | `oklch(0.7 0.02 200)` | Soft cyan |
| `--accent-bright` | `oklch(0.82 0.03 200)` | Brighter cyan |
| `--accent-violet` | `oklch(0.72 0.02 290)` | Soft lavender |
| `--pearl` | `oklch(0.96 0 0)` | Pearl white |
| `--silver` | `oklch(0.68 0 0)` | Titanium silver |
| `--graphite` | `oklch(0.55 0 0)` | Warm graphite |

### Typography
- `--font-sans` — Geist Sans (variable)
- `--font-mono` — Geist Mono (variable)
- `.text-gradient` — Cyan→lavender gradient text

### Animation
- `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)` — Premium easing
- Framer Motion for component animations
- Lenis for smooth scroll

## Animation System

### Framer Motion
- Section entrance: `initial → whileInView` (opacity + y)
- Modal: `initial → animate → exit` with spring easing
- Card hover: `translateY(-4px)` with shadow lift
- Reduced motion: Respects `prefers-reduced-motion`

### Lenis Smooth Scroll
- Wrapper: `SmoothScroll` provider in `layout.tsx`
- `scroll-margin-top: 5.5rem` on sections
- `overscroll-behavior: contain` on modal scroll areas

## Resume Viewer Responsive Sizing

### Mobile (≤639px) — Width-Constrained
```css
.resume-modal {
  max-width: min(90vw, 640px);
}
img { max-width: 100%; height: auto; }
```

### Desktop (≥640px) — Height-Constrained
```css
.resume-modal {
  max-height: calc(100vh - 80px - 96px);
  max-width: none;
  width: auto;
}
img {
  max-height: calc(100vh - 80px - 96px - 2rem);
  max-width: none;
  height: auto;
  width: auto;
}
```

Image aspect ratio (3400/4400 = 0.773) preserved automatically via `object-fit: contain`.

## Asset Organization

```
public/
├── images/
│   └── profile.jpg
├── resumes/
│   ├── Jawahar_A_Bcom_BCA.pdf              # Download (ATS-friendly)
│   ├── Jawahar_A_Bcom_BCA_GlassMorphism.pdf
│   └── Jawahar_A_Bcom_BCA_GlassMorphism.webp  (3400×4400, 400 DPI)
├── og-image.png
└── pdf.worker.min.mjs (legacy, unused)
```

## Data Files

| File | Content |
|------|---------|
| `src/data/experience.ts` | Work history, education, case studies |
| `src/data/metrics.ts` | Impact counter values |
| `src/config/site.ts` | Site metadata, URLs, social links |
| `src/data/metrics.ts` | Impact counter values |

## Smooth Scroll (Lenis)

`SmoothScroll` provider wraps app in `layout.tsx`. Sections have `scroll-margin-top: 5.5rem`. Modal scroll areas use `.modal-scroll { overscroll-behavior: contain; }`.

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| ≤639px | Mobile (iPhone SE/16) |
| 640px–1023px | Tablet |
| ≥1024px | Desktop |

## Safe Areas

CSS utilities for iOS/Android notches:
- `.safe-top`, `.safe-bottom`, `.safe-left`, `.safe-right`
- `.safe-horizontal`, `.safe-vertical`
- `.min-h-screen-safe` uses `100dvh` / `100svh`

## Accessibility

- Semantic HTML5 (`<section>`, `<header>`, `<main>`, `<nav>`)
- ARIA labels on interactive elements
- `focus-visible` outlines
- `aria-modal`, `role="dialog"` on modal
- `prefers-reduced-motion` respected
- Semantic heading hierarchy (h1 → h2 → h3)
- Alt text on all images
- Sufficient color contrast (oklch ensures perceptual uniformity)

## Performance

- Static generation for all pages
- `next/image` for profile images (not resume)
- WebP resume asset (335KB, 3400×4400)
- PDF download only on click (no preload)
- Static generation for all pages
- Turbopack dev, webpack production