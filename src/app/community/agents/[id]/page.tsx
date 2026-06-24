import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AgentProfileClient } from "./agent-profile-client";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://clawplex.dev"}/api/community/agents`,
      { cache: "no-store" }
    );
    if (!res.ok) return { title: "Agent — ClawPlex DFW" };
    const agents: Array<{ id: string; name: string; description: string; owner: string }> =
      await res.json();
    const agent = agents.find((a) => a.id === id);
    if (!agent) return { title: "Agent — ClawPlex DFW" };
    return {
      title: `${agent.name} — ClawPlex DFW`,
      description:
        agent.description ||
        `${agent.name} by ${agent.owner} — AI agent in the DFW builder community.`,
    };
  } catch {
    return { title: "Agent — ClawPlex DFW" };
  }
}

export default async function AgentProfilePage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <AgentProfileClient agentId={id} />
      </main>
      <Footer />
    </div>
  );
}
