"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubscribeFormClient } from "@/components/newsletter/subscribe-form-client";
import { newsletterUiCopy, translateIssue } from "@/components/newsletter/i18n";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import type { ParagraphBlock } from "@/lib/newsletter";

const ease = [0.25, 0.1, 0.25, 1] as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  };
}

function renderParagraph(segments: ParagraphBlock["segments"]) {
  return segments.map((seg, j) => {
    switch (seg.type) {
      case "bold":
        return <strong key={j} className="font-bold text-claw-text">{seg.content}</strong>;
      case "code":
        return <code key={j} className="font-mono text-sm text-claw-text bg-claw-surface px-1.5 py-0.5">{seg.content}</code>;
      case "link":
        return (
          <a
            key={j}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-claw-orange hover:underline"
          >
            {seg.content}
          </a>
        );
      default:
        return <span key={j}>{seg.content}</span>;
    }
  });
}

interface IssueSummary {
  slug: string;
  number: number;
  date: string;
  from: string;
  subject: string;
  body: ParagraphBlock[];
  nextNode: { title: string; venue: string; rsvpUrl: string } | null;
  signature: string;
  signatureTitle: string;
}

interface PastIssue {
  slug: string;
  number: number;
  date: string;
  subject: string;
}

interface NewsletterClientProps {
  latest: IssueSummary;
  pastIssues: PastIssue[];
}

export function NewsletterClient({ latest, pastIssues }: NewsletterClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = newsletterUiCopy[locale];
  const localizedLatest = translateIssue(latest, locale);
  const localizedPastIssues = pastIssues.map((issue) => translateIssue(issue, locale));

  return (
    <>
      {/* Latest Issue */}
      <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...stagger(0)} className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-claw-orange border border-claw-orange/30 bg-claw-orange/5 px-3 py-1">
              {copy.issue} {localizedLatest.number} — {localizedLatest.date}
            </span>
          </motion.div>

          <motion.p {...stagger(1)} className="font-mono text-xs text-claw-dim mb-2">
            {localizedLatest.from}
          </motion.p>
          <motion.h2 {...stagger(2)} className="font-display text-2xl md:text-4xl tracking-wider text-claw-text mb-10">
            {localizedLatest.subject}
          </motion.h2>

          <div className="space-y-5">
            {localizedLatest.body.map((block, i) => (
              <motion.p
                key={i}
                {...stagger(i + 3)}
                className="text-base text-claw-muted leading-relaxed"
              >
                {renderParagraph(block.segments)}
              </motion.p>
            ))}
          </div>

          {localizedLatest.nextNode && (
            <motion.div
              {...stagger(localizedLatest.body.length + 3)}
              className="mt-12 border border-claw-orange/30 bg-claw-orange/5 px-6 py-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-2">
                {copy.nextNode}
              </p>
              <p className="font-display text-xl text-claw-text mb-1">
                {localizedLatest.nextNode.title}
              </p>
              <p className="font-mono text-sm text-claw-dim mb-4">
                {localizedLatest.nextNode.venue}
              </p>
              <a
                href={localizedLatest.nextNode.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-claw-orange hover:underline"
              >
                {copy.rsvp}
              </a>
            </motion.div>
          )}

          <motion.div {...stagger(localizedLatest.body.length + 4)} className="mt-12 pt-8 border-t border-claw-border">
            <p className="font-display text-xl text-claw-text">{localizedLatest.signature}</p>
            <p className="font-mono text-xs text-claw-dim mt-1">
              {localizedLatest.signatureTitle}
            </p>
          </motion.div>

          <motion.div {...stagger(localizedLatest.body.length + 5)} className="mt-6">
            <Link
              href={withLocale(`/newsletter/${localizedLatest.slug}`, locale)}
              className="font-mono text-xs text-claw-dim hover:text-claw-orange transition-colors"
            >
              {copy.readFull}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Subscribe */}
      <SubscribeSectionClient />

      {/* Past Issues */}
      {pastIssues.length > 0 && (
        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-8">
              {copy.pastIssues}
            </motion.p>
            <div className="space-y-4">
              {localizedPastIssues.map((issue, i) => (
                <motion.div key={issue.slug} {...stagger(i + 1)}>
                  <Link
                    href={withLocale(`/newsletter/${issue.slug}`, locale)}
                    className="border border-claw-border px-6 py-4 flex items-center justify-between hover:border-claw-border-hover transition-colors"
                  >
                    <div>
                      <p className="font-mono text-[10px] text-claw-orange uppercase tracking-widest mb-1">
                        {copy.issue} {issue.number} — {issue.date}
                      </p>
                      <p className="text-sm text-claw-muted">{issue.subject}</p>
                    </div>
                    <span className="font-mono text-xs text-claw-dim">{copy.read}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SubscribeSectionClient() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = newsletterUiCopy[locale];

  return (
    <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2 {...stagger(0)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-4">
          {copy.subscribeHeading}
        </motion.h2>
        <motion.p {...stagger(1)} className="text-base text-claw-muted mb-8">
          {copy.subscribeText}
        </motion.p>
        <SubscribeFormClient />
      </div>
    </section>
  );
}
