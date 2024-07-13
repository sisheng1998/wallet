"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { signUp } from "@/lib/auth/actions"
import { Paths } from "@/lib/constants"
import { DEFAULT_ERROR_TITLE } from "@/lib/response"
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
import { LoaderButton } from "@/components/loader-button"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
})

type FormValues = z.infer<typeof formSchema>

const SignUpForm = () => {
  const { push } = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    const email = values.email.trim().toLowerCase()
    const name = values.name.trim()

    const { success, message } = await signUp(name, email)

    if (success) {
      form.reset()

      toast.success("Account created!", {
        description: "Thank you for signing up",
      })

      push(Paths.Login)
    } else {
      const userExists = message === "User already exists"

      const title = userExists ? "Account already exists." : DEFAULT_ERROR_TITLE
      const description = userExists ? "Please login instead" : message

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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        >
          Sign Up
        </LoaderButton>
      </form>
    </Form>
  )
}

export default SignUpForm
