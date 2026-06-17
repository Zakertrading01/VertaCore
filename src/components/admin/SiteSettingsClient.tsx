'use client'

import { useEffect, useState, useCallback } from 'react'

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {msg}
    </div>
  )
}

interface ConfirmDialogProps {
  toValue: boolean
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({ toValue, onConfirm, onCancel }: ConfirmDialogProps) {
  const isLive = !toValue
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${isLive ? 'bg-green-100' : 'bg-amber-100'}`}>
          {isLive ? '🌐' : '🔧'}
        </div>
        <h2 className="text-lg font-bold text-neutral-900 text-center mb-1">
          {isLive ? 'Switch to Live Homepage?' : 'Enable Maintenance Mode?'}
        </h2>
        <p className="text-sm text-neutral-500 text-center mb-6 leading-relaxed">
          {isLive
            ? 'The real homepage will be shown to all visitors immediately.'
            : 'The maintenance page will be shown to all visitors immediately.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${isLive ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}`}
          >
            {isLive ? 'Yes, Go Live' : 'Yes, Maintenance'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function SiteSettingsClient() {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean | null>(null)
  const [showSocials, setShowSocials] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)
  const [savingSocials, setSavingSocials] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [pending, setPending] = useState<boolean | null>(null)

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/site-settings')
      .then(r => r.json())
      .then(d => {
        setMaintenanceMode(d.maintenanceMode ?? true)
        setShowSocials(d.showSocials ?? true)
      })
      .catch(() => {
        setMaintenanceMode(true)
        setShowSocials(true)
      })
  }, [])

  async function save(value: boolean) {
    setSaving(true)
    setPending(null)
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenanceMode: value }),
      })
      if (!res.ok) throw new Error()
      setMaintenanceMode(value)
      showToast(value ? 'Maintenance mode enabled' : 'Live mode enabled — site is now public')
    } catch {
      showToast('Failed to save. Try again.', false)
    } finally {
      setSaving(false)
    }
  }

  async function saveSocials(next: boolean) {
    if (savingSocials || showSocials === next) return
    setSavingSocials(true)
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showSocials: next }),
      })
      if (!res.ok) throw new Error()
      setShowSocials(next)
      showToast(next ? 'Social icons are now visible' : 'Social icons are now hidden')
    } catch {
      showToast('Failed to save. Try again.', false)
    } finally {
      setSavingSocials(false)
    }
  }

  function requestChange(value: boolean) {
    if (saving || maintenanceMode === value) return
    setPending(value)
  }

  if (maintenanceMode === null || showSocials === null) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-neutral-200 animate-pulse rounded" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl">
      {toast && <Toast msg={toast.msg} ok={toast.ok} />}

      {pending !== null && (
        <ConfirmDialog
          toValue={pending}
          onConfirm={() => save(pending)}
          onCancel={() => setPending(null)}
        />
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Site Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Control which page visitors see on the homepage.</p>
      </div>

      {/* Status Banner */}
      <div className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-semibold text-sm ${maintenanceMode ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-green-400 bg-green-50 text-green-800'}`}>
        <span className={`h-3 w-3 rounded-full flex-shrink-0 ${maintenanceMode ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`} />
        {maintenanceMode
          ? 'Currently showing: Maintenance Page'
          : 'Currently showing: Live Homepage'}
      </div>

      {/* Homepage Mode Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => requestChange(true)}
          disabled={saving || maintenanceMode === true}
          className={`relative text-left p-5 rounded-xl border-2 transition-all ${maintenanceMode ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-neutral-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'} disabled:cursor-default`}
        >
          {maintenanceMode && (
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-white px-2 py-0.5 rounded-full">Active</span>
          )}
          <p className="font-bold text-neutral-900 text-base">Maintenance Mode</p>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Show the maintenance page. Visitors see "Something Great is Coming" screen.</p>
        </button>

        <button
          onClick={() => requestChange(false)}
          disabled={saving || maintenanceMode === false}
          className={`relative text-left p-5 rounded-xl border-2 transition-all ${!maintenanceMode ? 'border-green-400 bg-green-50 shadow-md' : 'border-neutral-200 bg-white hover:border-green-300 hover:bg-green-50/40'} disabled:cursor-default`}
        >
          {!maintenanceMode && (
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-green-400 text-white px-2 py-0.5 rounded-full">Active</span>
          )}
          <p className="font-bold text-neutral-900 text-base">Live Homepage</p>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Show the full website. Visitors see the real homepage with all sections.</p>
        </button>
      </div>

      {saving && (
        <p className="mt-4 text-sm text-neutral-500 animate-pulse">Saving...</p>
      )}

      {/* Social Media Links Section */}
      <div className="border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Social Media Links</h2>
        <p className="text-sm text-neutral-500 mb-6">Show or hide social icons on the hero slider and site footer.</p>

        {/* Status Banner */}
        <div className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-semibold text-sm ${showSocials ? 'border-green-400 bg-green-50 text-green-800' : 'border-neutral-300 bg-neutral-50 text-neutral-600'}`}>
          <span className={`h-3 w-3 rounded-full flex-shrink-0 ${showSocials ? 'bg-green-400' : 'bg-neutral-400'}`} />
          {showSocials ? 'Social links are visible' : 'Social links are hidden'}
        </div>

        {/* Toggle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hide Social Links */}
          <button
            onClick={() => saveSocials(false)}
            disabled={savingSocials || showSocials === false}
            className={`relative text-left p-5 rounded-xl border-2 transition-all ${!showSocials ? 'border-neutral-400 bg-neutral-50 shadow-md' : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/60'} disabled:cursor-default`}
          >
            {!showSocials && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-neutral-500 text-white px-2 py-0.5 rounded-full">Active</span>
            )}
            <p className="font-bold text-neutral-900 text-base">Hide Social Links</p>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Remove Facebook, LinkedIn, YouTube and Instagram icons from the hero and footer.</p>
          </button>

          {/* Show Social Links */}
          <button
            onClick={() => saveSocials(true)}
            disabled={savingSocials || showSocials === true}
            className={`relative text-left p-5 rounded-xl border-2 transition-all ${showSocials ? 'border-green-400 bg-green-50 shadow-md' : 'border-neutral-200 bg-white hover:border-green-300 hover:bg-green-50/40'} disabled:cursor-default`}
          >
            {showSocials && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-green-400 text-white px-2 py-0.5 rounded-full">Active</span>
            )}
            <p className="font-bold text-neutral-900 text-base">Show Social Links</p>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Display Facebook, LinkedIn, YouTube and Instagram icons on the hero and footer.</p>
          </button>
        </div>

        {savingSocials && (
          <p className="mt-4 text-sm text-neutral-500 animate-pulse">Saving...</p>
        )}
      </div>
    </div>
  )
}
