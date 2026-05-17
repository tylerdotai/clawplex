"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { newsletterUiCopy } from "@/components/newsletter/i18n";
import { defaultLocale, getLocaleFromPathname } from "@/lib/i18n/config";

export function SubscribeFormClient() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = newsletterUiCopy[locale];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(copy.success);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(copy.error);
      }
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-claw-border bg-claw-surface p-6 font-mono text-sm text-claw-text">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex flex-col gap-0 sm:flex-row">
        <input
          type="email"
          aria-label={copy.emailLabel}
          placeholder={copy.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
          className="flex-1 border border-claw-border bg-claw-surface px-5 py-4 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "..." : copy.subscribe}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-left font-mono text-xs text-red-500">{message}</p>
      )}
    </form>
  );
}
