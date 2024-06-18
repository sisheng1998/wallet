import React from "react";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "@/components/top-loader";

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
);

export default Providers;
