import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkCsrf } from '@/lib/security'
import { uploadFile, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/lib/r2'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  if (!checkCsrf(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string | null) ?? 'catalogue'

  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 })

  if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG, and WebP images are allowed.' }, { status: 422 })
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: 'Image must be under 10 MB.' }, { status: 422 })
  }

  const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const key = `${folder}/${Date.now()}-${cleanName}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const publicUrl = await uploadFile(key, buffer, file.type)

  return NextResponse.json({ key, publicUrl }, { status: 201 })
}
