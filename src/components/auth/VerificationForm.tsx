"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { loginWithOTP } from "@/lib/auth/actions"
import { Paths } from "@/lib/constants"
import { DEFAULT_ERROR_TITLE } from "@/lib/response"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "@/hooks/useRouter"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const formSchema = z.object({
  code: z.string().min(6, {
    message: "OTP must be 6 digits long",
  }),
})

type FormValues = z.infer<typeof formSchema>

const VerificationForm = () => {
  const { replace } = useRouter()
  const { email } = useAuth()

  useEffect(() => {
    if (!email) {
      replace(Paths.Login)
    }
  }, [email, replace])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    const { code } = values
    const { success, message } = await loginWithOTP(email, code)

    if (success) {
      replace(Paths.Home)
    } else {
      toast.error(DEFAULT_ERROR_TITLE, {
        description: message,
      })
    }
  }

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
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default VerificationForm

export const Description = () => {
  const { email } = useAuth()

  return `Enter the code we've sent to\n${email || "your email"}`
}
