# NocoDB Supporter Workflow Spec

**Branch:** `feat/nocodb-supporter-workflow`

**Owner:** ClawPlex

**Purpose:** Define exactly what should be built before implementation starts: a public ClawPlex supporter/sponsor intake system backed by Supabase and operated through NocoDB.

---

## Position

The right build is **not** a custom CRM inside the ClawPlex app.

That would be wasted effort. ClawPlex needs a clean public intake flow and a practical internal pipeline, not another half-built admin dashboard that has to compete with Airtable, Linear, Notion, and every CRM on earth.

The system should be:

- **Public site:** ClawPlex-branded intake and positioning
- **Database:** Supabase/Postgres as source of truth
- **Operations UI:** NocoDB connected to the supporter tables
- **Sales/admin process:** spreadsheet views, Kanban views, follow-up tasks, fulfillment tracking

This gives the team enough structure to handle sponsors and partners without overbuilding.

---

## Goals

Build a complete supporter workflow that lets ClawPlex collect and manage:

- event sponsors
- monthly/community supporters
- venue partners
- food and drink partners
- prize/giveaway partners
- speaker/workshop partners
- service partners
- hiring/recruiting partners
- volunteers
- people who are interested but do not know the right category yet

The system must make it easy to answer:

- Who reached out?
- What are they offering?
- Are they cash, in-kind, venue, speaker, or service support?
- What event or community need are they tied to?
- Who owns the follow-up?
- What is the next step?
- What did ClawPlex promise them?
- Has ClawPlex fulfilled the promise?
- Which partners should appear publicly on the site?

---

## Non-Goals

Do **not** build these in this pass:

- a custom `/admin` CRM inside Next.js
- a full donor-management platform
- a payment processor flow before the intake pipeline is working
- sponsor contract automation
- automated invoice generation
- complex permission roles in the public app
- email marketing automation
- public partner directory management from scratch

Those can come later if the workflow proves it needs them. Right now, the point is to stop losing partner interest and make follow-up operationally visible.

---

## Route Strategy

### `/support`

Create this as the main supporter and sponsor page.

It should explain:

- what ClawPlex is
- who the community serves
- why companies and venues should support it
- ways to support
- what sponsors/partners get back
- what ClawPlex does not want
- how to submit interest

This route handles community support, not client work.

### `/work-with-us`

Narrow this route to AI/product/client work.

It should be for people who want to hire ClawPlex or Tyler to build something:

- AI agents
- internal tools
- automation
- websites/apps
- technical consulting
- product builds

It should not be the main sponsor/supporter page anymore. Mixing client work and community support makes the funnel muddy.

### `/sponsors`

Keep this route as public proof and partner recognition.

It should eventually show confirmed sponsors, venues, and community partners. It should not be the intake page.

---

## Public Support Page Requirements

The `/support` page should have these sections:

1. **Hero**
   - clear headline: support ClawPlex meetups and builder community
   - short description of what ClawPlex does
   - primary CTA: submit supporter interest
   - secondary CTA: view current partners/sponsors

2. **Support Types**
   - Event Sponsor
   - Monthly Supporter
   - Venue Partner
   - Food + Drink Partner
   - Prize / Giveaway Partner
   - Speaker / Workshop Partner
   - Services Partner
   - Hiring / Recruiting Partner
   - Volunteer / Community Helper

3. **What Sponsors Get**
   - logo/name recognition where appropriate
   - shoutouts at events where appropriate
   - placement on the website where appropriate
   - community visibility
   - direct access to builders and local operators
   - post-event recap where appropriate

4. **What ClawPlex Does Not Want**
   - extractive sponsors
   - irrelevant vendor spam
   - fake community support used only for sales lead scraping
   - last-minute demands that create operational drag
   - partners who cannot clearly explain what they are offering

5. **Intake Form**
   - branded native form
   - no iframe form dependency
   - writes to Supabase through an API route
   - validates fields server-side
   - shows useful success and failure states

