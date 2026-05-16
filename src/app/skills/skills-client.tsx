"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { SkillCard, type Skill, type SkillCategory } from "@/components/skill-card";

const CATEGORIES: Array<SkillCategory | "All"> = [
  "All",
  "Research",
  "Productivity",
  "Social",
  "Utility",
  "Creative",
];

/* ── Submission Modal ───────────────────────────────────────────────────── */
interface FormState {
  name: string;
  description: string;
  category: SkillCategory | "";
  trigger_phrases: string[];
  instructions: string;
  submitter_name: string;
  api_key: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "",
  trigger_phrases: [],
  instructions: "",
  submitter_name: "",
  api_key: "",
};

function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [phrase, setPhrase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(EMPTY_FORM);
      setPhrase("");
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  function addPhrase() {
    const trimmed = phrase.trim();
    if (trimmed && !form.trigger_phrases.includes(trimmed)) {
      setForm((f) => ({ ...f, trigger_phrases: [...f.trigger_phrases, trimmed] }));
      setPhrase("");
    }
  }

  function removePhrase(p: string) {
    setForm((f) => ({ ...f, trigger_phrases: f.trigger_phrases.filter((x) => x !== p) }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category || !form.instructions || !form.submitter_name) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/skills/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Submission failed. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  };

  const inputClass =
    "w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none transition-colors";

  return (
    <AnimatePresence>
      {open && (
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
            className="fixed inset-x-4 top-[10vh] z-50 max-h-[85vh] overflow-y-auto border border-claw-border bg-claw-surface shadow-2xl md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-claw-border bg-claw-surface px-6 py-4">
              <h2 className="font-display text-2xl tracking-wider text-claw-text">
                Submit a Skill
              </h2>
              <button
                onClick={onClose}
                className="border border-claw-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-claw-dim hover:border-claw-orange hover:text-claw-orange transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-6">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center border border-claw-success bg-claw-success/10">
                    <span className="font-display text-3xl text-claw-success">✓</span>
                  </div>
                  <h3 className="font-display text-2xl tracking-wider text-claw-text mb-2">
                    Submitted for Review
                  </h3>
                  <p className="font-mono text-sm text-claw-muted">
                    Your skill has been submitted. We&apos;ll review it and add it to the marketplace soon.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 border border-claw-border px-8 py-3 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors"
                  >
                    Back to Skills
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Skill name */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Skill Name <span className="text-claw-orange">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. GitHub MCP, SEO Optimizer"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Description <span className="text-claw-orange">*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="What does this skill do? (2-3 sentences)"
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Category <span className="text-claw-orange">*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as SkillCategory }))}
                      required
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-claw-surface">Select a category</option>
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c} className="bg-claw-surface">{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Trigger phrases */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Trigger Phrases
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPhrase())}
                        placeholder="e.g. &quot;analyze repo&quot;, &quot;find bug&quot;"
                        className={`${inputClass} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={addPhrase}
                        className="border border-claw-border px-4 py-3 font-mono text-xs uppercase tracking-widest text-claw-dim hover:border-claw-orange hover:text-claw-orange transition-colors shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                    {form.trigger_phrases.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {form.trigger_phrases.map((p) => (
                          <span
                            key={p}
                            className="flex items-center gap-1.5 border border-claw-border bg-claw-void px-2 py-1 font-mono text-[10px] text-claw-muted"
                          >
                            {p}
                            <button
                              type="button"
                              onClick={() => removePhrase(p)}
                              className="text-claw-dim hover:text-claw-orange transition-colors"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Instructions <span className="text-claw-orange">*</span>
                    </label>
                    <p className="mb-2 font-mono text-[10px] text-claw-dim">
                      The actual agent prompt or skill definition. This gets copied on install.
                    </p>
                    <textarea
                      value={form.instructions}
                      onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                      placeholder="Paste your skill prompt here..."
                      required
                      rows={8}
                      className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                    />
                  </div>

                  {/* Submitter name */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      Your Name <span className="text-claw-orange">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.submitter_name}
                      onChange={(e) => setForm((f) => ({ ...f, submitter_name: e.target.value }))}
                      placeholder="Tylerdotai"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* API key */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      API Key <span className="text-claw-dim">(optional — for agent submissions)</span>
                    </label>
                    <input
                      type="password"
                      value={form.api_key}
                      onChange={(e) => setForm((f) => ({ ...f, api_key: e.target.value }))}
                      placeholder="Agent API key (optional)"
                      className={inputClass}
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-xs text-red-500">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full border border-claw-orange bg-claw-orange py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 disabled:opacity-50 transition-colors"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Skill"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Skills Client ─────────────────────────────────────────────────────────── */
export function SkillsClient() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");
  const [showModal, setShowModal] = useState(false);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed to load skills");
      const data = await res.json();
      setSkills(data.skills ?? []);
    } catch {
      setError("Failed to load skills. Refresh to try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
                ClawPlex Marketplace
              </p>
              <h1 className="font-display text-5xl md:text-8xl tracking-wider text-claw-text leading-none mb-4">
                CLAWPLEX SKILLS.
              </h1>
              <p className="font-mono text-sm uppercase tracking-widest text-claw-muted mb-8">
                Community-built agents, ready to install.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
              >
                + Submit a Skill
              </button>
            </motion.div>
          </div>
        </section>

        {/* Category filters + grid */}
        <section className="px-5 md:px-8 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Filter tabs */}
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-active={activeCategory === cat}
                  className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "border-claw-orange bg-claw-orange/10 text-claw-orange"
                      : "border-claw-border text-claw-dim hover:border-claw-border-hover hover:text-claw-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Content states */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="border border-claw-border bg-claw-surface p-6 animate-pulse"
                  >
                    <div className="h-4 w-20 bg-claw-border mb-4" />
                    <div className="h-6 w-40 bg-claw-border mb-3" />
                    <div className="h-16 bg-claw-border mb-4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-5 w-16 bg-claw-border" />
                      <div className="h-5 w-20 bg-claw-border" />
                    </div>
                    <div className="flex justify-between mt-auto pt-4 border-t border-claw-border">
                      <div className="h-3 w-24 bg-claw-border" />
                      <div className="h-7 w-16 bg-claw-border" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="border border-red-500/20 bg-red-500/5 px-6 py-8 text-center">
                <p className="font-mono text-sm text-red-500">{error}</p>
                <button
                  onClick={fetchSkills}
                  className="mt-4 border border-red-500/30 px-6 py-2 font-mono text-xs uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="border border-claw-border bg-claw-surface px-6 py-20 text-center">
                <p className="font-display text-3xl text-claw-text mb-3">No skills yet.</p>
                <p className="font-mono text-sm text-claw-dim mb-8">
                  {activeCategory === "All"
                    ? "Be the first to submit a skill to the marketplace."
                    : `No ${activeCategory} skills yet. Be the first to submit one.`}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="border border-claw-orange px-8 py-3 font-mono text-sm uppercase tracking-widest text-claw-orange hover:bg-claw-orange hover:text-claw-void transition-colors"
                >
                  Submit a Skill
                </button>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SubmitModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}