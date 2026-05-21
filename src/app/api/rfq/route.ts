import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { generateRFQNumber } from "@/lib/rfq";
import { sendRFQNotification, sendRFQConfirmation } from "@/lib/email";
import { sanitiseText, sanitiseMultiline } from "@/lib/security";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const rfqSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(200),
  jobTitle: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  country: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  items: z.string().min(5).max(2000),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`rfq:${ip}`, 5, 60_000);

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

  const parsed = rfqSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed.";
    return NextResponse.json({ success: false, error: firstError }, { status: 422 });
  }

  const data = parsed.data;

  try {
    const rfqNumber = await generateRFQNumber();

    const rfq = await db.rFQ.create({
      data: {
        rfqNumber,
        firstName: sanitiseText(data.firstName),
        lastName: sanitiseText(data.lastName),
        email: data.email.toLowerCase().trim(),
        company: sanitiseText(data.company),
        jobTitle: data.jobTitle ? sanitiseText(data.jobTitle) : null,
        phone: data.phone ? sanitiseText(data.phone) : null,
        country: data.country ? sanitiseText(data.country) : null,
        industry: data.industry ? sanitiseText(data.industry) : null,
        items: sanitiseMultiline(data.items),
        message: data.message ? sanitiseMultiline(data.message) : null,
        source: data.source ?? null,
      },
    });

    // Fire and forget — don't fail the user if email has issues
    const emailData = {
      rfqNumber,
      firstName: rfq.firstName,
      lastName: rfq.lastName,
      email: rfq.email,
      company: rfq.company,
      jobTitle: rfq.jobTitle ?? undefined,
      phone: rfq.phone ?? undefined,
      country: rfq.country ?? undefined,
      industry: rfq.industry ?? undefined,
      items: rfq.items,
      message: rfq.message ?? undefined,
    };

    Promise.all([
      sendRFQNotification(emailData).catch((err) =>
        logger.error("RFQ notification email failed", { error: String(err) }),
      ),
      sendRFQConfirmation(emailData).catch((err) =>
        logger.error("RFQ confirmation email failed", { error: String(err) }),
      ),
    ]);

    logger.info("RFQ created", { rfqNumber, company: rfq.company });

    return NextResponse.json({
      success: true,
      message: "RFQ submitted successfully.",
      data: { rfqNumber },
    });
  } catch (err) {
    logger.error("RFQ creation failed", { error: String(err) });
    return NextResponse.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
