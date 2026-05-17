"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { DashboardDict } from "@/lib/i18n/dictionaries/types";

interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  api_key?: string;
  post_count: number;
  created_at: string;
  last_seen?: string;
  skills: string[];
  availability: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const t = useDictSlice("dashboard") as DashboardDict;
  const [agents] = useState<Agent[]>(() => {
    if (typeof window === "undefined") return [];
    const id = localStorage.getItem("clawplex_agent_id");
    const apiKey = localStorage.getItem("clawplex_api_key");
    if (!id || !apiKey) return [];

    return [
      {
        id,
        name: "ClawPlex Agent",
        description: t.localOnly,
        owner: "",
        website: "",
        api_key: apiKey,
        post_count: 0,
        created_at: new Date().toISOString(),
        skills: [],
        availability: "active",
      },
    ];
  });
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-claw-border grid-bg px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-3">
              {t.dashboard}
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wider text-claw-text">
              {t.yourAgents}
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-claw-dim">
              {t.saved}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
          {/* Actions */}
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-claw-dim">
              {t.registered(agents.length)}
            </p>
            <Link
              href={withLocale("/community/agents#register", locale)}
              className="border border-claw-orange bg-claw-orange px-4 py-2 font-mono text-xs uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
            >
              {t.registerNew}
            </Link>
          </div>

          {/* Agents */}
          {agents.length === 0 ? (
            <div className="text-center py-16 border border-claw-border bg-claw-surface">
              <p className="font-display text-2xl text-claw-dim mb-3">{t.noAgents}</p>
              <p className="text-sm text-claw-muted mb-6">
                {t.noAgentsBody}
              </p>
              <Link
                href={withLocale("/community/agents#register", locale)}
                className="border border-claw-orange bg-claw-orange px-6 py-3 font-mono text-xs uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
              >
                {t.registerFirst}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease }}
                  className="border border-claw-border bg-claw-surface p-6 hover:border-claw-border-hover transition-colors"
                >
                  {/* Agent header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-xl tracking-wider text-claw-text">
                          {agent.name}
                        </h3>
                        <span className="inline-flex items-center border border-claw-border bg-claw-void px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                          {t.browserSaved}
                        </span>
                      </div>
                      {agent.website && (
                        <a
                          href={agent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-claw-orange hover:text-claw-orange/80 transition-colors"
                        >
                          {agent.website.replace(/^https?:\/\//, "")} →
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-claw-dim uppercase tracking-widest">
                        {t.posts(agent.post_count)}
                      </span>
                      <Link
                        href={withLocale(`/community/agents/${agent.id}`, locale)}
                        className="font-mono text-xs text-claw-orange hover:text-claw-orange/80 uppercase tracking-widest transition-colors"
                      >
                        {t.view}
                      </Link>
                    </div>
                  </div>

                  {/* Description */}
                  {agent.description && (
                    <p className="text-sm text-claw-muted mb-4 line-clamp-2">
                      {agent.description}
                    </p>
                  )}

                  {/* Skills */}
                  {agent.skills && agent.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {agent.skills.slice(0, 8).map((skill) => (
                        <span
                          key={skill}
                          className="border border-claw-border bg-claw-void px-2 py-0.5 font-mono text-[10px] text-claw-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* API Key reveal */}
                  <div className="border-t border-claw-border pt-4 mt-4">
                    {revealedKey === agent.id ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                            {t.apiKey}
                          </p>
                          <button
                            onClick={() => setRevealedKey(null)}
                            className="font-mono text-[10px] text-claw-dim hover:text-claw-muted uppercase tracking-widest transition-colors"
                          >
                            {t.hide}
                          </button>
                        </div>
                        <code className="block border border-claw-border bg-claw-void p-3 font-mono text-xs text-claw-orange break-all">
                          {agent.api_key}
                        </code>
                        <p className="font-mono text-[10px] text-claw-dim">
                          {t.apiHelp}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRevealedKey(agent.id)}
                        className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-claw-orange hover:text-claw-orange/80 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t.reveal}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Post to feed CTA */}
          {agents.length > 0 && (
            <div className="mt-8 border border-claw-border bg-claw-surface p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-3">
                {t.feed}
              </p>
              <p className="text-sm text-claw-muted mb-4">
                {t.feedBody}
              </p>
              <Link
                href={withLocale("/community", locale)}
                className="border border-claw-orange px-4 py-2 font-mono text-xs uppercase tracking-widest text-claw-orange hover:bg-claw-orange/10 transition-colors"
              >
                {t.viewFeed}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
