# SPEC.md — ClawPlex Site Refresh

**Goal:** Funnel every page to drive event RSVPs and attract AI builders, entrepreneurs, business owners, founders, and beginners to ClawPlex meetups.

**Primary conversion:** RSVP for next event (May 15, 2026 · 25N Coworking · Frisco)
**Secondary conversion:** Join Discord (ongoing engagement pipeline)

---

## 1. Remove Crypto/Blockchain from User-Facing UI

**Scope:** User-facing auth is API-key based. Backend wallet-signature support can remain for agent/API compatibility, but no third-party wallet sign-in UX should be used.

**What to change:**
- Remove wallet sign-in UI from nav and dashboard.
- Dashboard should rely on the API key saved after agent registration until a new auth model exists.
- Privacy policy should mention only language/functionality cookies, not auth cookies.

**Files to change:**
- `src/app/community/dashboard/page.tsx`
- `src/app/privacy/page.tsx`

**Exit criteria:**
- Zero "wallet" language visible to users in the sign-in UX
- Privacy policy accurately reflects the current site behavior
- No third-party wallet sign-in frontend dependency

---

## 2. Homepage Hero — Lead with the Next Event

**Current state:** Hero has banner image + "Built by builders, for builders" headline. Countdown is below the fold. Social proof is minimal.

**Change:**
- Hero section should open with the next event date, venue, and RSVP CTA — above the fold on desktop
- Add meetup photo from May 6 (already added to `/node-03-meetup.png`)
- Add social proof badge: "4 meetups done · Next: May 15 · 25N Coworking, Frisco"
- Headline should feel like an invitation, not a manifesto: something that speaks to showing up and building with others
- Keep the "Built by builders" line but move it below the fold — it's supporting copy now, not the hook

**Files:** `src/app/page.tsx` (HeroBanner + EventSection)

**Exit criteria:**
- Above the fold: next event date + location + RSVP button + meetup photo
- Headline speaks to "showing up and building" not abstract brand positioning
- May 6 meetup photo is visible in hero or immediately below it

---

## 3. Rewrite Homepage Copy for Four Personas

**Personas:**
1. **AI builders** — want proof it's technically serious, hands-on, real projects
2. **Entrepreneurs / founders** — want deal flow, collaborators, people who ship
3. **Business owners** — want automation ROI, practical tools, not hype
4. **Beginners** — want to know it's not intimidating, there's a low bar to show up

**What to change:**
- "What is ClawPlex" section should speak to all four without losing any
- The three "ways to engage" should feel like a progression from curious → committed
- No jargon that excludes beginners; no vagueness that bores builders
- Test: a first-timer lands on the page — do they feel like they belong in 5 seconds?

**Copy principle:** Describe what *actually happens* — weekly meetups, live demos, people showing what they shipped, no slides, no vendor pitches. Real > impressive.

**Files:** `src/app/page.tsx` (WhatIsClawPlex + ThreeWays sections)

**Exit criteria:** All four personas can see themselves in the copy. No exclusionary jargon. Real specificity over generic community language.

---

## 4. Events Page — Track Record, Not Calendar

**Current state:** Events page shows upcoming + past events with venue/location info. Past events have minimal context.

**Change:**
- Past events should feel documented and real — photos, headcount, what happened
- May 6 meetup (Node 03) should have the meetup photo + stats visible
- Upcoming event (Node 04) should have aggressive RSVP CTA — not just a link, but a reason to click now
- Consider adding a "why attend" callout on the upcoming event — what specifically happens there
- The page header should make clear: "this is an ongoing community, not a one-time conference"

**Files:** `src/app/events/page.tsx`

**Exit criteria:**
- Node 03 (May 6) shows meetup photo + attendee count + what happened
- Node 04 (May 15) has prominent RSVP CTA with concrete "what to expect"
- Page reads like a record of real activity, not a schedule board

---

## 5. Sponsor Page — Build Community Legitimacy

**Current state:** `/sponsors` page exists but content is unknown — audit it.

**Change:**
- If no real sponsors exist yet, remove the page from nav and sitemap temporarily
- If Jonesy Cookie or other real local partners exist, add them with logo, description, and link
- Sponsor logos/placement should feel credible, not like placeholder names
- Each sponsor entry should include: name, what they provide, how it ties to the community

**Files:** `src/app/sponsors/page.tsx`, `src/components/nav.tsx`

**Exit criteria:**
- Nav and sitemap only show sponsors page if it has real content
- If sponsors exist, page shows logo + what they do for the community + links
- No empty or placeholder sponsor entries

---

## 6. Remove Crypto/Blockchain from Nav and Footer

**Current state:** Nav and footer may have links to crypto/Web3 features.

**Change:**
- Audit nav links — remove anything that isn't community-relevant (wallet connect, blockchain features, etc.)
- Footer should be minimal: event date, Discord link, newsletter signup, maybe a one-liner about what ClawPlex is
- No crypto/blockchain references anywhere in nav or footer

**Files:** `src/components/nav.tsx`, `src/components/footer.tsx`

**Exit criteria:** Nav and footer only contain links that serve the mission (events, community, Discord, newsletter, skills if active).

---

## 7. Skills Page — Active or Hidden

**Current state:** `/skills` page exists. Is it active content or placeholder?

**Change:**
- If skills page is empty, half-finished, or looks like a template: remove it from nav and sitemap
- If it has real content: make sure it's accurate, has real skill examples, and links to working install/config docs
- Don't keep a page that sends people to dead ends

**Files:** `src/app/skills/page.tsx`, `src/components/nav.tsx`, `src/app/sitemap.ts`

**Exit criteria:**
- Skills page is either (a) genuinely active with real content, or (b) removed from nav and sitemap
- No "coming soon" or empty state skills pages left visible

---

## 8. Founders Section — Add Team to Bottom of Homepage

**Reference:** Y Combinator landing page style — founders listed with name + photo at the bottom of the page.

**Tyler, Amit, Anjal, and Jonny are the people who run ClawPlex. They should be visible on the site.**

**What to add:**
- New section at bottom of homepage (above or replacing the current footer CTA) — "Built by" section showing the four founders
- Each founder: headshot photo, name, role/description (founder, co-organizer, etc.)
- Minimal, clean layout — name + short tagline under each photo
- Photos: Tyler, Amit, Anjal, Jonny — provided by Tyler via message

**Roles for each:**
- Tyler Delano — Founder, Organizer
- Amit Arora — Co-organizer
- Anjal Parikh — Co-organizer
- Jonny Christopher — Co-organizer

**Files:** `src/app/page.tsx` (new section), `public/` (photo files)

**Exit criteria:**
- All four founders visible with photo + name + role
- Clean YC-style layout, no flash or unnecessary UI
- Photos provided by Tyler directly via chat

---

## General Notes

- Do not touch `llms.txt` — it's for agent ingestion, not user-facing
- Preserve existing build passing (`npm run build`)
- Preserve existing tests if any exist
- Commit cleanly — one logical commit per item above, message describes the change, not "updates"
- PR from `feat/site-refresh` → `main` when all 8 items are complete
- All changes should feel intentional, not incremental drift — the site's voice should be consistent by the end
