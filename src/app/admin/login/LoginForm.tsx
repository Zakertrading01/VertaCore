'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { loginAction, type LoginState } from './actions'
import { cn } from '@/lib/utils'

const initialState: LoginState = { error: null }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        'w-full py-3 px-5 text-sm font-semibold rounded transition-colors duration-150',
        'bg-gold text-navy-dark hover:bg-gold-muted active:bg-gold-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2'
      )}
    >
      {pending && (
        <svg
          className="w-4 h-4 animate-spin text-navy-dark"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {pending ? 'Signing in…' : 'Sign in'}
      {pending && <span className="sr-only" aria-live="polite">Signing in, please wait.</span>}
    </button>
  )
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const errorId = 'login-error'
  const hasError = Boolean(state.error)

  useEffect(() => {
    fetch('/').catch(() => { })
    fetch('/admin/').catch(() => { })
  }, [])

  return (
    <form action={action} noValidate aria-label="Admin login form">
      {hasError && (
        <div
          id={errorId}
          role="alert"
          aria-atomic="true"
          className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-600"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-navy-dark">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(
              'w-full px-3 py-2.5 text-sm border rounded transition-colors bg-white text-navy-dark',
              'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
              hasError ? 'border-red-400' : 'border-gray-200'
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-navy-dark">
            Password
          </label>
          <div className="relative group">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              aria-required="true"
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={cn(
                'w-full px-3 py-2.5 pr-10 text-sm border rounded transition-colors bg-white text-navy-dark',
                'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
                hasError ? 'border-red-400' : 'border-gray-200'
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-dark transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5 focus:outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 focus:outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <SubmitButton />
      </div>
    </form>
  )
}
