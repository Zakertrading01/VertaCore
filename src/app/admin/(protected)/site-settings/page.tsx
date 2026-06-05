import { SiteSettingsClient } from '@/components/admin/SiteSettingsClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Site Settings — Admin' }

export default function SiteSettingsPage() {
  return <SiteSettingsClient />
}
