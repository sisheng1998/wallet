import type { Metadata } from "next"
import { Plus_Jakarta_Sans as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

import Providers from "@/app/providers"

export const runtime = "edge"

export const metadata: Metadata = {
  title: {
    template: "%s | Wallet",
    default: "Wallet",
  },
  description: "Finance Made Simple",
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#171717"
      />
      <meta name="msapplication-TileColor" content="#171717" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="white"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="black"
      />
    </head>
    <body
      className={cn(
        "relative flex min-h-screen flex-col overflow-x-hidden overscroll-y-none bg-background font-sans text-foreground antialiased",
        fontSans.variable
      )}
    >
      <Providers>{children}</Providers>
    </body>
  </html>
)

export default RootLayout
