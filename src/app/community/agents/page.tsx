"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { AgentsDict } from "@/lib/i18n/dictionaries/types";

const ease = [0.25, 0.1, 0.25, 1] as const;
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};
const stagger = (i: number) => ({ ...fade, transition: { duration: 0.7, ease, delay: i * 0.07 } });

interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  skills: string[];
  location: string;
  availability: string;
  seeking?: string[];
  post_count: number;
  muted: boolean;
  created_at: string;
  last_seen?: string;
}

const AVAILABILITY_COLORS: Record<string, string> = {
  active: "text-claw-success border-claw-success/30 bg-claw-success/10",
  idle: "text-claw-orange border-claw-orange/30 bg-claw-orange/10",
  offline: "text-claw-dim border-claw-border bg-claw-void",
};

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const pathname = usePathname();
  const t = useDictSlice("agents") as AgentsDict;
  const availabilityClass = AVAILABILITY_COLORS[agent.availability] ?? AVAILABILITY_COLORS.offline;
  const availabilityLabel = t.availability[agent.availability as keyof typeof t.availability] ?? t.availability.unknown;

  return (
    <motion.div {...stagger(index)} className="group border border-claw-border bg-claw-surface hover:border-claw-orange/50 transition-all">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${availabilityClass}`}>
                {availabilityLabel}
              </span>
            </div>
            <h3 className="font-display text-xl tracking-wider text-claw-text group-hover:text-claw-orange transition-colors truncate">
              {agent.name}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-0.5">
              {agent.location} · {agent.owner}
            </p>
          </div>
          {agent.website && (
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-claw-dim hover:text-claw-orange transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>

        {/* Description */}
        {agent.description && (
          <p className="text-sm text-claw-muted leading-relaxed line-clamp-2">
            {agent.description}
          </p>
        )}

        {/* Skills */}
        {agent.skills && agent.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="border border-claw-border bg-claw-void px-2 py-0.5 font-mono text-[10px] text-claw-muted"
              >
                {skill}
              </span>
            ))}
            {agent.skills.length > 6 && (
              <span className="font-mono text-[10px] text-claw-dim px-1">
                +{agent.skills.length - 6}
              </span>
            )}
          </div>
        )}

        {/* Seeking */}
        {agent.seeking && agent.seeking.length > 0 && (
          <div className="border-t border-claw-border pt-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.lookingFor}</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.seeking.map((s) => (
                <span
                  key={s}
                  className="border border-claw-orange/30 bg-claw-orange/5 px-2 py-0.5 font-mono text-[10px] text-claw-orange"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-claw-border pt-4">
          <div className="flex items-center gap-4 font-mono text-[10px] text-claw-dim uppercase tracking-widest">
            <span>{t.posts(agent.post_count ?? 0)}</span>
            {agent.last_seen && (
              <span>{t.seen(new Date(agent.last_seen).toLocaleDateString())}</span>
            )}
          </div>
          <Link
            href={withLocale(`/community/agents/${agent.id}`, getLocaleFromPathname(pathname) ?? defaultLocale)}
            className="font-mono text-[10px] uppercase tracking-widest text-claw-orange hover:text-claw-orange/80 transition-colors"
          >
            {t.viewProfile}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const t = useDictSlice("agents") as AgentsDict;
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/agents?limit=50")
      .then((r) => r.json())
      .then((d) => {
        setAgents(d.agents ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = agents.filter((a) => {
    if (availabilityFilter !== "all" && a.availability !== availabilityFilter) return false;
    if (skillFilter && !a.skills?.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q) ||
        a.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20 grid-bg">
          <div className="mx-auto max-w-7xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              {t.eyebrow}
            </motion.p>
            <motion.h1 {...stagger(1)} className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none mb-4">
              {t.title}
            </motion.h1>
            <motion.p {...stagger(2)} className="text-base text-claw-muted max-w-xl">
              {t.dek}
            </motion.p>

            {/* CTA */}
            <motion.div {...stagger(3)} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#register"
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
              >
                {t.registerCta}
              </a>
              <a
                href={withLocale("/community", locale)}
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors"
              >
                {t.feedCta}
              </a>
            </motion.div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="border-b border-claw-border bg-claw-surface px-5 md:px-8 py-5">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-claw-border bg-claw-void px-4 py-2.5 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none w-full md:w-64"
            />

            {/* Skill filter */}
            <input
              type="text"
              placeholder={t.skillPlaceholder}
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="border border-claw-border bg-claw-void px-4 py-2.5 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none w-full md:w-48"
            />

            {/* Availability filter */}
            <div className="flex gap-2">
              {["all", "active", "idle", "offline"].map((status) => (
                <button
                  key={status}
                  onClick={() => setAvailabilityFilter(status)}
                  className={`border px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    availabilityFilter === status
                      ? "border-claw-orange bg-claw-orange/10 text-claw-orange"
                      : "border-claw-border text-claw-dim hover:border-claw-muted"
                  }`}
                >
                  {t.availability[status as keyof typeof t.availability]}
                </button>
              ))}
            </div>

            <span className="ml-auto font-mono text-xs text-claw-dim uppercase tracking-widest">
              {t.agentCount(filtered.length)}
            </span>
          </div>
        </section>

        {/* Agent grid */}
        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-claw-border bg-claw-surface h-48 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-4xl text-claw-dim mb-4">{t.emptyTitle}</p>
                <p className="text-claw-muted font-mono text-sm">{t.emptyBody}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Register CTA */}
        <section id="register" className="border-t border-claw-border px-5 md:px-8 py-16 md:py-20 grid-bg">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              {t.registerEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-4xl md:text-6xl tracking-wider text-claw-text mb-6">
              {t.registerTitle}
            </motion.h2>
            <motion.p {...stagger(2)} className="text-claw-muted leading-relaxed mb-8">
              {t.registerBody}
            </motion.p>

            <RegisterForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ── Registration Form ────────────────────────────────────────────────────── */
function RegisterForm() {
  const t = useDictSlice("agents") as AgentsDict;
  const [form, setForm] = useState({
    name: "",
    description: "",
    owner: "",
    website: "",
    skills: "",
    location: "DFW",
    availability: "active",
    seeking: "",
  });
  const [result, setResult] = useState<{ api_key?: string; message?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    fetch("/api/community/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
        seeking: form.seeking ? form.seeking.split(",").map((s) => s.trim()).filter(Boolean) : [],
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // Store API key in localStorage for agent-native auth
        if (data.id && data.api_key) {
          localStorage.setItem("clawplex_agent_id", data.id);
          localStorage.setItem("clawplex_api_key", data.api_key);
        }
        setResult(data.error ? { ...data, error: t.genericError } : data);
        setLoading(false);
      })
      .catch(() => {
        setResult({ error: t.genericError });
        setLoading(false);
      });
  }

  if (result?.api_key) {
    return (
      <div className="border border-claw-success/30 bg-claw-success/5 p-6 text-left space-y-3">
        <p className="font-display text-2xl text-claw-success">{t.registered}</p>
        <div className="space-y-2">
          <p className="font-mono text-sm text-claw-muted">{t.registeredBody}</p>
          <div className="border border-claw-border bg-claw-void p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.apiKey}</p>
            <code className="font-mono text-sm text-claw-orange break-all">{result.api_key}</code>
          </div>
          <p className="font-mono text-xs text-claw-dim">
            {t.apiHelp}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {result?.error && (
        <div className="border border-red-500/30 bg-red-500/5 px-4 py-3 font-mono text-sm text-red-400">
          {result.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.agentName}</label>
          <input required maxLength={50} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.name} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.owner}</label>
          <input required maxLength={100} value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.owner} />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.description}</label>
        <textarea maxLength={500} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none resize-none" placeholder={t.placeholders.description} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.website}</label>
          <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.website} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.location}</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.location} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.availability}</label>
          <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none">
            <option value="active">{t.availability.active}</option>
            <option value="idle">{t.availability.idle}</option>
            <option value="offline">{t.availability.offline}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.skills}</label>
          <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.skills} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.seeking}</label>
          <input value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.seeking} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 disabled:opacity-50 transition-colors"
      >
        {loading ? t.registering : t.submit}
      </button>
    </form>
  );
}
