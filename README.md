# Remote Full-Stack Developer — Portfolio

A dark, terminal-inspired developer portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Static, fast, SEO/ATS-optimized, and ready to deploy on **GitHub Pages**.

> Title: **Remote Full-Stack Developer** — React, TypeScript & Rust | Web Apps, APIs, Dashboards & Automation

---

## ✨ Features

- **Premium animated UI**: global animated background (grid + drifting glow + subtle code rain), cursor-follow spotlight (desktop only), top scroll-progress bar
- Animated hero with glowing profile frame, floating tech badges, staggered entrance and a **terminal boot sequence** that types out the `developer` object
- Sections: About, Technical Stack, **How I build (workflow pipeline)**, Experience timeline, Selected Projects (case-study modals with tabs), **Remote-ready**, ATS-friendly Resume, Contact (terminal-style card with copy-email)
- Project cards with **3D tilt**, animated gradient borders, category labels and media indicators; case studies with a screenshot carousel + local video demos inside a browser frame, and **beautiful mockup fallbacks** when media is missing
- Reusable Framer Motion variants in `src/lib/motion.ts`; magnetic buttons + shine micro-interactions
- Data-driven content (`src/data/`) — edit text without touching components
- SEO: title/description/canonical, Open Graph + Twitter cards, JSON-LD `@graph` (Person, ProfilePage, WebSite, FAQPage, projects), generated 1200×630 OG image, `robots.txt` + `sitemap.xml`, Services + FAQ sections, semantic HTML, single `h1`, `<noscript>` fallback
- Responsive (mobile / tablet / desktop), lazy-loaded media, **`prefers-reduced-motion` respected everywhere**, accessible buttons/links, focus-trapped modal

### Components

`AnimatedBackground` · `CursorGlow` · `ScrollProgress` · `Navbar` (glass + active-section highlight + "Hire me") · `Hero` · `TerminalCard` · `MagneticButton` · `SectionHeading` · `About` · `Skills` · `Workflow` · `ExperienceTimeline` · `ProjectsGrid` / `ProjectCard` / `ProjectMedia` · `CaseStudyModal` · `RemoteReady` · `ResumeSection` · `Contact` · `Footer`

Helpers: `src/lib/motion.ts` (animation variants) · `src/lib/useActiveSection.ts` (nav highlight) · `src/lib/asset.ts` (base-path).

> No new runtime dependencies were added in the visual upgrade — it uses the already-installed `framer-motion` and `react-icons`.

---

## 🧰 Tech Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · lucide-react / react-icons

---

## 🚀 Getting Started

Requires **Node.js 18+** (tested on Node 20/22).

```bash
# 1. Install dependencies
npm install

# 2. Run locally (http://localhost:5173)
npm run dev

# 3. Type-check + production build (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## ✏️ What to replace (placeholders)

All personal data lives in **`src/data/`** and a few asset files in **`public/`**.

| What                          | Where                                                            |
| ----------------------------- | ---------------------------------------------------------------- |
| Name, contact, links, email   | `src/data/site.ts`                                               |
| Education details             | `src/data/site.ts` (`education`)                                 |
| Skills / stack                | `src/data/skills.ts`                                             |
| Experience bullets            | `src/data/experience.ts`                                         |
| Projects + case studies       | `src/data/projects.ts`                                           |
| Profile photo                 | `public/profile.jpg`                                             |
| CV / resume PDF               | `public/cv.pdf` (placeholder included)                           |
| Project screenshots / videos  | `public/projects/<project>/…` (see `public/README-ASSETS.md`)    |
| Social share image            | `public/og-image.png` (1200×630)                                 |
| Canonical URL / OG / JSON-LD  | `index.html` (search for `your-username`)                        |

> Missing screenshots, videos, or the profile photo won't break the site — a clean fallback is shown instead.

---

## 🌐 Deploy to GitHub Pages

This project is configured for the **user site** `https://mohamedfaizallah.github.io/`, so Vite's `base` is `/` (the default in `vite.config.ts`).

### Production URL (single source of truth)

The production origin `https://mohamedfaizallah.github.io` appears in:

