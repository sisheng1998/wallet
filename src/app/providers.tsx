import React from "react"

import { Toaster } from "@/components/ui/sonner"
import ThemeProvider from "@/components/theme-provider"
import TopLoader from "@/components/top-loader"
import { TRPCProvider } from "@/trpc/client"
import { HydrateClient } from "@/trpc/server"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <TRPCProvider>
    <HydrateClient>
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
    </HydrateClient>
  </TRPCProvider>
)

export default Providers
