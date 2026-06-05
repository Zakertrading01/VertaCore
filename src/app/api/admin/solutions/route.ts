import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf, sanitiseText, slugify } from '@/lib/security'
import { db } from '@/lib/db'
import { revalidateSolutions } from '@/lib/revalidate'

export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only').optional(),
  description: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const categories = await db.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
  })

  // Attach catalogue item counts by matching categoryGroup to name
  const names = categories.map((c) => c.name)
  const counts = await db.catalogueItem.groupBy({
    by: ['categoryGroup'],
    where: { categoryGroup: { in: names } },
    _count: { id: true },
  })
  const countMap = Object.fromEntries(counts.map((c) => [c.categoryGroup, c._count.id]))

  return NextResponse.json(
    categories.map((c) => ({ ...c, itemCount: countMap[c.name] ?? 0 }))
  )
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
  const name = sanitiseText(d.name)
  const slug = d.slug ?? slugify(name)

  const existing = await db.category.findFirst({ where: { OR: [{ name }, { slug }] } })
  if (existing) {
    return NextResponse.json({ error: 'A category with this name or slug already exists.' }, { status: 409 })
  }

  const category = await db.category.create({
    data: {
      name,
      slug,
      description: d.description ? sanitiseText(d.description) : null,
      icon: d.icon ? sanitiseText(d.icon) : null,
      order: d.order ?? 0,
      published: d.published ?? true,
    },
  })

  revalidateSolutions()

  return NextResponse.json(category, { status: 201 })
}
