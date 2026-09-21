# Jawahar A — Portfolio

Premium personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16+
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, Lenis
- **UI:** shadcn/ui, Lucide React
- **Forms:** React Hook Form, Zod
- **Database:** Supabase (optional)
- **Auth:** Clerk (optional)
- **Media:** Cloudinary (optional)

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint code |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- Clerk (admin auth)
- Supabase (database)
- Cloudinary (image storage)
- Web3Forms (contact form)
- Google Analytics

## Folder Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── sections/      # Page sections
├── layouts/       # Layout components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and integrations
├── types/         # TypeScript types
├── utils/         # Helper functions
├── config/        # Site configuration
├── data/          # Local data files
├── animations/    # Animation utilities
└── providers/     # React providers
```

## Deployment

Deploy to Vercel with zero configuration:

```bash
npx vercel --prod
```

## Features

- Smooth scroll animations
- Glassmorphism design
- Interactive resume
- Admin dashboard (coming soon)
- CMS integration (coming soon)
- Blog support (coming soon)

## Screenshots

*Coming soon*
