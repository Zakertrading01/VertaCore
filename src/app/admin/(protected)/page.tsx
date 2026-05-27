import { db } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [
      totalCatalogueItems,
      publishedItems,
      totalCategories,
      totalAIQuestions,
    ] = await Promise.all([
      db.catalogueItem.count(),
      db.catalogueItem.count({ where: { published: true } }),
      db.category.count(),
      db.aIQuestion.count(),
    ])

    return { totalCatalogueItems, publishedItems, totalCategories, totalAIQuestions }
  } catch {
    return { totalCatalogueItems: 0, publishedItems: 0, totalCategories: 0, totalAIQuestions: 0 }
  }
}

async function getRecentCatalogueItems() {
  try {
    return await db.catalogueItem.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        categoryGroup: true,
        published: true,
        createdAt: true,
      },
    })
  } catch {
    return []
  }
}

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentCatalogueItems()])

  const statCards = [
    { label: 'Total Catalogue Items', value: stats.totalCatalogueItems },
    { label: 'Published Items', value: stats.publishedItems },
    { label: 'Total Categories', value: stats.totalCategories },
    { label: 'AI Questions', value: stats.totalAIQuestions },
  ]

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-navy-dark">Dashboard</h1>
        <p className="text-base text-gray-500 mt-1">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <div
            key={card.label}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              {card.label}
            </p>
            <p className="text-3xl font-bold text-navy-dark">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-dark">Recent Catalogue Items</h2>
          <Link href="/admin/catalogue" className="text-sm text-gold hover:text-gold/80 font-medium transition-colors">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="px-6 py-10 text-sm text-gray-400 text-center">
            No items yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Name</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Date Added</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-navy-dark">{item.name}</td>
                    <td className="px-6 py-4 text-gray-500">{item.categoryGroup}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.createdAt.toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-semibold
                                       ${item.published ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-600'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
