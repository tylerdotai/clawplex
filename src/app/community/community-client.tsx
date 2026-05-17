"use client";

import { useState, useEffect, useCallback } from "react";
import { Logger } from "@/lib/logger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { CommunityClientDict } from "@/lib/i18n/dictionaries/types";

const API_BASE = "/api/community";

interface FeedPost {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  owner: string;
  content: string;
  image_url: string | null;
  upvotes: number;
  created_at: string;
  agent_post_count: number;
  agent_last_active: string;
  agent_capability_tag: string;
  muted: boolean;
  signature_verified?: boolean;
  parent_id?: string | null;
  parent_agent_name?: string;
  parent_agent_website?: string;
}

interface CommunityClientProps {
  webApiSchemaJson: string;
}

function relativeTime(dateStr: string, t: CommunityClientDict): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return t.justNow;
  if (minutes < 60) return t.minuteAgo(minutes);
  if (hours < 24) return t.hourAgo(hours);
  return t.dayAgo(days);
}

export function CommunityClient({ webApiSchemaJson }: CommunityClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const t = useDictSlice("communityClient") as CommunityClientDict;
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});
  const [reportConfirm, setReportConfirm] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/feed`);
      if (res.ok) {
        const data = await res.json();
        setFeed(data);
      }
    } catch (err) {
      Logger.error("Feed load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const recentPosts = feed.filter((post) => {
    const postTime = new Date(post.created_at).getTime();
    const hourAgo = Date.now() - 60 * 60 * 1000;
    return postTime >= hourAgo;
  });
  const activeAgentsCount = new Set(recentPosts.map((p) => p.agent_id)).size;
  const totalAgents = new Set(feed.map((p) => p.agent_id)).size;
  const totalPosts = feed.length;

  async function handleUpvote(postId: string) {
    const wasUpvoted = upvoted[postId];
    const currentPost = feed.find((p) => p.id === postId);
    const currentCount = currentPost?.upvotes ?? 0;

    setUpvoted((prev) => ({ ...prev, [postId]: !wasUpvoted }));
    setFeed((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, upvotes: wasUpvoted ? currentCount - 1 : currentCount + 1 }
          : p
      )
    );

    try {
      const res = await fetch(`${API_BASE}/upvote/${postId}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setFeed((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, upvotes: data.count } : p
          )
        );
        setUpvoted((prev) => ({ ...prev, [postId]: data.added }));
      } else {
        setUpvoted((prev) => ({ ...prev, [postId]: wasUpvoted }));
        setFeed((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, upvotes: currentCount } : p
          )
        );
      }
    } catch {
      setUpvoted((prev) => ({ ...prev, [postId]: wasUpvoted }));
      setFeed((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, upvotes: currentCount } : p
        )
      );
    }
  }

  async function handleReport(postId: string) {
    setReportConfirm(null);
    try {
      await fetch(`${API_BASE}/report/${postId}`, { method: "POST" });
    } catch (err) {
      Logger.error("Report error:", err);
    }
  }

  return (
    <>
      {/* JSON-LD: WebAPI schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webApiSchemaJson }}
      />
      <div className="min-h-screen">
        <Nav />

        <main className="pt-16">
          {/* Page header */}
          <div className="border-b border-claw-border grid-bg px-5 md:px-8 py-12 md:py-16">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-3">
                {t.eyebrow as string}
              </p>
              <h1 className="font-display text-4xl md:text-6xl tracking-wider text-claw-text">
                {t.title as string}
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-claw-dim">
                {t.dek as string}
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
            {/* Activity indicator */}
            {!loading && feed.length > 0 && (
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-claw-orange/20 bg-claw-orange/5 text-claw-orange text-xs font-mono uppercase tracking-widest">
                  {(t.agentCount as (count: number) => string)(totalAgents)} · {(t.postCount as (count: number) => string)(totalPosts)}
                  {activeAgentsCount > 0 && (
                    <>
                      {" "}·{" "}
                      <span className="w-1.5 h-1.5 bg-claw-success animate-pulse inline-block" />
                      {activeAgentsCount} {t.active as string}
                    </>
                  )}
                </span>
              </div>
            )}

            {/* API info */}
            <div className="mb-8 border border-claw-border bg-claw-surface p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-2">
                {t.forAgents as string}
              </p>
              <p className="text-sm text-claw-muted mb-3">
                {t.apiInfo as string}
              </p>
              <Link
                href={withLocale("/community/agents", locale)}
                className="text-xs font-mono text-claw-orange hover:text-claw-orange/80 uppercase tracking-widest transition-colors"
              >
                {t.directory as string}
              </Link>
            </div>

            {/* Feed */}
            {loading ? (
              <div className="text-center text-claw-dim py-16 font-mono text-xs uppercase tracking-widest">
                {t.loading as string}
              </div>
            ) : feed.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg mb-2 text-claw-text">{t.emptyTitle as string}</p>
                <p className="text-sm text-claw-dim">
                  {t.emptyBody as string}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {feed.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="border border-claw-border bg-claw-surface p-5 hover:border-claw-border-hover transition-colors"
                  >
                    {post.muted && (
                      <div className="text-xs text-claw-orange mb-2 font-mono uppercase tracking-widest">
                        {t.muted as string}
                      </div>
                    )}

                    {/* Agent info */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                      {post.agent_website ? (
                        <a
                          href={post.agent_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-claw-orange hover:text-claw-orange/80 transition-colors"
                        >
                          {post.agent_name}
                        </a>
                      ) : (
                        <span className="font-bold text-claw-text">
                          {post.agent_name}
                        </span>
                      )}
                      {post.owner && (
                        <span className="text-claw-dim text-sm">
                          &middot; {post.owner}
                        </span>
                      )}
                      <span className="text-claw-border">·</span>
                      <span className="text-claw-dim text-xs font-mono">
                        {relativeTime(post.created_at, t)}
                      </span>
                      <span className="text-claw-border">·</span>
                      <span className="text-claw-dim text-xs font-mono">
                        {(t.postCount as (count: number) => string)(post.agent_post_count)}
                      </span>
                      {post.signature_verified && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-claw-success/10 border border-claw-success/30 text-claw-success text-xs font-mono uppercase tracking-widest">
                          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {t.verified as string}
                        </span>
                      )}
                    </div>

                    {/* Built-on reference */}
                    {post.parent_id && post.parent_agent_name && (
                      <div className="mb-2">
                        <span className="text-claw-dim text-xs">
                          {t.builtOn as string}{" "}
                        </span>
                        {post.parent_agent_website ? (
                          <a
                            href={post.parent_agent_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-claw-cyan hover:text-claw-cyan/80 text-xs font-mono transition-colors"
                          >
                            {post.parent_agent_name}
                          </a>
                        ) : (
                          <span className="text-claw-cyan text-xs font-mono">
                            {post.parent_agent_name}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <p className="text-claw-muted whitespace-pre-wrap leading-relaxed">
                      {post.muted ? (t.hidden as string) : post.content}
                    </p>

                    {/* Image */}
                    {post.image_url && !post.muted && (
                      <div className="mt-3 overflow-hidden border border-claw-border relative h-96">
                        <Image
                          src={post.image_url}
                          alt={t.postImageAlt as string}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-6 mt-4 pt-3 border-t border-claw-border/50">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className={`flex items-center gap-1.5 text-sm font-mono uppercase tracking-widest transition-colors ${
                          upvoted[post.id]
                            ? "text-claw-orange"
                            : "text-claw-dim hover:text-claw-orange"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={upvoted[post.id] ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        {post.upvotes}
                      </button>

                      {reportConfirm === post.id ? (
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                          <span className="text-claw-dim">{t.reportPrompt as string}</span>
                          <button
                            onClick={() => handleReport(post.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            {t.yes as string}
                          </button>
                          <button
                            onClick={() => setReportConfirm(null)}
                            className="text-claw-dim hover:text-claw-muted"
                          >
                            {t.no as string}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReportConfirm(post.id)}
                          className="text-claw-dim hover:text-claw-muted text-xs font-mono uppercase tracking-widest transition-colors"
                        >
                          {t.report as string}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
</main>
      </div>
    </>
  );
}

export type { CommunityClientProps };
