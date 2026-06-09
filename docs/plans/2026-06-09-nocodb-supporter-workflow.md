# NocoDB Supporter Workflow Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Add a ClawPlex supporter/sponsor workflow where the public site collects sponsor, venue, food/drink, speaker, service, prize, and volunteer interest while NocoDB acts as the lightweight CRM interface over the same database.

**Architecture:** Keep the CRM out of the Next.js app. ClawPlex owns the public UX, validation, copy, and submission endpoint; Supabase/Postgres owns the records; NocoDB owns spreadsheet/Kanban/form-style internal operations. `/work-with-us` becomes AI project/client work. `/support` becomes community support and sponsorship.

**Tech Stack:** Next.js 15 App Router, TypeScript, Supabase/Postgres migrations, Vitest, NocoDB as an external OSS Airtable-style admin UI, Tailwind v4 CSS tokens.

**Prerequisites:**
- Existing repo branch: `feat/nocodb-supporter-workflow`
- Supabase project access for migrations and service-role writes
- NocoDB deployment target chosen: local Docker, VPS, or hosted internal service
- NocoDB database connection method chosen: direct Supabase Postgres connection or separate Postgres replica/database

---

## Current Repository State Verified

- Active branch created from `origin/main`: `feat/nocodb-supporter-workflow`
- Working tree on the new branch is clean.
- Previous dirty work from `design/redesign-q1-2026` was preserved in git stash:
  - `stash@{0}: On design/redesign-q1-2026: pre-nocodb-plan-20260609163606`
- One open GitHub PR exists:
  - `#51 design: full site redesign — token foundation + conservative improvements`
  - branch: `design/redesign-q1-2026`
- Local `main` is ahead of `origin/main` by 5 commits. Do not delete or reset it until those commits are inspected.
- Stale cleanup candidates exist, but they are not safe to delete blindly:
  - local: `pr-44-work-with-us`, `fix/catbox-image-domain`, `feat/en-es-locale-no-privy`, `feat/colorway-swap`
  - remote: `chore/cleanup-junk`, `feat/contributing-md`, `feat/en-es-locale-no-privy`, `feat/colorway-swap`, `fix/catbox-image-domain`

## Branch / PR Cleanup Policy

Do not auto-delete branches or close PRs until the candidate list is reviewed.

Safe cleanup sequence after approval:

```bash
cd /home/tyler/clawplex
git fetch origin --prune

gh pr list --state open --limit 50

git branch --merged origin/main
git branch -r --merged origin/main
```

Delete only branches that are both:

1. merged or explicitly abandoned, and
2. not the active work branch, not `main`, and not carrying unpushed local commits.

Commands after approval:

```bash
# local only
git branch -d <branch>

# remote
git push origin --delete <branch>
```

---

## Decision: NocoDB, Not a Custom CRM

Do not build `/admin/partners` in ClawPlex right now. That recreates Airtable badly.

Use NocoDB for:

- table views
- filtered views
- Kanban by pipeline status
- sponsor/contact notes
- follow-up tracking
- exported CSVs
- internal edits
- quick operational fixes

Use ClawPlex for:

- public support page
- branded intake form
- validation
- spam controls
- API route
- confirmation message
- analytics/events if later needed

That gives Tyler the CRM he wants without turning the ClawPlex app into business software.

---

## Data Model

Create a Supabase migration:

`supabase/migrations/010_create_partner_pipeline.sql`

Use plain text columns instead of Postgres enums. NocoDB handles text/select fields more easily than strict enum migrations.

### `partner_leads`

Purpose: one row per inbound supporter/sponsor/partner inquiry.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `company text`
- `role_title text`
- `email text not null`
- `phone text`
- `website text`
- `city_area text`
- `support_types text[] not null default '{}'`
- `budget_range text`
- `contribution_details text`
- `event_scope text not null default 'not_sure'`
- `event_details text`
- `organization_description text`
- `why_support text`
- `target_audience text[] not null default '{}'`
- `success_definition text`
- `recognition_preference text not null default 'not_sure'`
- `recognition_options text[] not null default '{}'`
- `venue_name text`
- `venue_address text`
- `venue_capacity text`
- `venue_availability text`
- `venue_includes text[] not null default '{}'`
- `venue_cost text`
- `speaker_interest text not null default 'no'`
- `speaker_topic text`
- `speaker_format text[] not null default '{}'`
- `speaker_links text`
- `preferred_follow_up text not null default 'email'`
- `best_follow_up_time text`
- `notes text`
- `source text not null default 'support_page'`
- `status text not null default 'new'`
- `priority text not null default 'normal'`
- `assigned_to text`
- `next_follow_up_at timestamptz`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Allowed `status` values by convention:

