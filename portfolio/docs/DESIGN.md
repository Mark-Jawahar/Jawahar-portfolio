# Design Documentation

## Design Philosophy

**Premium, restrained, purposeful.** Inspired by Apple Vision Pro's Liquid Glass material system and Apple's editorial design language. The design prioritizes content clarity, perceptual quality, and restrained motion over decorative flourishes.

## Color Palette (oklch)

| Token | Value | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `--background` | `oklch(0.02 0 0)` | `#050505` | Page background |
| `--foreground` | `oklch(0.96 0 0)` | `#F5F5F5` | Primary text |
| `--pearl` | `oklch(0.96 0 0)` | `#F5F5F5` | Headlines, highlights |
| `--silver` | `oklch(0.68 0 0)` | `#A1A1AA` | Secondary text |
| `--graphite` | `oklch(0.55 0 0)` | `#8C8C8C` | Muted text, borders |
| `--accent` | `oklch(0.70 0.02 200)` | `#B8E7EF` | Primary accent (cyan) |
| `--accent-bright` | `oklch(0.82 0.03 200)` | `#D0F0F5` | Hover states, highlights |
| `--accent-deep` | `oklch(0.50 0.02 200)` | `#80D0D8` | Active states |
| `--accent-muted` | `oklch(0.65 0.015 200)` | `#A8E0E8` | Subtle accents |
| `--accent-violet` | `oklch(0.72 0.02 290)` | `#D5C8F5` | Secondary accent (lavender) |
| `--accent-lavender` | `oklch(0.80 0.02 290)` | `#E8DFF8` | Hover lavender |
| `--accent-navy` | `oklch(0.35 0.01 260)` | `#4A4A6B` | Deep navy accents |

**Why oklch?** Perceptually uniform color space — equal numeric changes = equal perceptual changes. Enables systematic color scaling.

## Typography

### Fonts
| Font | Source | Usage |
|------|--------|-------|
| Geist Sans (Variable) | `next/font/google` | All body text, UI |
| Geist Mono (Variable) | `next/font/google` | Code, technical data |

### Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero headline | 4.5rem / 5.5rem | 200 (Light) | 1.05 |
| Section heading | 2.25rem / 3rem | 300 (Light) | 1.1 |
| Subheading | 1.125rem / 1.25rem | 400 | 1.6 |
| Body | 1rem / 1.125rem | 400 | 1.7 |
| Caption | 0.75rem / 0.875rem | 400 | 1.5 |

### Gradient Text
```css
.text-gradient {
  background: linear-gradient(135deg, oklch(0.96 0 0), oklch(0.75 0.02 200));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Liquid Glass Material System

### Base Material (`.glass`, `.liquid-glass`)
```css
background: linear-gradient(180deg, oklch(1 0 0 / 0.06), oklch(1 0 0 / 0.03) 45%, oklch(1 0 0 / 0.02));
backdrop-filter: blur(20px) saturate(150%);
border: 1px solid oklch(1 0 0 / 0.1);
box-shadow: [layered shadows for depth];
```

### Elevated Panel (`.glass-panel`)
- Higher opacity base (0.9/0.95)
- Deeper blur (30px)
- Stronger borders
- Deeper shadows
- Internal reflection overlay (`::after`)

### Cards (`.glass-card`)
- Subtle hover lift (`translateY(-4px)`)
- Border brightening on hover
- Background opacity increase on hover

### Mobile Modal (≤639px)
- Full-width, no border radius
- No backdrop filter (performance)
- Dark gradient background

## Color Accent System

### Primary Accent (Cyan)
- `--accent`: Base cyan for links, borders, focus rings
- `--accent-bright`: Hover states, active indicators
- `--accent-deep`: Active/pressed states
- `--accent-muted`: Subtle backgrounds, disabled states

### Secondary Accent (Lavender)
- `--accent-violet`: Secondary actions, case study accents
- `--accent-lavender`: Hover states for lavender elements
- `--accent-navy`: Deep navy for contrast

### Neutral Scale
- `--pearl`: Headlines, primary text
- `--silver`: Secondary text, descriptions
- `--graphite`: Muted text, placeholders, dividers
- `--background`: Page background
- `--foreground`: Default text

## Spacing System

Base unit: `0.25rem` (4px)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem (4px) | Micro gaps |
| `--space-2` | 0.5rem (8px) | Tight gaps |
| `--space-3` | 0.75rem (12px) | Standard gaps |
| `--space-4` | 1rem (16px) | Standard padding |
| `--space-5` | 1.25rem (20px) | Section gaps |
| `--space-6` | 1.5rem (24px) | Section padding |
| `--space-8` | 2rem (32px) | Large sections |
| `--space-12` | 3rem (48px) | Major sections |
| `--space-16` | 4rem (64px) | Hero spacing |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.45rem (7.2px) | Small elements |
| `--radius-md` | 0.6rem (9.6px) | Buttons, inputs |
| `--radius-lg` | 0.75rem (12px) | Cards, modals |
| `--radius-xl` | 1.05rem (16.8px) | Large cards |
| `--radius-2xl` | 1.5rem (24px) | Hero elements |
| `--radius-3xl` | 2.1rem (33.6px) | Large modals |
| `--radius-4xl` | 2.7rem (43.2px) | Full-screen mobile |

## Shadows & Elevation

### Layered Shadow System
Each surface uses 5-7 shadow layers for perceptual depth:
1. Inset highlight (top)
2. Inset shadow (bottom)
3. Inset border highlight
4. Ambient shadow (1px)
5. Contact shadow (2-4px)
6. Diffusion shadow (18-44px)
7. Color glow (accent tint)

### Elevation Levels
| Level | Component | Shadow Depth |
|-------|-----------|--------------|
| 0 | Flat content | None |
| 1 | Cards | 2px + 10px |
| 2 | Elevated cards | 4px + 20px |
| 3 | Modals | 40px + 120px |
| 4 | Tooltips/popovers | 8px + 24px |

## Motion & Animation

### Easing
```css
--ease-premium: cubic-bezier(0.16, 1, 0.3, 1); /* Premium ease-out */
```

### Durations
| Interaction | Duration |
|-------------|----------|
| Section entrance | 700ms |
| Modal open | 400ms (card), 300ms (backdrop) |
| Modal close | 300ms |
| Card hover | 500ms |
| Button press | 100ms |
| Scroll smooth | Continuous (Lenis) |

### Easing Curve
`cubic-bezier(0.16, 1, 0.3, 1)` — Premium ease-out (Apple-style)

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## Resume Viewer Design

### Modal Composition
```
┌─────────────────────────────────────┐
│ Backdrop (opacity 0.8, blur)        │
│ ┌─────────────────────────────────┐ │
│ │ Header: "Resume | Download X"   │ │
│ ├─────────────────────────────────┤ │
│ │                                 │ │
│ │   [3400×4400 WebP Image]        │ │
│ │                                 │ │
│ ├─────────────────────────────────┤ │
│ │ [Download Resume] [Close]       │ │ (mobile only)
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Responsive Sizing

