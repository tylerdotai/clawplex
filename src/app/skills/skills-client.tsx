"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { SkillCard, type Skill, type SkillCategory } from "@/components/skill-card";
import { motion } from "framer-motion";

const CATEGORIES: Array<SkillCategory | "All"> = [
  "All",
  "Research",
  "Productivity",
  "Social",
  "Utility",
  "Creative",
];

const CATEGORY_LABELS: Record<SkillCategory | "All", string> = {
  All: "All",
  Research: "Research",
  Productivity: "Productivity",
  Social: "Social",
  Utility: "Utility",
  Creative: "Creative",
};

/* ── Submit Modal ─────────────────────────────────────────────────────────── */

interface FormState {
  name: string;
  description: string;
  category: SkillCategory;
  triggers: string[];
  instructions: string;
  submitter_name: string;
  api_key: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "Utility",
  triggers: [],
  instructions: "",
  submitter_name: "",
  api_key: "",
};

function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [phrase, setPhrase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category || !form.instructions || !form.submitter_name) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
        setErrorMsg("Submission failed. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-2xl border border-border bg-surface max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <h2 className="font-display text-2xl tracking-wider text-text">
            Submit a Skill
          </h2>
          <button
            onClick={onClose}
            className="border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-dim hover:border-accent hover:text-accent transition-colors"
          >
            ✕ Close
          </button>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <div className="py-12 text-center">
              <div className="mb-6 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-accent">
                  <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 24l7 7 13-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-2xl tracking-wider text-text mb-2">
                Submitted for Review
              </h3>
              <p className="font-mono text-sm text-muted">
                Your skill has been submitted. We'll review it and add it to the marketplace soon.
              </p>
              <button
                onClick={onClose}
                className="mt-8 border border-border px-8 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors"
              >
                Back to Skills
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="border border-red-900/40 bg-red-950/20 px-4 py-3 font-mono text-sm text-red-400">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Skill Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. GitHub MCP, SEO Optimizer"
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Description <span className="text-accent">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What does this skill do? (2-3 sentences)"
                  rows={3}
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Category <span className="text-accent">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as SkillCategory }))}
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text focus:border-accent focus:outline-none transition-colors"
                  required
                >
                  <option value="" className="bg-surface">Select a category</option>
                  {(Object.keys(CATEGORY_LABELS) as Array<SkillCategory | "All">)
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c} className="bg-surface">
                        {CATEGORY_LABELS[c]}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Trigger Phrases
                </label>
                <input
                  type="text"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const trimmed = phrase.trim();
                      if (trimmed && !form.triggers.includes(trimmed)) {
                        setForm((f) => ({ ...f, triggers: [...f.triggers, trimmed] }));
                      }
                      setPhrase("");
                    }
                  }}
                  placeholder='e.g. "analyze repo", "find bug"'
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors"
                />
                {form.triggers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.triggers.map((trigger) => (
                      <span
                        key={trigger}
                        className="inline-flex items-center gap-1 border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-xs text-accent"
                      >
                        {trigger}
                        <button
                          type="button"
                          onClick={() =>
                            setForm((f) => ({ ...f, triggers: f.triggers.filter((t) => t !== trigger) }))
                          }
                          className="ml-1 hover:text-accent-light transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-1.5 font-mono text-[10px] text-dim">
                  Press Enter to add. {CATEGORY_LABELS[form.category as SkillCategory] || "Select a category"} skill triggers.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Instructions <span className="text-accent">*</span>
                </label>
                <p className="mb-2 font-mono text-[10px] text-dim">
                  The actual agent prompt or skill definition. This gets copied on install.
                </p>
                <textarea
                  value={form.instructions}
                  onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                  placeholder="Paste your skill prompt here..."
                  rows={8}
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.submitter_name}
                  onChange={(e) => setForm((f) => ({ ...f, submitter_name: e.target.value }))}
                  placeholder="Tylerdotai"
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  API Key <span className="text-dim">(optional — for agent submissions)</span>
                </label>
                <input
                  type="password"
                  value={form.api_key}
                  onChange={(e) => setForm((f) => ({ ...f, api_key: e.target.value }))}
                  placeholder="Your API key (optional)"
                  className="w-full border border-border bg-void px-4 py-3 font-mono text-sm text-text placeholder:text-border focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full border border-accent bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-void hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Skill"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Skills Client ─────────────────────────────────────────────────────────── */

export function SkillsClient() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");
  const [submitOpen, setSubmitOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSkills(data);
    } catch {
      setError("Failed to load skills. Refresh to try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-5 md:px-8 pt-20 pb-14">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3"
            >
              Agent Builders Club Marketplace
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-text mb-4"
            >
              AGENT SKILLS.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-base text-muted max-w-xl"
            >
              Community-built agents, ready to install.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => setSubmitOpen(true)}
                className="border border-accent bg-accent px-6 py-3 font-mono text-sm uppercase tracking-widest text-void hover:bg-accent/90 transition-colors"
              >
                + Submit a Skill
              </button>
              <Link
                href="/community"
                className="border border-border px-6 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors"
              >
                View Feed
              </Link>
              <Link
                href="/community/projects"
                className="border border-border px-6 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors"
              >
                See Projects
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Category filter */}
        <section className="border-b border-border px-5 md:px-8 py-5">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                    activeCategory === cat
                      ? "border-accent bg-accent text-void"
                      : "border-border text-dim hover:border-accent hover:text-accent"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section ref={gridRef} className="px-5 md:px-8 py-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            {loading ? (
              <div className="text-center py-24 font-mono text-xs uppercase tracking-widest text-dim">
                Loading...
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="font-mono text-sm text-muted mb-4">{error}</p>
                <button
                  onClick={loadSkills}
                  className="border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl text-text mb-3">No skills yet.</p>
                <p className="font-mono text-sm text-dim">
                  {activeCategory === "All"
                    ? "Be the first to submit a skill to the marketplace."
                    : `No ${CATEGORY_LABELS[activeCategory as SkillCategory]} skills yet. Be the first to submit one.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
                {filtered.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
