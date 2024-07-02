"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { DEFAULT_ERROR_TITLE } from "@/lib/response"
import { useRouter } from "@/hooks/useRouter"

const CallbackError = () => {
  const { replace } = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || ""

  useEffect(() => {
    if (!error) return

    const timeout = setTimeout(() => {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: error,
      })

      replace(pathname)
    }, 0)

    return () => clearTimeout(timeout)
  }, [error, replace, pathname])

  return null
}

export default CallbackError
