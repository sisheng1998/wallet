import React from "react"

import { Toaster } from "@/components/ui/sonner"
import ThemeProvider from "@/components/theme-provider"
import TopLoader from "@/components/top-loader"
import { TRPCReactProvider } from "@/trpc/react"
import { HydrateClient } from "@/trpc/server"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <TRPCReactProvider>
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
  </TRPCReactProvider>
)

export default Providers
