const attempts = new Map<string, { count: number; resetAt: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export async function isLockedOut(ip: string): Promise<boolean> {
  const entry = attempts.get(ip)
  if (!entry) return false
  if (Date.now() > entry.resetAt) {
    attempts.delete(ip)
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    entry.count++
  }
}

export async function clearAttempts(ip: string): Promise<void> {
  attempts.delete(ip)
}
