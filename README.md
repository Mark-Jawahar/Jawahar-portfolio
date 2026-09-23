# Jawahar A — Personal Portfolio

A premium personal portfolio for Jawahar A, focused on Customer Experience, Customer Success, CX Operations, leadership, career journey, measurable impact, and selected case studies.

## Live Project

- **Live Portfolio**: [https://jawaharp.vercel.app/](https://jawaharp.vercel.app/)
- **GitHub Repository**: [https://github.com/Mark-Jawahar/Jawahar-portfolio](https://github.com/Mark-Jawahar/Jawahar-portfolio)

## Project Purpose

This portfolio showcases Jawahar A's 5+ years of experience across Customer Success, Customer Onboarding, and CX Operations in EdTech, Real Estate, and Financial Services. It demonstrates measurable impact through structured onboarding workflows, proactive communication cadences, KPI-driven coaching, CRM hygiene, and cross-functional collaboration with Product, Sales, Marketing, and Operations.

The portfolio serves as a professional presence for recruitment and networking, demonstrating both technical implementation skills and customer-facing expertise.

## Key Features

- **Responsive Portfolio** — Works seamlessly across desktop (1440×900) and mobile (393×852 iPhone 16)
- **Premium Dark Visual System** — Deep black background, pearl/silver typography, restrained cyan/lavender accents
- **Liquid Glass-Inspired UI** — Layered transparency, blur, internal reflection, luminous borders, soft bloom
- **Customer Experience Positioning** — Career journey from Lead Generation to Assistant Team Lead
- **Impact Metrics** — 10 team members led, 500+ learners onboarded, 30% repeat query reduction, 25% CSAT improvement
- **Selected Case Studies** — Onboarding scale, repeat query reduction, team performance, property transactions, lead qualification
- **Interactive Resume Viewer** — GlassMorphism resume displayed as high-DPI WebP image, no PDF.js
- **Standard Resume Download** — Downloads ATS-friendly PDF
- **Responsive Navigation** — Smooth scroll, sticky header, mobile hamburger
- **Smooth Scroll & Animations** — Lenis smooth scroll, Framer Motion animations, Apple/macOS-style modal opening
- **Accessible Interactions** — Semantic HTML, ARIA labels, focus-visible states, reduced-motion support
- **SEO & Metadata** — Open Graph, JSON-LD, sitemap.xml, robots.txt, canonical URLs
- **Performance** — Static generation where possible, optimized images, lazy loading

## Resume Viewer Architecture

### View Resume (Visual)

Uses `Jawahar_A_Bcom_BCA_GlassMorphism.webp` (3400×4400px, 400 DPI equivalent) for on-site visual presentation. The image is rendered as a high-DPI WebP image in a centered, portrait-oriented glass card. No PDF.js is used — the browser renders the image natively via `<img onLoad/onError>` handlers with proper loading/error states.

### Download Resume

Uses `Jawahar_A_Bcom_BCA.pdf` for the downloadable standard/ATS-friendly resume. The "Download Resume" button triggers a direct download of the PDF file.

**Why two assets?** The GlassMorphism design uses visual effects (glassmorphism, gradients, transparency) that don't translate well to standard PDF rendering. The WebP display asset preserves the exact visual design for on-site viewing, while the PDF remains a clean, ATS-compatible document for recruiters.

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, tw-animate-css |
| Animations | Framer Motion, Lenis |
| UI Components | shadcn/ui, Lucide React |
| Forms | React Hook Form, Zod |
| Database | Supabase (optional) |
| Auth | Clerk (optional) |
| Media | Cloudinary (optional) |
| Forms | Web3Forms (contact) |
| Analytics | Google Analytics (optional) |
| Testing | Playwright (E2E) |

## Development / Local Setup

```bash
cd portfolio
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Production build (TypeScript + webpack) |
| `npm run start` | Start production server |
| `npm run lint` | Lint code (ESLint) |

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_APP_URL` — Production URL (defaults to https://jawaharp.vercel.app)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase (optional)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — Clerk auth (optional)
- `CLOUDINARY_*` — Cloudinary (optional)
- `WEB3FORMS_ACCESS_KEY` — Web3Forms contact form (optional)
- `NEXT_PUBLIC_GA_ID` — Google Analytics (optional)

## Project Structure

```
portfolio/
├── public/
│   ├── images/
│   ├── resumes/
│   │   ├── Jawahar_A_Bcom_BCA.pdf
│   │   ├── Jawahar_A_Bcom_BCA_GlassMorphism.pdf
│   │   └── Jawahar_A_Bcom_BCA_GlassMorphism.webp
│   ├── og-image.png
│   └── pdf.worker.min.mjs
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── shared/             # Shared components (ResumeOverlay, Header, etc.)
│   │   └── ui/                 # shadcn/ui components
│   ├── sections/               # Page sections (Hero, About, Impact, Journey, Resume, Contact)
│   ├── data/                   # Local data files (experience, metrics, case studies)
│   ├── config/                 # Site configuration (site.ts)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and integrations
│   ├── types/                  # TypeScript types
│   ├── config/                 # Site configuration
│   ├── providers/              # React providers
│   └── lib/seo.ts              # SEO utilities
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   ├── QA.md
│   ├── DESIGN.md
│   └── RESUME-VIEWER.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── ...
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — App structure, component organization, data flow
- [Development](docs/DEVELOPMENT.md) — Local setup, commands, troubleshooting, Playwright testing
- [Deployment](docs/DEPLOYMENT.md) — Vercel setup, production domain, build pipeline
- [QA](docs/QA.md) — Lint, build, Playwright testing, visual QA checklists
- [Design](docs/DESIGN.md) — Visual system, color palette, typography, motion
- [Resume Viewer](docs/RESUME-VIEWER.md) — Architecture, responsive sizing, asset rationale

## Architecture

See [Architecture Documentation](docs/ARCHITECTURE.md) for details on:
- App structure and routing
- Section/component organization
- Configuration and data files
- Reusable component library
- Styling system (Liquid Glass)
- Animation approach (Framer Motion + Lenis)
- Smooth scrolling implementation
- Resume viewer implementation
- Asset organization

## Development

See [Development Documentation](docs/DEVELOPMENT.md) for:
- Prerequisites (Node.js 18+, npm 9+)
- Local setup and development server
- Lint, build, type-check commands
- Playwright E2E testing
- Local QA procedures
- Common troubleshooting

## Resume Viewer

See [Resume Viewer Documentation](docs/RESUME-VIEWER.md) for:
- View Resume flow (WebP display asset)
- Download Resume flow (PDF download)
- Responsive sizing (desktop height-constrained, mobile width-constrained)
- No zoom, no scrolling, no PDF controls
- Safe-area handling for iOS/Android
- Animation specifications
- Asset locations and rationale

## Deployment

See [Deployment Documentation](docs/DEPLOYMENT.md) for:
- GitHub repository setup
- Vercel project configuration
- Production domain: `https://jawaharp.vercel.app/`
- Build pipeline (Turbopack/webpack)
- Environment variables
- Deployment flow
- **Root Directory**: auto-detected (`.`); the repository root is the Next.js project root

## Quality Assurance

See [QA Documentation](docs/QA.md) for:
- Automated checks (lint, type-check, build)
- Playwright E2E testing
- Desktop testing (1440×900, Chrome 100%)
- Mobile testing (393×852 iPhone 16, 375×667, 390×844, 414×896)
- Resume Viewer visual QA checklists
- Download verification
- Accessibility checks
- Console error monitoring

## Design System

See [Design Documentation](docs/DESIGN.md) for:
- Deep black background (#050505)
- Pearl/silver typography
- Restrained cyan/lavender accent system
- Liquid Glass material system
- Apple/Vision Pro inspiration
- Cinematic but restrained motion
- Premium editorial hierarchy

---

**Live Portfolio**: [https://jawaharp.vercel.app/](https://jawaharp.vercel.app/)  
**Repository**: [https://github.com/Mark-Jawahar/Jawahar-portfolio](https://github.com/Mark-Jawahar/Jawahar-portfolio)