'use client'

import React, { useState, type ReactNode, createContext, useContext, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    DashboardIcon,
    CatalogueIcon,
    ProductsIcon,
    CategoriesIcon,
    RFQIcon,
    ContactIcon,
    AIIcon,
} from './Icons'

const ICON_MAP: Record<string, React.ElementType> = {
    DashboardIcon,
    CatalogueIcon,
    ProductsIcon,
    CategoriesIcon,
    RFQIcon,
    ContactIcon,
    AIIcon,
}

interface NavItem {
    label: string
    href: string
    iconKey: string
}

interface AdminLayoutWrapperProps {
    children: ReactNode
    items: NavItem[]
    userEmail: string
    onLogout: () => Promise<void>
}

interface SidebarContextType {
    isCollapsed: boolean
    setIsCollapsed: (collapsed: boolean) => void
    isDetailOpen: boolean
    setIsDetailOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}

export function AdminLayoutWrapper({
    children,
    items,
    userEmail,
    onLogout
}: AdminLayoutWrapperProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const pathname = usePathname()

    // Reset detail state when navigating between pages
    useEffect(() => {
        setIsDetailOpen(false)
    }, [pathname])

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isDetailOpen, setIsDetailOpen }}>
            <div className="min-h-screen bg-neutral-100">
                {/* Desktop Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 bg-navy flex flex-col hidden lg:flex transition-all duration-300 ease-in-out border-r border-white/10",
                        isCollapsed ? "w-20" : "w-80"
                    )}
                >
                    {/* Sidebar Header */}
                    <div className={cn(
                        "px-6 py-6 border-b border-white/10 flex items-center transition-all duration-300",
                        isCollapsed ? "justify-center px-0" : "justify-between"
                    )}>
                        {!isCollapsed && (
                            <div className="overflow-hidden whitespace-nowrap pl-1">
                                <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">VERTACORE</p>
                                <p className="text-lg font-bold text-white tracking-tight">ADMIN <span className="font-normal text-white/60">PORTAL</span></p>
                            </div>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={cn(
                                "p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all",
                                isCollapsed && "mt-2"
                            )}
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            <svg
                                className={cn("w-5 h-5 transition-transform duration-300", isCollapsed ? "rotate-180" : "rotate-0")}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-4 space-y-2 overflow-x-hidden custom-scrollbar">
                        {items.map((item) => {
                            const Icon = ICON_MAP[item.iconKey] || DashboardIcon
                            const isActive = pathname === item.href || (item.href !== '/admin/' && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-semibold transition-all group relative",
                                        isActive
                                            ? "bg-gold text-navy-dark shadow-lg shadow-gold/20"
                                            : "text-white/50 hover:text-white hover:bg-white/5",
                                        isCollapsed ? "justify-center px-0 mx-2" : ""
                                    )}
                                >
                                    <span className={cn(
                                        "shrink-0 transition-colors",
                                        isActive ? "text-navy-dark" : "text-white/30 group-hover:text-gold"
                                    )}>
                                        <Icon />
                                    </span>
                                    {!isCollapsed && (
                                        <span className="whitespace-nowrap transition-opacity duration-300">
                                            {item.label}
                                        </span>
                                    )}
                                    {/* Active Indicator Pin */}
                                    {isActive && isCollapsed && (
                                        <div className="absolute left-0 w-1 h-6 bg-gold rounded-r-full" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className={cn(
                        "p-4 border-t border-white/10 transition-all duration-300 overflow-hidden",
                        isCollapsed ? "px-2" : "px-4"
                    )}>
                        {!isCollapsed && (
                            <div className="mb-4 px-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-1">Signed in as</p>
                                <p className="text-sm font-medium text-white/70 truncate">{userEmail}</p>
                            </div>
                        )}
                        <form action={onLogout}>
                            <button
                                type="submit"
                                className={cn(
                                    "flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all",
                                    "bg-white/5 text-white/40 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20",
                                    isCollapsed ? "justify-center" : ""
                                )}
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                {!isCollapsed && <span>Logout</span>}
                            </button>
                        </form>
                    </div>
                </aside>

                {/* Content wrapper with dynamic padding */}
                <div
                    className={cn(
                        "min-h-screen transition-all duration-300 ease-in-out",
                        isCollapsed ? "lg:pl-20" : "lg:pl-80",
                        isDetailOpen ? "lg:pr-[512px]" : "lg:pr-0"
                    )}
                >
                    <main className="min-h-screen">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}
