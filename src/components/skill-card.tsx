"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { SkillCardDict } from "@/lib/i18n/dictionaries/types";

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
  Research: "text-claw-cyan border-claw-cyan/30 bg-claw-cyan/10",
  Productivity: "text-claw-orange border-claw-orange/30 bg-claw-orange/10",
  Social: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  Utility: "text-claw-success border-claw-success/30 bg-claw-success/10",
  Creative: "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

const categoryDotColors: Record<SkillCategory, string> = {
  Research: "bg-claw-cyan",
  Productivity: "bg-claw-orange",
  Social: "bg-purple-400",
  Utility: "bg-claw-success",
  Creative: "bg-pink-400",
};

/* ── Skill Detail Modal ───────────────────────────────────────────────────── */
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const t = useDictSlice("skillCard") as SkillCardDict;

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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-claw-void/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-4 top-[5vh] z-50 max-h-[90vh] overflow-y-auto border border-claw-border bg-claw-surface shadow-2xl md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-claw-border bg-claw-surface px-6 py-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dotClass}`} />
            <div>
              <span className={`mb-1.5 inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
                {t.categories[skill.category]}
              </span>
              <h2 className="font-display text-2xl md:text-3xl tracking-wider text-claw-text leading-tight">
                {skill.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t.close}
            className="shrink-0 border border-claw-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-claw-dim hover:border-claw-orange hover:text-claw-orange transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.description}</p>
            <p className="text-sm text-claw-muted leading-relaxed">{skill.description}</p>
          </div>

          {/* Trigger phrases */}
          {skill.trigger_phrases.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.triggers}</p>
              <div className="flex flex-wrap gap-2">
                {skill.trigger_phrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="border border-claw-border bg-claw-void px-3 py-1.5 font-mono text-xs text-claw-muted"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.instructions}</p>
            <div className="border border-claw-border bg-claw-void p-4">
              <pre className="font-mono text-xs text-claw-muted leading-relaxed whitespace-pre-wrap">
                {skill.instructions}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-claw-border pt-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                {t.submittedBy(skill.submitter_name)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                {t.installs(skill.install_count)}
              </span>
            </div>
            <button
              onClick={handleInstall}
              className={`border px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all ${
                copied
                  ? "border-claw-success text-claw-success bg-claw-success/10"
                  : "border-claw-orange text-claw-orange hover:bg-claw-orange hover:text-claw-void"
              }`}
            >
              {copied ? t.copiedClipboard : t.installSkill}
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
  const t = useDictSlice("skillCard") as SkillCardDict;

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
        className="group border border-claw-border bg-claw-surface p-6 hover:border-claw-orange/50 transition-all duration-300 flex flex-col cursor-pointer"
      >
        {/* Category badge */}
        <span className={`self-start mb-3 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
          {t.categories[skill.category]}
        </span>

        {/* Name */}
        <h3 className="font-display text-xl tracking-wider text-claw-text mb-2 group-hover:text-claw-orange transition-colors">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-claw-muted leading-relaxed mb-4 flex-1">
          {skill.description}
        </p>

        {/* Trigger phrases preview */}
        {skill.trigger_phrases.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skill.trigger_phrases.slice(0, 3).map((phrase) => (
              <span
                key={phrase}
                className="border border-claw-border bg-claw-void px-2 py-0.5 font-mono text-[10px] text-claw-dim"
              >
                {phrase}
              </span>
            ))}
            {skill.trigger_phrases.length > 3 && (
              <span className="font-mono text-[10px] text-claw-dim px-1">
                {t.more(skill.trigger_phrases.length - 3)}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-claw-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
            {t.installs(skill.install_count)}
          </span>
          <button
            onClick={handleInstall}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              copied
                ? "border-claw-success text-claw-success bg-claw-success/10"
                : "border-claw-orange text-claw-orange hover:bg-claw-orange hover:text-claw-void"
            }`}
          >
            {copied ? t.copied : t.install}
          </button>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <SkillModal skill={skill} onClose={() => setSelected(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
