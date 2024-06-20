"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { logout } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";

const LogoutButton = () => {
  const [state, formAction] = useFormState(logout, null);

  useEffect(() => {
    if (!state) return;

    toast({
      variant: "destructive",
      title: state.error,
    });
  }, [state]);

  return (
    <form action={formAction}>
      <Button>Logout</Button>
    </form>
  );
};

export default LogoutButton;
