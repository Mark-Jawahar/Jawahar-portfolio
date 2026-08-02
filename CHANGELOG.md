# Changelog

## v2.5 — Resume Viewer refinement
- **Native scrolling inside modals:** added `data-lenis-prevent` to the Resume and Case Study modal scroll containers so Lenis never intercepts wheel/trackpad/touch inside them (Lenis calls `event.preventDefault()` on non-prevented events when paused — this was blocking trackpad scroll). Verified via CDP: wheel/trackpad scrolls the modal only, page position stays locked, and the exact scroll position is restored on close.
- **Keyboard scrolling:** the Resume scroll area is focusable (`tabIndex={0}`, no outline) and receives initial focus on open via an optional `initialFocusRef` in `useModalLock`, so PageDown/Arrows/Home/End work immediately after the modal opens.
- **Premium document layout:** reading column widened 640px → 720px, larger type scale (name 48–54px, role 24–28px, section titles 15px uppercase tracked, body 18px, bullets 17–18px, metadata 16px, line-height 1.75), and more generous spacing/padding.
- **Refined glass:** `.glass-panel` lightened with a stronger luminous border, soft inner accent glow, and brighter inner highlight (mobile keeps near-opaque readability).
- **Verified:** lint + `next build --webpack` clean; desktop + mobile (390px) wheel/keyboard/backdrop scroll, sticky header, exact-restore, zero console issues, zero horizontal overflow.

## v2.4 — Scroll architecture unification
- **Refresh always starts at top:** inline script in the root layout sets `history.scrollRestoration = "manual"` and scrolls to top before first paint; Lenis also re-syncs to top on init. Works across Chrome, Edge, Safari, Firefox, and mobile.
- **Lenis is the single scroll controller:** removed the conflicting CSS `scroll-behavior: smooth` on `html`; enabled `syncTouch` so Lenis stays in sync with native touch scroll.
- **Fixed header navigation (previously broken):** nav items are `/#section`, and `href.slice(1)` produced `#section`, so `getElementById("#section")` returned null — nav clicks never scrolled and active-state highlighting never matched. Now the id is extracted via `split("#")[1]`.
- **Unified nav scrolling:** `scrollToSection` now uses Lenis only (consistent 1.4s ease-out-expo) and relies on Lenis's native `scroll-margin-top` support (88px) to clear the fixed header — verified landing at exactly 88px on desktop and mobile drawer.
- **Framer Motion `useScroll`** (journey timeline) stays synced to the same native window scroll; no duplicate listeners.
- **Modal isolation verified:** Resume + Case Study modals lock the background (`overflow:hidden` + Lenis pause + `overscroll-behavior:contain`), scroll their own content, and restore the exact page position on close.
- **Verified:** refresh-at-top, nav offset (88px), modal exact-restore, zero console warnings, zero horizontal overflow at 10 viewports, Lighthouse mobile 91 / desktop 100 / CLS 0.

## v2.4a — Impact cards content refinement
- Replaced internal operational KPIs with customer-value messaging: 500+ Learners Onboarded, 80+ Property Transactions, 150+ Customer Leads Managed, 30% Process Improvement, 5+ Years Experience, and a non-numeric Customer-First Mindset card (headline variant, same card structure).

## v2.3 — Liquid Glass upgrade
- New `LiquidGlassCard` component (pointer tilt/glow/lift, reduced-motion aware) used across About, Impact, Contact, Case Studies, and How I Work.
- New `useModalLock` hook: scroll-lock + focus trap + ESC close + Lenis pause, shared by Resume Viewer and Case Study modals (replaces duplicated inline logic).
- Unified Liquid Glass material in globals.css (.glass / .liquid-glass / .glass-panel) with layered reflections, luminous borders, premium easing.
- Hero portrait subtle pointer parallax (GPU transforms, disabled with reduced motion).
- Refined scrollbar, button, and focus-visible styling.
- Fix: hero parallax values were computed but never applied; wired to the portrait (motion values only).

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
