import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

export const LOGGED_IN_EMAIL = "logged_in_email"

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 60 * 10,
  sameSite: "lax",
}
