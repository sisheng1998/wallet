"use client";
import React from "react";
import { useRouter } from "@/hooks/useRouter";
import { logout } from "@/auth/actions";
import { DEFAULT_ERROR_TITLE } from "@/lib/response";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const LogoutButton = () => {
  const { push } = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    const { success, message } = await logout();

    if (success) {
      push("/login");
    } else {
      toast({
        variant: "destructive",
        title: DEFAULT_ERROR_TITLE,
        description: message,
      });
    }
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
