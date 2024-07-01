"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "@/hooks/useRouter";
import { useAuth } from "@/hooks/useAuth";
import { loginWithOTP } from "@/lib/auth/actions";
import { DEFAULT_ERROR_TITLE } from "@/lib/response";
import { CardDescription } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "OTP must be 6 digits long",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const VerificationForm = () => {
  const { replace } = useRouter();
  const { email } = useAuth();

  useEffect(() => {
    if (!email) {
      replace("/login");
    }
  }, [email, replace]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { code } = values;
    const { success, message } = await loginWithOTP(email, code);

    if (success) {
      toast.success("Welcome!", {
        description: `Logged in as ${email}`,
      });

      replace("/");
    } else {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <InputOTP
                  autoFocus
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  onComplete={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default VerificationForm;

export const Instruction = () => {
  const { email } = useAuth();

  return (
    <CardDescription className="whitespace-pre-line">
      {`Enter the code we've sent to\n${email || "your email"}`}
    </CardDescription>
  );
};
