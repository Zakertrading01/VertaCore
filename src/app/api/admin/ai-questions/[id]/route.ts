import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf } from '@/lib/security'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const UpdateSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  answer: z.string().max(1000).nullable().optional(),
  sortOrder: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', details: parsed.error.flatten() }, { status: 422 })
  }

  const existing = await db.aIQuestion.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  const d = parsed.data
  const question = await db.aIQuestion.update({
    where: { id },
    data: {
      ...(d.text !== undefined && { text: d.text.trim() }),
      ...(d.answer !== undefined && { answer: d.answer?.trim() || null }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
      ...(d.enabled !== undefined && { enabled: d.enabled }),
    },
  })

  return NextResponse.json(question)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  const existing = await db.aIQuestion.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  await db.aIQuestion.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
