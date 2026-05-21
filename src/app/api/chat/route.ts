import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { runChat, hashIp } from "@/lib/ai";
import { sanitiseText } from "@/lib/security";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";
import { DEFAULT_SYSTEM_PROMPT } from "@/lib/ai-config";

export const dynamic = "force-dynamic";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(500),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: NextRequest) {
  const apiKey = process.env.AI_API_KEY ?? "";
  const provider = process.env.AI_PROVIDER ?? "anthropic";
  const model = process.env.AI_MODEL ?? "claude-haiku-4-5-20251001";

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "AI assistant is currently offline." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const { allowed } = rateLimit(`chat:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid message format." }, { status: 422 });
  }

  const { messages } = parsed.data;

  try {
    // Build system prompt with live catalogue context
    const catalogueItems = await db.catalogueItem.findMany({
      where: { published: true },
      take: 50,
      orderBy: { order: "asc" },
      select: { name: true, description: true, categoryGroup: true, certTags: true },
    });

    const solutions = await db.solution.findMany({
      where: { published: true },
      select: { title: true, subtitle: true, features: true },
    });

    const catalogueContext = [
      "## Current Solutions",
      ...solutions.map(
        (s) =>
          `**${s.title}**: ${s.subtitle}\n  ${s.features.map((f) => `- ${f}`).join("\n  ")}`,
      ),
      "",
      "## Current Catalogue Items",
      ...["Safety & PPE", "Welding", "Lifting & Rigging", "Abrasives", "Industrial Tools"].flatMap(
        (cat) => {
          const items = catalogueItems.filter((i) => i.categoryGroup === cat);
          if (items.length === 0) return [];
          return [
            `**${cat}**`,
            ...items.map(
              (i) =>
                `- ${i.name}${i.description ? `: ${i.description}` : ""}${i.certTags.length ? ` [${i.certTags.join(", ")}]` : ""}`,
            ),
          ];
        },
      ),
    ].join("\n");

    const systemPrompt = [DEFAULT_SYSTEM_PROMPT, catalogueContext].join("\n\n");

    const sanitisedMessages = messages.map((m) => ({
      role: m.role,
      content: sanitiseText(m.content),
    }));

    const result = await runChat(sanitisedMessages, systemPrompt, provider, model, apiKey);

    // Log (fire and forget)
    db.aIChatLog
      .create({
        data: {
          ipHash: hashIp(ip),
          messages: JSON.stringify(messages),
          provider: result.provider,
          model: result.model,
        },
      })
      .catch((err) => logger.error("AI log failed", { error: String(err) }));

    return NextResponse.json({ reply: result.reply });
  } catch (err) {
    logger.error("AI chat error", { error: String(err) });
    return NextResponse.json(
      { success: false, error: "The AI assistant encountered an error. Please try again." },
      { status: 500 },
    );
  }
}
