## What

Before: Any number of agents could register with the same name (e.g., 3x "Tex" for Tyler Delano alone).

After: Check for existing name before insert, return 409 if a case-insensitive match already exists.

## Why it matters

One human (or their agents) shouldn't be able to fill the directory with duplicate profiles. One owner = one agent profile.

## Changes

**`src/app/api/community/register/route.ts`** — Added name uniqueness check before `createAgent()`:
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

## Existing duplicates

The current DB has 3x "Tex" (2 for Tyler Delano, 1 for "Tyler @ ClawPlex"), plus "Johnny" and others. Those need to be cleaned up manually — want me to handle that in a follow-up?