- `new`
- `needs_follow_up`
- `qualified`
- `proposal_sent`
- `committed`
- `fulfilled`
- `declined`
- `archived`

Allowed `support_types` values by convention:

- `event_sponsor`
- `monthly_supporter`
- `venue_partner`
- `food_drink_partner`
- `prize_giveaway_partner`
- `speaker_workshop_partner`
- `services_partner`
- `volunteer`
- `hiring_recruiting`
- `other`
- `not_sure`

### `partner_tasks`

Purpose: follow-up and fulfillment tasks visible in NocoDB.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `lead_id uuid not null references partner_leads(id) on delete cascade`
- `task text not null`
- `task_type text not null default 'follow_up'`
- `status text not null default 'open'`
- `due_at timestamptz`
- `owner text`
- `notes text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### `partner_assets`

Purpose: sponsor logos, descriptions, links, files, and recognition assets.

Columns:

- `id uuid primary key default gen_random_uuid()`
- `lead_id uuid not null references partner_leads(id) on delete cascade`
- `asset_type text not null default 'logo'`
- `label text`
- `url text not null`
- `notes text`
- `created_at timestamptz not null default now()`

### RLS / Access

Public users must not write directly to Supabase tables.

- Public form submits to `POST /api/partners/intake`.
- API route validates and inserts using server-side Supabase credentials.
- NocoDB connects using a dedicated database credential, not a public anon key.
- Do not expose Supabase service-role keys to the browser.

---

## NocoDB Setup Plan

### Option A — Preferred: NocoDB connects to Supabase Postgres

Use when Supabase allows a stable direct Postgres connection from the NocoDB host.

Pros:

- one source of truth
- no sync job
- NocoDB edits update the real partner tables
- ClawPlex API and NocoDB see the same records

Cons:

- must protect database credentials
- NocoDB needs private/admin-only access
- Supabase network rules and SSL must be configured correctly

Implementation notes:

- Create a restricted Postgres user for partner tables if possible.
- Grant access only to `partner_leads`, `partner_tasks`, `partner_assets`.
- Do not use the Supabase anon key.
- Do not use the service-role key as a browser-visible value.

### Option B — Separate NocoDB Postgres, webhook sync later

Use only if direct Supabase connection is annoying.

Pros:

- isolated from production data
- easy Docker setup

Cons:

- duplicate source of truth
- requires sync/webhooks later
- easier to lose track of lead state

Recommendation: use Option A unless Supabase direct database access blocks it.

### NocoDB views to create

In NocoDB, create these views:

- `New Leads`: `status = new`
- `Needs Follow-Up`: `status in needs_follow_up, qualified, proposal_sent`
- `Committed`: `status = committed`
- `Venue Partners`: `support_types contains venue_partner`
- `Food + Drink`: `support_types contains food_drink_partner`
- `Speakers / Workshops`: `support_types contains speaker_workshop_partner`
- `Sponsors`: `support_types contains event_sponsor or monthly_supporter`
- `Archived / Declined`: `status in archived, declined`

Kanban:

- board column: `status`
- card title: `company` fallback to `name`
- card subtitle: `support_types`, `budget_range`, `next_follow_up_at`

---

## Public Site Changes

### 1. Split the intent: `/work-with-us` vs `/support`

`/work-with-us` should mean:

> Hire ClawPlex to build AI software.

`/support` should mean:

> Support DFW builders through ClawPlex.

Do not keep forcing both jobs into one page.

### 2. Add `/support`

Create:

- `src/app/support/page.tsx`
- `src/app/support/support-client.tsx`

Or, if locale routing requires the catch-all pattern, add dictionary entries and route aliases so `/en/support` and `/es/support` resolve correctly.

Page sections:

1. Hero
   - eyebrow: `SUPPORT CLAWPLEX`
   - headline: `Support DFW builders.`
   - body: `Sponsor an event, offer a venue, feed the room, teach a workshop, donate prizes, or help keep the community moving.`
   - CTA: `Become a supporter`

2. Support options
   - Event sponsor
   - Monthly community supporter
   - Venue partner
   - Food / drink partner
   - Prize / giveaway partner
   - Speaker / workshop partner
   - Services partner
   - Volunteer

3. Support levels
   - Community Friend: `$100–$250`
   - Event Supporter: `$500`
   - Event Sponsor: `$1,000`
   - Builder Sponsor: `$2,500+`
   - In-kind support

4. What sponsors get
   - logo on event page
   - logo on TV slide loop
   - mention during opening remarks
   - recap link
   - optional table/flyer/QR placement
   - optional workshop/speaker tie-in when relevant

5. What ClawPlex will not do
   - no hard pitches
   - no MLM
   - no predatory offers
   - no politics
   - no room-spam

6. Intake form
   - native branded form posting to `/api/partners/intake`
   - no QuestionScout dependency
   - success state with clear follow-up expectation

### 3. Narrow `/work-with-us`

Modify:

- `src/app/work-with-us/work-with-us-client.tsx`
- `src/app/work-with-us/page.tsx`
- `src/lib/i18n/dictionaries/en.ts`
- `src/lib/i18n/dictionaries/es.ts`
- `src/lib/i18n/dictionaries/types.ts`

New focus:

- AI agents
- RAG/search
- automation
- local AI deployments
- prototypes
- production evals/ops
- `Start an AI project` CTA

Move sponsor/venue/community sections to `/support`.

### 4. Update navigation and footer

Modify dictionary nav entries:

- Keep `Work With Us` for client/project work.
- Add `Support` under About or primary nav if space permits.
- Footer About should include both:
  - `Work With Us`
  - `Support ClawPlex`

Potential nav order:

- Events
- Support
- Work With Us
- Newsletter
- Discord

---

## API Changes

Create:

- `src/app/api/partners/intake/route.ts`
- `src/app/api/partners/intake.test.ts`

Validation rules:

- `name`: required, 2–120 chars
- `email`: required, valid email shape
- `company`: optional, max 160 chars
- `support_types`: required, at least one known value
- `notes` and long text fields: trim, max 5000 chars
- `website`: optional URL-like string
- `phone`: optional, max 40 chars
- reject unknown `support_types`
- reject bot honeypot field when filled

Response shape:

```json
{
  "ok": true,
  "id": "uuid",
  "message": "Thanks — ClawPlex received your supporter interest. We'll follow up directly."
}
```

Error shape:

```json
{
  "ok": false,
  "error": "Invalid email"
}
```

Testing approach:

- valid event sponsor submission inserts a row
- valid venue submission inserts venue fields
- missing email returns 400
- unknown support type returns 400
- honeypot returns 400 or quiet success without insert
- Supabase insert error returns 500 without leaking internals

---

## Color / Contrast Fix Plan

Current token problem verified:

- `--color-claw-blue: #1E40AF`
- background: `#0A0A0A`
- contrast ratio: `2.27:1`

