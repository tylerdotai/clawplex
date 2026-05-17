import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getDictSlice } from "@/lib/i18n/dictionaries/server";
import type { PrivacyDict } from "@/lib/i18n/dictionaries/types";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getDictSlice("privacy") as PrivacyDict;
  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: `${copy.title} — ClawPlex DFW`,
      description: copy.ogDescription,
      type: "website",
    },
  };
}

export default async function PrivacyPage() {
  const copy = await getDictSlice("privacy") as PrivacyDict;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-claw-text mb-2">
              {copy.title}
            </h1>
            <p className="font-mono text-xs text-claw-dim uppercase tracking-widest">
              {copy.effective}
            </p>
          </div>
        </section>

        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm text-claw-muted leading-relaxed">
            {copy.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl text-claw-text mb-3">{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">{copy.contactHeading}</h2>
              <p>
                {copy.contactIntro}{" "}
                <a href="https://discord.gg/q8kEquTu3z" className="text-claw-orange hover:underline">
                  discord.gg/q8kEquTu3z
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}