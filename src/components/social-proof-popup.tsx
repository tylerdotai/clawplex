"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const HERMES_NAMES = [
  "Tonia", "Dre", "Amit", "Anjal", "Ashok", "Balaje", "Benjamin", "Cece",
  "Chen", "Doug", "Gautam", "Hemal", "Jake", "Jasper", "Jonathon", "Jrb",
  "Justin", "Keerthi", "Lavakar", "Leonid", "Mike", "Nathan", "Neel",
  "Neeraj", "Qianru", "Rak", "Robinson", "Rodney", "Ruben", "Ryan",
  "Thomas", "Usman", "Yael",
];

const CLAUDE_NAMES = [
  "Allen", "Altansukh", "Amit", "Anjal", "Balaje", "Cece", "Cerissa",
  "Geramie", "Justin", "Karim", "Keerthi", "Kevin", "Kirubakaran", "Leah",
  "Marc", "Matt", "Melody", "Mike", "Morgan", "Nathan", "Neeraj", "Olu",
  "Robinson", "Shaun", "Shravan", "Sidney", "Stephanie", "Thomas", "Tyler",
  "Usman", "Vaibhav", "Vivek",
];

type Entry = { name: string; event: "hermes" | "claude" };

function buildShuffledEntries(): Entry[] {
  const all: Entry[] = [
    ...HERMES_NAMES.map((name) => ({ name, event: "hermes" as const })),
    ...CLAUDE_NAMES.map((name) => ({ name, event: "claude" as const })),
  ];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

const STORAGE_KEY = "abc:social-proof-dismissed";
const DISMISS_HOURS = 6;
const INITIAL_DELAY_MS = 3500;
const VISIBLE_MS = 5500;
const GAP_MS = 6000;
const MAX_NOTIFICATIONS = 8;

function isDismissedRecently(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_HOURS * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function SocialProofPopup() {
  const entries = useMemo(() => buildShuffledEntries(), []);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);
  const [shown, setShown] = useState(0);

  const persistedDismissed = useSyncExternalStore(
    () => () => {},
    () => isDismissedRecently(),
    () => false
  );
  const dismissed = persistedDismissed || manuallyDismissed;

  const eventCopy = useMemo(() => ({
    action: "just RSVP'd to",
    ago: "a few minutes ago",
    close: "Dismiss",
    hermes: "Hermes Agent",
    claude: "Claude, OpenAI & the Tools",
  }), []);

  useEffect(() => {
    if (dismissed) return;
    if (shown >= MAX_NOTIFICATIONS) return;

    const showDelay = shown === 0 ? INITIAL_DELAY_MS : GAP_MS;
    const showTimer = window.setTimeout(() => setVisible(true), showDelay);
    const hideTimer = window.setTimeout(
      () => {
        setVisible(false);
        setIndex((i) => (i + 1) % entries.length);
        setShown((s) => s + 1);
      },
      showDelay + VISIBLE_MS
    );

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [dismissed, shown, entries.length]);

  function handleDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setManuallyDismissed(true);
    setVisible(false);
  }

  if (dismissed) return null;

  const current = entries[index];
  const eventTitle =
    current.event === "hermes" ? eventCopy.hermes : eventCopy.claude;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-3 left-3 z-40 sm:bottom-5 sm:left-5"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key={`${index}-${current.name}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto"
          >
            <Link
              href="/events"
              className="group flex items-center gap-2 max-w-[230px] sm:max-w-[300px] rounded-full border border-border bg-surface/95 backdrop-blur-md shadow-lg shadow-black/40 px-3 py-2 sm:px-3.5 sm:py-2.5 hover:bg-surface-2 transition-colors"
            >
              <span
                aria-hidden="true"
                className="relative flex h-1.5 w-1.5 shrink-0"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red" />
              </span>
              <span className="flex flex-col leading-tight min-w-0">
                <span className="text-[10.5px] sm:text-[11.5px] text-text truncate">
                  <span className="font-semibold">{current.name}</span>{" "}
                  <span className="text-muted">{eventCopy.action}</span>{" "}
                  <span className="text-accent">{eventTitle}</span>
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.16em] text-dim">
                  {eventCopy.ago}
                </span>
              </span>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label={eventCopy.close}
                className="ml-0.5 shrink-0 rounded-full p-1 text-dim hover:text-text hover:bg-surface transition-colors cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2.5 2.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
