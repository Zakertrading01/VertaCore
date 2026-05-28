'use server'

// Login server action — handles credential authentication with brute-force protection.
//
// Server action rationale over API route:
//   - Credentials are never visible in client-side network requests
//   - signIn() from NextAuth sets HttpOnly cookies directly on the server response
//   - No CORS concerns — same-origin server-to-server
//   - Progressive enhancement: works without JavaScript
//
// Error handling architecture:
//   NextAuth's signIn() throws NEXT_REDIRECT on success (calls redirect() internally).
//   On credential failure, it throws AuthError with type 'CredentialsSignin'.
//   We must re-throw NEXT_REDIRECT to let Next.js handle the navigation.
//   All other errors map to the same generic error message.
//
// Error message uniformity:
//   Locked accounts and wrong credentials return identical messages.
//   This prevents an attacker from discovering lockout state through the UI.
//   The lockout check happens first — but the response is identical either way.
//
// Brute-force flow:
//   1. Check IP lockout (before any auth attempt)
//   2. If locked → return generic error immediately
//   3. Attempt signIn (NextAuth calls authorize → bcrypt.compare)
//   4. On NEXT_REDIRECT error → clear attempts → re-throw (success path)
//   5. On CredentialsSignin error → record failed attempt → return generic error
//   6. On any other error → return generic error (do not record — may be DB issue)

import { headers } from 'next/headers'
import { signIn } from '@/lib/auth'
import { isLockedOut, recordFailedAttempt, clearAttempts } from '@/lib/bruteForce'
import { logger } from '@/lib/logger'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export interface LoginState {
  error: string | null
}

async function getIpFromHeaders(): Promise<string> {
  const headerList = await headers()
  return (
    headerList.get('CF-Connecting-IP') ??
    headerList.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  )
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const ip = await getIpFromHeaders()
  const email = (formData.get('email') as string | null) ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  // Basic field presence check — prevents empty submissions reaching bcrypt
  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  // Lockout check — same error message as wrong credentials (no state leakage)
  const locked = await isLockedOut(ip)
  if (locked) {
    logger.warn('Login blocked — IP locked out', { ip })
    return { error: 'Invalid email or password.' }
  }

  try {
    // NextAuth signIn — calls authorize callback → bcrypt.compare.
    // On success: throws NEXT_REDIRECT (redirect('/admin/')).
    // On failure: throws AuthError with type 'CredentialsSignin'.
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/',
    })

    // This line is unreachable on success (redirect throws).
    // Exists as a defensive return in case NextAuth v5 changes redirect behaviour.
    await clearAttempts(ip)
    return { error: null }
  } catch (error) {
    // Re-throw redirect errors — this IS the success path.
    // Catching and not re-throwing here would break navigation.
    if (isRedirectError(error)) {
      await clearAttempts(ip)
      throw error
    }

    // Auth failure — increment lockout counter
    await recordFailedAttempt(ip)

    // Log failure without leaking credentials
    logger.warn('Failed admin login attempt', { ip })

    // Generic error: identical for wrong password and account lockout
    return { error: 'Invalid email or password.' }
  }
}
