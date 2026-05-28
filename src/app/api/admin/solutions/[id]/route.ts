import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf, sanitiseText } from '@/lib/security'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const UpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  const existing = await db.category.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', details: parsed.error.flatten() }, { status: 422 })
  }

  const d = parsed.data

  // If name is changing, check uniqueness
  if (d.name && d.name !== existing.name) {
    const conflict = await db.category.findFirst({ where: { name: sanitiseText(d.name), NOT: { id } } })
    if (conflict) return NextResponse.json({ error: 'A category with this name already exists.' }, { status: 409 })
  }

  const updated = await db.category.update({
    where: { id },
    data: {
      ...(d.name !== undefined && { name: sanitiseText(d.name) }),
      ...(d.description !== undefined && { description: sanitiseText(d.description) }),
      ...(d.icon !== undefined && { icon: sanitiseText(d.icon) }),
      ...(d.order !== undefined && { order: d.order }),
      ...(d.published !== undefined && { published: d.published }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  const category = await db.category.findUnique({ where: { id } })
  if (!category) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  const itemCount = await db.catalogueItem.count({ where: { categoryGroup: category.name } })
  if (itemCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${itemCount} catalogue item(s) use this category. Reassign them first.` },
      { status: 409 }
    )
  }

  await db.category.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
