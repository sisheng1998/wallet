import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/auth/SignUpForm";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => (
  <>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <GoogleOAuthButton action="Sign Up" />

        <div className="mb-1 mt-3 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <p className="mx-3 text-muted-foreground">or</p>
          <div className="flex-grow border-t border-muted" />
        </div>

        <SignUpForm />
      </CardContent>
    </Card>

    <div className="flex items-baseline space-x-2">
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?
      </p>
      <Button variant="link" className="h-auto p-0" asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  </>
);

export default SignUp;
