"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

import { Paths } from "@/lib/constants"

const NotFound = () => {
  useEffect(() => {
    redirect(Paths.Home)
  }, [])

  return null
}

export default NotFound
