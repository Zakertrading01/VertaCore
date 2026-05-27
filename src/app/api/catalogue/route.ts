import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { generateCataloguePDF } from "@/lib/catalogue-pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await db.catalogueItem.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        categoryGroup: true,
        image: true,
        certTags: true,
        brandName: true,
        datasheetUrl: true,
      },
    });

    if (items.length === 0) {
      return NextResponse.json({ error: "No catalogue items available." }, { status: 404 });
    }

    const buf = await generateCataloguePDF(items);
    const filename = `vertacore-catalogue-${new Date().getFullYear()}.pdf`;
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

    return new NextResponse(ab as ArrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    logger.error("Catalogue PDF generation failed", { error: String(err) });
    return NextResponse.json({ error: "Failed to generate catalogue." }, { status: 500 });
  }
}
