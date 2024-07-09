"use server"

import { cookies } from "next/headers"
import { render } from "@react-email/components"
import { generateIdFromEntropySize } from "lucia"

import { login, lucia, validateRequest } from "@/lib/auth"
import { generateMagicLink, saveMagicLinkToken } from "@/lib/auth/magic-link"
import { deleteOTP, generateOTP, getExistingOTP, saveOTP } from "@/lib/auth/otp"
import { createUser, getExistingUser } from "@/lib/auth/utils"
import env from "@/lib/env"
import {
  getActionErrorResponse,
  getActionSuccessResponse,
} from "@/lib/response"
import MagicLink from "@/emails/templates/MagicLink"
import OTP from "@/emails/templates/OTP"
import Welcome from "@/emails/templates/Welcome"
import { sendEmail, verifyEmail } from "@/emails/utils"

export const sendMagicLink = async (email: string) => {
  try {
    const existingUser = await getExistingUser(email)

    if (!existingUser) {
      throw new Error("User not found")
    }

    const { url, token, expiresAt } = await generateMagicLink(
      existingUser.id,
      email
    )
    await saveMagicLinkToken(existingUser.id, token, expiresAt)

    const html = render(MagicLink({ name: existingUser.name, url }))
    await sendEmail(existingUser.name, email, "Your Magic Link", html)

    return getActionSuccessResponse("Email sent")
  } catch (error) {
    return getActionErrorResponse(error)
  }
}

export const sendOTP = async (email: string) => {
  try {
    const existingUser = await getExistingUser(email)

    if (!existingUser) {
      throw new Error("User not found")
    }

    const { code, expiresAt } = generateOTP(6)
    await saveOTP(existingUser.id, code, expiresAt)

    const html = render(OTP({ name: existingUser.name, code }))
    await sendEmail(
      existingUser.name,
      email,
      "Your One-Time Password (OTP)",
      html
    )

    return getActionSuccessResponse("Email sent")
  } catch (error) {
    return getActionErrorResponse(error)
  }
}

export const loginWithOTP = async (email: string, otp: string) => {
  try {
    const { userId, code } = await getExistingOTP(email)

    if (code !== otp) {
      throw new Error("Invalid OTP")
    }

    await deleteOTP(userId)

    await login(userId, email)
    return getActionSuccessResponse("Logged in")
  } catch (error) {
    return getActionErrorResponse(error)
  }
}

export const signUp = async (name: string, email: string) => {
  try {
    const existingUser = await getExistingUser(email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    await verifyEmail(email)

    const userId = generateIdFromEntropySize(10)
    await createUser(userId, name, email)

    const html = render(Welcome({ name, url: env.BASE_URL }))
    await sendEmail(name, email, "Welcome to Wallet!", html)

    return getActionSuccessResponse("Account created")
  } catch (error) {
    return getActionErrorResponse(error)
  }
}

export const logout = async () => {
  try {
    const { session } = await validateRequest()

    if (!session) {
      throw new Error("No active session found")
    }

    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return getActionSuccessResponse("Logged out")
  } catch (error) {
    return getActionErrorResponse(error)
  }
}
