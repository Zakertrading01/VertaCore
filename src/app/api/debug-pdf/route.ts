import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateCataloguePDF } from "@/lib/catalogue-pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await db.catalogueItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true, description: true, categoryGroup: true, image: true, certTags: true, brandName: true, datasheetUrl: true },
  });

  const buf = await generateCataloguePDF(items);
  const content = buf.toString("binary");

  const dct = (content.match(/DCTDecode/g) || []).length;
  const imgObjs = (content.match(/\/Subtype \/Image/g) || []).length;

  // Also return the PDF directly so we can open it
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return new NextResponse(ab as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=debug.pdf",
      "X-Debug-Bytes": buf.byteLength.toString(),
      "X-Debug-DCT": dct.toString(),
      "X-Debug-Images": imgObjs.toString(),
      "Cache-Control": "no-store",
    },
  });
}
