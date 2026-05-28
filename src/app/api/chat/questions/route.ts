import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await db.aISetting.findFirst();
    const isEnabled = settings ? settings.enabled : !!process.env.AI_API_KEY;

    const questions = await db.aIQuestion.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: 'asc' }
    });

    const mappedQuestions = questions.map(q => ({
      id: q.id,
      text: q.text,
      answer: q.answer
    }));

    return NextResponse.json({
      enabled: isEnabled,
      questions: mappedQuestions,
    });
  } catch (error) {
    return NextResponse.json({ enabled: false, questions: [] });
  }
}
