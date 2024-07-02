import { eq } from "drizzle-orm"

import { db } from "@/db"
import { OTPs, users } from "@/db/schema"
import { getCurrentUnixTimestamp, VALIDITY_DURATION } from "@/lib/auth/utils"

const CHAR_SET = "0123456789"

export const generateOTP = (
  length: number
): {
  code: string
  expiresAt: number
} => {
  let code = ""

  for (let i = 0; i < length; i++) {
    code += CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
  }

  const expiresAt = getCurrentUnixTimestamp() + VALIDITY_DURATION

  return {
    code,
    expiresAt,
  }
}

export const saveOTP = async (
  userId: string,
  code: string,
  expiresAt: number
) =>
  await db
    .insert(OTPs)
    .values({
      userId,
      code,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: OTPs.userId,
      set: {
        code,
        expiresAt,
      },
    })

export const getExistingOTP = async (email: string) => {
  const currentTimestamp = getCurrentUnixTimestamp()

  const userWithOTP = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: eq(users.email, email),
    with: {
      otp: {
        columns: { code: true, expiresAt: true },
      },
    },
  })

  if (!userWithOTP) {
    throw new Error("Invalid OTP")
  }

  const {
    id: userId,
    otp: { code, expiresAt },
  } = userWithOTP

  if (expiresAt < currentTimestamp) {
    throw new Error("OTP expired")
  }

  return {
    userId,
    code,
  }
}

export const deleteOTP = async (userId: string) =>
  await db.delete(OTPs).where(eq(OTPs.userId, userId))
