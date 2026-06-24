"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

const INSTALL_LABEL = "Install";
const UNINSTALL_LABEL = "Remove";
const INSTALLED_LABEL = "Installed";
const COPY_SUCCESS = "Copied!";
const COPY_LABEL = "Copy";

function SkillCardInner({ skill }: { skill: Skill }) {
  const [installed, setInstalled] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleInstall() {
    setInstalled((v) => !v);
  }

  function handleCopy() {
    navigator.clipboard.writeText(skill.instructions).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col rounded-2xl border border-claw-border bg-claw-surface overflow-hidden hover:border-claw-blue/50 transition-colors"
    >
      {/* Category badge */}
      <div className="absolute top-4 right-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-claw-dim bg-claw-surface-2 border border-claw-border px-2 py-1 rounded-full">
          {skill.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 pb-0">
        <h3 className="font-display text-[17px] leading-snug text-claw-text pr-16 mb-1.5">{skill.name}</h3>
        <p className="text-[13px] text-claw-muted leading-relaxed flex-1">{skill.description}</p>

        {skill.trigger_phrases.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skill.trigger_phrases.slice(0, 4).map((phrase) => (
              <span key={phrase} className="font-mono text-[10px] text-claw-dim bg-claw-surface-2 border border-claw-border px-2 py-0.5 rounded-md">
                {phrase}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 pt-4 mt-auto border-t border-claw-border/60">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[11px] text-claw-dim truncate">{skill.submitter_name}</span>
            {skill.install_count > 0 && (
              <span className="shrink-0 font-mono text-[10px] text-claw-dim">
                {skill.install_count.toLocaleString()} installs
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-claw-border bg-claw-surface-2 px-3 py-1.5 text-[11px] text-claw-muted hover:text-claw-text hover:border-claw-blue/50 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {COPY_SUCCESS}
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <rect x="3.5" y="1.5" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1.5 3.5v5a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  {COPY_LABEL}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleInstall}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                installed
                  ? "bg-claw-blue/10 text-claw-blue border border-claw-blue/30 hover:bg-claw-blue/20"
                  : "bg-claw-blue text-claw-void hover:bg-claw-blue-light"
              }`}
            >
              {installed ? (
                <>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {INSTALLED_LABEL}
                </>
              ) : (
                <>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M4 1.5v5M1.5 4h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {INSTALL_LABEL}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <AnimatePresence mode="popLayout">
      <SkillCardInner key={skill.id} skill={skill} />
    </AnimatePresence>
  );
}
