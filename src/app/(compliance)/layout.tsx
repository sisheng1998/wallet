import React from "react";
import Link from "next/link";
import Logo from "@/icons/Logo";

/* eslint-disable next-on-pages/no-nodejs-runtime */
export const runtime = "nodejs";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <main className="container my-12 max-w-prose space-y-12">
    <Link href="/" className="inline-flex">
      <Logo className="h-9 w-9" />
    </Link>

    <article className="prose prose-neutral">{children}</article>

    <hr className="bg-border" />

    <p className="text-sm text-muted-foreground">
      Copyright © {new Date().getFullYear()} - Wallet
    </p>
  </main>
);

export default Layout;
