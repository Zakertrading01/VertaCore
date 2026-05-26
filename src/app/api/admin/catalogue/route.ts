import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf, sanitiseText, sanitiseMultiline } from '@/lib/security'
import { db } from '@/lib/db'
import { revalidateCatalogueItem } from '@/lib/revalidate'

export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  categoryGroup: z.string().min(1).max(100),
  image: z.string().max(500).optional(),
  certTags: z.array(z.string().max(100)).default([]),
  brandName: z.string().max(100).optional(),
  datasheetUrl: z.string().max(500).optional(),
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const items = await db.catalogueItem.findMany({
    where: category ? { categoryGroup: category } : undefined,
    orderBy: [{ categoryGroup: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  })

  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', details: parsed.error.flatten() }, { status: 422 })
  }

  const d = parsed.data

  const item = await db.catalogueItem.create({
    data: {
      name: sanitiseText(d.name),
      description: d.description ? sanitiseMultiline(d.description) : null,
      categoryGroup: sanitiseText(d.categoryGroup),
      image: d.image ?? null,
      certTags: d.certTags,
      brandName: d.brandName ? sanitiseText(d.brandName) : null,
      datasheetUrl: d.datasheetUrl ?? null,
      order: d.order ?? 0,
      published: d.published ?? true,
    },
  })

  revalidateCatalogueItem()

  return NextResponse.json(item, { status: 201 })
}
