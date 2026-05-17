"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { ProjectsDict } from "@/lib/i18n/dictionaries/types";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

function stagger(i: number) {
  return { ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } };
}

export default function CommunityProjectsPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const t = useDictSlice("projects") as ProjectsDict;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none mb-4"
            >
              {t.title}
            </motion.h1>
            <motion.p
              {...stagger(2)}
              className="text-base text-claw-muted max-w-2xl"
            >
              {t.dek}
            </motion.p>
          </div>
        </section>

        {/* Projects grid */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-claw-border">
              {t.projects.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i)}
                  className="border-claw-border border-b border-r p-8 hover:border-claw-orange/40 transition-colors group"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-3">
                    {project.tag}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider text-claw-text mb-1 group-hover:text-claw-orange transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-4">
                    {project.builder}
                  </p>
                  <p className="text-sm text-claw-muted leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-claw-orange group-hover:underline">
                    {t.viewProject}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-8">
              {t.resources}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-claw-border">
              {t.resourcesList.map((resource, i) => (
                <motion.a
                  key={resource.name}
                  href={withLocale(resource.link, locale)}
                  {...stagger(i + 1)}
                  className="border-claw-border border-b border-r p-8 hover:border-claw-orange/40 transition-colors group"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-cyan mb-3">
                    {resource.tag}
                  </p>
                  <h3 className="font-display text-xl tracking-wider text-claw-text mb-2 group-hover:text-claw-orange transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-claw-muted leading-relaxed">
                    {resource.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-claw-orange group-hover:underline">
                    {t.explore}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              {t.ctaEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-4">
              {t.ctaTitle}
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8 max-w-xl mx-auto">
              {t.ctaBody}
            </motion.p>
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={withLocale("/community", locale)}
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors text-center"
              >
                {t.feed}
              </Link>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors text-center"
              >
                {t.llms}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
