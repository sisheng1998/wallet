"use client";
import React from "react";
import { useRouter } from "@/hooks/useRouter";
import { Button } from "@/components/ui/button";
import Google from "@/icons/Google";

const GoogleOAuthButton = ({ action }: { action: "Login" | "Sign Up" }) => {
  const { replace } = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => replace("/api/oauth/google")}
    >
      <Google className="mr-2 h-4 w-4" />
      {action} with Google
    </Button>
  );
};

export default GoogleOAuthButton;
