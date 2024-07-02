import React from "react"

import { Toaster } from "@/components/ui/sonner"
import ThemeProvider from "@/components/theme-provider"
import TopLoader from "@/components/top-loader"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <TopLoader />
    {children}
    <Toaster />
  </ThemeProvider>
)

export default Providers
