"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { homepageSchema } from "@/components/agent-readiness/json-ld-schemas";

function faqPageSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };
}
import { en } from "@/lib/i18n/dictionaries";
import type { HomeDict } from "@/lib/i18n/dictionaries/types";

/* ── Scroll animation preset ─────────────────────────────────────────────── */
const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

function stagger(i: number) {
  return { ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } };
}

/* ── Hero — Editorial split (text left / photo right) ─────────────────── */
function HeroBanner({ copy }: { copy: HomeDict["hero"] }) {
  const heroEase = [0.25, 0.1, 0.25, 1] as const;

  const heroImages = [
    "/clawcon-1.webp",
    "/node-03-meetup.png",
    "/node-04-frisco-01.jpeg",
    "/node-05-claude-tools-southlake-01.webp",
    "/node-06-hermes-arlington-03.webp",
  ];
  const heroCaptions = [
    "ClawCon DFW",
    "Node 03 · Meetup",
    "Node 04 · Frisco",
    "Node 05 · Claude Tools",
    "Node 06 · Hermes",
  ];

  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIdx((i) => (i + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
    <div className="relative grid lg:grid-cols-12 lg:min-h-[88vh] lg:max-h-[1000px]">
      {/* Text column */}
      <div className="lg:col-span-5 flex flex-col justify-center px-5 sm:px-8 lg:px-12 xl:px-16 pt-28 pb-12 lg:py-24 order-1">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: heroEase }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-6 flex items-center gap-2"
        >
          <span className="inline-block h-px w-6 bg-claw-blue/60" />
          {copy.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: heroEase, delay: 0.05 }}
          className="font-display text-[44px] sm:text-6xl lg:text-[68px] xl:text-[80px] leading-[0.98] tracking-tight text-claw-text"
        >
          {copy.titleLine1}
          <br />
          {copy.titleLine2Prefix}<span className="underline-accent">{copy.titleLine2Accent}</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: heroEase, delay: 0.15 }}
          className="mt-7 text-base sm:text-lg text-claw-muted leading-relaxed max-w-lg"
        >
          {copy.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: heroEase, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://luma.com/agentbuildersclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 text-sm sm:text-base font-medium text-claw-void hover:bg-claw-blue-light transition-colors"
          >
            {copy.rsvp}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base text-claw-muted hover:text-claw-text transition-colors group"
          >
            {copy.discord}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </motion.div>
      </div>

      {/* Photo column */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: heroEase }}
        className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-auto lg:min-h-[88vh] lg:max-h-[1000px] order-2 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: heroEase }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[heroIdx]}
              alt={copy.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-claw-void/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-claw-void/95 lg:via-claw-void/0 lg:to-transparent"
        />
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-6 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-claw-void/70 backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-claw-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-claw-red" />
            {heroCaptions[heroIdx]}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── What is Agent Builders Club ───────────────────────────────────────────────────── */
function WhatIsAgentBuildersClub({ copy }: { copy: HomeDict["what"] }) {
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <motion.p {...stagger(1)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5">
              {copy.eyebrow}
            </motion.p>
            <motion.h2 {...stagger(2)} className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-tight text-claw-text">
              {copy.titleLine1}
              <br />
              <span className="underline-accent">{copy.titleAccent}</span>
            </motion.h2>
            <motion.div {...stagger(3)} className="mt-8 space-y-5 text-lg sm:text-[19px] text-claw-muted leading-[1.65]">
              <p>{copy.paragraphs[0]}</p>
              <p>{copy.paragraphs[1]}</p>
              <p>{copy.paragraphs[2]}</p>
            </motion.div>
            <motion.div {...stagger(4)} className="mt-8 flex flex-wrap gap-2.5">
              {copy.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-claw-border px-4 py-1.5 text-xs sm:text-[13px] text-claw-muted">
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.dl {...stagger(5)} className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border lg:hidden">
              {copy.facts.map((fact) => (
                <div key={fact.label} className="bg-claw-surface px-4 py-4">
                  <dt className="font-display text-xl sm:text-2xl text-claw-text leading-none">{fact.value}</dt>
                  <dd className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-claw-dim">{fact.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Mascot image — desktop only */}
          <div className="hidden lg:block lg:col-span-5 relative h-[420px] xl:h-[520px] rounded-2xl overflow-hidden border border-claw-border">
            <Image
              src="/agent-builders-club-logo.jpg"
              alt="Agent Builders Club"
              fill
              sizes="(max-width: 1024px) 0vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Three Ways to Engage ─────────────────────────────────────────────── */
function WaysToEngage({ copy }: { copy: HomeDict["ways"] }) {
  const total = String(copy.items.length).padStart(2, "0");
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div {...stagger(0)} className="mb-12 md:mb-16 flex items-baseline justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue">{copy.eyebrow}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-claw-dim tabular-nums">01&thinsp;–&thinsp;{total}</p>
        </motion.div>
        <div className="border-t border-claw-border">
          {copy.items.map((way, i) => (
            <motion.a
              key={way.num}
              href={way.href}
              target="_blank"
              rel="noopener noreferrer"
              {...stagger(i + 1)}
              className="group block border-b border-claw-border"
            >
              <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-3 items-start py-8 md:py-10 lg:py-12">
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                  <span className="font-display text-5xl sm:text-6xl md:text-[64px] lg:text-[76px] leading-none text-claw-dim/70 group-hover:text-claw-blue transition-colors tabular-nums">
                    {way.num}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-claw-blue mb-3">{way.label}</p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.15] tracking-tight text-claw-text group-hover:text-claw-text mb-3">
                    {way.title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-claw-muted leading-[1.6] max-w-prose">{way.desc}</p>
                </div>
                <div className="col-span-12 md:col-span-3 md:text-right md:pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm text-claw-muted group-hover:text-claw-text transition-colors">
                    {way.cta}
                    <span className="text-claw-blue transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Community Spotlight ──────────────────────────────────────────────── */
function CommunitySpotlight({ copy }: { copy: HomeDict["spotlight"] }) {
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-4">
              {copy.eyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[60px] leading-[1.02] tracking-tight text-claw-text">
              {copy.titlePrefix}<span className="underline-accent">{copy.titleAccent}</span>.
            </motion.h2>
          </div>
          <motion.a
            {...stagger(2)}
            href="/community/projects"
            className="self-start md:self-end inline-flex items-center gap-1.5 text-sm text-claw-muted hover:text-claw-text transition-colors group shrink-0"
          >
            {copy.allProjects}
            <span className="text-claw-blue transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-px bg-claw-border rounded-lg overflow-hidden border border-claw-border">
          {copy.items.map((item, i) => {
            const span = i < 3 ? "md:col-span-2" : "md:col-span-3";
            return (
              <motion.a
                key={item.name}
                href={item.external ? item.href : item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                {...stagger(i + 3)}
                className={`group flex flex-col bg-claw-surface hover:bg-claw-surface-2 transition-colors p-7 md:p-8 ${span}`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue">{item.tag}</span>
                <h3 className="mt-5 font-display text-2xl sm:text-[26px] lg:text-[28px] tracking-tight text-claw-text leading-[1.15]">
                  {item.name}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-claw-muted leading-[1.6] flex-1">{item.description}</p>
                <div className="mt-6 pt-4 border-t border-claw-border flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-claw-blue">{copy.by} {item.builder}</span>
                  <span className="inline-flex items-center gap-1 text-claw-muted group-hover:text-claw-text transition-colors">
                    {item.external ? copy.visit : copy.explore}
                    <span className="text-claw-blue transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Founders ─────────────────────────────────────────────────────────── */
function Founders({ copy }: { copy: HomeDict["founders"] }) {
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 md:mb-20 text-center">
          <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-4">
            {copy.eyebrow}
          </motion.p>
          <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-claw-text">
            {copy.titlePrefix}<span className="underline-accent">Agent Builders Club</span>.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
            aria-hidden="true"
            className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-claw-blue to-transparent origin-center"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10 lg:items-start">
          {copy.people.map((founder, i) => (
            <motion.div
              key={founder.name}
              {...stagger(i + 2)}
              className={`group ${i % 2 === 1 ? "lg:mt-14" : ""}`}
            >
              <div className="relative overflow-hidden rounded-lg border border-claw-border bg-claw-surface shadow-sm shadow-black/20 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-black/40">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 font-display text-xl sm:text-[22px] lg:text-2xl tracking-tight text-claw-text leading-tight">{founder.name}</h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-claw-blue">{founder.role}</p>
              <div className="mt-3 flex items-center gap-3">
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={copy.ariaLinkedIn(founder.name)} className="text-claw-muted hover:text-claw-blue transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={founder.x} target="_blank" rel="noopener noreferrer" aria-label={copy.ariaX(founder.name)} className="text-claw-muted hover:text-claw-blue transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── For Agents ─────────────────────────────────────────────────────────── */
function ForAgents({ copy }: { copy: HomeDict["agents"] }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(copy.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5 text-center">
          {copy.eyebrow}
        </motion.p>
        <motion.h2 {...stagger(1)} className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] tracking-tight text-claw-text text-center max-w-2xl mx-auto">
          {copy.titlePrefix}
          <span className="underline-accent">{copy.titleAccent}</span>.
        </motion.h2>
        <motion.div {...stagger(2)} className="mt-10 md:mt-12">
          <div className="rounded-xl border border-claw-border bg-claw-surface overflow-hidden">
            <div className="p-7 md:p-8">
              <p className="text-[15px] sm:text-base leading-[1.65] text-claw-text">
                {copy.promptVerb}{" "}
                <code className="font-mono text-[0.88em] text-claw-muted bg-claw-surface-2 px-1.5 py-0.5 rounded">
                  https://agentbuildersclub.dev/llms.txt
                </code>
                {copy.promptTextSuffix}
              </p>
            </div>
            <div className="border-t border-claw-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-7 md:px-8 py-4">
              <p className="text-[13px] text-claw-dim">{copy.helper}</p>
              <button
                onClick={handleCopy}
                aria-live="polite"
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  copied ? "bg-claw-surface-2 text-claw-text" : "bg-claw-blue text-claw-void hover:bg-claw-blue-light"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {copy.copied}
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="4" y="2" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M9 11v.5A1.5 1.5 0 017.5 13h-4A1.5 1.5 0 012 11.5v-6A1.5 1.5 0 013.5 4H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    {copy.copyPrompt}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
        <motion.details {...stagger(3)} className="mt-8 text-left rounded-xl border border-claw-border bg-claw-surface overflow-hidden group/details">
          <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer select-none hover:bg-claw-surface-2 transition-colors">
            <span className="text-sm text-claw-muted">{copy.apiSummary}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-claw-dim transition-transform group-open/details:rotate-180">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="border-t border-claw-border bg-claw-void px-6 py-5">
            <pre className="font-mono text-[12px] sm:text-[13px] text-claw-muted overflow-x-auto whitespace-pre leading-relaxed">{copy.apiPre}</pre>
          </div>
        </motion.details>
        <motion.div {...stagger(4)} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-claw-dim">
          <span>{copy.notes}</span>
          <Link href="/privacy" className="text-claw-muted hover:text-claw-text transition-colors">
            {copy.privacy}
          </Link>
          <span className="hidden sm:inline text-claw-border">·</span>
          <a href="/llms.txt" className="text-claw-muted hover:text-claw-text transition-colors">{copy.docs}</a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────────────────────── */
function FAQ({ copy }: { copy: HomeDict["faq"] }) {
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 md:mb-16 text-center">
          <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-4">
            {copy.eyebrow}
          </motion.p>
          <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-claw-text">
            {copy.titlePrefix}<span className="underline-accent">{copy.titleAccent}</span>.
          </motion.h2>
          <motion.p {...stagger(2)} className="mt-5 text-base sm:text-lg text-claw-muted">
            {copy.body}
          </motion.p>
        </div>
        <motion.dl {...stagger(3)} className="divide-y divide-claw-border border-y border-claw-border">
          {copy.items.map((item) => (
            <details
              key={item.q}
              className="group/faq py-2"
            >
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none select-none">
                <dt className="font-display text-lg sm:text-xl lg:text-[22px] leading-snug tracking-tight text-claw-text">
                  {item.q}
                </dt>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-claw-blue shrink-0 transition-transform duration-300 group-open/faq:rotate-45"
                >
                  <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </summary>
              <dd className="pb-5 pr-8 text-[15px] sm:text-base text-claw-muted leading-[1.7]">
                {item.a}
              </dd>
            </details>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export function HomeClient() {
  const copy = en.home;
  const orgSchema = homepageSchema();
  const faqSchemaData = faqPageSchema(copy.faq.items);

  return (
    <MotionConfig reducedMotion="user">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <div className="min-h-screen">
        <Nav />
        <main id="main-content">
          <header>
            <HeroBanner copy={copy.hero} />
          </header>
          <article>
            <WhatIsAgentBuildersClub copy={copy.what} />
          </article>
          <article>
            <WaysToEngage copy={copy.ways} />
          </article>
          <article>
            <CommunitySpotlight copy={copy.spotlight} />
          </article>
          <article>
            <ForAgents copy={copy.agents} />
          </article>
          <article>
            <Founders copy={copy.founders} />
          </article>
          <article id="faq">
            <FAQ copy={copy.faq} />
          </article>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
