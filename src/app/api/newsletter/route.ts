import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`newsletter:${ip}`, 3, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const { email } = parsed.data;

  try {
    await db.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {},
      create: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    logger.error("Newsletter subscription failed", { error: String(err) });
    return NextResponse.json(
      { success: false, error: "Subscription failed. Please try again." },
      { status: 500 },
    );
  }
}
