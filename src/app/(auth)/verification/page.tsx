import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VerificationForm, {
  Instruction,
} from "@/components/auth/VerificationForm";
import ResendOTPButton from "@/components/auth/ResendOTPButton";

export const metadata: Metadata = {
  title: "Verification",
};

const Verification = () => (
  <>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Verification</CardTitle>
        <Instruction />
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
);

export default Verification;
