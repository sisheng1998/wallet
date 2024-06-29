"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "@/hooks/useRouter";
import { logout } from "@/lib/auth/actions";
import { DEFAULT_ERROR_TITLE } from "@/lib/response";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { push } = useRouter();

  const handleClick = async () => {
    const { success, message } = await logout();

    if (success) {
      push("/login");
    } else {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: message,
      });
    }
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
