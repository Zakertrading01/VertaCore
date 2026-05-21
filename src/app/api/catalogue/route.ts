import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email(),
  company: z.string().max(200).optional(),
  pdfId: z.string().optional(),
});

export async function POST(request: NextRequest) {
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

  const { email, company, pdfId } = parsed.data;

  try {
    const cataloguePDF = pdfId
      ? await db.cataloguePDF.findFirst({ where: { id: pdfId, published: true } })
      : await db.cataloguePDF.findFirst({ where: { published: true }, orderBy: { createdAt: "desc" } });

    if (!cataloguePDF) {
      return NextResponse.json(
        { success: false, error: "Catalogue PDF not available." },
        { status: 404 },
      );
    }

    await db.cataloguePDFDownload.create({
      data: {
        catPDFId: cataloguePDF.id,
        email: email.toLowerCase().trim(),
        company: company ?? null,
      },
    });

    await db.cataloguePDF.update({
      where: { id: cataloguePDF.id },
      data: { downloads: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: { downloadUrl: cataloguePDF.fileUrl },
    });
  } catch (err) {
    logger.error("Catalogue PDF download failed", { error: String(err) });
    return NextResponse.json(
      { success: false, error: "Failed. Please try again." },
      { status: 500 },
    );
  }
}

// GET: redirect to PDF URL if pdfId provided
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pdfId = searchParams.get("pdfId");

  const cataloguePDF = pdfId
    ? await db.cataloguePDF.findFirst({ where: { id: pdfId, published: true } })
    : await db.cataloguePDF.findFirst({ where: { published: true }, orderBy: { createdAt: "desc" } });

  if (!cataloguePDF) {
    return NextResponse.json({ success: false, error: "Not found." }, { status: 404 });
  }

  return NextResponse.redirect(cataloguePDF.fileUrl);
}
