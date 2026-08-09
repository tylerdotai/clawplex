# Security Audit Report — 2026-08-09

## Repos Scanned

| Repo | Stack | Total Matches | HIGH/CRITICAL |
|------|-------|--------------|----------------|
| clawplex | Next.js 15 + Supabase | 242 | 44 missing-auth, 8 open-redirect, 5 dangerous-html |
| health-tracker | Next.js 16 + Drizzle + OAuth | 223 | 30 missing-auth, 22 ssrf, 18 unsafe-redirect, 11 oauth-flow |
| mlb-card-flipper | Next.js 16 PWA | 105 | 11 missing-auth, 10 open-redirect, 5 ssrf |
| flume-health-tracker | Legacy Next.js 15 | 0 | 0 — no detectable patterns |

---

## clawplex (Next.js 15 + Supabase) — 242 total matches

**HIGH/CRITICAL findings:**

| Matcher | Count | Severity | Top File |
|---------|-------|----------|----------|
| `missing-auth` | 44 | HIGH | `api/admin/cleanup/route.ts` |
| `insecure-crypto` | 40 | MEDIUM | `lib/community-db.ts` |
| `nextjs-middleware-only-auth` | 26 | HIGH | `api/community/agents/[id]/route.ts` |
| `rate-limit-bypass` | 20 | MEDIUM | `api/admin/cleanup/route.ts` |
| `open-redirect` | 8 | HIGH | community routes |
| `non-atomic-read-delete` | 15 | MEDIUM | — |
| `secret-in-log` | 4 | CRITICAL | `api/skills/execute/route.ts` |

**Top files by candidate count:**
1. `src/app/api/admin/cleanup/route.ts` — 17 hits: missing-auth + rate-limit-bypass + secret-in-fallback
2. `src/app/api/skills/moderate/route.ts` — 10 hits: missing-auth + insecure-crypto
3. `src/app/api/skills/submit/route.ts` — 9 hits: missing-auth + secret-in-log
4. `src/app/api/community/agents/[id]/route.ts` — 9 hits: missing-auth + insecure-crypto + nextjs-middleware-only-auth
5. `src/app/api/skills/execute/route.ts` — 8 hits: **executes agent-supplied code**, missing-auth + secret-in-log

**Persistent issues (unchanged since at least Jul-26):**
- `api/skills/execute` — no auth on code-execution endpoint — **CRITICAL**
- `api/admin/cleanup` — missing-auth + rate-limit-bypass + secret-in-fallback (17 hits)
- `crypto.randomBytes(16)` still in use for API key generation (not `crypto.getRandomValues()`)

---

## health-tracker (Next.js 16 + Drizzle + OAuth) — 223 total matches

**HIGH/CRITICAL findings:**

| Matcher | Count | Severity | Top File |
|---------|-------|----------|----------|
| `missing-auth` | 30 | HIGH | OAuth + sync routes |
| `ssrf` | 22 | CRITICAL | fitbit/google callback routes |
| `unsafe-redirect` | 18 | HIGH | OAuth callbacks |
| `oauth-flow` | 9 | HIGH | Fitbit + Google callbacks |
| `rate-limit-bypass` | 11 | MEDIUM | sync routes |
| `secret-in-log` | 11 | CRITICAL | sync trigger/callback routes |

**Critical surfaces:**
- `src/app/api/auth/fitbit/callback/route.ts` — 24 hits: ssrf + open-redirect + missing-auth
- `src/app/api/auth/google/callback/route.ts` — 23 hits: ssrf + open-redirect + missing-auth
- `src/app/api/sync/google/route.ts` — 11 hits: missing-auth + rate-limit-bypass + secret-in-log
- `src/app/api/sync/trigger/route.ts` — 10 hits: missing-auth + rate-limit-bypass + secret-in-log

*Unchanged from Jul-26 audit.*

---

## mlb-card-flipper (Next.js 16 PWA) — 105 total matches

**HIGH/CRITICAL findings:**

| Matcher | Count | Severity | Top File |
|---------|-------|----------|----------|
| `process-env-access` | 20 | MEDIUM | scraper code |
| `insecure-crypto` | 17 | MEDIUM | scraper + Supabase lib |
| `missing-auth` | 11 | HIGH | API routes (auth intentionally disabled) |
| `open-redirect` | 10 | HIGH | Supabase URL handling |
| `ssrf` | 5 | CRITICAL | SDS scraping endpoints |

**Note:** Auth is intentionally pass-through per project scope (auth-wall.tsx returns children unconditionally). SDS SSRF surface is known — verify before escalating.

*Down from 109 matches (Jul-26) — 4 fewer hits, slight improvement in scraper code.*

---

## flume-health-tracker — 0 matches
No DeepSec-detectable tech patterns. Likely a legacy/shadcn-only project with no active API surface.

---

## Comparison to Last Audit (2026-08-02)

| Repo | Finding | Aug-02 | Aug-09 | Delta |
|------|---------|--------|--------|-------|
| clawplex | missing-auth | 44 | 44 | 0 (persistent) |
| clawplex | secret-in-log | 4 | 4 | 0 (persistent) |
| clawplex | total matches | 248 | 242 | -6 |
| health-tracker | missing-auth | 30 | 30 | 0 |
| health-tracker | ssrf | 22 | 22 | 0 |
| health-tracker | total matches | 223 | 223 | 0 |
| mlb-card-flipper | total matches | 109 | 105 | -4 |
| flume-health-tracker | total matches | 0 | 0 | 0 |

**Trend:** Overall stable. clawplex unchanged at 44 missing-auth (persistent since at least Jun-28). No new critical attack surfaces introduced.

---

## Top 3 Recommended Fixes (clawplex — priority)

1. **Add auth to `api/skills/execute`** — executes agent-supplied code, currently has no auth check and logs secrets. Add `x-api-key` verification or Supabase session check before any execution.
2. **Add role guard to `api/admin/*`** — admin routes rely on middleware-only-auth (insufficient for sensitive ops). Add explicit `admin` role check using Supabase service role.
3. **Audit `secret-in-log` across skill routes** — `api/skills/submit` and `api/skills/execute` both log fallback secrets. Mask or remove before any production traffic.

---

*Scan run IDs: clawplex=20260809130236-b90356129e22de32, health-tracker=20260809130124-cd7765bb89b955f8, mlb-card-flipper=20260809130248-2e7a1f282e68c8bd, flume-health-tracker=20260809130248-23526f5a2123589d*
