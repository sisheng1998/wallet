import env from "@/lib/env"
import { EmailSentInfo, EmailVerificationResult, Response } from "@/email/types"

const FROM = {
  name: "Wallet",
  email: "hello@sisheng.my",
}

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.API_TOKEN}`,
})

export const sendEmail = async (
  name: string,
  email: string,
  subject: string,
  html: string
) => {
  try {
    const response = await fetch(`${env.EMAIL_SERVER_URL}/send`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        to: {
          name,
          email,
        },
        from: FROM,
        subject,
        html,
      }),
    })

    const data = (await response.json()) as Response<EmailSentInfo>

    if (!data.success) {
      throw new Error(data.message)
    }

    return data.body as EmailSentInfo
  } catch (error) {
    throw error
  }
}

export const verifyEmail = async (email: string) => {
  try {
    const response = await fetch(`${env.EMAIL_SERVER_URL}/verify`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
      }),
    })

    const data = (await response.json()) as Response<EmailVerificationResult>

    if (!data.success) {
      throw new Error(data.message)
    }

    const body = data.body as EmailVerificationResult

    if (!body.isEmailValid) {
      throw new Error("Invalid email")
    }

    if (body.isDisposable) {
      throw new Error("Disposable email not allowed")
    }

    if (!body.isEmailExist) {
      throw new Error("Email not exist")
    }

    return body
  } catch (error) {
    throw error
  }
}
