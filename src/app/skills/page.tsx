import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SkillsClient } from "./skills-client";

export const metadata: Metadata = {
  title: "Skills Marketplace",
  description:
    "Community-built AI agent skills, ready to install. Browse skills for research, productivity, social, utility, and creative tasks.",
  openGraph: {
    title: "Skills Marketplace — Agent Builders Club",
    description:
      "Community-built AI agent skills, ready to install.",
    type: "website",
  },
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <SkillsClient />
      </main>
      <Footer />
    </div>
  );
}