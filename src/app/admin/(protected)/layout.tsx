import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { MobileNav } from '@/components/admin/MobileNav'

// Admin layout — server component providing the authentication boundary.
//
// Auth enforcement architecture:
//   Layer 1: middleware.ts — lightweight cookie presence check → redirect to login.
//             This fires on every request before the page renders.
//   Layer 2: THIS LAYOUT — full server-side session verification via auth().
//             auth() validates the JWT signature and expiry.
//             If the cookie is present but the JWT is invalid/expired, auth() returns null.
//             Middleware alone is NOT the auth authority — it is an optimistic redirect shortcut.
//
// Why both layers:
//   Middleware cannot import complex modules (auth.ts uses Prisma which is Node.js-only).
//   Middleware cookie check prevents a full page render for obviously unauthenticated users.
//   The layout auth() check validates the actual session for users who pass middleware.
//
// Dynamic rendering:
//   auth() reads request cookies → Next.js automatically makes this layout dynamic.
//   Admin pages are NEVER statically generated. We add force-dynamic explicitly on
//   individual pages as documentation, but the layout already forces it.
//
// Session expiry:
//   If a session expires during a long admin session, auth() returns null.
//   The redirect to login provides clear feedback rather than a cryptic auth error.
//
// Logout implementation:
//   Server action inside a form element. No client component needed.
//   The browser POSTs the form → server action → signOut() clears the JWT cookie.
//   signOut() with redirectTo navigates to the login page.

// Server action for logout — inline in layout, no separate file needed.
async function handleLogout() {
  'use server'
  await signOut({ redirectTo: '/admin/login' })
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/', iconKey: 'DashboardIcon' },
  { label: 'AI Settings', href: '/admin/ai-settings/', iconKey: 'AIIcon' },
]

import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Full session verification — this is the authoritative auth check.
  // Middleware provides the redirect shortcut but this is the real gate.
  const session = await auth()
  if (!session) redirect('/admin/login')

  const userEmail = session.user?.email ?? 'Admin'

  return (
    <>
      <MobileNav
        items={NAV_ITEMS}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <AdminLayoutWrapper
        items={NAV_ITEMS}
        userEmail={userEmail}
        onLogout={handleLogout}
      >
        {children}
      </AdminLayoutWrapper>
    </>
  )
}
