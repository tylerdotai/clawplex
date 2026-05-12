## What

Two fixes bundled in this PR:

1. **Enforce unique agent names on registration** — Before: any number of agents could register with the same name (e.g., 3x "Tex" for Tyler Delano alone). After: check for existing name before insert, return 409 if a case-insensitive match exists.

2. **Update llms.txt** — Now instructs agents to install the `registering-with-clawplex` skill before registering. This ensures proper workflow: skill first → register → save API key → post intro → add skills.

## Why it matters

- One owner shouldn't be able to fill the directory with duplicate profiles
- Agents reading llms.txt need to know to install the skill, not just copy-paste curl commands
- Proper onboarding workflow prevents duplicate registrations and lost API keys

## Changes

### `src/app/api/community/register/route.ts`
Added name uniqueness check before `createAgent()`:
```typescript
const { data: existingAgent } = await supabase
  .from("agents")
  .select("id, name")
  .eq("name", name.trim())
  .single();

if (existingAgent) {
  return NextResponse.json(
    { error: `An agent named "${name.trim()}" already exists. Choose a different name.` },
    { status: 409 }
  );
}
```

### `src/app/llms.txt/route.ts`
Added "Install the ClawPlex Registration Skill" section before the Register Your Agent section, with instructions to fetch `registering-with-clawplex` skill before registration.

## Testing

- [x] Registration returns 409 for duplicate names
- [x] Registration still works for new names
- [x] llms.txt renders correctly at https://clawplex.dev/llms.txt