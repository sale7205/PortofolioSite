# Saleh Aldhafeeri — Portfolio

Next.js (App Router) portfolio site for aerospace engineering work: project write-ups with
embedded PDFs/video, plus an interactive resume.

## Running it

```bash
npm install      # also copies the pdf.js worker into public/pdf-worker
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

Optional: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) — it drives canonical URLs,
`sitemap.xml` and `robots.txt`. Defaults to `https://salehaldhafeeri.com`.

## Where things live

```
src/
  app/                 routes only — each page is thin and mostly composes sections
    page.tsx             home
    projects/[slug]/     project detail (statically generated per project)
    resume/              resume page (server component -> ResumeView)
    sitemap.ts robots.ts globals.css icon.svg
  content/             ← ALL site data. Edit here, not in components.
    site.ts              name, bio, links, contact rows, nav, skills, site URL
    experience.ts        work, leadership, education, certifications, competencies
    projects.ts          projects, their PDFs/videos and resume one-liners
  sections/            home page sections (intro, projects, experience, contact)
  components/          shared UI — navbar, footer, projects/*, resume/*, ui/*
  lib/                 date formatting + `cn` helper
```

### Editing content

Everything the site says about Saleh lives in `src/content/`. The home page and the resume
page read the **same** entries, so a change shows up in both and the two can never disagree.

Dates are stored as `"YYYY-MM"` (or `null` for ongoing) and formatted at render time by
`src/lib/date.ts`. Timelines sort themselves reverse-chronologically — no manual ordering,
and no hand-written period strings to drift out of sync.

A project appears on the resume only if it has a `resumeSummary`; everything with `assets`
gets its own `/projects/<slug>` page, a card on the home page and a sitemap entry.

On the resume, an entry's `domain` picks its accent colour and its `keys` connect it to the
competency chips — hovering a chip highlights every entry tagged with a matching key.
