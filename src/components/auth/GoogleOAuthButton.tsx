"use client"

import React, { useState } from "react"
import { toast } from "sonner"

import { Paths } from "@/lib/constants"
import {
  DEFAULT_ERROR_TITLE,
  ErrorResponse,
  SuccessResponse,
} from "@/lib/response"
import { useRouter } from "@/hooks/useRouter"
import { LoaderButton } from "@/components/loader-button"
import Google from "@/icons/Google"

type Result = {
  url: string
}

const GoogleOAuthButton = ({ action }: { action: "Login" | "Sign Up" }) => {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setIsLoading(true)

    const response = await fetch(Paths.Google)

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse

      toast.error(DEFAULT_ERROR_TITLE, {
        description: error.message,
      })

      setIsLoading(false)
      return
    }

    const {
      data: { url },
    } = (await response.json()) as SuccessResponse<Result>

    push(url)
  }

  return (
    <LoaderButton
      variant="outline"
      className="w-full"
      onClick={handleClick}
      isLoading={isLoading}
      icon={Google}
    >
      {action} with Google
    </LoaderButton>
  )
}

export default GoogleOAuthButton
