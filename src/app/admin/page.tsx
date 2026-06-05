import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from './LoginForm'

import { ParticleBackground } from '@/components/shared/ParticleBackground'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Login | VERTACORE',
  robots: { index: false, follow: false },
}

const BULLETS = [
  {
    label: 'Manage products & categories',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: 'Upload images & datasheets to R2',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    label: 'Review RFQ & contact submissions',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    label: 'Publish changes with instant cache refresh',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
]

export default async function AdminLoginPage() {
  let session = null
  try {
    session = await auth()
  } catch {
    // Stale or undecryptable cookie — middleware already deleted it from the
    // browser response. Just render the login form on this request.
  }
  if (session) redirect('/admin/dashboard')

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden hidden lg:flex lg:w-2/5 flex-col justify-between bg-[#061022] px-10 py-10 border-r border-white/10 shadow-[20px_0_40px_-10px_rgba(0,0,0,0.3)]">
        
        {/* Animated Premium Background: Abstract Liquid Aurora + Grid */}
        <style>{`
          @keyframes aurora-1 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.5; }
            50% { transform: translate(-50px, 100px) scale(1.5) rotate(45deg); opacity: 0.8; }
          }
          @keyframes aurora-2 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
            50% { transform: translate(100px, -50px) scale(1.2) rotate(-30deg); opacity: 0.7; }
          }
          @keyframes grid-slide {
            0% { transform: translateY(0); }
            100% { transform: translateY(40px); }
          }
        `}</style>
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Base gradient sweep */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061022] via-[#0b1b33] to-[#040a17]" />
          
          {/* Liquid Aurora Orbs */}
          <div 
            className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)] blur-[60px]"
            style={{ animation: 'aurora-1 25s ease-in-out infinite' }}
          />
          <div 
            className="absolute -bottom-1/4 -left-1/4 w-[120%] h-[120%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.12)_0%,transparent_50%)] blur-[80px]"
            style={{ animation: 'aurora-2 30s ease-in-out infinite reverse' }}
          />

          {/* Isometric Tech Grid */}
          <div 
            className="absolute inset-[-100%] opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              animation: 'grid-slide 15s linear infinite',
              transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
              transformOrigin: 'top center'
            }}
          />
          
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#061022_120%)]" />
        </div>
        <Link href="/" className="relative z-10">
          <Image
            src="/image.png"
            alt="VERTACORE"
            width={160}
            height={64}
            className="object-contain object-left cursor-pointer"
            priority
          />
        </Link>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Industrial Solutions,<br />
            <span className="text-gold">fully under control.</span>
          </h1>
          <p className="text-white/80 text-sm mb-10 leading-relaxed max-w-xs">
            The admin portal for managing Vertacore&apos;s product catalogue,
            media assets, and customer enquiries.
          </p>

          <ul className="space-y-4">
            {BULLETS.map(({ label, icon }) => (
              <li key={label} className="flex items-center gap-3 text-white text-sm">
                <span className="text-gold">{icon}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/50 text-xs relative z-10 pointer-events-none">
          © {new Date().getFullYear()} Vertacore. Internal use only.
        </p>
      </div>

      {/* ── Right panel — light bg + floating card ─────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Floating form card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

            {/* Gold accent bar */}
            <div className="h-1.5 bg-gold" />

            <div className="px-8 py-8">

              {/* Mobile logo — shown when left panel is hidden */}
              <div className="mb-6 lg:hidden">
                <Link href="/">
                  <Image
                    src="/image.png"
                    alt="VERTACORE"
                    width={130}
                    height={52}
                    className="object-contain object-left cursor-pointer"
                    priority
                  />
                </Link>
              </div>

              <h2 className="text-2xl font-bold text-navy-dark mb-1">Welcome back</h2>
              <p className="text-sm text-gray-500 mb-7">
                Sign in to your admin account to continue.
              </p>

              <LoginForm />
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
