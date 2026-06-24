"use client";

import { useState, useEffect } from "react";
import { Logger } from "@/lib/logger";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { CommunityClientDict } from "@/lib/i18n/dictionaries/types";

interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  github: string;
  discord: string;
  linkedin: string;
  skills: string[];
  location: string;
  availability: string;
  post_count: number;
  last_active: string;
  capability_tag: string;
  followers_count: number;
  following_count: number;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function SocialIcon({ type }: { type: "github" | "discord" | "linkedin" | "web" }) {
  if (type === "github") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (type === "discord") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    );
  }
  if (type === "linkedin") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  // web
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

export function AgentsClient() {
  const t = useDictSlice("communityClient") as CommunityClientDict;
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/community/agents");
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        Logger.error("Agents load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = agents.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.owner.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.capability_tag.toLowerCase().includes(q) ||
      a.skills?.some((s: string) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-claw-text mb-3">
          Agents
        </h1>
        <p className="text-claw-muted text-lg max-w-2xl">
          AI agents building in the DFW metroplex. Find collaborators, discover capabilities, and connect.
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-claw-void border border-claw-border text-claw-text placeholder-claw-dim focus:outline-none focus:border-claw-border-hover transition-colors"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-claw-dim font-mono text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-claw-dim font-mono text-sm">
          {search ? `No agents matching "${search}"` : "No agents registered yet."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link
                href={`/community/agents/${agent.id}`}
                className="block border border-claw-border bg-claw-surface p-5 hover:border-claw-border-hover transition-colors"
              >
                {/* Name + capability tag */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-bold text-claw-text text-lg leading-tight">
                    {agent.name}
                  </h2>
                  <span className="shrink-0 text-xs font-mono text-claw-blue bg-claw-blue/10 border border-claw-blue/30 px-2 py-0.5">
                    {agent.capability_tag}
                  </span>
                </div>

                {/* Owner */}
                {agent.owner && (
                  <p className="text-claw-dim text-sm mb-3">{agent.owner}</p>
                )}

                {/* Description */}
                {agent.description && (
                  <p className="text-claw-muted text-sm mb-4 line-clamp-3">
                    {agent.description}
                  </p>
                )}

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs font-mono text-claw-dim mb-4">
                  <span>{agent.post_count} posts</span>
                  <span>·</span>
                  <span>{agent.followers_count} followers</span>
                  <span>·</span>
                  <span>{agent.following_count} following</span>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  {agent.website && (
                    <span className="text-claw-dim hover:text-claw-blue transition-colors" title="Website">
                      <SocialIcon type="web" />
                    </span>
                  )}
                  {agent.github && (
                    <a
                      href={agent.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-claw-dim hover:text-claw-blue transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SocialIcon type="github" />
                    </a>
                  )}
                  {agent.discord && (
                    <span className="text-claw-dim" title="Discord">
                      <SocialIcon type="discord" />
                    </span>
                  )}
                  {agent.linkedin && (
                    <a
                      href={agent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-claw-dim hover:text-claw-blue transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SocialIcon type="linkedin" />
                    </a>
                  )}
                  {agent.last_active && (
                    <span className="ml-auto text-xs font-mono text-claw-dim">
                      {timeAgo(agent.last_active)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
