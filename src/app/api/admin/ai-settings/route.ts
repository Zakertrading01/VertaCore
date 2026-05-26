import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkCsrf } from '@/lib/security'
import { db } from '@/lib/db'
import { encryptApiKey, decryptApiKey, maskApiKey } from '@/lib/ai'

export const dynamic = 'force-dynamic'

export async function GET() {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const setting = await db.aISetting.findFirst()

  if (!setting) {
    return NextResponse.json({
      provider: 'anthropic',
      model: 'claude-haiku-4-5-20251001',
      apiKeyMasked: '',
      systemPrompt: '',
      enabled: false,
    })
  }

  const plain = setting.apiKeyEnc ? decryptApiKey(setting.apiKeyEnc) : ''
  return NextResponse.json({
    id: setting.id,
    provider: setting.provider,
    model: setting.model,
    apiKeyMasked: plain ? maskApiKey(plain) : '',
    systemPrompt: setting.systemPrompt,
    enabled: setting.enabled,
  })
}

const UpdateSchema = z.object({
  provider: z.string().min(1).max(50).optional(),
  model: z.string().min(1).max(100).optional(),
  apiKey: z.string().max(500).optional(),
  systemPrompt: z.string().max(10000).optional(),
  enabled: z.boolean().optional(),
})

export async function PUT(req: NextRequest) {
  let session
  try { session = await auth() } catch { /* JWTSessionError or stale cookie */ }
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', details: parsed.error.flatten() }, { status: 422 })
  }

  const d = parsed.data
  const existing = await db.aISetting.findFirst()

  const data: Record<string, unknown> = {}
  if (d.provider !== undefined) data.provider = d.provider
  if (d.model !== undefined) data.model = d.model
  if (d.systemPrompt !== undefined) data.systemPrompt = d.systemPrompt
  if (d.enabled !== undefined) data.enabled = d.enabled
  if (d.apiKey) data.apiKeyEnc = encryptApiKey(d.apiKey)

  let setting
  if (existing) {
    setting = await db.aISetting.update({ where: { id: existing.id }, data })
  } else {
    setting = await db.aISetting.create({
      data: {
        provider: (d.provider ?? 'anthropic'),
        model: (d.model ?? 'claude-haiku-4-5-20251001'),
        systemPrompt: (d.systemPrompt ?? ''),
        enabled: (d.enabled ?? false),
        apiKeyEnc: d.apiKey ? encryptApiKey(d.apiKey) : '',
      },
    })
  }

  const plain = setting.apiKeyEnc ? decryptApiKey(setting.apiKeyEnc) : ''
  return NextResponse.json({
    id: setting.id,
    provider: setting.provider,
    model: setting.model,
    apiKeyMasked: plain ? maskApiKey(plain) : '',
    systemPrompt: setting.systemPrompt,
    enabled: setting.enabled,
  })
}
