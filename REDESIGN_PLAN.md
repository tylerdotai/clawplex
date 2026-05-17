# ClawPlex v2 Redesign — Working Plan

> Branch: `v2-redesign` (local only).
> Working doc — phases get checked off as we ship them. Re-read this any time
> we get out of sync.

---

## Goals

- Redesign the **frontend only**. No backend, API, auth, data, or routing changes.
- Editorial / refined personality (File 2 inspired). Less "tech-card neon."
- **Does not look AI-generated.** Restrained color, real photos, asymmetric layouts.
- Preserve **all existing copy, images, routes, and functionality**.
- **Dark only** for now. (Light mode + EN↔ES toggle deferred to later branches.)
- **Responsive** on mobile, tablet, and laptop — every section, every page.

## Guardrails (what we avoid)

- ❌ Gradient text, glow shadows, glassmorphism, animated meshes
- ❌ Grid-pattern noise overlays, film-grain
- ❌ `rounded-3xl` on every card, neon orange borders
- ❌ All-caps tiny mono labels on every section
- ❌ Generic SaaS 3-column "feature grids" with icon + headline + body
- ❌ Stock illustrations or AI-generated imagery

## Design language (what we apply)

- Single accent: `#fb7312` orange — sparingly, never decorative
- Background: `#0a0a0a` · surface `#131313` · elevated `#1a1a1a`
- Borders: hairlines, `rgba(255,255,255,0.08)` default, `0.18` on hover
- Type: **Playfair Display** (serif, 700/900 + italic) for h1/h2 · **Karla** for body & UI
- Italic accents on key words (e.g. "for", "drop") — File 2 signature move
- Radius: `8px` cards · `9999px` (pill) buttons · `0` inputs
- Spacing: generous section padding (`py-20 md:py-28 lg:py-32`)
- Asymmetric editorial rhythm, not symmetric grids
- Real photography prominent (clawcon-1…5, node-03, node-04 series, founder headshots)

## Responsive breakpoints

| Bucket  | Width                    | Tailwind prefix |
| ------- | ------------------------ | --------------- |
| Mobile  | 0 – 639px                | (default)       |
| Tablet  | 640 – 1023px             | `sm:` / `md:`   |
| Laptop  | 1024 – 1279px            | `lg:`           |
| Desktop | 1280px+                  | `xl:` / `2xl:`  |

**Every phase ships responsive across all three buckets.** I will spot-check in
the browser at 375 / 768 / 1280px before marking a phase done.

---

## Phases (one section at a time, browser-reviewed)

Each phase = one shippable section. We don't move to the next phase until you've
visualized it in the browser and approved it. If you want to redirect, we redirect.

### Phase 0 — Foundation (tokens + fonts)
*Invisible plumbing. Nothing visually changes until Phase 1 lands.*

- Update `src/app/globals.css` design tokens (palette, radius, hairlines)
- Swap Montserrat → Playfair Display in `src/app/layout.tsx`
- Remove `.film-grain` and `.grid-bg` classes
- Add `.underline-accent` (the fading orange underline)
- Keep `claw-*` variable names so older pages still compile while we rewrite

Status: ☐ proposed

### Phase 1 — Nav
- Thin top bar, hairline `border-b`, transparent → solid on scroll
- Wordmark (Karla semibold) + sentence-case links + orange pill CTA
- Drop all-caps mono link styling
- Community dropdown: cleaner, sentence-case
- Mobile: full-screen overlay refreshed
- Privy wallet button preserved

Status: ☐ pending Phase 0

### Phase 2 — Hero (home top)
- Split layout: text left (lg:col-span-5) / one strong photo right (lg:col-span-7)
- Mobile: stack — headline first, photo below
- Headline: "Built by builders, *for* builders." (italic "for")
- Eyebrow (mono small) + subhead + 2 CTAs + event-meta tag
- Replaces the 9-photo carousel with one curated photo (e.g. clawcon-1.webp)

Status: ☐ pending Phase 1

### Phase 3 — What is ClawPlex
- Narrow prose column (max-w-3xl), generous leading
- Drop the orange all-caps eyebrow
- Three pill tags (Wednesdays 2–3 PM · Live demos only · Everyone builds)

Status: ☐ pending Phase 2

### Phase 4 — Next Node (event + countdown)
- Two-column asymmetric: date badge + meta (left) · stats + countdown + CTAs (right)
- Orange date badge: serif "03" / mono "JUN"
- Countdown sized refined (not the current text-6xl numbers)
- Mobile: stack date-badge → meta → stats → countdown → CTAs

Status: ☐ pending Phase 3

### Phase 5 — Three Ways to Engage
- Numbered editorial list (01 / 02 / 03), not boxed grid
- Hairline rows, serif heading + body + arrow link per row
- Same three actions: Come to a Node · Join Discord · Follow LinkedIn

Status: ☐ pending Phase 4

### Phase 6 — Community Spotlight ("What we build")
- 3-column card grid (lg:grid-cols-3), hairline borders
- Each card: small tag · serif project name · builder · description
- Mobile: stack · Tablet: 2-col · Laptop: 3-col

Status: ☐ pending Phase 5

### Phase 7 — For Agents
- Drop cyan accent (kills second color)
- Clean dark code block + copy button + collapsible API details
- Same prompt text + curl examples

