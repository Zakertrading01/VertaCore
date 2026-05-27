'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CatalogueItem {
  id: string
  name: string
  description: string | null
  categoryGroup: string
  image: string | null
  certTags: string[]
  brandName: string | null
  datasheetUrl: string | null
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

function Badge({ published }: { published: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${published ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export default function CataloguePage() {
  const router = useRouter()
  const [items, setItems] = useState<CatalogueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState('')

  const categories = [...new Set(items.map((i) => i.categoryGroup))].sort()

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/catalogue')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    setError(null)
    const res = await fetch(`/api/admin/catalogue/${id}`, { method: 'DELETE' })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(data.error ?? 'Delete failed.')
    } else {
      await load()
    }
    setDeleting(null)
  }

  const filtered = filterCategory ? items.filter((i) => i.categoryGroup === filterCategory) : items

  return (
    <div className="px-4 sm:px-8 py-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Catalogue</h1>
          <p className="text-sm text-neutral-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/catalogue/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Item
        </Link>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
        </div>
      )}

      {/* Filter */}
      {categories.length > 1 && (
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${!filterCategory ? 'bg-navy text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-navy hover:text-navy'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterCategory === cat ? 'bg-navy text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-navy hover:text-navy'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-neutral-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-400 mb-3">No catalogue items yet.</p>
            <Link href="/admin/catalogue/new" className="text-sm text-gold font-semibold hover:underline">Add your first item →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Item</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs hidden sm:table-cell">Solution</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs hidden md:table-cell">Brand</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-neutral-200 flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-neutral-900">{item.name}</p>
                        {item.certTags.length > 0 && (
                          <div className="flex gap-1 mt-0.5">
                            {item.certTags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[10px] bg-navy/10 text-navy px-1.5 py-0.5 rounded font-medium">{tag}</span>
                            ))}
                            {item.certTags.length > 3 && <span className="text-[10px] text-neutral-400">+{item.certTags.length - 3}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">{item.categoryGroup}</span>
                  </td>
                  <td className="px-5 py-4 text-neutral-500 hidden md:table-cell">{item.brandName ?? '—'}</td>
                  <td className="px-5 py-4"><Badge published={item.published} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/catalogue/${item.id}/edit`)}
                        className="px-3 py-1.5 text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg hover:border-navy hover:text-navy transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={deleting === item.id}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-40"
                      >
                        {deleting === item.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
