# Security Audit Report — 2026-07-26

## Repo: clawplex (Next.js 15 + Supabase)

### Phase 1 DeepSec Scan — 248 total matches

**HIGH/CRITICAL findings:**

| Matcher | Count | Severity | Top File |
|---------|-------|----------|----------|
| `missing-auth` | 44 | HIGH | `api/admin/cleanup/route.ts` |
| `insecure-crypto` | 40 | MEDIUM | `lib/community-db.ts` |
| `nextjs-middleware-only-auth` | 26 | HIGH | `api/community/agents/[id]/route.ts` |
| `rate-limit-bypass` | 20 | MEDIUM | `api/admin/cleanup/route.ts` |
| `open-redirect` | 8 | HIGH | community routes |
| `secret-in-log` | 4 | CRITICAL | `api/skills/execute/route.ts` |
| `non-atomic-read-delete` | 15 | MEDIUM | — |

**Top files needing Phase 2 investigation:**
1. `src/app/api/admin/cleanup/route.ts` — 17 hits: missing-auth + rate-limit-bypass + secret-in-fallback
2. `src/app/api/skills/moderate/route.ts` — 10 hits: missing-auth + insecure-crypto
3. `src/app/api/skills/submit/route.ts` — 9 hits: missing-auth + secret-in-log
4. `src/app/api/skills/execute/route.ts` — 8 hits: **executes agent code**, missing-auth, secret-in-log
5. `src/app/api/community/agents/[id]/route.ts` — 9 hits: middleware-only-auth

**Known issues carried forward from last audit (2026-06-28):**
- `api/skills/execute` — still missing auth, executes arbitrary agent code
- `api/admin/cleanup` — still has 17 hits across missing-auth + rate-limit-bypass
- `crypto.randomBytes(16)` still in use for API key gen (not `crypto.getRandomValues()`)

### Repo: health-tracker (Next.js 16 + Drizzle + OAuth) — 225 matches

| Matcher | Count | Severity |
|---------|-------|----------|
| `missing-auth` | 30 | HIGH |
| `ssrf` | 22 | CRITICAL |
| `unsafe-redirect` | 20 | HIGH |
| `oauth-flow` | 11 | HIGH |
| `jwt-handling` | 10 | HIGH |

**Critical:** Both Fitbit and Google OAuth callbacks have 24 hits each (ssrf + open-redirect + missing-auth). Token endpoints also have `secret-in-log` hits.

### Repo: mlb-card-flipper (Next.js 16 PWA) — 109 matches

| Matcher | Count | Severity |
|---------|-------|----------|
| `process-env-access` | 20 | MEDIUM |
| `insecure-crypto` | 18 | MEDIUM |
| `missing-auth` | 11 | HIGH |
| `open-redirect` | 10 | HIGH |
| `ssrf` | 5 | CRITICAL |

**Note:** Auth is currently intentionally disabled per project scope (auth-wall.tsx is pass-through).

### Repo: flume-health-tracker — 0 matches
No DeepSec-detectable tech patterns. Likely a legacy/archived project.

---

## Comparison to Last Audit (2026-06-28)

| Finding | Jun-28 | Jul-26 | Delta |
|---------|--------|--------|-------|
| clawplex: missing-auth | ~17 (cleanup route) | 44 | WORSENED |
| clawplex: secret-in-log | known | 4 files | PERSISTING |
| health-tracker: ssrf | 24 (fitbit cb) | 22 | stable |
| mlb-card-flipper: ssrf | not scanned | 5 | NEW surface |

---

## Top 3 Recommended Fixes (clawplex)

1. **Add auth to `api/skills/execute`** — this endpoint executes agent-supplied code; missing auth is CRITICAL. Add `x-api-key` verification or Supabase session check before executing.
2. **Add role guard to `api/admin/*`** — admin routes currently rely on middleware-only-auth (insufficient for sensitive ops). Add explicit `admin` role check using Supabase service.
3. **Audit `secret-in-log` in skill routes** — `api/skills/submit` and `api/skills/execute` log fallback secrets. Remove or mask before shipping.