1. `src/data/site.ts` → `url`
2. `index.html` → canonical, Open Graph, Twitter and all JSON-LD URLs
3. `public/sitemap.xml` → `<loc>`
4. `public/robots.txt` → `Sitemap:`

Only change it for a different username or a custom domain (`base` stays `/`).

### Option A — GitHub Actions (recommended, automatic)

1. Create a repo named exactly **`mohamedfaizallah.github.io`** and push this project to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow (`.github/workflows/deploy.yml`) runs `npm ci`, `npm run build`, uploads `dist/`, and deploys.

Your site goes live at `https://mohamedfaizallah.github.io/`.

### Option B — Manual with `gh-pages`

```bash
npm run deploy   # builds (base '/') and pushes dist/ to the gh-pages branch
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

### Custom domain later

Add a `public/CNAME` file containing your domain, set it under **Settings → Pages**, then update the 4 URL spots above to `https://yourdomain.com`. `base` stays `/`.

## 🔎 SEO

- **Generated assets:** `npm run images:generate` builds `og-image.png` (1200×630 social card) and `profile.jpg/.webp/-512.jpg` from `public/my photo.png`. `npm run cv:generate` builds `cv.pdf`.
- **Metadata:** `index.html` has the title, meta description, canonical, robots, Open Graph + Twitter cards, and a JSON-LD `@graph` (Person, ProfilePage, WebSite, FAQPage, project CreativeWork). A `<noscript>` block mirrors the key content.
- **Visible content:** Services ("What I Can Build") and FAQ sections render as real HTML; project cards show title/summary/problem/stack on the page (not modal-only).
- **Crawl files:** `public/robots.txt` + `public/sitemap.xml`.

### Submit to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console), add your URL as a property.
2. Verify (HTML-tag method: add the provided `<meta name="google-site-verification" ...>` to `index.html` `<head>`, redeploy).
3. **Sitemaps →** submit `sitemap.xml`. Use **URL Inspection → Request indexing** for the homepage.

### Test structured data / previews
- Rich Results Test: [search.google.com/test/rich-results](https://search.google.com/test/rich-results) (paste the live URL — expects Person + FAQ).
- Schema validator: [validator.schema.org](https://validator.schema.org/).
- Social preview: LinkedIn [Post Inspector](https://www.linkedin.com/post-inspector/), Twitter/X card validator, or Facebook Sharing Debugger.

---

## 📁 Project Structure

```
portfolio-cv/
├─ .github/workflows/deploy.yml   # GitHub Pages CI
├─ public/
│  ├─ profile.jpg                 # your photo (replace)
│  ├─ cv.pdf                      # your resume (replace)
│  ├─ favicon.svg
│  ├─ og-image.png                # social preview (add)
│  └─ projects/
│     ├─ femup/      (screenshot-1.png, screenshot-2.png, demo.mp4)
│     ├─ ticketapp/  (…)
│     ├─ linkora/    (…)
│     └─ batiqad/    (…)
├─ src/
│  ├─ components/                 # Navbar, Hero, TerminalCard, About, Skills,
│  │                              # ExperienceTimeline, ProjectsGrid, ProjectCard,
│  │                              # ProjectMedia, CaseStudyModal, ResumeSection,
│  │                              # Contact, Footer, SectionHeading
│  ├─ data/                       # site, skills, experience, projects
│  ├─ lib/asset.ts                # base-path helper for public assets
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html                     # meta tags + JSON-LD
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

---

## ✅ Pre-publish checklist

- [ ] Confirm `src/data/site.ts` (name, email, phone, location, LinkedIn, `url`)
- [ ] Replace `public/my photo.png`, then run `npm run images:generate` (rebuilds profile + OG image)
- [ ] Replace `public/cv.pdf` with your real resume
- [ ] Add real screenshots + demo videos under `public/projects/*`
- [ ] Add real project Live Demo links in `src/data/projects.ts` (replace `'#'`)
- [ ] Verify the production URL in `index.html`, `sitemap.xml`, `robots.txt` matches your real GitHub username/domain
- [ ] Run `npm run build`, then `npm run preview` and click every CTA
- [ ] Deploy, submit `sitemap.xml` in Google Search Console, run the Rich Results Test
```
