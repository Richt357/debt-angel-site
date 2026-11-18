# Debt Angel: marketing website

Marketing / landing site for **Debt Angel**, a private, offline debt-payoff tracker for Android and iOS (Expo / React Native app in the private repo `Richt357/debt-angel-app`).

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS 4**, exported as a static site (`output: "export"`) with a `basePath` for GitHub Pages. No runtime JavaScript is needed for content; the only client code is the dark-mode toggle and a tiny scroll-reveal for the chart animations. No analytics, no cookies, no third-party requests, no binary assets.

## The page, top to bottom

1. **Hero: "Pick your poison."** A side-by-side split. *Avalanche* is the math path (lowest total interest). *Snowball* is the momentum path (fastest first win). Each card has a small animated "first debt cleared" meter. Then: "Debt Angel runs both and shows you the difference for your real debts." plus the store buttons.
2. **Compare (example data)**: the same four made-up debts run both ways: animated payoff bars per strategy, a "debts still open" chart (momentum), an "extra interest snowball pays" chart (math), and a results table including the minimums-only baseline. Then the "runs both" explainer next to a phone mockup of the Strategy screen.
3. **Which one is right for you?** Plain-English snowball vs avalanche explainer.
4. **How it works** (3 steps).
5. **Features** (supporting): phone mockups (Dashboard in light mode, Debt detail in dark mode) and 8 feature cards.
6. **Privacy**: no account, data stays on the device, no ads/analytics/tracking, offline, optional JSON export.
7. **Get the app**: Google Play and App Store buttons (placeholder `#` links, marked **Coming soon**), a **Free** price card, and a small "Sponsor a Debt: coming later" note (careful wording: optional, not available today, no promises).
8. **FAQ** (native `<details>`, works without JS).
9. Footer with links to **/privacy/** (adapted from the app's `PRIVACY_POLICY.md`, tracker-only / feature-off version) and **/terms/**.

### Example numbers (important)
Every number in the comparison section and in the phone mockups is **example data**, labelled "Example numbers" / "Example data" on the page. They come from four made-up debts plus a $200/month extra, run through the app's own payoff engine (`src/lib/payoff.ts` in the app repo) by `scripts/gen-example.cjs`, and stored in `lib/example.json`. Nothing on the site is a real user, review, rating, user count, press mention or testimonial. In this example avalanche saves $86.19 in interest and snowball clears its first debt 4 months sooner; the page says plainly that the gap depends on the user's own debts.

To regenerate: `APP=/path/to/debt-angel-app node scripts/gen-example.cjs` (the app repo must have `npm install`ed so TypeScript is available).

## Placeholders to replace before launch

All site-wide placeholders live in **`lib/site.ts`** (search for `PLACEHOLDER`):

| What | Where | Current value |
| --- | --- | --- |
| Google Play / App Store links | `PLAY_STORE_URL`, `APP_STORE_URL`, then set `STORES_LIVE = true` | `#` + "Coming soon" badge |
| Contact email | `CONTACT_EMAIL` (shown on /privacy and /terms) | `[YOUR_CONTACT_EMAIL@example.com]` |
| Developer / company name | `DEVELOPER` | `[YOUR NAME OR COMPANY NAME]` |
| Effective date | `EFFECTIVE_DATE` | `[DATE, e.g. 2026-12-01]` |
| Price | `PRICE_LABEL` | `Free` |
| Site URL / base path | `SITE_URL`, `BASE_PATH` (or env vars `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BASE_PATH`) | `https://richt357.github.io`, `/debt-angel-site` |

**Decision I made: pricing.** The app has no payments, ads or subscriptions, so the site says **Free**. This is a placeholder decision for you to confirm; if you add a paid tier later, change `PRICE_LABEL` and the "Price" card in `app/page.tsx` and the FAQ answer "How much does it cost?".

**Store buttons** are generic styled buttons, not the official badge artwork. When the listings exist, download the official badges from Google and Apple and follow their brand rules.

**Legal text:** `/privacy` and `/terms` are starter text that describe what the software does. Have a lawyer review them. The privacy policy must be hosted at a public URL for Google Play; once this site is live, use `https://<user>.github.io/<repo>/privacy/`.

## Run locally

Requires Node 22+.

```bash
npm install
npm run dev            # http://localhost:3000/debt-angel-site  (basePath applies in dev too)
```

Preview the static export exactly as GitHub Pages will serve it:

```bash
npm run build          # writes ./out
mkdir -p /tmp/preview && ln -sfn "$PWD/out" /tmp/preview/debt-angel-site
cd /tmp/preview && python3 -m http.server 4173      # http://localhost:4173/debt-angel-site/
```

Use `NEXT_PUBLIC_BASE_PATH="" npm run build` for a root-level site (custom domain), and set `NEXT_PUBLIC_SITE_URL` to that domain so canonical and Open Graph URLs are right.

Checks: `npm run lint` and `npm run typecheck`.

Screenshots (desktop 1440px and mobile 390px, light and dark): `npm i --no-save puppeteer-core`, serve the site as above, then `node scripts/screenshots.mjs http://localhost:4173/debt-angel-site/ screenshots`.

## Deploy to GitHub Pages

`.github/workflows/pages.yml` builds on every push to `main` (npm install, lint, build with the basePath set to the repo name, upload `out/`, deploy with `actions/deploy-pages`).

**One-time manual step:** in the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. Then re-run the workflow (Actions tab → "Deploy to GitHub Pages" → Run workflow). The site appears at `https://<user>.github.io/<repo>/`.

## Project structure

```
app/
  layout.tsx            metadata, Open Graph / Twitter tags, theme script, header + footer
  page.tsx              the landing page (all sections)
  privacy/page.tsx      privacy policy (tracker-only version)
  terms/page.tsx        terms of use (starter text)
  og.png/route.tsx      generates /og.png (1200x630) at build time
  icon.svg              favicon (the app icon, as SVG)
  globals.css           Tailwind + brand colours + the app's light/dark palettes + animations
components/
  Phone.tsx, screens.tsx    phone frame + HTML/SVG recreations of the Dashboard, Strategy and Debt screens
  PayoffBars.tsx, FirstWinMeter.tsx, LineChart.tsx    the example-data visuals
  Logo.tsx, logo-data.ts    the app icon redrawn as SVG (generated by scripts/gen-logo.py)
  StoreButtons.tsx, Faq.tsx, Header.tsx, Footer.tsx, ThemeToggle.tsx, Reveal.tsx, LegalPage.tsx
lib/
  site.ts               every placeholder and site-wide setting
  example.ts, example.json   example data (generated, see above)
scripts/                gen-logo.py, gen-example.cjs, screenshots.mjs
```

Brand colours and the icon come from the app (`src/theme/theme.ts`, `scripts/generate_icons.py`): indigo `#4F46E5`, gold halo `#FFC933`. Avalanche is drawn in the app's indigo and snowball in its green, matching the app's charts.

## Accessibility & SEO

Mobile-first layout, 44px+ tap targets, visible focus rings, skip link, semantic headings and tables, `aria-label`s on charts and mockups, `prefers-reduced-motion` respected (animations are skipped), light/dark theme that follows the system and can be toggled. Metadata includes title/description, canonical URL, Open Graph and Twitter card tags with a generated `/og.png`.
