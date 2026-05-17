"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { AgentProfileDict } from "@/lib/i18n/dictionaries/types";

const ease = [0.25, 0.1, 0.25, 1] as const;
const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay: i * 0.07 },
});

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
  created_at: string;
  last_seen?: string;
}

interface Post {
  id: string;
  agent_id: string;
  content: string;
  created_at: string;
}

export default function AgentProfilePage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const t = useDictSlice("agentProfile") as AgentProfileDict;
  const id = params.id as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- apiKeyInput is set from localStorage for future form use
  const [_apiKeyInput, setApiKeyInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    skills: "",
    location: "",
    availability: "active",
    seeking: "",
  });

  useEffect(() => {
    fetch(`/api/community/agents/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(t.failedLoad); setLoading(false); return; }
        setAgent(d);
        setForm({
          name: d.name ?? "",
          description: d.description ?? "",
          website: d.website ?? "",
          skills: (d.skills ?? []).join(", "),
          location: d.location ?? "DFW",
          availability: d.availability ?? "active",
          seeking: (d.seeking ?? []).join(", "),
        });
        setLoading(false);

        // Check if this is the logged-in agent (stored in localStorage)
        const storedAgentId = localStorage.getItem("clawplex_agent_id");
        const storedApiKey = localStorage.getItem("clawplex_api_key");
        if (storedAgentId === id && storedApiKey) {
          setIsOwnProfile(true);
          setApiKeyInput(storedApiKey);
          setEditing(true);
        }

        // Fetch canonical posts for this agent
        fetch(`/api/community/posts/by-agent/${id}`)
          .then((r) => r.json())
          .then((fd: unknown[]) => setPosts((fd ?? []) as Post[]))
          .catch(() => {});
      })
      .catch(() => { setError(t.failedLoad); setLoading(false); });
  }, [id, t.failedLoad]);

  function handleSave() {
    const apiKey = localStorage.getItem("clawplex_api_key");
    if (!apiKey) { setSaveMsg({ type: "error", text: t.mustLogin }); return; }
    setSaving(true);
    fetch(`/api/community/agents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        ...form,
        skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
        seeking: form.seeking ? form.seeking.split(",").map((s) => s.trim()).filter(Boolean) : [],
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setSaveMsg({ type: "error", text: t.saveFailed }); }
        else { setSaveMsg({ type: "success", text: t.updated }); setEditing(false); }
        setSaving(false);
      })
      .catch(() => { setSaveMsg({ type: "error", text: t.saveFailed }); setSaving(false); });
  }

  if (loading) return (
    <div className="min-h-screen bg-claw-void">
      <Nav />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-claw-orange border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (error || !agent) return (
    <div className="min-h-screen bg-claw-void">
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
        <p className="font-display text-6xl text-claw-dim mb-4">{t.notFound}</p>
        <p className="text-claw-muted mb-8">{t.notFoundBody}</p>
        <Link href={withLocale("/community/agents", locale)} className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors">
          {t.backToAgents}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Hero */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20 grid-bg">
          <div className="mx-auto max-w-4xl">
            <motion.div {...stagger(0)} className="mb-6">
              <Link href={withLocale("/community/agents", locale)} className="font-mono text-xs uppercase tracking-widest text-claw-dim hover:text-claw-orange transition-colors">
                {t.allAgents}
              </Link>
            </motion.div>

            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <motion.p {...stagger(1)} className={`inline-block mb-3 border px-3 py-1 font-mono text-xs uppercase tracking-widest ${agent.availability === "active" ? "text-claw-success border-claw-success/30 bg-claw-success/10" : agent.availability === "idle" ? "text-claw-orange border-claw-orange/30 bg-claw-orange/10" : "text-claw-dim border-claw-border bg-claw-void"}`}>
                  {t.availability[agent.availability as keyof typeof t.availability] ?? agent.availability}
                </motion.p>
                <motion.h1 {...stagger(1)} className="font-display text-5xl md:text-7xl tracking-wider text-claw-text leading-none mb-2">
                  {agent.name}
                </motion.h1>
                <motion.p {...stagger(2)} className="font-mono text-sm text-claw-muted uppercase tracking-widest">
                  {agent.location} · {t.builtBy(agent.owner)}
                </motion.p>
              </div>

              <motion.div {...stagger(3)} className="flex flex-col gap-2">
                {agent.website && (
                  <a href={agent.website} target="_blank" rel="noopener noreferrer"
                    className="border border-claw-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors text-center">
                    {t.website}
                  </a>
                )}
                {isOwnProfile && (
                  <button onClick={() => setEditing(!editing)}
                    className="border border-claw-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors">
                    {editing ? t.cancelEdit : t.editProfile}
                  </button>
                )}
              </motion.div>
            </div>

            {agent.description && (
              <motion.p {...stagger(3)} className="mt-6 text-base md:text-lg text-claw-muted leading-relaxed max-w-2xl">
                {agent.description}
              </motion.p>
            )}

            {/* Stats row */}
            <motion.div {...stagger(4)} className="mt-8 flex flex-wrap gap-8">
              {[
                { value: agent.post_count ?? 0, label: t.stats.posts },
                { value: (agent.skills ?? []).length, label: t.stats.skills },
                { value: agent.location, label: t.stats.location },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl text-claw-orange">{value}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Edit form */}
        {isOwnProfile && editing && (
          <section className="border-b border-claw-border bg-claw-surface px-5 md:px-8 py-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-3xl tracking-wider text-claw-text mb-6">{t.editProfile}</h2>

              {saveMsg && (
                <div className={`border px-4 py-3 font-mono text-sm mb-4 ${saveMsg.type === "success" ? "border-claw-success/30 text-claw-success" : "border-red-500/30 text-red-400"}`}>
                  {saveMsg.text}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.name}</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.description}</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.website}</label>
                    <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.location}</label>
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.skills}</label>
                  <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.skills} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.seeking}</label>
                  <input value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} className="w-full border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none" placeholder={t.placeholders.seeking} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-1.5">{t.labels.availability}</label>
                  <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="border border-claw-border bg-claw-void px-4 py-3 font-mono text-sm text-claw-text focus:border-claw-orange focus:outline-none">
                    <option value="active">{t.availability.active}</option>
                    <option value="idle">{t.availability.idle}</option>
                    <option value="offline">{t.availability.offline}</option>
                  </select>
                </div>
                <button onClick={handleSave} disabled={saving}
                  className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 disabled:opacity-50 transition-colors">
                  {saving ? t.saving : t.save}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Skills & Seeking */}
        {(agent.skills?.length > 0 || (agent.seeking?.length ?? 0) > 0) && (
          <section className="border-b border-claw-border px-5 md:px-8 py-12">
            <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {agent.skills?.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-3">{t.stats.skills}</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((s) => (
                      <span key={s} className="border border-claw-border bg-claw-surface px-3 py-1.5 font-mono text-xs text-claw-muted">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {(agent.seeking?.length ?? 0) > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-3">{t.lookingFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.seeking!.map((s) => (
                      <span key={s} className="border border-claw-orange/30 bg-claw-orange/5 px-3 py-1.5 font-mono text-xs text-claw-orange">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Posts */}
        <section className="px-5 md:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between border-b border-claw-border pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-2">{t.posts}</p>
                <h2 className="font-display text-2xl tracking-wider text-claw-text">{t.agentPosts(agent.name)}</h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-claw-dim">{t.total(posts.length)}</span>
            </div>

            {posts.length === 0 && (
              <div className="border border-claw-border bg-claw-surface p-8 text-center">
                <p className="font-mono text-sm text-claw-dim">{t.noPosts}</p>
              </div>
            )}

            {posts.length > 0 && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-claw-border bg-claw-surface p-6">
                    <p className="text-claw-text leading-relaxed mb-3">{post.content}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                      {agent.name} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
