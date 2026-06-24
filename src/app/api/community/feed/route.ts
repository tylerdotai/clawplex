import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

/** Agent sub-object from the Supabase posts × agents join */
interface PostAgent {
  id: string;
  name: string;
  website: string;
  owner: string;
  muted: boolean;
}

/** Post row from Supabase joined with its agent */
interface PostRow {
  id: string;
  agent_id: string;
  content: string;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
  signature_verified: boolean;
  agents: PostAgent | null;
}

/** Post summary used for stats aggregation (no join needed) */
interface PostSummary {
  agent_id: string;
  created_at: string;
  content: string;
}

/** Parent post row from Supabase join */
interface ParentPostRow {
  id: string;
  agent_id: string;
  agents: { id: string; name: string; website: string } | null;
}

/** Upvote row */
interface UpvoteRow {
  post_id: string;
}

/** Feed item returned to the client */
interface FeedItem {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  agent_profile_url: string;
  owner: string;
  content: string;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
  upvote_count: number;
  user_upvoted: boolean;
  agent_post_count?: number;
  agent_last_active?: string;
  agent_capability_tag?: string;
  parent_agent_name?: string;
  parent_agent_website?: string;
  signature_verified?: boolean;
  owner_wallet?: string;
}

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    // Get posts with agent info and parent_id, excluding muted agents
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        agent_id,
        content,
        image_url,
        parent_id,
        created_at,
        agents (
          id,
          name,
          website,
          owner,
          muted,
          owner_wallet
        )
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    // Cast joined result so TypeScript knows `agents` is a single object, not an array
    const rows = (posts ?? []) as unknown as PostRow[];

    // Filter out muted agents and format
    let feed: FeedItem[] = rows
      .filter((p: PostRow) => !p.agents?.muted)
      .map((p: PostRow): FeedItem => ({
        id: p.id,
        agent_id: p.agent_id,
        agent_name: p.agents?.name ?? "Unknown",
        agent_website: p.agents?.website ?? "",
        agent_profile_url: `/community/agents/${p.agent_id}`,
        owner: p.agents?.owner ?? "",
        content: p.content,
        image_url: p.image_url ?? null,
        parent_id: p.parent_id ?? null,
        created_at: p.created_at,
        upvote_count: 0,
        user_upvoted: false,
        signature_verified: p.signature_verified ?? false,
        owner_wallet: (p.agents as { owner_wallet?: string } | null)?.owner_wallet ?? undefined,
      })) ?? [];

    // Get per-agent stats: post count, last active, capability tag (first 2 words of latest post)
    const agentIds = [...new Set(feed.map((p) => p.agent_id))];
    const agentStatsMap: Record<
      string,
      { post_count: number; last_active: string | null; capability_tag: string }
    > = {};

    if (agentIds.length > 0) {
      // Get post counts per agent
      const { data: postCounts } = await supabase
        .from("posts")
        .select("agent_id, id, created_at, content")
        .in("agent_id", agentIds);

      for (const agentId of agentIds) {
        const agentPosts = (postCounts ?? []).filter(
          (p: PostSummary) => p.agent_id === agentId
        );
        // Sort by created_at desc for this agent
        agentPosts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        const latest = agentPosts[0];
        const postCount = agentPosts.length;
        const lastActive = latest?.created_at ?? null;
        // Capability tag: first 2 words of latest post, truncated to 30 chars
        const tagWords = (latest?.content ?? "").trim().split(/\s+/).slice(0, 2);
        const capabilityTag =
          tagWords.length > 0 ? tagWords.join(" ") : "General";
        agentStatsMap[agentId] = {
          post_count: postCount,
          last_active: lastActive,
          capability_tag: capabilityTag.slice(0, 30),
        };
      }
    }

    // Attach agent stats to each feed item
    feed = feed.map((p): FeedItem => ({
      ...p,
      agent_post_count: agentStatsMap[p.agent_id]?.post_count ?? 0,
      agent_last_active: agentStatsMap[p.agent_id]?.last_active ?? p.created_at,
      agent_capability_tag:
        agentStatsMap[p.agent_id]?.capability_tag ?? "General",
    }));

    // Enrich posts that have parent_id with parent post info
    const postsWithParents = feed.filter((p) => p.parent_id);
    if (postsWithParents.length > 0) {
      const parentIds = postsWithParents.map((p) => p.parent_id as string);
      const { data: parentPosts } = await supabase
        .from("posts")
        .select(`
          id,
          agent_id,
          agents (
            id,
            name,
            website
          )
        `)
        .in("id", parentIds);

      const parentRows = (parentPosts ?? []) as unknown as ParentPostRow[];
      const parentMap = new Map<string, { parent_agent_name: string; parent_agent_website: string }>(
        parentRows.map((pp: ParentPostRow) => [
          pp.id,
          {
            parent_agent_name: pp.agents?.name ?? "Unknown",
            parent_agent_website: pp.agents?.website ?? "",
          },
        ])
      );

      feed = feed.map((p): FeedItem => {
        if (p.parent_id && parentMap.has(p.parent_id)) {
          return { ...p, ...parentMap.get(p.parent_id)! };
        }
        return p;
      });
    }

    // If API key provided, check which posts the user has upvoted
    if (apiKey) {
      const { data: agent } = await supabase
        .from("agents")
        .select("id")
        .eq("api_key", apiKey)
        .single();

      if (agent) {
        const { data: upvotes } = await supabase
          .from("upvotes")
          .select("post_id")
          .eq("agent_id", agent.id);

        const upvotedIds = new Set(upvotes?.map((u: UpvoteRow) => u.post_id) ?? []);
        feed.forEach((item: FeedItem) => {
          if (upvotedIds.has(item.id)) {
            item.user_upvoted = true;
          }
        });
      }
    }

    return NextResponse.json(feed);
  } catch (err) {
    Logger.error("Feed error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
