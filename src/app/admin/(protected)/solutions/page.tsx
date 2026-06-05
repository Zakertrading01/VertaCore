'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  order: number
  published: boolean
  itemCount: number
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

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/solutions')
    if (res.ok) {
      const data = await res.json()
      setCategories(data)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])



  return (
    <div className="px-4 sm:px-8 py-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Solutions</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage catalogue solutions. Solution names map to items on the public catalogue page.</p>
        </div>
        <Link
          href="/admin/solutions/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Solution
        </Link>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
        </div>
      )}

      {/* Mobile View List (sm:hidden) */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-neutral-400 bg-white rounded-xl border border-neutral-200">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-neutral-200">
            <p className="text-neutral-400 mb-3">No solutions yet.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-50 flex items-center justify-center text-xl border border-neutral-100">
                    {cat.icon || '📦'}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{cat.name}</h3>
                    <p className="text-xs text-neutral-500 font-mono">{cat.slug}</p>
                  </div>
                </div>
                <Badge published={cat.published} />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-b border-neutral-50 my-3">
                <div className="text-center flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1">Items</p>
                  <p className="text-sm font-bold text-navy">{cat.itemCount}</p>
                </div>
                <div className="w-px h-6 bg-neutral-100" />
                <div className="text-center flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1">Order</p>
                  <p className="text-sm font-bold text-neutral-700">{cat.order}</p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/admin/solutions/${cat.id}/edit`)}
                className="w-full py-2.5 bg-neutral-50 text-navy text-sm font-bold rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors"
              >
                Edit Solution
              </button>
            </div>
          ))
        )}
      </div>

      {/* Desktop View Table (hidden sm:block) */}
      <div className="hidden sm:block bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-neutral-400">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-400 mb-3">No solutions yet.</p>
            <Link href="/admin/solutions/new" className="text-sm text-gold font-semibold hover:underline">Create your first solution →</Link>
          </div>
        ) : (
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs hidden lg:table-cell">Slug</th>
                <th className="text-center px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Items</th>
                <th className="text-center px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs hidden md:table-cell">Order</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs">Status</th>
                <th className="w-24 px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {cat.icon && <span className="text-lg">{cat.icon}</span>}
                      <div>
                        <p className="font-semibold text-neutral-900">{cat.name}</p>
                        {cat.description && <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{cat.description}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-neutral-500 font-mono text-xs hidden lg:table-cell">{cat.slug}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${cat.itemCount > 0 ? 'bg-navy text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                      {cat.itemCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-neutral-500 hidden md:table-cell">{cat.order}</td>
                  <td className="px-5 py-4"><Badge published={cat.published} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/solutions/${cat.id}/edit`)}
                        className="px-3 py-1.5 text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg hover:border-navy hover:text-navy transition-colors"
                      >
                        Edit
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
