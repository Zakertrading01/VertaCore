'use client'

import { useCallback, useEffect, useState } from 'react'
import { PROVIDER_MODELS, DEFAULT_SYSTEM_PROMPT } from '@/lib/ai-config'

// ---------- types ----------
interface Settings {
  id?: string
  provider: string
  model: string
  apiKeyMasked: string
  systemPrompt: string
  enabled: boolean
}

interface Question {
  id: string
  text: string
  answer?: string | null
  sortOrder: number
  enabled: boolean
}

interface ChatLog {
  id: string
  ipHash: string
  messages: string
  provider: string
  model: string
  createdAt: string
}

type Tab = 'settings' | 'questions' | 'logs'

// ---------- helpers ----------
function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div
      className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-lg shadow-lg text-sm font-medium
        ${ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
      {msg}
    </div>
  )
}

// ---------- main ----------
export function AISettingsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('settings')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="px-4 sm:px-8 py-8 w-full">
      {toast && <Toast msg={toast.msg} ok={toast.ok} />}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">AI Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Configure the AI chat assistant that appears on the public site.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-neutral-200 mb-6">
        {(['settings', 'questions', 'logs'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize rounded-t transition-colors
              ${activeTab === tab
                ? 'border-b-2 border-gold text-gold -mb-px'
                : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            {tab === 'settings' ? 'Configuration' : tab === 'questions' ? 'Quick Questions' : 'Chat Logs'}
          </button>
        ))}
      </div>

      {activeTab === 'settings' && <SettingsTab showToast={showToast} />}
      {activeTab === 'questions' && <QuestionsTab showToast={showToast} />}
      {activeTab === 'logs' && <LogsTab />}
    </div>
  )
}

