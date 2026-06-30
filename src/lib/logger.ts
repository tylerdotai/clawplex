/**
 * Flume standard logger — replaces all console.* calls.
 * Errors always print; info/debug silenced in production.
 */
const PREFIX = "[abc]";

function fmt(level: string, label: string, msg: string, data?: unknown): string {
  const ts = new Date().toISOString().slice(11, 23);
  const tag = `[${ts}] [${level}] [${label}]`;
  return data !== undefined ? `${tag} ${msg} ${JSON.stringify(data)}` : `${tag} ${msg}`;
}

function canLog(level: string): boolean {
  return level === "ERROR" || level === "WARN" || process.env.NODE_ENV !== "production";
}

export const Logger = {
  debug(label: string, message?: string, data?: unknown) {
    if (!canLog("DEBUG")) return;
    console.debug(fmt("DEBUG", label, message ?? label, data));
  },
  info(label: string, message?: string, data?: unknown) {
    if (!canLog("INFO")) return;
    console.info(fmt("INFO", label, message ?? label, data));
  },
  warn(label: string, message?: string, data?: unknown) {
    console.warn(`${PREFIX} ${fmt("WARN", label, message ?? label, data)}`);
  },
  error(label: string, messageOrData?: string | unknown, data?: unknown) {
    const msg = typeof messageOrData === "string" ? messageOrData : String(messageOrData ?? "");
    const extra = typeof messageOrData !== "string" ? messageOrData : data;
    console.error(`${PREFIX} ${fmt("ERROR", label, msg, extra)}`);
  },
};
