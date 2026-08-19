# Zota Furniture Journal

A static blog about trending furniture, built as plain HTML, CSS and vanilla JS —
no build step, no dependencies. Open `index.html` in a browser and it works.

```
zota/
├── index.html                          # Blog home: hero, featured post, post grid, newsletter
├── style.css                           # Whole design system (one file, CSS custom properties at the top)
├── script.js                           # Reading progress, TOC scroll-spy, CTA reveal, signup form
├── sitemap.xml                         # For search engines
├── robots.txt
├── assets/
│   ├── logo.svg                        # ← PLACEHOLDER. Replace with the real Zota logo.
│   ├── favicon.svg
│   └── illo-*.svg                      # Line-art furniture illustrations used across the posts
└── posts/
    ├── furniture-trends-2026.html      # Flagship: "7 furniture trends shaping 2026 homes"
    ├── small-space-furniture-ideas.html
    └── sustainable-furniture-guide.html
```

## The logo

`assets/logo.svg` is a **hand-traced vector recreation** of the Zota mark — the navy
angular leg and orange chevron with the brand's diagonal slot cuts. It is on-brand and
correct in colour, but it is not pixel-identical to the original artwork.

**To use the real file instead**, drop it in as `assets/logo.png` (or `.svg`) and repoint
the two `<img class="brand-logo">` tags in each of the four HTML files:

```bash
grep -rln 'assets/logo.svg' zota/ | xargs sed -i 's|assets/logo\.svg|assets/logo.png|g'
```

Then set the real dimensions on those tags so the layout doesn't shift as it loads —
the `width`/`height` attributes just need to match the file's aspect ratio.

Both lockups are assembled in markup rather than baked into the image, so the wordmark
always renders in the site font:

- **Header** — mark + `zota` wordmark.
- **Footer** — mark + `zota` + the `Furniture & Interior` tagline (`.brand-stacked`).

If you swap in a full lockup image that already contains the wordmark and tagline,
delete the sibling `<span class="brand-name">` / `<span class="brand-text">` so the
name isn't doubled up.

## Brand colours

Taken from the logo. All in `:root` at the top of `style.css` — change these and the
whole site follows, illustrations included.

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#14395E` | Primary brand navy — logo, links, buttons, headings |
| `--navy-dark` | `#0E2A46` | Heading and hover states |
| `--orange` | `#F0912D` | Brand accent — tags, progress bar, callouts, list markers |
| `--leaf` | `#2F7A63` | Muted green, only in the sustainability illustration |
| `--bg` | `#faf8f5` | Warm linen page background |
| `--ink` | `#22303d` | Body text |

The six illustrations in `assets/` are drawn in `#14395E` with `#F0912D` accents, so
recolouring them is a find-and-replace on those two hex values.

## SEO that's already wired up

- Unique `<title>` and meta description per page, written to read as a search result
- Canonical URLs, Open Graph and Twitter card tags
- JSON-LD structured data: `Organization` + `Blog` on the home page; `BlogPosting`,
  `BreadcrumbList` and `FAQPage` on every post
- Semantic heading hierarchy (one `h1`, descriptive `h2`/`h3` with stable `id`s)
- Descriptive `alt` text on every illustration
- Internal linking between all three posts, plus breadcrumbs
- `sitemap.xml` and `robots.txt`
- Fast by construction: no framework, no tracking, `loading="lazy"` below the fold

**Target keywords by page**

| Page | Primary | Secondary |
| --- | --- | --- |
| Home | trending furniture | furniture trends 2026, Zota Furniture |
| Trends post | furniture trends 2026 | curved sofa, warm minimalism, modular sofa, round pedestal dining table |
| Small spaces | small space furniture ideas | apartment furniture, space saving furniture, multifunctional furniture |
| Sustainable | sustainable furniture | FSC certified wood, eco friendly furniture, greenwashing |

## Pointing at a real domain

URLs currently assume GitHub Pages at
`https://zikrayassin.github.io/zota/`. To move to a real domain:

```bash
grep -rl "zikrayassin.github.io/zota" . \
  | xargs sed -i 's|https://zikrayassin.github.io/zota|https://www.example.com|g'
```

That updates the canonicals, Open Graph URLs, JSON-LD and sitemap in one pass.

## Adding a post

Copy any file in `posts/` as the template, then change: `<title>`, meta description,
keywords, canonical, the OG/Twitter block, the JSON-LD (headline, description, dates,
breadcrumb, FAQ entries), the `<h1>` and body. Add a card to the grid in `index.html`
and a `<url>` entry to `sitemap.xml`.

## Notes

- The newsletter form has no backend. `script.js` intercepts the submit and confirms
  in place rather than posting to a dead endpoint — wire it to a real provider before launch.
- Copy is illustrative concept content for a fictional brand. The buying advice
  (measurements, foam densities, certification scopes) is written to be accurate and
  useful, but no product names, prices or availability are real.
