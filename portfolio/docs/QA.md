# QA Documentation

## Quality Assurance Overview

This document outlines the quality assurance process for the Jawahar Portfolio project, including automated checks, manual visual verification, and testing procedures.

## Automated Checks

### Lint & Type-Check

```bash
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript type-check
npm run build         # Full production build (includes both)
```

**Expected Results:**
- `npm run lint`: 0 errors (1 expected warning: `<img>` LCP)
- `npx tsc --noEmit`: 0 errors
- `npm run build`: Successful compilation

### Playwright E2E Testing

```bash
# Install
npm install --save-dev @playwright/test
npx playwright install chromium

# Run tests
npx playwright test test-resume.spec.ts --reporter=line
npx playwright test test-production.spec.ts --reporter=line
```

**Test Files:**
- `test-resume.spec.ts` — Local development server tests
- `test-production.spec.ts` — Production deployment tests

### Test Coverage

| Test | Scope |
|------|-------|
| `test-resume.spec.ts` | Local dev server Resume Viewer |
| `test-production.spec.ts` | Production deployment verification |
| Direct WebP load test | Asset accessibility & decode |

## Visual QA Checklists

### Desktop (1440×900, Chrome 100%)

| Check | Criteria |
|-------|----------|
| Modal opens | Smooth animation, no flash |
| Resume visible | Complete, large (≈998×1292px), readable |
| Centering | Horizontally & vertically centered |
| No cropping | Entire resume visible |
| No scrolling | No vertical/horizontal scrollbars |
| No black sidebars | Card closely wraps image |
| No zoom controls | None present |
| No PDF toolbar | None present |
| Header | "Resume \| Download Resume \| X" |
| Animation | Smooth (300-450ms), no flash/bounce |
| Download Resume | Visible, downloads `Jawahar_A_Bcom_BCA.pdf` |
| Close button | Works (click + backdrop click) |
| Animation | Smooth scale 0.96→1, y: 8→0 |

### Mobile (393×852 iPhone 16)

| Check | Criteria |
|-------|----------|
| Resume fills width | Nearly full usable width |
| Complete resume visible | No clipping/cropping |
| Small margins | 12-16px outer margins |
| No black sidebars | No large black areas |
| No scrolling | No internal scrollbar |
| No zoom | No zoom controls |
| Safe area | Respects `env(safe-area-inset-*)` |
| Download/Close | Visible and functional |
| Animation | Smooth, no flash |

### Additional Mobile Viewports

| Viewport | Device |
|----------|--------|
| 375×667 | iPhone SE / 8 |
| 390×844 | iPhone XR/11 |
| 414×896 | iPhone 12/13/14 |

## Automated Playwright Tests

### Local Development Tests (`test-resume.spec.ts`)

```bash
npx playwright test test-resume.spec.ts --reporter=line --project=chromium
```

**Tests:**
1. Direct WebP load test (200, image/webp, 3400×4400)
2. Desktop Resume Viewer (1440×900)
3. Mobile Resume Viewer (393×852)

### Production Verification (`test-production.spec.ts`)

```bash
npx playwright test test-production.spec.ts --project=chromium --baseURL=https://jawaharp.vercel.app
```

**Tests:**
1. Production desktop verification
2. Production mobile verification

### Running All Tests

```bash
# All tests
npx playwright test --reporter=line

# Specific project
npx playwright test --project=chromium

# With trace
npx playwright test --trace=on
```

## Visual QA Protocol

### Screenshot Requirements

| Screenshot | Viewport | Filename |
|------------|----------|----------|
| Desktop | 1440×900 | `resume-final-desktop.png` |
| Mobile | 393×852 | `resume-mobile-final.png` |

**Capture Rules:**
- Viewport screenshots only (`fullPage: false`)
- Capture after modal animation completes (1.5s delay)
- Capture after image fully loads
- No `fullPage: true` (viewport only)

### Geometry Verification

From Playwright, extract:

**Desktop (1440×900):**
- Modal width / height
- Resume image width / height
- Left/right margins
- Top/bottom margins

**Mobile (393×852):**
- Same measurements

### Geometry Targets

| Metric | Desktop (1440×900) | Mobile (393×852) |
|--------|-------------------|------------------|
| Image width | ~998px | ~361px (90vw) |
| Image height | ~1292px (≤ viewport) | ~462px |
| Side margins | Balanced | ~16px each |
| Top/bottom margins | ~48px | ~48px |

## Console & Network Checks

### Console
- No JavaScript errors
- No React hydration errors
- No image decoding warnings
- No failed requests

### Network
- WebP: 200 OK, `image/webp`, 3400×4400
- PDF download: 200 OK, `application/pdf`
- No 404s, 500s, CORS errors

## Resume Viewer Specific Checks

| State | Expected Behavior |
|-------|-------------------|
| Initial | "Loading resume..." visible |
| Load success | Image appears, loading text hidden |
| Load failure | "Unable to load resume." shown |
| Image dimensions | 3400×4400 natural, scaled to viewport |
| Header | "Resume \| Download Resume \| X" |
| Download | Triggers PDF download |
| Close | Modal closes, backdrop click works |

## Accessibility Checks

- [ ] Semantic HTML (`role="dialog"`, `aria-modal`)
- [ ] Focus management (trap in modal)
- [ ] Escape key closes modal
- [ ] Focus trap in modal
- [ ] Focus returns to trigger on close
- [ ] `aria-label` on close button
- [ ] `aria-label` on download link
- [ ] Alt text on resume image
- [ ] `prefers-reduced-motion` respected
- [ ] Sufficient color contrast
- [ ] Focus visible outlines

## Performance Budgets

| Metric | Target |
|--------|--------|
| LCP (profile image) | < 2.5s |
| Resume WebP load | < 500ms (335KB) |
| Modal open → image visible | < 800ms |
| Build time | < 60s |
| Bundle size (JS) | < 200KB gzipped |

## CI/CD Integration

```yaml
# .github/workflows/ci.yml (example)
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
      - run: npx playwright test --reporter=line
```

## Manual Verification Sign-Off

| Check | Verified By | Date |
|-------|-------------|------|
| Lint | | |
| Build | | |
| Desktop Visual QA | | |
| Mobile Visual QA | | |
| Download Test | | |
| Animation | | |
| Console Clean | | |
| Accessibility | | |

---

**Last Updated**: 2026-09-21