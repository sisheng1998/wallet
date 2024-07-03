"use client"

import { useEffect } from "react"
import { toast } from "sonner"

import { LOGGED_IN_EMAIL } from "@/lib/auth/cookie"
import useCookie from "@/hooks/useCookie"

const WelcomeMessage = () => {
  const { value: email, deleteCookie } = useCookie(LOGGED_IN_EMAIL)

  useEffect(() => {
    if (!email) return

    const timeout = setTimeout(() => {
      toast.success("Welcome back!", {
        description: `Logged in as ${email}`,
      })

      deleteCookie()
    }, 0)

    return () => clearTimeout(timeout)
  }, [email, deleteCookie])

  return null
}

export default WelcomeMessage
