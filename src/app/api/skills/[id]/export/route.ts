import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    

    const { data, error } = await supabase
      .from("skills")
      .select("id, name, description, category, trigger_phrases, instructions, submitted_by, created_at")
      .eq("id", id)
      .eq("approved", true)
      .single();

    if (error || !data) {
      Logger.error("[skills-export] Skill not found or not approved:", id);
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const skill = data as {
      id: string;
      name: string;
      description: string;
      category: string;
      trigger_phrases: string[];
      instructions: string;
      submitted_by: string;
      created_at: string;
    };

    const safeName = skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const filename = `${safeName}.clawpack`;
    const exported_at = new Date().toISOString();

    const clawpack = {
      format: "clawpack-v1",
      version: "1.0",
      name: skill.name,
      description: skill.description,
      instructions: skill.instructions,
      trigger_phrases: skill.trigger_phrases ?? [],
      category: skill.category,
      metadata: {
        submitted_by: skill.submitted_by,
        exported_at,
        source: "agentbuildersclub.dev",
      },
    };

    

    return new NextResponse(JSON.stringify(clawpack, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    Logger.error("[skills-export] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
