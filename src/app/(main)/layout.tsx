import React from "react"
import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest()

  if (!user) redirect("/login")

  return children
}

export default Layout
