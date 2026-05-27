'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditCategoryPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itemCount, setItemCount] = useState(0)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    order: '0',
    published: true,
  })

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  useEffect(() => {
    async function load() {
      const [catRes, allRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/categories'),
      ])
      if (!catRes.ok) { setLoading(false); return }
      const categories = await catRes.json()
      const cat = categories.find((c: { id: string }) => c.id === id)
      if (!cat) { setLoading(false); return }
      setForm({
        name: cat.name,
        slug: cat.slug,
        description: cat.description ?? '',
        icon: cat.icon ?? '',
        order: String(cat.order),
        published: cat.published,
      })
      setItemCount(cat.itemCount ?? 0)
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description || undefined,
        icon: form.icon || undefined,
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

    router.push('/admin/categories/')
    router.refresh()
  }

  if (loading) {
    return <div className="px-8 py-8 text-sm text-neutral-400">Loading…</div>
  }

  return (
    <div className="px-4 sm:px-8 py-8 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/categories/" className="text-neutral-400 hover:text-neutral-700 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Edit Solution</h1>
          {itemCount > 0 && (
            <p className="text-xs text-neutral-400 mt-0.5">{itemCount} catalogue item{itemCount !== 1 ? 's' : ''} in this solution</p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">

          {/* Status toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <p className="text-sm font-semibold text-neutral-700">Status</p>
              <p className="text-xs text-neutral-400 mt-0.5">{form.published ? 'Visible in dropdowns' : 'Hidden from dropdowns'}</p>
            </div>
            <button
              type="button"
              onClick={() => set('published', !form.published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? 'bg-emerald-500' : 'bg-neutral-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
            />
            {itemCount > 0 && (
              <p className="text-xs text-amber-600 mt-1">⚠ Renaming will update the grouping on the public catalogue page for all {itemCount} linked item{itemCount !== 1 ? 's' : ''}.</p>
            )}
          </div>

          {/* Slug (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Slug (read-only)</label>
            <input
              type="text"
              readOnly
              value={form.slug}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm font-mono bg-neutral-50 text-neutral-600 cursor-not-allowed"
            />
          </div>

          {/* Icon + Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Icon (emoji)</label>
              <input
                type="text"
                maxLength={10}
                value={form.icon}
                onChange={(e) => set('icon', e.target.value)}
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
              maxLength={500}
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none text-neutral-900"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/categories/" className="px-6 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
