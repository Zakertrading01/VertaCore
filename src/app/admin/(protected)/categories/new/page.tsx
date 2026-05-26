'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function NewCategoryPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name, slug: slugify(name) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || slugify(form.name),
        description: form.description || undefined,
        icon: form.icon || undefined,
        order: parseInt(form.order, 10) || 0,
        published: form.published,
      }),
    })

    const data = await res.json().catch(() => ({}))
    setSaving(false)

    if (!res.ok) {
      setError(data.error ?? 'Failed to create category.')
      return
    }

    router.push('/admin/categories/')
    router.refresh()
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
        <h1 className="text-2xl font-bold text-neutral-900">New Category</h1>
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
              <p className="text-xs text-neutral-400 mt-0.5">Published categories appear in dropdowns when editing catalogue items.</p>
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
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Safety &amp; PPE"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
            />
            <p className="text-xs text-neutral-400 mt-1">This exact name is used to group items on the public catalogue page.</p>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Slug</label>
            <input
              type="text"
              maxLength={100}
              value={form.slug}
              onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="safety-ppe"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-neutral-900"
            />
            <p className="text-xs text-neutral-400 mt-1">Auto-generated from name. Lowercase, numbers, hyphens only.</p>
          </div>

          {/* Icon + Order row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Icon (emoji)</label>
              <input
                type="text"
                maxLength={10}
                value={form.icon}
                onChange={(e) => set('icon', e.target.value)}
                placeholder="🔧"
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
              placeholder="Brief description of what this category covers…"
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
            {saving ? 'Creating…' : 'Create Category'}
          </button>
          <Link href="/admin/categories/" className="px-6 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