6. **Fallback Contact**
   - simple text telling serious partners to contact ClawPlex directly if the form fails

---

## Intake Form Fields

Required fields:

- name
- email
- support types
- contribution details
- preferred follow-up method

Recommended optional fields:

- company / organization
- role/title
- phone
- website
- city/area
- budget range
- event scope
- event details
- organization description
- why they want to support ClawPlex
- target audience
- definition of successful partnership
- recognition preference
- recognition options
- venue name
- venue address
- venue capacity
- venue availability
- venue includes
- venue cost
- speaker interest
- speaker topic
- speaker format
- speaker links
- best follow-up time
- notes

The form should adapt logically based on support type where practical, but the backend should accept the full shape so NocoDB has one consistent table to operate from.

---

## Data Model

Create Supabase tables for the partner pipeline.

### `partner_leads`

One row per incoming supporter, sponsor, partner, speaker, venue, or volunteer inquiry.

Core fields:

- `id`
- `name`
- `company`
- `role_title`
- `email`
- `phone`
- `website`
- `city_area`
- `support_types`
- `budget_range`
- `contribution_details`
- `event_scope`
- `event_details`
- `organization_description`
- `why_support`
- `target_audience`
- `success_definition`
- `recognition_preference`
- `recognition_options`
- `venue_name`
- `venue_address`
- `venue_capacity`
- `venue_availability`
- `venue_includes`
- `venue_cost`
- `speaker_interest`
- `speaker_topic`
- `speaker_format`
- `speaker_links`
- `preferred_follow_up`
- `best_follow_up_time`
- `notes`
- `source`
- `status`
- `priority`
- `assigned_to`
- `next_follow_up_at`
- `created_at`
- `updated_at`

Use text/select conventions instead of rigid Postgres enums so NocoDB stays easy to operate.

Recommended status values:

- `new`
- `needs_follow_up`
- `qualified`
- `proposal_sent`
- `committed`
- `fulfilled`
- `declined`
- `archived`

Recommended support type values:

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

One row per follow-up or fulfillment task.

Use it for:

- contact follow-up
- invoice/payment follow-up
- logo collection
- sponsor shoutout scheduling
- event-day fulfillment
- recap delivery
- thank-you message

### `partner_assets`

One row per file/link/asset tied to a lead.

Use it for:

- sponsor logo
- website URL
- social URL
- brand blurb
- flyer asset
- deck
- recap link
- agreement/invoice link

---

## API Requirements

Create a server route for intake submission.

Preferred route:

`POST /api/partners/intake`

Responsibilities:

- parse JSON request body
- validate required fields
- normalize arrays and text fields
- reject malformed email
- reject empty support type arrays
- insert into `partner_leads`
- return a safe success response
- return useful validation errors
- never leak Supabase credentials
- never expose raw database errors to the browser

Response shapes:

Success:

```json
{
  "ok": true,
  "leadId": "uuid"
}
```

Validation failure:

```json
{
  "ok": false,
  "error": "validation_error",
  "fields": {
    "email": "Enter a valid email."
  }
}
```

Server failure:

```json
{
  "ok": false,
  "error": "server_error"
}
```

---

## NocoDB Requirements

NocoDB should connect to the same Postgres/Supabase tables and provide internal workflow views.

Required views:

- **All Leads** — every record
- **New Leads** — `status = new`
- **Needs Follow-Up** — next actions visible
- **Venue Partners** — `support_types` includes `venue_partner`
- **Food + Drink** — `support_types` includes `food_drink_partner`
- **Speakers / Workshops** — `support_types` includes `speaker_workshop_partner`
- **Sponsors** — sponsor-related support types
- **Committed** — `status = committed`
- **Fulfilled** — `status = fulfilled`
- **Archived / Declined** — non-active records

Required NocoDB behavior:

- spreadsheet view for bulk editing
- Kanban grouped by `status`
- filters for support type
- visible owner/assigned person
- visible next follow-up date
- ability to export CSV
- ability to attach or link assets

NocoDB is an internal operations layer only. Public users should never interact with NocoDB directly.

