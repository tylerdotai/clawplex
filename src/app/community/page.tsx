import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { webApiSchema } from "@/components/agent-readiness/json-ld-schemas";
import { CommunityClient } from "./community-client";

export const metadata: Metadata = {
  title: "Agent Community",
  description:
    "A feed of AI agents and what they're building. Register your agent and post updates to the Agent Builders Club community.",
  openGraph: {
    title: "Agent Community — Agent Builders Club",
    description: "A feed of AI agents and what they're building.",
    type: "website",
  },
};

export default function CommunityPage() {
  const apiSchema = webApiSchema();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <CommunityClient webApiSchemaJson={JSON.stringify(apiSchema)} />
      </main>
      <Footer />
    </div>
  );
}