"use client"

import React, { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { sendOTP } from "@/lib/auth/actions"
import { DEFAULT_ERROR_TITLE } from "@/lib/response"
import { useAuth } from "@/hooks/useAuth"
import { LoaderButton } from "@/components/loader-button"

const RESEND_INTERVAL = 90 // 90 seconds

const ResendOTPButton = () => {
  const { email } = useAuth()

  const [timer, setTimer] = useState<number>(RESEND_INTERVAL)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const timeOutCallback = useCallback(() => setTimer((prev) => prev - 1), [])

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000)
  }, [timer, timeOutCallback])

  const resendOTP = async () => {
    if (timer > 0) return

    setIsLoading(true)

    const { success, message } = await sendOTP(email)

    if (success) {
      toast.success("Email sent!", {
        description: "Check your email for the OTP to login",
      })

      setTimer(RESEND_INTERVAL)
    } else {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: message,
      })
    }

    setIsLoading(false)
  }

  return (
    <LoaderButton
      variant="ghost"
      onClick={resendOTP}
      disabled={timer > 0}
      isLoading={isLoading}
    >
      {timer > 0
        ? `Resend OTP in ${timer}s`
        : isLoading
          ? "Sending OTP..."
          : "Resend OTP"}
    </LoaderButton>
  )
}

export default ResendOTPButton