---

## Design Requirements

Use the existing ClawPlex dark editorial style, but fix the blue contrast issue.

Current `--color-claw-blue: #1E40AF` is too dark on the existing black backgrounds for readable text. It should not be used as normal body/accent text on black.

Recommended token split:

```css
--color-claw-blue: #60A5FA;
--color-claw-blue-strong: #2563EB;
--color-claw-blue-deep: #1E40AF;
--color-claw-blue-light: #93C5FD;
```

Rules:

- use `#60A5FA` or `#93C5FD` for readable text on black
- use `#2563EB` for filled buttons and stronger UI accents
- keep `#1E40AF` only as deep brand blue, not small text on black
- preserve red/black ClawPlex identity
- avoid generic SaaS gradients unless they fit the community/editorial tone

---

## Validation Requirements

Use server-side validation. Client validation can improve UX, but it is not the source of truth.

Validation rules:

- `name` required
- `email` required and valid enough for contact use
- `support_types` required with at least one value
- `contribution_details` required
- `preferred_follow_up` required
- trim string inputs
- cap text field lengths to avoid garbage submissions
- reject non-JSON or oversized payloads

Add tests for:

- valid submission
- missing name
- invalid email
- missing support type
- empty contribution details
- Supabase insert failure
- response does not leak internal error details

---

## Security and Privacy Requirements

- Never expose Supabase service role key to the browser.
- Do not print secrets in logs.
- Use environment variables only server-side for privileged writes.
- Keep public anon key usage limited to normal public app behavior.
- Sanitize and validate incoming form data.
- Add basic spam controls if submissions become noisy.
- Keep internal status, notes, assignment, and fulfillment fields out of public responses.

---

## Operational Workflow

New inbound record flow:

1. Visitor submits `/support` form.
2. API validates request.
3. API inserts record into `partner_leads` with `status = new`.
4. NocoDB `New Leads` view shows the lead.
5. Human reviews and assigns owner.
6. Owner contacts lead.
7. Status moves through pipeline.
8. Tasks/assets are added as needed.
9. If partner commits, fulfillment tasks are created.
10. Once benefits are delivered, status moves to `fulfilled`.
11. Dead/unfit leads move to `declined` or `archived`.

Pipeline status meaning:

- `new`: untouched inbound lead
- `needs_follow_up`: someone needs to contact or reply
- `qualified`: worth pursuing
- `proposal_sent`: details/pricing/ask sent
- `committed`: partner agreed
- `fulfilled`: ClawPlex delivered promised recognition/support benefits
- `declined`: not moving forward
- `archived`: closed or old record retained for history

---

## Implementation Order

1. Add Supabase migration for partner pipeline tables.
2. Add validation utilities and tests.
3. Add `POST /api/partners/intake` and tests.
4. Add `/support` page and native intake form.
5. Narrow `/work-with-us` to client/project work.
6. Adjust blue design tokens for readable contrast.
7. Add NocoDB setup documentation.
8. Run the full repo validation gate.
9. Commit each logical unit cleanly.
10. Push the branch and open/update PR only after local verification passes.

---

## Acceptance Criteria

The work is done when:

- `/support` exists and clearly handles community support/sponsorship
- `/work-with-us` no longer mixes sponsor/supporter intake with client work
- native support intake form submits successfully
- failed submissions show useful user-facing errors
- server route validates input and inserts into Supabase
- partner pipeline tables exist in migration files
- NocoDB can connect to and operate on the tables
- NocoDB setup docs explain the views/status pipeline
- color contrast for blue text/buttons is fixed
- tests cover validation and API behavior
- lint passes
- typecheck passes
- Vitest passes
- production build passes

---

## Final Recommendation

Build the supporter workflow as a real operations pipeline, not a pretty form glued to nowhere.

The public site should make ClawPlex look organized. Supabase should store clean structured records. NocoDB should give the team a practical command center. That is the shortest path to a system people will actually use at meetups without turning the app into a bloated CRM.