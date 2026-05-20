import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const setting = await db.aISetting.findFirst();
    const questions = await db.aIQuestion.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, text: true, answer: true },
    });

    return NextResponse.json({
      enabled: setting?.enabled ?? false,
      questions,
    });
  } catch {
    return NextResponse.json({ enabled: false, questions: [] });
  }
}
