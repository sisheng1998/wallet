import React from "react";
import { Metadata } from "next";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
