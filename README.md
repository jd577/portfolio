# Jawad Akhtar — SQA Engineer Portfolio

A production-quality, dependency-free portfolio website for **Jawad Akhtar, Software Quality Assurance Engineer**.

Static HTML + CSS + vanilla ES modules. No build step, no framework, no runtime
dependencies — deploy the folder anywhere and it works.

## Quick start

```bash
# Serve it locally (any static server works)
npx --yes serve .

# Or with Python
python3 -m http.server 8000
```

Then open `http://localhost:PORT`.

## Personalising the site (the only edit most people need)

Everything customisable lives in **`assets/js/config.js`**:

| Field       | What to set                                   | Where it appears                          |
| ----------- | --------------------------------------------- | ----------------------------------------- |
| `email`     | `"you@example.com"`                           | Contact card, footer, copy button         |
| `linkedin`  | `"https://www.linkedin.com/in/you"`           | Contact card, footer                      |
| `github`    | `"https://github.com/you"`                    | Contact card, footer                      |
| `cvUrl`     | `"assets/Jawad-Akhtar-CV.pdf"`                | Every "Download CV" button                |
| `siteUrl`   | your deployed domain                          | SEO / canonical tag (also edit index.html) |

Until a value is set, the site renders a clearly marked placeholder such as
`[Add Email]` or `[Add CV PDF]` — **nothing is ever invented and no link is ever
broken**.

### Adding your CV

1. Drop the PDF in `assets/` (e.g. `assets/Jawad-Akhtar-CV.pdf`).
2. Set `cvUrl: 'assets/Jawad-Akhtar-CV.pdf'` in `assets/js/config.js`.

### Adding project links

Edit `projectLinks` in `assets/js/config.js` (`thryve`, `flit`, `qualityguard`)
with real GitHub / demo URLs when available.

### Editing content

- Skills: `assets/js/data/skills.js`
- Tools: `assets/js/data/tools.js`
- Projects: `assets/js/data/projects.js`
- Test-case + bug examples: `assets/js/data/content.js`
- Sections: `assets/js/components/*.js`
- Styling: `assets/css/*.css` (design tokens, including both themes, in `tokens.css`)

## Features

- Light/dark theme with toggle, system preference detection and persistence
- Sticky nav with scroll-spy, reading-progress bar and accessible mobile menu
- Interactive skills explorer (7 categories, descriptive levels — no fake %)
- Filterable/searchable tools grid
- Three QA case-study project cards with workflow diagrams and expandable detail
- "How I Test a Feature" methodology walkthrough (keyboard-navigable tabs)
- Interactive TC-001 test case with 8 additional scenarios and copy-to-clipboard
- Bug-investigation walkthrough with expandable stages
- Experience timeline, QA philosophy, AI-for-QA, and growth sections
- WCAG 2.1 AA contrast in both themes, keyboard navigation, skip link,
  `prefers-reduced-motion` support, semantic HTML + JSON-LD, `noscript` fallback

## Verifying the site (smoke test)

The automated test drives the real site in a real browser (Chromium) and asserts
131 checks: rendered structure, every interaction, responsive layouts, and axe
accessibility audits in both themes.

```bash
npm run test:install   # one-time: installs playwright + chromium
npm test               # runs tools/smoke-test.mjs
```

## Deploying (GitHub Pages — recommended)

The site is pre-configured for `https://jd577.github.io/portfolio/`.

1. On GitHub, create a new **public** repository named `portfolio` (no README).
2. On the empty repo page click **uploading an existing file** and drag in:
   `index.html`, `robots.txt`, and the whole `assets` folder. Commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → branch `main`,
   folder `/ (root)` → **Save**.
4. After ~1 minute the site is live at `https://jd577.github.io/portfolio/`.

If you use a different repo name, update `siteUrl` in `assets/js/config.js`
and the canonical / og:url tags in `index.html`, then rebuild the bundle with
`node tools/build-bundle.mjs`.

Any other static host works too (Netlify, Vercel, Cloudflare Pages, or a plain
web server) — there is no build step: upload the folder as-is.

## Integrity rule

This portfolio deliberately contains **no invented achievements, companies,
certifications, metrics or links**. Missing information is shown as an explicit
`[Add …]` placeholder until real data is supplied in `assets/js/config.js`.
