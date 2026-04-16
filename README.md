# Personal Portfolio

Personal portfolio built with React + TypeScript + Vite. Features scroll-triggered animations, parallax section numbers, dark/light mode, and a server-side contact form.

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18, TypeScript, Vite (SWC) |
| Styling | Tailwind CSS 3, ShadCN UI (Radix UI) |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Routing | React Router DOM 6 |
| Data fetching | TanStack React Query 5 |
| Contact API | Vercel Functions, Resend, Cloudflare Turnstile |
| Testing | Vitest, Playwright |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment variables

Create a `.env.local` file for local development:

```env
RESEND_API_KEY=re_...
TURNSTILE_SECRET_KEY=...
VITE_TURNSTILE_SITE_KEY=...
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for sending contact emails |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server-side verification) |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (client-side widget) |

### Run

```bash
npm run dev        # Vite dev server on http://localhost:8080
npm run dev:api    # Vercel dev (includes API routes at /api/*)
```

Use `npm run dev:api` when working on the contact form to run the Vercel Function locally.

## Commands

```bash
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run test       # Vitest (single run)
npm run test:watch # Vitest (watch mode)
```

## Project Structure

```
/
├── api/
│   └── contact.ts          # Vercel Function — contact form handler
├── src/
│   ├── assets/             # Static images
│   ├── components/
│   │   ├── ui/             # ShadCN primitives (don't edit directly)
│   │   ├── *Section.tsx    # One file per portfolio section
│   │   ├── SectionWrapper.tsx  # Parallax watermark + scroll container
│   │   ├── ScrollReveal.tsx    # Scroll-triggered fade/slide/blur wrapper
│   │   ├── Navigation.tsx      # Fixed nav with active section tracking
│   │   ├── ThemeProvider.tsx   # Light/dark context
│   │   └── ScrollProgress.tsx  # Top progress bar
│   ├── hooks/              # use-mobile, use-toast
│   ├── lib/utils.ts        # cn() helper (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Index.tsx       # Composes all sections
│   │   └── NotFound.tsx
│   └── index.css           # Tailwind directives + HSL CSS variables
├── vercel.json             # Vercel project config
└── vite.config.ts
```

## Sections

| # | Section | ID |
|---|---|---|
| 01 | Hero | `#hero` |
| 02 | About | `#about` |
| 03 | Tech | `#tech` |
| 04 | Experience | `#experience` |
| 05 | Projects | `#projects` |
| — | Education | `#education` |
| 06 | Contact | `#contact` |

## Contact API

`POST /api/contact` accepts `name`, `email`, `subject`, `message`, and `turnstileToken`. Verifies the Turnstile CAPTCHA server-side before sending the email via Resend.

## Deployment

Deployed on Vercel. Push to `master` triggers a production deployment automatically via the Vercel Git integration.

```bash
vercel        # Preview deploy
vercel --prod # Production deploy
```
