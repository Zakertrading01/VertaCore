'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  DashboardIcon,
  CatalogueIcon,
  CategoriesIcon,
  RFQIcon,
  ContactIcon,
  AIIcon,
  SiteSettingsIcon,
} from './Icons'

const ICON_MAP: Record<string, React.ElementType> = {
  DashboardIcon,
  CatalogueIcon,
  CategoriesIcon,
  RFQIcon,
  ContactIcon,
  AIIcon,
  SiteSettingsIcon,
}

interface NavItem {
  label: string
  href: string
  iconKey: string
}

interface MobileNavProps {
  items: NavItem[]
  userEmail: string
  onLogout: () => Promise<void>
}

export function MobileNav({ items, userEmail, onLogout }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-navy border-b border-white/10 flex items-center justify-between px-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">VERTA CORE</span>
          <span className="ml-2 text-sm font-bold text-white">ADMIN</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 pt-14">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute top-14 left-0 bottom-0 w-72 bg-navy flex flex-col">
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {items.map((item) => {
                const Icon = ICON_MAP[item.iconKey] || DashboardIcon
                const isActive = pathname === item.href || (item.href !== '/admin/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                      isActive
                        ? 'bg-gold text-navy-dark'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span className={isActive ? 'text-navy-dark' : 'text-white/30'}>
                      <Icon />
                    </span>
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <p className="text-xs text-white/40 mb-3 px-2 truncate">{userEmail}</p>
              <form action={onLogout}>
                <button
                  type="submit"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold bg-white/5 text-white/40 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for top bar */}
      <div className="h-14" />
    </div>
  )
}
