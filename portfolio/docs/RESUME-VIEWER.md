# Resume Viewer Documentation

## Overview

The Resume Viewer is a custom image-based modal component that displays a high-resolution GlassMorphism resume without using PDF.js. It provides a premium, Apple-like viewing experience with smooth animations and responsive sizing.

## Architecture Overview

```
src/components/shared/ResumeOverlay.tsx
├── Mount guard (SSR safety)
├── State: loading | loaded | error
├── Native <img onLoad/onError> handlers
├── createPortal to document.body
├── Framer Motion animations
└── Responsive CSS classes
```

## User Flow

### View Resume
1. User clicks "View Resume" button in Resume section
2. `Resume` section opens `ResumeOverlay` via `AnimatePresence`
4. `ResumeOverlay` renders via `createPortal` to `document.body`
5. `<img>` loads `/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp`
6. Native `onLoad` → `loaded` state → displays image
6. Native `onError` → `error` state → shows error message

### Download Resume
- Separate button in header and mobile footer
- Downloads `Jawahar_A_Bcom_BCA.pdf` (standard ATS-friendly PDF)
- Does NOT download the GlassMorphism WebP asset

## State Machine

```
initial: 'loading'
  │
  ├─ onLoad → 'loaded' → show <img>
  │
  └─ onError → 'error' → show "Unable to load resume."
```

**Never stuck on "Loading resume..."** — error state always reachable.

## Responsive Sizing

### Image Asset
- **Source**: `public/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp`
- **Dimensions**: 3400 × 4400 px
- **Resolution**: 400 DPI equivalent (Letter size)
- **Aspect Ratio**: 3400/4400 = 0.773
- **Format**: WebP (lossless), 335 KB

### Desktop (≥640px) — Height-Constrained

```css
.resume-modal {
  max-height: calc(100vh - 80px - 96px); /* viewport - header - margins */
  max-width: none;
  width: auto;
}

.resume-modal img {
  max-height: calc(100vh - 80px - 96px - 2rem);
  max-width: none;
  height: auto;
  width: auto;
}
```

**Target Display**: ~780px height (within 900px viewport), width auto-calculated from aspect ratio (≈603px at 780px height).

### Mobile (≤639px) — Width-Constrained

```css
.resume-modal {
  max-width: min(90vw, 640px);
}

img {
  max-width: 100%;
  height: auto;
  max-height: none;
}
```

**Target**: Resume occupies ~90% of viewport width, small 12-16px margins.

### Aspect Ratio Preservation
- Image aspect ratio: 3400/4400 = 0.773
- Preserved via `object-fit: contain` on `<img>`
- CSS constrains one dimension; other calculated automatically

## Asset Files

| File | Purpose | Dimensions | Size |
|------|---------|------------|------|
| `Jawahar_A_Bcom_BCA_GlassMorphism.webp` | Display asset | 3400×4400px | 335 KB |
| `Jawahar_A_Bcom_BCA_GlassMorphism.pdf` | Source PDF | Letter | 217 KB |
| `Jawahar_A_Bcom_BCA.pdf` | Download (ATS) | Letter | 178 KB |

**Do NOT modify these files.** They are final assets.

## Image Loading Strategy

### Native `<img onLoad/onError>`

```tsx
<img
  src="/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp"
  onLoad={() => setImageState('loaded')}
  onError={() => setImageState('error')}
/>
```

**Why not preload?** The previous implementation used a separate `new Image()` preload in `useEffect` which created a race condition. The native `<img>` handlers are the source of truth — no separate preload object to desync.

### State Transitions

| Event | State Change | UI Result |
|-------|--------------|-----------|
| Mount | `loading` | "Loading resume..." |
| `onLoad` | `loaded` | Show `<img>` |
| `onError` | `error` | "Unable to load resume." |

**Never stuck on "Loading resume..."** — error state always reachable.

## Animation

### Opening (300-450ms)
- Backdrop: opacity 0 → 1 (300ms)
- Card: scale 0.96→1, y: 8→0 (400ms, delay 50ms)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple-style ease-out)

### Closing (300ms)
- Card: scale 1→0.97, y: 0→6
- Backdrop: opacity 1→0
- Simultaneous

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## Header & Actions

