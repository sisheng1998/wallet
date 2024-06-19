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
import Google from "@/icons/Google";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => (
  <>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to access your wallet</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/api/oauth/google">
            <Google className="mr-2 h-4 w-4" />
            Login with Google
          </Link>
        </Button>

        <div className="mb-1 mt-3 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <p className="mx-3 text-muted-foreground">or</p>
          <div className="flex-grow border-t border-muted" />
        </div>

        <LoginForm />
      </CardContent>
    </Card>

    <div className="flex items-baseline space-x-2">
      <p className="text-center text-sm text-muted-foreground">
        {`Don't have an account?`}
      </p>
      <Button variant="link" className="h-auto p-0" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  </>
);

export default Login;