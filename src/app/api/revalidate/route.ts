import { NextRequest, NextResponse } from "next/server";
import {
  revalidateSolution,
  revalidateIndustry,
  revalidateCatalogueItem,
  revalidateProject,
  revalidateCertification,
  revalidateBrand,
  revalidateInsight,
} from "@/lib/revalidate";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const { entity, slug } = body as { entity: string; slug?: string };

  try {
    switch (entity) {
      case "solution":
        if (slug) revalidateSolution(slug);
        break;
      case "industry":
        if (slug) revalidateIndustry(slug);
        break;
      case "catalogue":
        revalidateCatalogueItem();
        break;
      case "project":
        if (slug) revalidateProject(slug);
        break;
      case "certification":
        revalidateCertification();
        break;
      case "brand":
        if (slug) revalidateBrand(slug);
        break;
      case "insight":
        if (slug) revalidateInsight(slug);
        break;
      default:
        return NextResponse.json({ success: false, error: "Unknown entity." }, { status: 400 });
    }

    logger.info("ISR cache revalidated", { entity, slug });
    return NextResponse.json({ success: true, revalidated: true });
  } catch (err) {
    logger.error("Revalidation failed", { error: String(err) });
    return NextResponse.json(
      { success: false, error: "Revalidation failed." },
      { status: 500 },
    );
  }
}