That fails WCAG for normal text. It is why blue text on black feels muddy.

Keep the blue / black / white / red colorway, but split blue into two roles:

### Proposed tokens

In `src/app/globals.css`:

```css
--color-claw-blue: #60A5FA;       /* readable text/accent on black, 7.79:1 */
--color-claw-blue-strong: #2563EB; /* fills/buttons where black or white pairing is controlled */
--color-claw-blue-deep: #1E40AF;   /* dark brand blue, not text on black */
--color-claw-blue-light: #93C5FD;  /* small labels / hover / glow-light accent */
```

Why:

- `#1E40AF` on black: `2.27:1` — bad for text
- `#3B82F6` on black: `5.38:1` — acceptable normal text
- `#60A5FA` on black: `7.79:1` — strong readable accent
- `#93C5FD` on black: `10.98:1` — excellent for tiny mono labels

Button rule:

- Avoid `bg-claw-blue text-claw-void` if `claw-blue` becomes light.
- Use `bg-claw-blue-strong text-claw-text` or `bg-claw-blue text-claw-void` depending on final token choice.
- Verify both button foreground/background pairings.

Red token check:

- Current `#DC2626` on black: `4.10:1`, borderline for normal text.
- Use red mostly as blocks/borders/CTA accent, not tiny text.
- If red text is needed on black, prefer `#EF4444` or `#F87171`.

Acceptance criteria:

- No normal-size `text-claw-blue` on black below `4.5:1` contrast.
- No tiny mono labels below `7:1` unless they are decorative.
- Buttons retain clear hover/focus states.
- Visual identity remains black / white / blue / red.

---

## Bite-Sized Implementation Tasks

### Task 1: Commit this plan

**Objective:** Save the plan to the branch so implementation has a single source of truth.

**Files:**

- Create: `docs/plans/2026-06-09-nocodb-supporter-workflow.md`

**Verify:**

```bash
git status --short
git diff -- docs/plans/2026-06-09-nocodb-supporter-workflow.md
```

### Task 2: Add partner pipeline migration

**Objective:** Create partner tables for ClawPlex intake and NocoDB operations.

**Files:**

- Create: `supabase/migrations/010_create_partner_pipeline.sql`

**Verify:**

```bash
python3 - <<'PY'
from pathlib import Path
p = Path('supabase/migrations/010_create_partner_pipeline.sql')
text = p.read_text()
for needle in ['partner_leads', 'partner_tasks', 'partner_assets']:
    assert needle in text
print('migration has required tables')
PY
```

