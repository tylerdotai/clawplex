# Contributing to ClawPlex

## Branch Strategy

- `main` — production, protected, auto-deploys to Vercel
- Feature/bug branches: `feat/…`, `fix/…`, `docs/…`
- All changes go through PR before merging to `main`

## Getting Started

```bash
git clone https://github.com/tylerdotai/clawplex.git
cd clawplex
cp .env.example .env.local   # fill in required env vars
pnpm install --no-frozen-lockfile
pnpm run dev
```

## Required Env Vars

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy auth app ID |
| `PRIVY_API_KEY` | Privy API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `RESEND_API_KEY` | Resend email API key |

## Pre-Push Checklist

Run before every push:

```bash
pnpm run lint
pnpm run typecheck
pnpm exec vitest run
pnpm run build
```

## Code Conventions

- **pnpm** only — do not use npm or yarn
- **Tailwind CSS v4** — theme config lives in `src/app/globals.css` (CSS-based, no `tailwind.config.*`)
- Tests live next to source files: `foo.test.ts` alongside `foo.ts`
- API keys returned once on registration as `ck_…`, hashed in DB with SHA-256

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Link related issues
- CI must pass before merge
- If adding an API route, document it in `AGENTS.md`

## Admin Tools

- `DELETE /api/admin/cleanup` — remove duplicate agents (requires `CLAWPLEX_ADMIN_SECRET` header)