Status: ☐ pending Phase 6

### Phase 8 — Founders
- 4 headshots, rounded squares (not circles)
- Serif name + mono role
- Mobile: 2-col · Tablet+: 4-col

Status: ☐ pending Phase 7

### Phase 9 — Newsletter signup (homepage)
- Editorial: serif "Get the next drop." (italic "drop")
- One-line email + pill submit
- Past issues link below

Status: ☐ pending Phase 8

### Phase 10 — Footer
- Same 5-col grid, same links, hairline divider above bottom bar
- Drop all-caps mono column headers → small serif italic minis

Status: ☐ pending Phase 9

### Phase 11 — Mid-point checkpoint
- Tour the redesigned home + nav + footer top to bottom
- Adjust anything off-direction before we hit the other pages

Status: ☐ pending Phase 10

---

### Phase 12 — `/events` (with Luma integration)
**Plan:**
1. Fetch Luma ICS feed server-side (revalidate every 1h)
2. Parse with `ical.js` (lightweight, no native deps)
3. Render upcoming + past in our editorial date-badge style
4. Fallback to a static list if Luma is unreachable
5. Keep RSVP CTA → links out to the Luma event page

**Luma details to confirm at phase time:**
- ICS URL pattern (likely `https://api.lu.ma/ics/get?entity=calendar&id=<slug>`)
- Whether the public calendar at `luma.com/clawplex` exposes the feed without auth
- Required fields we render: title, start, end, location, description, URL

If the public ICS isn't available, fallback: scrape the public calendar JSON
that Luma's web app uses, or as a last resort embed their widget styled to
match our chrome.

Status: ☐ pending Phase 11

### Phase 13 — `/community` (feed)
- Visual refresh of the existing client component
- No change to feed data, posting, upvotes
- Empty state + loading skeletons in new style

Status: ☐ pending Phase 12

### Phase 14 — `/skills`
- Card grid in new design tokens
- Modal install flow preserved (same UX, restyled)

Status: ☐ pending Phase 13

### Phase 15 — `/sponsors`
- Editorial pitch + tier blocks in new design

Status: ☐ pending Phase 14

### Phase 16 — `/newsletter` (index + `[slug]`)
- Magazine-style article layout
- Past issues list

Status: ☐ pending Phase 15

### Phase 17 — `/privacy`, `/terms`
- Clean prose container, max-w-3xl, serif h1
- Same legal copy

Status: ☐ pending Phase 16

### Phase 18 — `/not-found` (404)
- Refresh the type, keep the joke
- Big serif heading, single CTA

Status: ☐ pending Phase 17

### Phase 19 — `/community/agents`, `/projects`, `/dashboard`
- Visual system applied; functionality untouched

Status: ☐ pending Phase 18

### Phase 20 — Final responsive QA
- Every page checked at 375 / 768 / 1280 / 1536px
- Browser console clean, no layout shift, no broken images
- Lighthouse mobile/desktop spot check

Status: ☐ pending Phase 19

---

## Locked decisions (2026-05-16)

- ✅ **Branch:** `v2-redesign`, local only. Rename to `feat/v2-redesign` if/when we push.
- ✅ **pnpm only.** Tailwind v4 (CSS config in `globals.css`). No `tailwind.config.*`.
- ✅ **Dev server runs with Turbopack** (`pnpm run dev --turbopack`) — faster + more resilient than webpack-in-dev.
- ✅ **Validation cadence** (REVISED — was causing the 500 errors):
  - **After every phase:** `pnpm run lint && pnpm run typecheck` only. These are static analyzers; they don't write to `.next/` and don't disturb the dev server.
  - **At checkpoints (Phase 11, Phase 20):** full `pnpm run build`. This overwrites `.next/` so the dev server has to be restarted after — expected, planned, fine.
  - **Before any push:** full sweep — `lint + typecheck + vitest run + build`.
  - **Why:** running `next build` while `next dev` is up clobbers shared `.next/` chunks; dev server then 500s with `Cannot find module './4599.js'`. The fix is to not interleave them.
- ✅ **Don't touch wallet copy** on this branch (SPEC §1 deferred). User will handle separately.
- ✅ **Don't rename Jonny** (user will confirm with him). Keep whatever ships in code.
- ✅ **Don't rewrite homepage copy for personas** (SPEC §3) — visual redesign only.
- ✅ **Sponsors / Skills:** before redesigning those pages (Phase 14/15), I'll read the page contents and report. User decides whether to redesign or hide.

## Deferred (separate branches)

- **EN ↔ ES language toggle** — own branch, after redesign lands
- **Light mode** — own branch
- **SPEC §1** — "Connect Wallet" → "Sign In" copy fix
- **SPEC §3** — homepage copy rewrite for 4 personas
- **Performance pass** beyond what falls out naturally

## What I will NOT touch on this branch

- `/src/app/api/*` (backend routes)
- Privy auth flow / wallet logic
- `src/lib/newsletter.ts` (data source)
- Supabase config / DB schemas
- JSON-LD schemas in `src/components/agent-readiness/`
- Anything in `/data/` or `/supabase/`
- `package.json` (unless we add `ical.js` for Phase 12 — I'll ask first)
