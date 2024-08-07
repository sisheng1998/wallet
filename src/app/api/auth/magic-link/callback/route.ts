import { NextRequest, NextResponse } from "next/server"

import { login } from "@/lib/auth"
import {
  deleteMagicLinkToken,
  getExistingMagicLinkToken,
  getUserInfo,
} from "@/lib/auth/magic-link"
import { Paths } from "@/lib/constants"
import env from "@/lib/env"
import { getUrlWithError } from "@/lib/response"

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { BASE_URL } = env

  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams

    const token = searchParams.get("token")

    if (!token) throw new Error("Missing token")

    const { userId, email } = await getUserInfo(token)
    const existingToken = await getExistingMagicLinkToken(userId)

    if (!existingToken) throw new Error("Invalid token")

    await deleteMagicLinkToken(userId)

    await login(userId, email)
    return NextResponse.redirect(BASE_URL)
  } catch (error) {
    const url = getUrlWithError(BASE_URL, Paths.Login, error)
    return NextResponse.redirect(url)
  }
}
