# Changelog

## v2.2 — Content & Polish (Product Polish phase)

### New content
- **Selected Case Studies** section with 5 resume-grounded case studies (Hello Mentor onboarding, NoBrokers transactions, Daztek lead qualification, journey improvement, CRM process optimization). Each card opens a glass modal with Challenge / Situation / Actions Taken / Tools Used / Collaboration / Result / Key Learnings.
- **How I Work** section with 5 principle cards: Listen First, Think in Processes, Collaborate Across Teams, Use Data with Empathy, Always Improve.
- New page order: Hero → About → How I Work → Impact → Journey → Case Studies → Resume → Contact.

### SEO & social
- Branded 1200x630 OG image (`public/og-image.png`) — dark luxury background, portrait, "Jawahar A" / "Customer Experience Specialist" + accent underline. Verified via pixel sampling and served on the live site.
- Updated `description` (now mentions CRM, Process Improvement, Client Relationship Management) and `keywords` (+ Zoho, CRM).
- `ogImage` metadata now points to `/og-image.png`; removed legacy `public/og/default.jpg`.

### Design system (accent tokens)
- Accent palette (`--accent`, `--accent-bright`, `--accent-muted`, `--accent-violet`, `--accent-navy`, `--silver`, `--graphite`) mapped through `@theme inline`.
- Unified `.glass` / `.glass-card`, `.btn` / `.btn-primary` / `.btn-ghost`, global `:focus-visible`.
- Accent/typography pass across About, Impact, Journey, Resume, Contact, Header nav, and ResumeOverlay.

### Hero
- Replaced floating scroll-choreographed portrait with a large elegant static portrait contained to the hero; respects `useReducedMotion`.

### Performance
- Hero image optimized to `public/images/profile.jpg` (800px, ~86 KB, `next/image fill priority sizes`).
- rAF-throttled scroll hook; `ResumeOverlay` lazy-loaded via `next/dynamic`.

### Fixes
- **Layout:** removed top-level `src/app/page.tsx` so `/` routes through `(portfolio)/layout.tsx` — fixed header nav and `<main>` landmark now render live.
- **Mobile horizontal scroll:** applied `overflow-x: clip` to `html`/`body` (the previous `overflow-x: hidden` on body propagated to the viewport as `auto`). Fixed a ~14px horizontal scroll on 320–414px viewports caused by framer-motion pre-animation `translateX` offsets.
- **OG generator:** fixed PowerShell case-insensitive duplicate parameter collision (`$r`/`$R`).

### Verification
- Build: `npx next build --webpack` passes; lint passes (exit 0).
- Lighthouse (local): Performance 90 mobile / 91 tablet / 100 desktop; A11y 100; SEO 100; CLS 0.
- Responsive check via CDP at 320 / 375 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920 / 2560 — zero horizontal overflow.
- Functional: modal open/close, ESC + backdrop close, body scroll-lock (`resume-viewer-active`), mobile drawer all verified.
- Live deploy verified: `<main class="flex-1">`, nav, Case Studies + How I Work sections, `/og-image.png` (200).

## v2.1 — Performance & SEO hotfixes
- Route `/` through `(portfolio)` group so header nav and `<main>` landmark render live.
- Hero profile image optimized (JPEG, ~86 KB) with `priority` + `sizes` for LCP.
- Production URLs in metadata, robots, sitemap + branded OG image.
