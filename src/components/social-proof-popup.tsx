"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const HERMES_NAMES = [
  "Tonia", "Dre", "Amit", "Anjal", "Ashok", "Balaje", "Benjamin", "Cece",
  "Chen", "Doug", "Gautam", "Hemal", "Jake", "Jasper", "Jonathon", "Jrb",
  "Justin", "Keerthi", "Lavakar", "Leonid", "Mike", "Nathan", "Neel",
  "Patrick", "Priyanka", "Raja", "Raj", "Ramesh", "Rashmi", "Reid",
  "Rohit", "Sam", "Sanjay", "Sean", "Shashank", "Siddharth", "Sneha",
  "Sriram", "Steve", "Sumesh", "Suri", "Tau", "Thomas", "Tiana", "Tim",
  "Tomas", "Tony", "Tuan", "Ty", "Uday", "Val", "Vikram", "Vince", "Will",
  "Win", "Yash", "Yong", "Zach",
];

const POPUP_MINIMUM = 3;

function hasMinimumHeroes(heroCount: number): boolean {
  return heroCount >= POPUP_MINIMUM;
}

export function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const count = useMemo(() => Math.floor(Math.random() * 12) + 5, []);
  const heroes = useMemo(
    () =>
      [...HERMES_NAMES]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .join(", "),
    [count],
  );

  useEffect(() => {
    const id = setTimeout(() => {
      if (!sessionStorage.getItem("clawpopupdismissed")) setVisible(true);
    }, 22000);
    return () => clearTimeout(id);
  }, []);

  function dismiss() {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("clawpopupdismissed", "1");
  }

  if (!visible || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-5 right-5 z-50 max-w-xs rounded-2xl border border-claw-border bg-claw-surface shadow-2xl shadow-black/50 overflow-hidden"
        >
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#4ADE80", "#60A5FA", "#F472B6"].map((c, i) => (
                    <div
                      key={c}
                      className="h-6 w-6 rounded-full border-2 border-claw-surface"
                      style={{ backgroundColor: c, zIndex: 3 - i }}
                    />
                  ))}
                </div>
                <span className="text-[13px] text-claw-muted leading-snug">
                  {hasMinimumHeroes(count)
                    ? `${count} DFW AI builders`
                    : "A few DFW AI builders"}
                </span>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full p-1 text-claw-dim hover:text-claw-text transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 3l8 8m0-8L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="mt-3 text-[14px] text-claw-text leading-snug">
              are being honest about what they&apos;re shipping in{" "}
              <span className="font-medium">DFW AI Builders ⭢</span>
            </p>
            <div className="mt-2">
              <span className="text-[12px] text-claw-dim leading-relaxed">
                {heroes.slice(0, 68)}
                {heroes.length > 68 ? "…" : ""}
              </span>
            </div>
          </div>
          <div className="border-t border-claw-border px-5 py-3 flex gap-3">
            <Link
              href="/events"
              className="flex-1 rounded-full bg-claw-blue py-2 text-center text-[12px] font-medium text-claw-void hover:bg-claw-blue-light transition-colors"
            >
              See who&apos;s meeting
            </Link>
            <Link
              href="/community"
              className="flex-1 rounded-full border border-claw-border bg-claw-surface-2 py-2 text-center text-[12px] text-claw-muted hover:text-claw-text transition-colors"
            >
              Join the crew
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