### Header (All Viewports)
```
Resume | Download Resume | X
```

- "Download Resume" text on all sizes (no `sm:hidden`/`sm:inline` split)
- Download icon + text
- X button with aria-label

### Mobile Footer (≤639px)
Duplicate Download/Close for thumb reachability, safe-area aware.

## State Machine Implementation

```typescript
const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');

const handleImageLoad = () => setImageState('loaded');
const handleImageError = () => setImageState('error');

// Render
{imageState === 'loaded' ? (
  <img src={src} onLoad={handleImageLoad} onError={handleImageError} />
) : imageState === 'error' ? (
  <div>Unable to load resume.</div>
) : (
  <div>Loading resume...</div>
)}
```

## Error Handling

- **Network failure** → `onError` → `error` state → "Unable to load resume."
- **Decode failure** → Same as network failure
- **404/500** → Same as network failure
- **Never stuck** — error state always reachable, loading never permanent

## Asset Requirements

### Display WebP
- Path: `/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp`
- Dimensions: 3400×4400px
- Format: WebP (lossless)
- Size: ~335 KB
- DPI: 400 equivalent
- **Do NOT modify**

### Download PDF
- Path: `/resumes/Jawahar_A_Bcom_BCA.pdf`
- Standard ATS-friendly PDF
- Served via `<a download>` — triggers browser download
- **Do NOT modify**

### Source PDF (Archival)
- Path: `/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.pdf`
- Source for WebP generation
- **Do NOT modify**

## Responsive Breakpoints

```css
/* Mobile-first: width-constrained */
.resume-modal {
  max-width: min(90vw, 640px);
}

@media (min-width: 640px) {
  .resume-modal {
    max-height: calc(100vh - 176px); /* header + margins */
    max-width: none;
    width: auto;
  }
}

/* Image scaling */
img { max-width: 100%; height: auto; }

@media (min-width: 640px) {
  .resume-modal img {
    max-height: calc(100vh - 176px);
    max-width: none;
    height: auto;
    width: auto;
  }
}
```

## Safe Area Support

```css
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
```

Mobile footer uses `.safe-bottom` for iPhone home indicator.

## Asset Verification

```bash
# Verify WebP
file public/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp
# → WebP image, 3400x4400

# Verify HTTP
curl -I https://jawaharp.vercel.app/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp
# → 200 OK, image/webp, 335682 bytes
```

## No PDF.js

**Intentionally removed.** The viewer uses native `<img>` — no PDF.js, no canvas rendering, no worker, no zoom/pan/scroll controls. This is intentional for:
- Performance (no 2MB+ PDF.js bundle)
- Simplicity (native image loading)
- Reliability (no canvas/decoding issues)
- Visual fidelity (WebP preserves exact design)

## File Locations

| File | Path |
|------|------|
| Component | `src/components/shared/ResumeOverlay.tsx` |
| Trigger | `src/sections/resume.tsx` |
| Styles | `src/app/globals.css` (`.resume-modal`, `.resume-modal img`) |
| Assets | `public/resumes/` |
| Tests | `test-resume.spec.ts`, `test-production.spec.ts` |

## Testing Checklist

- [ ] Desktop 1440×900: Image 998×1292, centered, complete
- [ ] Mobile 393×852: Full width, complete, readable
- [ ] Mobile 375×667: Fits, no clipping
- [ ] Mobile 390×844: Fits, no clipping
- [ ] Mobile 414×896: Fits, no clipping
- [ ] Loading state → image transition
- [ ] Error state shows "Unable to load resume."
- [ ] Download Resume downloads PDF
- [ ] Close button works
- [ ] Backdrop click closes
- [ ] Escape key closes (if implemented)
- [ ] Animation smooth, no flash
- [ ] No console errors

## File Locations

| File | Path |
|------|------|
| Component | `src/components/shared/ResumeOverlay.tsx` |
| Trigger | `src/sections/resume.tsx` |
| Styles | `src/app/globals.css` |
| Display Asset | `public/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp` |
| Download Asset | `public/resumes/Jawahar_A_Bcom_BCA.pdf` |
| Tests | `test-resume.spec.ts`, `test-production.spec.ts` |