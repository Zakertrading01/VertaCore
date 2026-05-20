import "server-only";

type Level = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: Level;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

function log(level: Level, message: string, data?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "production") {
    console[level === "debug" ? "log" : level](JSON.stringify(entry));
  } else {
    const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]`;
    console[level === "debug" ? "log" : level](prefix, message, data ?? "");
  }
}

export const logger = {
  info: (message: string, data?: Record<string, unknown>) =>
    log("info", message, data),
  warn: (message: string, data?: Record<string, unknown>) =>
    log("warn", message, data),
  error: (message: string, data?: Record<string, unknown>) =>
    log("error", message, data),
  debug: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== "production") log("debug", message, data);
  },
};
