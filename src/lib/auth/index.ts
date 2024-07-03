import { cache } from "react"
import { cookies } from "next/headers"
import { Lucia } from "lucia"

import { DatabaseUserAttributes } from "@/db/schema"
import adapter from "@/lib/auth/adapter"
import { LOGGED_IN_EMAIL } from "@/lib/auth/cookie"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => attributes,
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId)
    return {
      user: null,
      session: null,
    }

  const { user, session } = await lucia.validateSession(sessionId)

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  return {
    user,
    session,
  }
})

export const login = async (userId: string, email: string) => {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  cookies().set(LOGGED_IN_EMAIL, email, {
    ...sessionCookie.attributes,
    httpOnly: false,
  })
}
