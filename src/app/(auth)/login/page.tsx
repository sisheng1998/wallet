import React from "react"
import { Metadata } from "next"
import Link from "next/link"

import { Paths } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton"
import LoginForm, { Description } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login",
}

const Login = () => (
  <>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to access your wallet</CardDescription>
      </CardHeader>

      <CardContent>
        <GoogleOAuthButton action="Login" />

        <div className="my-3 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <p className="mx-3 text-muted-foreground">or</p>
          <div className="flex-grow border-t border-muted" />
        </div>

        <LoginForm />
      </CardContent>

      <CardFooter className="justify-center">
        <p className="max-w-[24ch] text-center text-xs leading-normal text-muted-foreground">
          <Description />
        </p>
      </CardFooter>
    </Card>

    <div className="flex items-baseline space-x-2">
      <p className="text-center text-sm text-muted-foreground">
        {`Don't have an account?`}
      </p>
      <Button variant="link" className="h-auto p-0" asChild>
        <Link href={Paths.SignUp}>Sign Up</Link>
      </Button>
    </div>
  </>
)

export default Login
