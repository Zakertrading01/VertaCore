import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf, sanitiseText, sanitiseMultiline } from '@/lib/security'
import { db } from '@/lib/db'
import { revalidateCatalogueItem } from '@/lib/revalidate'

export const dynamic = 'force-dynamic'

const UpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  categoryGroup: z.string().min(1).max(100).optional(),
  image: z.string().max(500).nullable().optional(),
  certTags: z.array(z.string().max(100)).optional(),
  brandName: z.string().max(100).nullable().optional(),
  datasheetUrl: z.string().max(500).nullable().optional(),
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { id } = await params
  const item = await db.catalogueItem.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  return NextResponse.json(item)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  const existing = await db.catalogueItem.findUnique({ where: { id } })
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

  const item = await db.catalogueItem.update({
    where: { id },
    data: {
      ...(d.name !== undefined && { name: sanitiseText(d.name) }),
      ...(d.description !== undefined && { description: d.description ? sanitiseMultiline(d.description) : null }),
      ...(d.categoryGroup !== undefined && { categoryGroup: sanitiseText(d.categoryGroup) }),
      ...(d.image !== undefined && { image: d.image }),
      ...(d.certTags !== undefined && { certTags: d.certTags }),
      ...(d.brandName !== undefined && { brandName: d.brandName ? sanitiseText(d.brandName) : null }),
      ...(d.datasheetUrl !== undefined && { datasheetUrl: d.datasheetUrl }),
      ...(d.order !== undefined && { order: d.order }),
      ...(d.published !== undefined && { published: d.published }),
    },
  })

  revalidateCatalogueItem()

  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const { id } = await params

  const existing = await db.catalogueItem.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  await db.catalogueItem.delete({ where: { id } })
  revalidateCatalogueItem()

  return NextResponse.json({ success: true })
}
