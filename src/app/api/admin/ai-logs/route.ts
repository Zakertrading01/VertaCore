import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const skip = (page - 1) * PAGE_SIZE

  const [logs, total] = await Promise.all([
    db.aIChatLog.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
    }),
    db.aIChatLog.count(),
  ])

  return NextResponse.json({ logs, total, page, pageSize: PAGE_SIZE })
}
