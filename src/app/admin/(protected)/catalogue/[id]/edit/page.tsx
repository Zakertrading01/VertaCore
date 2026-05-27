'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageUploader } from '@/components/admin/ImageUploader'

interface Category {
  id: string
  name: string
  published: boolean
}

const CERT_SUGGESTIONS = [
  'CE', 'EN ISO 20345', 'EN 397', 'ANSI Z87.1', 'ANSI Z89.1',
  'EN 388', 'EN 374', 'EN 471', 'EN 14116', 'ISO 9001',
  'ASME B30', 'EN 818', 'EN 13414', 'oSa', 'MPA',
]

export default function EditCatalogueItemPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [certInput, setCertInput] = useState('')

  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryGroup: '',
    images: [] as string[],
    certTags: [] as string[],
    brandName: '',
    datasheetUrl: '',
    order: '0',
    published: true,
  })

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  useEffect(() => {
    async function load() {
      const [itemRes, catRes] = await Promise.all([
        fetch(`/api/admin/catalogue/${id}`),
        fetch('/api/admin/categories'),
      ])
      if (!itemRes.ok) { setLoading(false); return }

      const [item, cats] = await Promise.all([itemRes.json(), catRes.ok ? catRes.json() : []])

      setCategories(cats.filter((c: Category) => c.published))
      setForm({
        name: item.name,
        description: item.description ?? '',
        categoryGroup: item.categoryGroup,
        images: item.image ? [item.image] : [],
        certTags: item.certTags ?? [],
        brandName: item.brandName ?? '',
        datasheetUrl: item.datasheetUrl ?? '',
        order: String(item.order),
        published: item.published,
      })
      setLoading(false)
    }
    load()
  }, [id])

  function addCert() {
    const tag = certInput.trim()
    if (!tag || form.certTags.includes(tag)) { setCertInput(''); return }
    set('certTags', [...form.certTags, tag])
    setCertInput('')
  }

  function removeCert(tag: string) {
    set('certTags', form.certTags.filter((t) => t !== tag))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const res = await fetch(`/api/admin/catalogue/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description || null,
        categoryGroup: form.categoryGroup,
        image: form.images[0] ?? null,
        certTags: form.certTags,
        brandName: form.brandName || null,
        datasheetUrl: form.datasheetUrl || null,
        order: parseInt(form.order, 10) || 0,
        published: form.published,
      }),
    })

    const data = await res.json().catch(() => ({}))
    setSaving(false)

    if (!res.ok) {
      setError(data.error ?? 'Failed to save.')
      return
    }

    router.push('/admin/catalogue/')
    router.refresh()
  }

  const selectedCategory = categories.find((c) => c.name === form.categoryGroup)

  if (loading) return <div className="px-8 py-8 text-sm text-neutral-400">Loading…</div>

  return (
    <div className="px-4 sm:px-8 py-8 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/catalogue/" className="text-neutral-400 hover:text-neutral-700 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Catalogue Item</h1>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Basic Info ── */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Basic Info</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">{form.published ? 'Published' : 'Draft'}</span>
              <button
                type="button"
                onClick={() => set('published', !form.published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? 'bg-emerald-500' : 'bg-neutral-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={200}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Solution <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.categoryGroup}
              onChange={(e) => set('categoryGroup', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-neutral-900"
            >
              <option value="">Select a solution…</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
              {/* Show current value even if not in published categories */}
              {form.categoryGroup && !categories.find((c) => c.name === form.categoryGroup) && (
                <option value={form.categoryGroup}>{form.categoryGroup} (unpublished)</option>
              )}
            </select>
          </div>

          {/* Brand + Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Brand Name</label>
              <input
                type="text"
                maxLength={100}
                value={form.brandName}
                onChange={(e) => set('brandName', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Sort Order</label>
              <input
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => set('order', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Description</label>
            <textarea
              maxLength={2000}
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none text-neutral-900"
            />
          </div>

          {/* Datasheet URL */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Datasheet URL</label>
            <input
              type="url"
              maxLength={500}
              value={form.datasheetUrl}
              onChange={(e) => set('datasheetUrl', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
            />
          </div>
        </div>

        {/* ── Image ── */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Product Image</h2>
          <ImageUploader
            images={form.images}
            onChange={(imgs) => set('images', imgs)}
            folder={selectedCategory ? `catalogue/${selectedCategory.name.toLowerCase().replace(/\s+/g, '-')}` : 'catalogue'}
            maxImages={1}
          />
        </div>

        {/* ── Certifications ── */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Certifications</h2>

          {form.certTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {form.certTags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-lg">
                  {tag}
                  <button type="button" onClick={() => removeCert(tag)} className="text-navy/50 hover:text-navy ml-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCert() } }}
                placeholder="Type a cert tag…"
                list="cert-suggestions-edit"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
              />
              <datalist id="cert-suggestions-edit">
                {CERT_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
              </datalist>
            </div>
            <button
              type="button"
              onClick={addCert}
              className="px-4 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || !form.name || !form.categoryGroup}
            className="px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/catalogue/" className="px-6 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
