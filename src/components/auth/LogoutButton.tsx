"use client"

import React from "react"
import { toast } from "sonner"

import { logout } from "@/lib/auth/actions"
import { Paths } from "@/lib/constants"
import { DEFAULT_ERROR_TITLE } from "@/lib/response"
import { useRouter } from "@/hooks/useRouter"
import { Button } from "@/components/ui/button"

const LogoutButton = () => {
  const { push } = useRouter()

  const handleClick = async () => {
    const { success, message } = await logout()

    if (success) {
      push(Paths.Login)

      toast.success("See you soon!", {
        description: "You have successfully logged out",
      })
    } else {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: message,
      })
    }
  }

  return <Button onClick={handleClick}>Logout</Button>
}

export default LogoutButton