### Task 3: Add intake validation helper

**Objective:** Keep API route validation small, explicit, and testable.

**Files:**

- Create: `src/lib/partner-intake.ts`
- Test: `src/lib/partner-intake.test.ts`

**Verify:**

```bash
pnpm exec vitest run src/lib/partner-intake.test.ts
```

### Task 4: Add API route

**Objective:** Accept public support form submissions and insert clean records.

**Files:**

- Create: `src/app/api/partners/intake/route.ts`
- Test: `src/app/api/partners/intake.test.ts`

**Verify:**

```bash
pnpm exec vitest run src/app/api/partners/intake.test.ts
```

### Task 5: Add `/support` dictionary types and English copy

**Objective:** Add typed copy for the new support page.

**Files:**

- Modify: `src/lib/i18n/dictionaries/types.ts`
- Modify: `src/lib/i18n/dictionaries/en.ts`

**Verify:**

```bash
pnpm run typecheck
```

### Task 6: Add Spanish fallback copy

**Objective:** Keep existing EN/ES locale behavior from breaking.

**Files:**

- Modify: `src/lib/i18n/dictionaries/es.ts`

**Verify:**

```bash
pnpm run typecheck
```

### Task 7: Build `/support` page

**Objective:** Create the public supporter/sponsor page and branded intake form.

**Files:**

- Create: `src/app/support/page.tsx`
- Create: `src/app/support/support-client.tsx`

**Verify:**

```bash
pnpm run lint
pnpm run typecheck
```

### Task 8: Narrow `/work-with-us`

**Objective:** Make `/work-with-us` about hiring ClawPlex for AI project work, not community sponsorship.

**Files:**

- Modify: `src/app/work-with-us/work-with-us-client.tsx`
- Modify: `src/app/work-with-us/page.tsx`
- Modify: `src/lib/i18n/dictionaries/en.ts`
- Modify: `src/lib/i18n/dictionaries/es.ts`
- Modify: `src/lib/i18n/dictionaries/types.ts`

**Verify:**

```bash
pnpm run typecheck
```

### Task 9: Redirect `/sponsors` to `/support`

**Objective:** Preserve old sponsor URL while pointing users to the new public support page.

**Files:**

- Modify: `src/app/sponsors/page.tsx`

**Verify:**

```bash
pnpm run typecheck
```

### Task 10: Update navigation/footer

**Objective:** Make support discoverable without burying client-work CTA.

**Files:**

- Modify: `src/lib/i18n/dictionaries/en.ts`
- Modify: `src/lib/i18n/dictionaries/es.ts`

**Verify:**

```bash
pnpm run typecheck
```

### Task 11: Fix blue contrast tokens

**Objective:** Preserve the colorway but make blue readable on black.

**Files:**

- Modify: `src/app/globals.css`
- Modify any button/text classes that need stronger/deeper token separation.

**Verify:**

```bash
python3 scripts/check-contrast.py
```

If `scripts/check-contrast.py` does not exist, create a tiny script that checks the core ClawPlex token pairs and fails below target contrast.

### Task 12: Add NocoDB operations guide

**Objective:** Document exactly how to connect NocoDB and run the partner workflow.

**Files:**

- Create: `docs/ops/nocodb-partner-crm.md`

Must include:

- database connection method
- required tables
- NocoDB views
- Kanban setup
- status definitions
- weekly operating rhythm
- lead follow-up checklist
- sponsor fulfillment checklist
- do-not-expose-secrets warning

### Task 13: Full validation gate

**Objective:** Prove the repo is clean before commit/PR.

**Run in CI order:**

```bash
pnpm run lint
pnpm run typecheck
pnpm exec vitest run
pnpm run build
```

All must pass before pushing.

---

## Final PR Shape

Branch:

`feat/nocodb-supporter-workflow`

PR title:

`feat: add NocoDB-backed supporter workflow plan`

If implementation is included in this PR, use:

`feat: add supporter intake workflow`

PR body must include:

- Summary of `/support`
- Summary of `/work-with-us` narrowing
- Migration details
- API/test coverage
- NocoDB setup notes
- Contrast token change and measured contrast ratios
- Validation output from lint/typecheck/tests/build

---

## Avoid

- Do not build a full CRM admin dashboard inside ClawPlex.
- Do not keep QuestionScout as the long-term source of truth.
- Do not expose Supabase service-role credentials to NocoDB public forms or browser code.
- Do not leave sponsor/community copy buried under “Work With Us.”
- Do not use dark royal blue as small text on black.
- Do not delete PR #51 or the design branch without explicit approval.
- Do not reset local `main` until its 5 unpublished commits are inspected.
