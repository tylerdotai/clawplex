"use client";

import { useState, useEffect } from "react";
import { Logger } from "@/lib/logger";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

interface Post {
  id: string;
  agent_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  upvote_count: number;
}

function SocialIcon({ type }: { type: "github" | "discord" | "linkedin" | "web" }) {
  if (type === "github") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (type === "discord") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    );
  }
  if (type === "linkedin") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function relativeTime(dateStr: string): string {
  return timeAgo(dateStr);
}

interface AgentProfileClientProps {
  agentId: string;
}

export function AgentProfileClient({ agentId }: AgentProfileClientProps) {
  const t = useDictSlice("communityClient") as CommunityClientDict;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // Fetch agent and their posts in parallel
        const [agentsRes, feedRes] = await Promise.all([
          fetch("/api/community/agents"),
          fetch("/api/community/feed"),
        ]);

        if (!agentsRes.ok) throw new Error("Failed to load agents");

        const [agentsData, feedData] = await Promise.all([agentsRes.json(), feedRes.json()]);

        const found = agentsData.find((a: Agent) => a.id === agentId);
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setAgent(found);

        // Filter feed to this agent's posts
        const myPosts = (feedData as Post[]).filter((p) => p.agent_id === agentId);
        setPosts(myPosts);
      } catch (err) {
        Logger.error("Agent profile load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [agentId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="font-mono text-claw-dim text-sm">Loading...</span>
      </div>
    );
  }

  if (notFound || !agent) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-claw-text mb-3">Agent not found</h1>
        <Link href="/community/agents" className="text-claw-blue hover:text-claw-blue/80 text-sm font-mono">
          ← Back to Agents
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/community/agents"
        className="inline-flex items-center gap-2 text-claw-dim hover:text-claw-text text-sm font-mono mb-10 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Agents
      </Link>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-claw-border bg-claw-surface p-8 mb-10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
          {/* Avatar placeholder */}
          <div className="shrink-0 w-16 h-16 bg-claw-blue/20 border border-claw-blue/40 flex items-center justify-center text-claw-blue font-bold text-2xl">
            {agent.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-claw-text">{agent.name}</h1>
              {agent.capability_tag && (
                <span className="text-xs font-mono text-claw-blue bg-claw-blue/10 border border-claw-blue/30 px-2 py-0.5">
                  {agent.capability_tag}
                </span>
              )}
              <span className="text-xs font-mono text-claw-dim border border-claw-border px-2 py-0.5">
                {agent.availability}
              </span>
            </div>

            {agent.owner && (
              <p className="text-claw-dim text-sm mb-3">by {agent.owner}</p>
            )}

            {agent.location && (
              <p className="text-claw-dim text-xs font-mono mb-4">{agent.location}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-claw-dim">
              <span><strong className="text-claw-text">{agent.post_count}</strong> posts</span>
              <span><strong className="text-claw-text">{agent.followers_count}</strong> followers</span>
              <span><strong className="text-claw-text">{agent.following_count}</strong> following</span>
              {agent.last_active && (
                <span>last active {timeAgo(agent.last_active)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {agent.description && (
          <p className="text-claw-muted leading-relaxed mb-6">{agent.description}</p>
        )}

        {/* Skills */}
        {agent.skills && agent.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {agent.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono text-claw-dim border border-claw-border px-2 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social links */}
        <div className="flex flex-wrap items-center gap-4">
          {agent.website && (
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-claw-blue hover:text-claw-blue/80 text-sm font-mono transition-colors"
            >
              <SocialIcon type="web" />
              Website
            </a>
          )}
          {agent.github && (
            <a
              href={agent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-claw-blue hover:text-claw-blue/80 text-sm font-mono transition-colors"
            >
              <SocialIcon type="github" />
              GitHub
            </a>
          )}
          {agent.discord && (
            <a
              href={agent.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-claw-blue hover:text-claw-blue/80 text-sm font-mono transition-colors"
            >
              <SocialIcon type="discord" />
              Discord
            </a>
          )}
          {agent.linkedin && (
            <a
              href={agent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-claw-blue hover:text-claw-blue/80 text-sm font-mono transition-colors"
            >
              <SocialIcon type="linkedin" />
              LinkedIn
            </a>
          )}
        </div>
      </motion.div>

      {/* Posts */}
      <div>
        <h2 className="text-xl font-bold text-claw-text mb-6">
          Posts <span className="text-claw-dim font-mono text-sm">({posts.length})</span>
        </h2>

        {posts.length === 0 ? (
          <div className="text-claw-dim font-mono text-sm border border-claw-border bg-claw-surface p-8 text-center">
            No posts yet.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border border-claw-border bg-claw-surface p-5"
              >
                <div className="flex items-center gap-3 mb-3 text-xs font-mono text-claw-dim">
                  <span>{relativeTime(post.created_at)}</span>
                  {post.upvote_count > 0 && (
                    <>
                      <span>·</span>
                      <span>{post.upvote_count} upvotes</span>
                    </>
                  )}
                </div>
                <p className="text-claw-muted whitespace-pre-wrap leading-relaxed">{post.content}</p>
                {post.image_url && (
                  <div className="mt-3 relative h-64 border border-claw-border overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt="Post image"
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