// ---------- Settings tab ----------
function SettingsTab({ showToast }: { showToast: (m: string, ok?: boolean) => void }) {
  const [settings, setSettings] = useState<Settings>({
    provider: 'anthropic',
    model: 'claude-haiku-4-5-20251001',
    apiKeyMasked: '',
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    enabled: false,
  })
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/ai-settings/')
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized or server error')
        return r.json()
      })
      .then(data => {
        setSettings(data)
        if (!data.systemPrompt) {
          setSettings(s => ({ ...s, systemPrompt: DEFAULT_SYSTEM_PROMPT }))
        }
      })
      .catch(err => {
        console.error('Failed to load AI settings:', err)
        showToast('Failed to load settings (unauthorized or network error)', false)
      })
      .finally(() => setLoading(false))
  }, [showToast])

  const models = PROVIDER_MODELS[settings.provider]?.models ?? []

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/ai-settings/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: settings.provider,
          model: settings.model,
          apiKey: apiKeyInput.trim() || undefined,
          systemPrompt: settings.systemPrompt,
          enabled: settings.enabled,
        }),
      })
      if (res.ok) {
        showToast('Settings saved successfully')
        setApiKeyInput('')
        // Refresh to get updated masked key
        const updated = await fetch('/api/admin/ai-settings/').then(r => r.json())
        setSettings(updated)
      } else {
        const err = await res.json()
        showToast(err.error ?? 'Failed to save settings', false)
      }
    } finally {
      setSaving(false)
    }
  }



  return (
    <div className="space-y-6">
      {/* Enable toggle */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
        <div>
          <p className="text-sm font-medium text-neutral-900">Enable AI Chat Widget</p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Show the &quot;Ask AI&quot; button on all public pages
          </p>
        </div>
        <button
          onClick={() => setSettings(s => ({ ...s, enabled: !s.enabled }))}
          role="switch"
          aria-checked={settings.enabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
            ${settings.enabled ? 'bg-gold' : 'bg-neutral-300'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
              ${settings.enabled ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>

      {/* Provider + Model */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-900">AI Provider</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Provider</label>
            <select
              value={settings.provider}
              onChange={e => {
                const p = e.target.value
                const firstModel = PROVIDER_MODELS[p]?.models[0]?.value ?? ''
                setSettings(s => ({ ...s, provider: p, model: firstModel }))
              }}
              className="w-full text-sm text-black border border-neutral-200 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white"
            >
              {Object.entries(PROVIDER_MODELS).map(([key, val]) => (
                <option key={key} value={key} className="text-black bg-white">{val.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Model</label>
            <select
              value={settings.model}
              onChange={e => setSettings(s => ({ ...s, model: e.target.value }))}
              className="w-full text-sm text-black border border-neutral-200 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white"
            >
              {models.map(m => (
                <option key={m.value} value={m.value} className="text-black bg-white">{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* API Key */}
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            API Key
            {settings.apiKeyMasked && (
              <span className="ml-2 text-neutral-400 font-normal">
                Current: <code className="bg-neutral-100 px-1 rounded text-xs">{settings.apiKeyMasked}</code>
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              placeholder={settings.apiKeyMasked ? 'Leave blank to keep existing key' : 'Enter API key…'}
              autoComplete="off"
              className="w-full text-sm text-black bg-white border border-neutral-200 rounded-lg px-3 py-2 pr-10
                         focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
            <button
              type="button"
              onClick={() => setShowKey(v => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              aria-label={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Stored encrypted (AES-256) in the database. Never exposed to the browser.
          </p>
        </div>
      </div>

      {/* System Prompt */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">System Prompt</h2>
          <button
            type="button"
            onClick={() => setSettings(s => ({ ...s, systemPrompt: DEFAULT_SYSTEM_PROMPT }))}
            className="text-xs text-gold hover:underline"
          >
            Reset to default
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          This is the context document the AI uses to answer questions. It defines Rigman&apos;s
          products, regions, and guidelines. Live product data is automatically appended at query time.
        </p>
        <textarea
          value={settings.systemPrompt}
          onChange={e => setSettings(s => ({ ...s, systemPrompt: e.target.value }))}
          rows={12}
          className="w-full text-sm text-black bg-white border border-neutral-200 rounded-lg px-3 py-2.5 font-mono
                     focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
        />
        <p className="text-xs text-neutral-400">
          {settings.systemPrompt.length} / 10,000 characters
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 bg-gold text-navy-dark text-sm font-medium rounded-lg
                     hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}

// ---------- Questions tab ----------
function QuestionsTab({ showToast }: { showToast: (m: string, ok?: boolean) => void }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [newText, setNewText] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editAnswer, setEditAnswer] = useState('')
  const [generatingAI, setGeneratingAI] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/ai-questions/')
      if (!res.ok) throw new Error('Unauthorized or server error')
      const data = await res.json()
      setQuestions(data)
    } catch (err) {
      console.error('Failed to load AI questions:', err)
      setError(true)
      showToast('Failed to load questions (unauthorized or network error)', false)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => { load() }, [load])

  async function generateAnswerDraft() {
    if (!newText.trim()) return
    setGeneratingAI(true)
    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Write a very short, direct, one-sentence answer (maximum 150 characters) to this question based on the company products or information: "${newText.trim()}"`
          }]
        }),
      })
      const data = await res.json()
      if (res.ok && data.reply) {
        setNewAnswer(data.reply)
        showToast('Draft generated!')
      } else {
        showToast(data.error ?? 'AI is offline or not configured. Enter answer manually.', false)
      }
    } catch (err) {
      console.error('AI generation failed:', err)
      showToast('Failed to generate draft (AI offline)', false)
    } finally {
      setGeneratingAI(false)
    }
  }

  async function addQuestion() {
    if (!newText.trim()) return
    setAdding(true)
    try {
      const res = await fetch('/api/admin/ai-questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newText.trim(),
          answer: newAnswer.trim() || null,
          sortOrder: questions.length
        }),
      })
      if (res.ok) {
        setNewText('')
        setNewAnswer('')
        showToast('Question added')
        await load()
      } else {
        showToast('Failed to add question', false)
      }
    } catch (err) {
      console.error('Failed to add question:', err)
      showToast('Failed to add question (network error)', false)
    } finally {
      setAdding(false)
    }
  }

  async function deleteQuestion(id: string) {
    try {
      const res = await fetch(`/api/admin/ai-questions/${id}/`, { method: 'DELETE' })
      if (res.ok) {
        showToast('Question deleted')
        setQuestions(q => q.filter(x => x.id !== id))
      } else {
        showToast('Failed to delete', false)
      }
    } catch (err) {
      console.error('Failed to delete question:', err)
      showToast('Failed to delete question (network error)', false)
    }
  }

  async function saveEdit(id: string) {
    if (!editText.trim()) return
    try {
      const res = await fetch(`/api/admin/ai-questions/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: editText.trim(),
          answer: editAnswer.trim() || null
        }),
      })
      if (res.ok) {
        showToast('Question updated')
        setEditingId(null)
        await load()
      } else {
        showToast('Failed to update', false)
      }
    } catch (err) {
      console.error('Failed to save edit:', err)
      showToast('Failed to update question (network error)', false)
    }
  }

  async function toggleEnabled(q: Question) {
    try {
      const res = await fetch(`/api/admin/ai-questions/${q.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: q.text, enabled: !q.enabled }),
      })
      if (res.ok) {
        setQuestions(qs => qs.map(x => x.id === q.id ? { ...x, enabled: !x.enabled } : x))
      } else {
        showToast('Failed to update status', false)
      }
    } catch (err) {
      console.error('Failed to toggle status:', err)
      showToast('Failed to update status (network error)', false)
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-500">
        These quick-question chips appear in the chat widget before the user types anything.
        They guide visitors to common questions about certifications, products, and RFQs.
      </p>

      {/* Add new */}
      <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Add Quick Question</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Question</label>
            <input
              type="text"
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="e.g. Which products meet EN ISO 20345?"
              maxLength={200}
              className="w-full text-sm text-black border border-neutral-200 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Predefined Answer (Optional)</label>
            <textarea
              value={newAnswer}
              onChange={e => setNewAnswer(e.target.value)}
              placeholder="e.g. Our ProSeries footwear line meets the EN ISO 20345 standard..."
              maxLength={1000}
              rows={1}
              className="w-full text-sm text-black border border-neutral-200 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white resize-y"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1 border-t border-neutral-200/60 pt-3">
          <button
            type="button"
            onClick={generateAnswerDraft}
            disabled={generatingAI || !newText.trim()}
            className="px-3.5 py-2 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs font-medium rounded-lg disabled:opacity-50 transition-colors flex items-center gap-1.5 bg-white"
          >
            {generatingAI ? 'Drafting...' : '🪄 Draft with AI'}
          </button>
          <button
            onClick={addQuestion}
            disabled={adding || !newText.trim()}
            className="px-4 py-2 bg-gold text-navy-dark text-xs font-medium rounded-lg
                       hover:bg-gold/90 transition-colors disabled:opacity-50
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {adding ? 'Adding…' : 'Add Question'}
          </button>
        </div>
      </div>

      {/* Questions list */}
      {error ? (
        <div className="text-sm text-red-500 text-center py-10 border border-dashed border-red-200 rounded-xl bg-red-50/50">
          Failed to load questions. Please check your admin session or try reloading.
        </div>
      ) : questions.length === 0 ? (
        <div className="text-sm text-neutral-400 text-center py-10 border border-dashed border-neutral-200 rounded-xl bg-white">
          No questions yet. Add your first quick question above.
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={`flex items-start gap-3 p-4 bg-white rounded-xl border transition-colors
                ${q.enabled ? 'border-neutral-200' : 'border-neutral-100 opacity-60'}`}
            >
              <span className="text-xs text-neutral-400 w-5 text-center shrink-0 mt-1">{i + 1}</span>

              {editingId === q.id ? (
                <div className="flex-grow flex flex-col gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Question</label>
                    <input
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      autoFocus
                      className="w-full text-sm text-black bg-white border border-gold rounded px-2.5 py-1.5
                                 focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Predefined Answer (Optional)</label>
                    <textarea
                      value={editAnswer}
                      onChange={e => setEditAnswer(e.target.value)}
                      className="w-full text-xs text-black bg-white border border-gold rounded px-2.5 py-1.5
                                 focus:outline-none focus:ring-2 focus:ring-gold/30 resize-y"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col">
                  <span className="text-sm font-semibold text-neutral-800">{q.text}</span>
                  {q.answer ? (
                    <span className="text-xs text-neutral-600 mt-1 bg-neutral-50/60 p-2.5 rounded border border-neutral-100 whitespace-pre-line">
                      {q.answer}
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 mt-1">
                      No predefined answer. (Replies dynamically using AI settings context)
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1 shrink-0 mt-0.5">
                {editingId === q.id ? (
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => saveEdit(q.id)}
                      className="px-2.5 py-1 text-xs bg-gold text-navy-dark rounded hover:bg-gold/90"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2.5 py-1 text-xs bg-neutral-100 text-neutral-600 rounded hover:bg-neutral-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => toggleEnabled(q)}
                      title={q.enabled ? 'Disable' : 'Enable'}
                      className={`p-1.5 rounded transition-colors text-xs font-medium
                        ${q.enabled
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-neutral-400 hover:bg-neutral-100'}`}
                    >
                      {q.enabled ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(q.id)
                        setEditText(q.text)
                        setEditAnswer(q.answer || '')
                      }}
                      title="Edit"
                      className="p-1.5 rounded text-neutral-400 hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      title="Delete"
                      className="p-1.5 rounded text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-neutral-400">
        Tip: Use 5–8 questions that cover the most common HSE manager and procurement officer queries.
      </p>
    </div>
  )
}

// ---------- Logs tab ----------
function LogsTab() {
  const [logs, setLogs] = useState<ChatLog[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`/api/admin/ai-logs/?page=${page}`)
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized or server error')
        return r.json()
      })
      .then(data => {
        setLogs(data.logs ?? [])
        setTotal(data.total ?? 0)
      })
      .catch(err => {
        console.error('Failed to load AI logs:', err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [page])

  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  function parseMessages(raw: string): { role: string; content: string }[] {
    try { return JSON.parse(raw) } catch { return [] }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {total} conversation{total !== 1 ? 's' : ''} logged.
          IP addresses are hashed (SHA-256) — no PII stored.
        </p>
      </div>

      {error ? (
        <div className="text-sm text-red-500 text-center py-10 border border-dashed border-red-200 rounded-xl bg-red-50/50">
          Failed to load chat logs. Please check your admin session or try reloading.
        </div>
      ) : logs.length === 0 ? (
        <div className="text-sm text-neutral-400 text-center py-10 border border-dashed border-neutral-200 rounded-xl">
          No chat logs yet.
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map(log => {
            const msgs = parseMessages(log.messages)
            const userMsgs = msgs.filter(m => m.role === 'user')
            const isOpen = expanded === log.id
            return (
              <div key={log.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : log.id)}
                  className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-500 mb-0.5">
                      {new Date(log.createdAt).toLocaleString()} · {log.provider}/{log.model} · IP: {log.ipHash.slice(0, 12)}…
                    </p>
                    <p className="text-sm text-neutral-800 truncate">
                      {userMsgs[0]?.content ?? '(empty)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                      {msgs.length} msg{msgs.length !== 1 ? 's' : ''}
                    </span>
                    <ChevronIcon className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-neutral-100 pt-3 space-y-2">
                    {msgs.map((m, i) => (
                      <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                        <div
                          className={`rounded-xl px-3 py-2 text-xs max-w-[80%] whitespace-pre-wrap
                            ${m.role === 'user'
                              ? 'bg-gold text-navy-dark'
                              : 'bg-neutral-100 text-neutral-700'}`}
                        >
                          <span className="font-medium uppercase tracking-wide opacity-60 text-[10px] block mb-1">
                            {m.role}
                          </span>
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg
                       disabled:opacity-40 hover:bg-neutral-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-neutral-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg
                       disabled:opacity-40 hover:bg-neutral-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

// ---------- Icons ----------
function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}
