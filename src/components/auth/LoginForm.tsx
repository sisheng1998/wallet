"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { sendMagicLink, sendOTP } from "@/lib/auth/actions"
import { DEFAULT_ERROR_TITLE } from "@/lib/response"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "@/hooks/useRouter"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoaderButton } from "@/components/loader-button"
import { MODES } from "@/contexts/auth"

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
})

type FormValues = z.infer<typeof formSchema>

const LoginForm = () => {
  const { push } = useRouter()
  const { setEmail, mode, setMode } = useAuth()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    const email = values.email.trim().toLowerCase()
    const { success, message } =
      mode === "OTP" ? await sendOTP(email) : await sendMagicLink(email)

    if (success) {
      form.reset()

      toast.success("Email sent!", {
        description: `Check your email for the ${mode} to login`,
      })

      if (mode === "OTP") {
        setEmail(email)
        push("/verification")
      }
    } else {
      const userNotFound = message === "User not found"

      const title = userNotFound ? "Account not found." : DEFAULT_ERROR_TITLE
      const description = userNotFound
        ? "Please sign up for an account"
        : message

      toast.error(title, {
        description,
      })
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    form.setValue(name as keyof FormValues, value.trim(), {
      shouldValidate: true,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Tabs defaultValue={MODES[0]} className="-mb-1">
          <TabsList className="w-full">
            {MODES.map((mode, index) => (
              <TabsTrigger
                key={index}
                className="w-full"
                value={mode}
                onClick={() => setMode(mode)}
              >
                {mode}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoaderButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
          icon={Mail}
        >
          Send {mode}
        </LoaderButton>
      </form>
    </Form>
  )
}

export default LoginForm

export const Description = () => {
  const { mode } = useAuth()

  return mode === "OTP"
    ? `We'll send you a One-Time Password (OTP) to your email to login.`
    : `Get a magic link sent to your email that'll sign you in instantly!`
}
