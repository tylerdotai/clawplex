"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { home as copy } from "@/lib/dict";

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

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date("2025-10-01T09:00:00-05:00").getTime();
    function tick() {
      const diff = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid grid-cols-4 gap-3">
      {copy.countdown.map((item) => (
        <div key={item.key} className="flex flex-col items-center border border-claw-border px-3 py-2">
          <span className="font-display text-2xl text-claw-text tabular-nums">
            {String(time[item.key as keyof typeof time]).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-claw-muted mt-0.5">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function NewsletterForm(_p: unknown) { return null; } // stub kept for compat
export function HomeClient() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-claw-border px-5 md:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5">
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1 {...stagger(1)} className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[0.97] tracking-tight text-claw-text">
              {copy.hero.titleLine1}<br />
              <span className="underline-accent">{copy.hero.titleLine2Prefix}</span>{" "}
              <span className="underline-accent">{copy.hero.titleLine2Accent}</span>
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-6 text-base sm:text-lg text-claw-muted leading-relaxed max-w-xl">
              {copy.hero.body}
            </motion.p>
            <motion.div {...stagger(3)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/events" className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 font-mono text-sm font-medium text-claw-void hover:bg-claw-blue-light transition-colors">
                {copy.hero.rsvp}
              </Link>
              <a href="https://discord.gg/q8kEquTu3z" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-claw-muted hover:text-claw-text transition-colors">
                {copy.hero.discord}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 2h8v8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </a>
            </motion.div>
          </div>
          <div>
            <motion.div {...stagger(2)} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-claw-border">
              <Image src="/hero.png" alt={copy.hero.imageAlt} fill className="object-cover" priority />
            </motion.div>
            <motion.p {...stagger(3)} className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-claw-dim text-right">
              {copy.hero.caption}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────── */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <motion.p {...stagger(0)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-claw-blue/60" />
              {copy.what.eyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-tight text-claw-text">
              {copy.what.titleLine1}<br /><span className="underline-accent">{copy.what.titleAccent}</span>
            </motion.h2>
            <div className="mt-8 space-y-5 text-base text-claw-muted leading-[1.7]">
              {copy.what.paragraphs.map((p, i) => (
                <motion.p key={i} {...stagger(i + 2)}>{p}</motion.p>
              ))}
            </div>
            <motion.div {...stagger(4)} className="mt-9 flex flex-wrap gap-2">
              {copy.what.tags.map((tag) => (
                <span key={tag} className="border border-claw-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.div {...stagger(5)} className="mt-10">
              <Link href="/events" className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 font-mono text-sm font-medium text-claw-void hover:bg-claw-blue-light transition-colors">
                {copy.what.ship}
              </Link>
            </motion.div>
          </div>
          <div>
            <motion.div {...stagger(0)} className="space-y-6">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border">
                {copy.what.facts.map((fact) => (
                  <div key={fact.label} className="bg-claw-surface px-4 py-5 text-center">
                    <dt className="font-display text-3xl text-claw-blue leading-none">{fact.value}</dt>
                    <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-claw-muted">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Ways to Get Involved ────────────────────────────────────── */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p {...stagger(0)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-14 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.ways.eyebrow}
          </motion.p>
          <div className="border-t border-claw-border">
            {copy.ways.items.map((item, i) => (
              <motion.div key={item.num} {...stagger(i + 1)} className="border-b border-claw-border">
                <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-3 items-start py-9 md:py-11">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-display text-4xl md:text-5xl text-claw-dim/60 tabular-nums">{item.num}</span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-claw-blue mb-2">{item.label}</p>
                    <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-claw-text mb-2">{item.title}</h3>
                    <p className="text-[15px] text-claw-muted leading-[1.6] max-w-prose mb-4">{item.desc}</p>
                    <Link href={item.href}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-claw-blue hover:underline">
                      {item.cta} →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Spotlight ─────────────────────────────────────── */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p {...stagger(0)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.spotlight.eyebrow}
          </motion.p>
          <motion.div {...stagger(1)} className="flex items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-tight text-claw-text">
              {copy.spotlight.titlePrefix}{" "}
              <span className="underline-accent">{copy.spotlight.titleAccent}</span>
            </h2>
            <Link href="/projects" className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-claw-blue hover:underline">
              {copy.spotlight.explore} →
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.spotlight.items.map((item, i) => (
              <motion.a key={item.name} href={item.href} target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined} {...stagger(i + 2)}
                className="group border border-claw-border hover:border-claw-blue/50 transition-colors">
                <div className="border-b border-claw-border px-6 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-blue mb-2">{item.tag}</p>
                  <h3 className="font-display text-xl sm:text-2xl tracking-tight text-claw-text group-hover:text-claw-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-0.5">
                    {copy.spotlight.by} {item.builder}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-claw-muted leading-relaxed">{item.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-claw-blue group-hover:underline">
                    {copy.spotlight.visit}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Humans ───────────────────────────────────────────────── */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p {...stagger(0)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.founders.eyebrow}
          </motion.p>
          <motion.h2 {...stagger(1)} className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-tight text-claw-text mb-12">
            {copy.founders.titlePrefix} <span className="underline-accent">Humans</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border">
            {copy.founders.people.map((person, i) => (
              <motion.div key={person.name} {...stagger(i + 2)} className="bg-claw-surface p-7 sm:p-8 flex gap-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-claw-border">
                  <Image src={person.image} alt={person.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl tracking-tight text-claw-text">{person.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-muted mt-0.5 mb-3">{person.role}</p>
                  <div className="flex gap-3">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer"
                      aria-label={copy.founders.ariaLinkedIn(person.name)}
                      className="font-mono text-[10px] uppercase tracking-widest text-claw-dim hover:text-claw-blue transition-colors">
                      LI
                    </a>
                    <a href={person.x} target="_blank" rel="noopener noreferrer"
                      aria-label={copy.founders.ariaX(person.name)}
                      className="font-mono text-[10px] uppercase tracking-widest text-claw-dim hover:text-claw-blue transition-colors">
                      X
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.p {...stagger(0)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.faq.eyebrow}
          </motion.p>
          <motion.h2 {...stagger(1)} className="font-display text-3xl sm:text-4xl tracking-tight text-claw-text mb-3">
            {copy.faq.titlePrefix} <span className="underline-accent">{copy.faq.titleAccent}</span>
          </motion.h2>
          <motion.p {...stagger(2)} className="text-base text-claw-muted mb-12">{copy.faq.body}</motion.p>
          <dl className="space-y-0 border-t border-claw-border">
            {copy.faq.items.map((item, i) => (
              <motion.div key={item.q} {...stagger(i + 3)} className="border-b border-claw-border py-7">
                <dt className="font-display text-lg sm:text-xl tracking-tight text-claw-text">{item.q}</dt>
                <dd className="mt-2 text-[15px] text-claw-muted leading-[1.65]">{item.a}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
