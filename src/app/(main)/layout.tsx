import React from "react"
import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth"
import WelcomeMessage from "@/components/layouts/WelcomeMessage"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest()

  if (!user) redirect("/login")

  return (
    <>
      {children}
      <WelcomeMessage />
    </>
  )
}

export default Layout
