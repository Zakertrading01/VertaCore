import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getStats() {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  try {
    const [
      totalRFQ,
      newRFQ,
      todayRFQ,
      weekRFQ,
      totalContact,
      newContact,
    ] = await Promise.all([
      db.rFQ.count(),
      db.rFQ.count({ where: { status: 'NEW' } }),
      db.rFQ.count({ where: { createdAt: { gte: today } } }),
      db.rFQ.count({ where: { createdAt: { gte: weekAgo } } }),
      db.contactInquiry.count(),
      db.contactInquiry.count({ where: { read: false } }),
    ])

    return { totalRFQ, newRFQ, todayRFQ, weekRFQ, totalContact, newContact }
  } catch {
    return { totalRFQ: 0, newRFQ: 0, todayRFQ: 0, weekRFQ: 0, totalContact: 0, newContact: 0 }
  }
}

async function getRecentRFQ() {
  try {
    return await db.rFQ.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        company: true,
        country: true,
        status: true,
        createdAt: true,
      },
    })
  } catch {
    return []
  }
}

const STATUS_CLASSES: Record<string, string> = {
  NEW: 'bg-red-50 text-red-600 font-semibold',
  REVIEWING: 'bg-gold/10 text-gold-muted font-semibold',
  QUOTED: 'bg-blue-50 text-blue-600 font-semibold',
  ACCEPTED: 'bg-green-50 text-green-600 font-semibold',
  DECLINED: 'bg-gray-100 text-gray-600 font-semibold',
}

const STATUS_LABELS: Record<string, string> = {
  NEW: 'New',
  REVIEWING: 'Reviewing',
  QUOTED: 'Quoted',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
}

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentRFQ()])

  const statCards = [
    { label: 'Unread RFQs', value: stats.newRFQ, urgent: stats.newRFQ > 0 },
    { label: 'RFQs Today', value: stats.todayRFQ },
    { label: 'RFQs This Week', value: stats.weekRFQ },
    { label: 'Unread Messages', value: stats.newContact, urgent: stats.newContact > 0 },
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
            <p className={`text-3xl font-bold ${card.urgent ? 'text-red-600' : 'text-navy-dark'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-dark">Recent RFQ Submissions</h2>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
            View all →
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="px-6 py-10 text-sm text-gray-400 text-center">
            No submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Company</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Country</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Date</th>
                  <th scope="col" className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-navy-dark">{sub.company}</td>
                    <td className="px-6 py-4 text-gray-500">{sub.country ?? 'Unknown'}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {sub.createdAt.toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full
                                       ${STATUS_CLASSES[sub.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {STATUS_LABELS[sub.status] ?? sub.status}
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
