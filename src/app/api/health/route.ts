import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "unknown";
const START_TIME = Date.now();

async function checkDatabase(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 3000),
      ),
    ]);
    return { ok: true, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

export async function GET() {
  const db = await checkDatabase();
  const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);
  const isHealthy = db.ok;

  const body = {
    status: isHealthy ? "ok" : "degraded",
    uptime: uptimeSeconds,
    build: BUILD_SHA,
    checks: {
      database: {
        status: db.ok ? "ok" : "unreachable",
        latencyMs: db.latencyMs,
      },
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    status: isHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Type": "application/json",
    },
  });
}
