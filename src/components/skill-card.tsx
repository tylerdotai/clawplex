"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SkillCategory = "Research" | "Productivity" | "Social" | "Utility" | "Creative";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  trigger_phrases: string[];
  instructions: string;
  submitter_name: string;
  install_count: number;
  created_at: string;
}

const categoryColors: Record<SkillCategory, string> = {
  Research: "text-accent-light border-accent-light/30 bg-accent-light/10",
  Productivity: "text-accent border-accent/30 bg-accent/10",
  Social: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  Utility: "text-success border-success/30 bg-success/10",
  Creative: "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

const categoryDotColors: Record<SkillCategory, string> = {
  Research: "bg-accent-light",
  Productivity: "bg-accent",
  Social: "bg-purple-400",
  Utility: "bg-success",
  Creative: "bg-pink-400",
};

function formatInstalls(count: number): string {
  return `${count.toLocaleString("en")} install${count === 1 ? "" : "s"}`;
}

/* ── Skill Detail Modal ───────────────────────────────────────────────────── */
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleInstall() {
    navigator.clipboard.writeText(skill.instructions).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }

  const badgeClass = categoryColors[skill.category] ?? categoryColors.Utility;
  const dotClass = categoryDotColors[skill.category] ?? categoryDotColors.Utility;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-4 top-[5vh] z-50 max-h-[90vh] overflow-y-auto border border-border bg-surface shadow-2xl md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl"
      >
        <div className="sticky top-0 z-10 border-b border-border bg-surface px-6 py-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dotClass}`} />
            <div>
              <span className={`mb-1.5 inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
                {skill.category}
              </span>
              <h2 className="font-display text-2xl md:text-3xl tracking-wider text-text leading-tight">
                {skill.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close skill details"
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-dim hover:border-accent hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-2">Description</p>
            <p className="text-sm text-muted leading-relaxed">{skill.description}</p>
          </div>

          {skill.trigger_phrases.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-2">Trigger Phrases</p>
              <div className="flex flex-wrap gap-2">
                {skill.trigger_phrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="border border-border bg-void px-3 py-1.5 font-mono text-xs text-muted"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-2">Agent Instructions</p>
            <div className="border border-border bg-void p-4">
              <pre className="font-mono text-xs text-muted leading-relaxed whitespace-pre-wrap">
                {skill.instructions}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                Submitted by {skill.submitter_name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                {formatInstalls(skill.install_count)}
              </span>
            </div>
            <button
              onClick={handleInstall}
              className={`border px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all ${
                copied
                  ? "border-success text-success bg-success/10"
                  : "border-accent text-accent hover:bg-accent hover:text-void"
              }`}
            >
              {copied ? "✓ Copied to Clipboard" : "Install Skill"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ── Skill Card ───────────────────────────────────────────────────────────── */
interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const [selected, setSelected] = useState(false);
  const [copied, setCopied] = useState(false);

  function buildSkillMd(s: Skill): string {
    const frontmatter = [
      "---",
      `name: ${s.name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 64)}`,
      `description: ${s.description.slice(0, 1024)}`,
      "---",
      "",
      s.instructions,
    ].join("\n");
    return frontmatter;
  }

  function handleInstall(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(buildSkillMd(skill)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const badgeClass = categoryColors[skill.category] ?? categoryColors.Utility;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => setSelected(true)}
        className="group border border-border bg-surface p-6 hover:border-accent/50 transition-all duration-300 flex flex-col cursor-pointer"
      >
        <span className={`self-start mb-3 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
          {skill.category}
        </span>

        <h3 className="font-display text-xl tracking-wider text-text mb-2 group-hover:text-accent transition-colors">
          {skill.name}
        </h3>

        <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
          {skill.description}
        </p>

        {skill.trigger_phrases.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skill.trigger_phrases.slice(0, 3).map((phrase) => (
              <span
                key={phrase}
                className="border border-border bg-void px-2 py-0.5 font-mono text-[10px] text-dim"
              >
                {phrase}
              </span>
            ))}
            {skill.trigger_phrases.length > 3 && (
              <span className="font-mono text-[10px] text-dim px-1">
                +{skill.trigger_phrases.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
            {formatInstalls(skill.install_count)}
          </span>
          <button
            onClick={handleInstall}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              copied
                ? "border-success text-success bg-success/10"
                : "border-accent text-accent hover:bg-accent hover:text-void"
            }`}
          >
            {copied ? "Copied!" : "Install"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <SkillModal skill={skill} onClose={() => setSelected(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
