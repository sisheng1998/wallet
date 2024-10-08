import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { render } from "@react-email/render"
import { generateIdFromEntropySize } from "lucia"

import { login } from "@/lib/auth"
import { getGoogleTokens, getGoogleUser, SETTINGS } from "@/lib/auth/google"
import {
  createUserAndOAuthAccount,
  getExistingOAuthAccount,
  getExistingUser,
  linkOAuthAccountToUser,
} from "@/lib/auth/utils"
import { Paths } from "@/lib/constants"
import env from "@/lib/env"
import { getUrlWithError } from "@/lib/response"
import Welcome from "@/emails/templates/Welcome"
import { sendEmail } from "@/emails/utils"

const PROVIDER_ID = "google"

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env

  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams

    const code = searchParams.get("code")
    const state = searchParams.get("state")

    const savedState = cookies().get(SETTINGS.STATE_KEY)?.value
    const codeVerifier = cookies().get(SETTINGS.CODE_VERIFIER_KEY)?.value

    cookies().delete(SETTINGS.STATE_KEY)
    cookies().delete(SETTINGS.CODE_VERIFIER_KEY)

    if (!code || !state || !savedState || !codeVerifier || state !== savedState)
      throw new Error("Invalid state or code")

    const { accessToken } = await getGoogleTokens(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      BASE_URL + SETTINGS.CALLBACK_URL,
      code,
      codeVerifier
    )

    const {
      sub: providerUserId,
      name,
      email,
    } = await getGoogleUser(accessToken)

    const existingOAuthAccount = await getExistingOAuthAccount(
      PROVIDER_ID,
      providerUserId
    )

    // If the user already has an OAuth account, log them in
    if (existingOAuthAccount) {
      await login(existingOAuthAccount.userId, email)
      return NextResponse.redirect(BASE_URL)
    }

    const existingUser = await getExistingUser(email)

    // If the user already exists, link the OAuth account and log them in
    if (existingUser) {
      await linkOAuthAccountToUser(existingUser.id, PROVIDER_ID, providerUserId)

      await login(existingUser.id, existingUser.email)
      return NextResponse.redirect(BASE_URL)
    }

    // Otherwise, create a new user and log them in
    const userId = generateIdFromEntropySize(10)

    await createUserAndOAuthAccount(
      userId,
      name,
      email,
      PROVIDER_ID,
      providerUserId
    )

    const html = render(Welcome({ name, url: BASE_URL }))
    await sendEmail(name, email, "Welcome to Wallet!", html)

    await login(userId, email)
    return NextResponse.redirect(BASE_URL)
  } catch (error) {
    const url = getUrlWithError(BASE_URL, Paths.Login, error)
    return NextResponse.redirect(url)
  }
}
