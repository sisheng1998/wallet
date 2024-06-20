import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) redirect("/login");

  return children;
};

export default Layout;
