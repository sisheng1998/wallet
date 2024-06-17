import React from "react";
import Logo from "@/icons/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
    <Logo className="mb-2 h-9 w-9" />
    {children}
  </main>
);

export default Layout;
