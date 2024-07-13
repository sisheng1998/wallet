import { and, eq, gt, lte } from "drizzle-orm"
import { jwtVerify, SignJWT } from "jose"

import { db } from "@/db"
import { magicLinks } from "@/db/schema"
import { getCurrentUnixTimestamp, VALIDITY_DURATION } from "@/lib/auth/utils"
import { Paths } from "@/lib/constants"
import env from "@/lib/env"

const SETTINGS = {
  CALLBACK_URL: `${Paths.MagicLink}/callback`,
}

const getKey = (secret: string) => new TextEncoder().encode(secret)

export const generateMagicLink = async (
  userId: string,
  email: string
): Promise<{ url: string; token: string; expiresAt: number }> => {
  const { BASE_URL, API_TOKEN } = env

  const key = getKey(API_TOKEN)
  const expiresAt = getCurrentUnixTimestamp() + VALIDITY_DURATION

  const token = await new SignJWT({
    userId,
    email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key)

  return {
    url: BASE_URL + SETTINGS.CALLBACK_URL + `?token=${token}`,
    token,
    expiresAt,
  }
}

export const getUserInfo = async (
  token: string
): Promise<{
  userId: string
  email: string
}> => {
  try {
    const { API_TOKEN } = env

    const key = getKey(API_TOKEN)

    const { payload } = await jwtVerify<{ userId: string; email: string }>(
      token,
      key
    )

    return payload
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export const saveMagicLinkToken = async (
  userId: string,
  token: string,
  expiresAt: number
) =>
  await db
    .insert(magicLinks)
    .values({
      userId,
      token,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.userId,
      set: {
        token,
        expiresAt,
      },
    })

export const getExistingMagicLinkToken = async (userId: string) => {
  const currentTimestamp = getCurrentUnixTimestamp()

  const result = await db.query.magicLinks.findFirst({
    columns: {
      token: true,
    },
    where: and(
      eq(magicLinks.userId, userId),
      gt(magicLinks.expiresAt, currentTimestamp)
    ),
  })

  return result?.token
}

export const deleteMagicLinkToken = async (userId: string) =>
  await db.delete(magicLinks).where(eq(magicLinks.userId, userId))

export const deleteExpiredMagicLinks = async () => {
  const currentTimestamp = getCurrentUnixTimestamp()
  await db.delete(magicLinks).where(lte(magicLinks.expiresAt, currentTimestamp))
}
