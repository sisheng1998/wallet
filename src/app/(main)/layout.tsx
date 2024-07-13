import React from "react"
import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth"
import { Paths } from "@/lib/constants"
import WelcomeMessage from "@/components/layouts/WelcomeMessage"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  return (
    <>
      {children}
      <WelcomeMessage />
    </>
  )
}

export default Layout
