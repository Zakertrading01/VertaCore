import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf } from '@/lib/security'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  let session
  try { session = await auth() } catch { /* stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const setting = await db.siteSetting.findFirst()
  return NextResponse.json({
    maintenanceMode: setting?.maintenanceMode ?? true,
    showSocials: setting?.showSocials ?? true,
  })
}

const UpdateSchema = z.object({
  maintenanceMode: z.boolean().optional(),
  showSocials: z.boolean().optional(),
})

export async function PUT(req: NextRequest) {
  let session
  try { session = await auth() } catch { /* stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.' }, { status: 422 })
  }

  const existing = await db.siteSetting.findFirst()
  const setting = existing
    ? await db.siteSetting.update({ where: { id: existing.id }, data: parsed.data })
    : await db.siteSetting.create({ data: { maintenanceMode: true, showSocials: true, ...parsed.data } })

  return NextResponse.json({ maintenanceMode: setting.maintenanceMode, showSocials: setting.showSocials })
}
