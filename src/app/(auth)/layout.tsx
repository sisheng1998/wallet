import React from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import Logo from "@/icons/Logo";
import CallbackError from "@/components/auth/CallbackError";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
      <Logo className="mb-2 h-9 w-9" />
      {children}
      <CallbackError />
    </main>
  );
};

export default Layout;
