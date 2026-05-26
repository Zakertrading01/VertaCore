import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf } from '@/lib/security'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const questions = await db.aIQuestion.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  })

  return NextResponse.json(questions)
}

const CreateSchema = z.object({
  text: z.string().min(1).max(200),
  answer: z.string().max(1000).nullable().optional(),
  sortOrder: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', details: parsed.error.flatten() }, { status: 422 })
  }

  const d = parsed.data
  const question = await db.aIQuestion.create({
    data: {
      text: d.text.trim(),
      answer: d.answer?.trim() || null,
      sortOrder: d.sortOrder ?? 0,
      enabled: d.enabled ?? true,
    },
  })

  return NextResponse.json(question, { status: 201 })
}
