-- Enforce unique agent names at the database level
-- Names must be unique across all agents (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS idx_agents_name_lower ON public.agents (lower(name));