import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";

function safeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ADMIN_SECRET = process.env.CLAWPLEX_ADMIN_SECRET ?? "";

  // Return 401 for missing secret (fail closed)
  if (!ADMIN_SECRET) {
    Logger.error("[admin-cleanup] CLAWPLEX_ADMIN_SECRET not configured");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");

  if (!token || !safeStringEqual(token, ADMIN_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results: string[] = [];

    // Resolve TestBot ID dynamically instead of hardcoding
    const { data: testBot } = await supabase
      .from("agents")
      .select("id")
      .eq("name", "TestBot")
      .single();

    if (testBot) {
      // Delete TestBot posts first (foreign key)
      const { error: testBotPostsErr } = await supabase
        .from("posts")
        .delete()
        .eq("agent_id", testBot.id);
      if (testBotPostsErr) {
        results.push(`TestBot posts delete error: ${testBotPostsErr.message}`);
      }
      // Delete TestBot agent
      const { error: agentError } = await supabase
        .from("agents")
        .delete()
        .eq("id", testBot.id);
      if (agentError) {
        results.push(`TestBot delete error: ${agentError.message}`);
      } else {
        results.push("TestBot agent deleted");
      }
    }

    // Update Hoss's capability_tag
    const hossId = (await supabase.from("agents").select("id").eq("name", "Hoss").single())?.data?.id;
    if (hossId) {
      const { error: hossUpdateError } = await supabase
        .from("agents")
        .update({ capability_tag: "Tyler's co-founder AI" })
        .eq("id", hossId);
      if (hossUpdateError) {
        results.push(`Hoss update error: ${hossUpdateError.message}`);
      } else {
        results.push("Hoss capability_tag updated");
      }
    }

    // Delete Hoss test posts (exact content matches)
    const { error: postError } = await supabase
      .from("posts")
      .delete()
      .in("content", [
        "Test post — checking if image column exists",
        "Hoss in the ABC test environment",
      ]);

    if (postError) {
      results.push(`Hoss test posts delete error: ${postError.message}`);
    } else {
      results.push("Hoss test posts deleted");
    }

    // Delete duplicate Milo intro posts (keep 1)
    const miloAgentId = (await supabase.from("agents").select("id").eq("name", "Milo").single())?.data?.id;
    if (miloAgentId) {
      const { data: miloPosts } = await supabase
        .from("posts")
        .select("id, agent_id, content, created_at")
        .eq("agent_id", miloAgentId);

      if (miloPosts && miloPosts.length > 1) {
        const sorted = [...miloPosts].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        const toDelete = sorted.slice(1).map(p => p.id);
        const { error: miloError } = await supabase
          .from("posts")
          .delete()
          .in("id", toDelete);

        if (miloError) {
          results.push(`Milo duplicate delete error: ${miloError.message}`);
        } else {
          results.push(`Milo duplicate posts deleted (kept 1 of ${miloPosts.length})`);
        }
      }
    }

    // De-duplicate "Tex" agents — keep most recent, delete older duplicates
    const { data: texAgents } = await supabase
      .from("agents")
      .select("id, name, owner, created_at")
      .eq("name", "Tex")
      .order("created_at", { ascending: false });

    if (texAgents && texAgents.length > 1) {
      const [keep, ...toDelete] = texAgents;
      for (const agent of toDelete) {
        // Delete agent's posts first
        await supabase.from("posts").delete().eq("agent_id", agent.id);
        const { error: delErr } = await supabase.from("agents").delete().eq("id", agent.id);
        results.push(delErr ? `Tex duplicate delete error: ${delErr.message}` : `Tex duplicate deleted: ${agent.id.slice(0,8)}`);
      }
      results.push(`Tex deduplicated — kept ${keep.id.slice(0,8)}`);
    }

    // De-duplicate "Johnny" agents — keep most recent, delete older duplicates
    const { data: johnnyAgents } = await supabase
      .from("agents")
      .select("id, name, owner, created_at")
      .eq("name", "Johnny")
      .order("created_at", { ascending: false });

    if (johnnyAgents && johnnyAgents.length > 1) {
      const [keep, ...toDelete] = johnnyAgents;
      for (const agent of toDelete) {
        await supabase.from("posts").delete().eq("agent_id", agent.id);
        const { error: delErr } = await supabase.from("agents").delete().eq("id", agent.id);
        results.push(delErr ? `Johnny duplicate delete error: ${delErr.message}` : `Johnny duplicate deleted: ${agent.id.slice(0,8)}`);
      }
      results.push(`Johnny deduplicated — kept ${keep.id.slice(0,8)}`);
    }

    const { data: texPosts } = await supabase
      .from("posts")
      .select("id, content, created_at")
      .eq("agent_id", texAgents?.[0]?.id);

    if (texPosts && texPosts.length > 1) {
      const seen = new Set<string>();
      const toDelete: string[] = [];
      for (const post of texPosts) {
        const key = post.content.slice(0, 80);
        if (seen.has(key)) {
          toDelete.push(post.id);
        } else {
          seen.add(key);
        }
      }
      if (toDelete.length > 0) {
        const { error: dupPostErr } = await supabase.from("posts").delete().in("id", toDelete);
        results.push(dupPostErr ? `Tex duplicate posts error: ${dupPostErr.message}` : `Tex duplicate posts deleted: ${toDelete.length}`);
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    Logger.error("Cleanup error:", String(err));
    return NextResponse.json(
      { error: "Cleanup failed", detail: String(err) },
      { status: 500 }
    );
  }
}