| Breakpoint | Constraint | Implementation |
|------------|------------|----------------|
| Mobile (≤639px) | Width | `max-width: min(90vw, 640px)` |
| Desktop (≥640px) | Height | `max-height: calc(100vh - 176px)` |

Image aspect ratio: 3400/4400 = 0.773 (preserved via `object-fit: contain`)

### Glass Card Styling
- `.glass-panel` base
- `.portrait-card` for aspect ratio
- `.resume-modal` responsive sizing
- Header: `Resume | Download Resume | X`
- Mobile footer: Duplicate Download/Close (safe-area aware)

## Iconography

- **Lucide React** — All icons (24×24 base, 16×16 small)
- Stroke width: 2 (consistent)
- Rounded caps/joins
- CurrentColor for theme inheritance

## Button System

### Variants
| Variant | Background | Border | Text | Shadow |
|---------|------------|--------|------|--------|
| Primary | Cyan gradient | Cyan 40% | Cyan 90% | Cyan glow |
| Ghost | White 5% | White 10% | White 80% | Subtle |

### States
| State | Transform | Shadow |
|-------|-----------|--------|
| Default | — | Base |
| Hover | — | Elevated |
| Active | scale(0.97) | Inset |
| Focus-visible | — | 2px outline, 3px offset |

## Responsive Breakpoints

| Breakpoint | Min Width | Target |
|------------|-----------|--------|
| Mobile | ≤639px | iPhone SE/16 |
| Tablet | 640–1023px | iPad |
| Desktop | ≥1024px | Laptop/Monitor |

### Container Widths
| Breakpoint | Max Width |
|------------|-----------|
| Mobile | 100% (with padding) |
| Tablet | 768px |
| Desktop | 1200px |
| Large | 1400px |

## Accessibility

### Color Contrast (WCAG AA)
| Combination | Ratio | Status |
|-------------|-------|--------|
| Foreground/Background | 12.6:1 | ✅ AAA |
| Silver/Background | 4.8:1 | ✅ AA |
| Graphite/Background | 3.2:1 | ⚠️ AA Large only |
| Accent/Background | 4.2:1 | ✅ AA |

### Focus States
- 2px outline, 3px offset
- Accent color (`oklch(0.7 0.02 200)`)
- Visible on all interactive elements

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## Iconography

- **Library**: Lucide React
- **Base size**: 24×24 (16×16 small, 32×32 large)
- **Stroke**: 2px, round caps, round joins
- **Color**: `currentColor` (inherits text color)

## Asset Guidelines

### Images
- Profile: WebP, optimized via `next/image`
- Resume: WebP (3400×4400, 335KB, 400 DPI)
- OG Image: 1200×630 PNG

### Icons
- Lucide React (tree-shaken)
- SVG inline, `currentColor`
- No icon fonts

## Dark Mode Only

This portfolio is **dark-mode only** by design. No light mode support.

```css
@custom-variant dark (&:is(.dark *));
/* All styles written for dark mode */
```

## Motion Principles

1. **Purposeful** — Every animation serves orientation or feedback
2. **Restrained** — No bounce, no overshoot, no excessive duration
3. **Perceptual** — Easing matches physical expectation (ease-out)
4. **Respectful** — `prefers-reduced-motion` fully supported
5. **Coherent** — Shared easing, duration scales with distance

## Design Tokens Summary

| Category | Tokens |
|----------|--------|
| Colors | 18 semantic tokens |
| Spacing | 9 scale steps |
| Radius | 6 levels |
| Shadows | 4 elevation levels |
| Typography | 5 text styles |
| Animation | 1 easing, 5 durations |
| Breakpoints | 3 |
| Safe areas | 6 utilities |

---

*This design system is a living document. Update when design evolves.*