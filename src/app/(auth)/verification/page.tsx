import React from "react"
import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResendOTPButton from "@/components/auth/ResendOTPButton"
import VerificationForm, {
  Description,
} from "@/components/auth/VerificationForm"

export const metadata: Metadata = {
  title: "Verification",
}

const Verification = () => (
  <>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Verification</CardTitle>
        <CardDescription className="whitespace-pre-line">
          <Description />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <VerificationForm />
      </CardContent>

      <CardFooter className="justify-center">
        <ResendOTPButton />
      </CardFooter>
    </Card>

    <Button variant="link" className="h-auto p-0" asChild>
      <Link href="/login">Back to Login</Link>
    </Button>
  </>
)

export default Verification
