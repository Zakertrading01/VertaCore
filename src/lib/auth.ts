import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

// NextAuth v5 (Auth.js) configuration.
//
// Provider: Credentials only. No OAuth. No public registration.
// Admin users are created via seed script only.
//
// Session strategy: JWT. Sessions are stored in a signed HttpOnly cookie,
// not in the database. This means session invalidation requires the JWT to expire.
// 8-hour maxAge is set to limit the blast radius of a stolen token.
//
// Cookie security: httpOnly + secure + sameSite=strict.
// httpOnly: JavaScript cannot read the cookie — prevents XSS session theft.
// secure: cookie sent only over HTTPS — prevents network interception.
// sameSite=strict: cookie not sent on cross-site requests — prevents CSRF.
//
// Password verification: bcrypt with cost factor 12 (set during seed).
// bcrypt.compare is timing-safe by design — constant time regardless of match/mismatch.
// This prevents timing attacks from distinguishing valid from invalid usernames.
//
// Error handling in authorize: if the database is unreachable, authorize returns null
// (user not found → auth failed). This is intentional — a DB outage should not
// grant authentication, not throw an unhandled error that leaks stack traces.

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await db.adminUser.findUnique({
            where: { email: credentials.email as string },
            select: { id: true, email: true, passwordHash: true },
          })

          // Return null for both "user not found" and "wrong password".
          // Same code path prevents timing attacks from distinguishing the two cases.
          if (!user) {
            // Perform a dummy bcrypt comparison to equalise timing.
            // Without this, a missing user returns faster than a wrong password,
            // allowing attackers to enumerate valid email addresses via timing.
            await bcrypt.compare(
              credentials.password as string,
              '$2a$12$dummy.hash.that.never.matches.xxxxxxxxxxxxxxxxxxxxxxxx'
            )
            return null
          }

          const valid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )

          return valid ? { id: user.id, email: user.email } : null
        } catch {
          // DB connection failure — do not grant auth
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,       // 8 hours — limit blast radius of stolen token
    updateAge: 60 * 60,        // Re-issue token every 1 hour
  },

  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      },
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token.id) session.user.id = token.id as string
      if (token.email) session.user.email = token.email as string
      return session
    },
  },
})
