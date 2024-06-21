"use client";
import React from "react";
import { useRouter } from "@/hooks/useRouter";
import Google from "@/icons/Google";
import { ErrorResponse, SuccessResponse } from "@/lib/response";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

type Result = {
  url: string;
};

const GoogleOAuthButton = ({ action }: { action: "Login" | "Sign Up" }) => {
  const { toast } = useToast();
  const { push } = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/oauth/google");

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });

      return;
    }

    const {
      data: { url },
    } = (await response.json()) as SuccessResponse<Result>;

    push(url);
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleClick}>
      <Google className="mr-2 h-4 w-4" />
      {action} with Google
    </Button>
  );
};

export default GoogleOAuthButton;
