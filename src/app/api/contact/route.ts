import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";
import { sanitiseText, sanitiseMultiline } from "@/lib/security";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(3000),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`contact:${ip}`, 10, 60_000);

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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed.";
    return NextResponse.json({ success: false, error: firstError }, { status: 422 });
  }

  const data = parsed.data;

  try {
    const inquiry = await db.contactInquiry.create({
      data: {
        name: sanitiseText(data.name),
        email: data.email.toLowerCase().trim(),
        company: data.company ? sanitiseText(data.company) : null,
        phone: data.phone ? sanitiseText(data.phone) : null,
        subject: sanitiseText(data.subject),
        message: sanitiseMultiline(data.message),
      },
    });

    // Send notification to admin (Sales)
    await sendContactNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    // Send confirmation to user
    await sendContactConfirmation({
      name: data.name,
      email: data.email,
      subject: data.subject,
    }).catch((err) => logger.error("User contact confirmation failed", { error: String(err) }));

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    logger.error("Contact submission error", { error: String(err) });
    const errorMessage = err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
