# CLAUDE.md — Portfolio

## Project Overview

Personal developer portfolio built with React + TypeScript + Vite. Animation-heavy with scroll-triggered reveals, parallax watermark numbers per section, and full dark/light mode support.

## Commands

```bash
npm run dev          # Dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest (watch mode)
npm run preview      # Preview production build
```

## Tech Stack

- **React 18** + **TypeScript** + **Vite** (SWC)
- **Tailwind CSS 3** — dark mode via `.dark` class, no prefix
- **ShadCN UI** — Radix UI primitives in `src/components/ui/`
- **Framer Motion 11** — scroll animations, parallax, layout transitions
- **Lucide React** — SVG icons throughout
- **React Router DOM 6** — SPA routing
- **TanStack React Query 5** — data fetching
- **Vitest + Playwright** — unit and e2e testing

## Path Alias

`@/` maps to `src/` — use it for all imports (e.g. `@/components/SectionWrapper`).

## Architecture

### Section Pattern

Every portfolio section wraps content in `<SectionWrapper>` which adds the parallax watermark number and scroll tracking:

```tsx
<SectionWrapper id="about" number="02" fullHeight className="py-40">
  <div className="max-w-6xl mx-auto px-6 w-full">
    <ScrollReveal>...</ScrollReveal>
  </div>
</SectionWrapper>
```

Sections in order: Hero (01) → About (02) → Tech (03) → Experience (04) → Projects (05) → Education (no number) → Contact (06).

### ScrollReveal

Wraps any content for a fade-in + slide-up + blur reveal on scroll. Accepts an optional `delay` prop for staggering:

```tsx
<ScrollReveal delay={0.08 * index}>...</ScrollReveal>
```

Fires once when 15% of the element enters the viewport. Uses easing `[0.16, 1, 0.3, 1]` at 0.8s duration.

### Theme System

`ThemeProvider` context toggles `.dark` on `<html>`. Reads from `localStorage`, falls back to `prefers-color-scheme`. All colors are HSL CSS variables defined in `src/index.css` under `:root` (light) and `.dark`.

Custom variables beyond ShadCN defaults:
- `--surface` — subtle hover/card background
- `--watermark-opacity` — controls large bg section numbers (0.04 light, 0.06 dark)
- `--nav-bg` — semi-transparent nav background

### Data Convention

Section content is defined as typed arrays at the top of each component and `.map()`-ed with staggered `delay={0.08 * i}` on `<ScrollReveal>`.

### Navigation

Fixed navbar uses `IntersectionObserver` to track the active section. Active indicator is a shared layout animation (`layoutId`). Backdrop blur activates at 40px scroll. Theme toggle uses `AnimatePresence` for icon swap.

## Styling Notes

- Container max-width: `max-w-6xl` (64rem) with `px-6` padding
- Watermark numbers: `25vw` font size, positioned top-right, `z-index: 0`; content sits at `z-index: 1`
- Custom animations in `tailwind.config.js`: `animate-bob` (4s float), `animate-bounce-chevron`
- Fonts: `Inter` (sans), `JetBrains Mono` (mono) — loaded from Google Fonts in `index.css`
- Button pattern: `h-12 px-8 rounded-full` with `active:scale-[0.98]`
- Hover cascades use Tailwind `group` / `group-hover:` on parent links

## File Structure

```
src/
├── components/
│   ├── ui/                  # ShadCN primitives — don't edit directly
│   ├── *Section.tsx         # One file per portfolio section
│   ├── SectionWrapper.tsx   # Watermark + scroll container
│   ├── ScrollReveal.tsx     # Scroll-triggered animation wrapper
│   ├── Navigation.tsx       # Fixed nav with active tracking
│   ├── ThemeProvider.tsx    # Light/dark context
│   └── ScrollProgress.tsx   # Top progress bar
├── pages/
│   ├── Index.tsx            # Composes all sections
│   └── NotFound.tsx
├── hooks/                   # use-mobile, use-toast
├── lib/utils.ts             # cn() — clsx + tailwind-merge
└── index.css                # Tailwind + all CSS variables
```
