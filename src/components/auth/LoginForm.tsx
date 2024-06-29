"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { login } from "@/lib/auth/actions";
import { DEFAULT_ERROR_TITLE } from "@/lib/response";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoaderButton } from "../loader-button";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
});

export type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { success, message } = await login(values);

    if (success) {
      form.reset();

      toast.success("Email sent!", {
        description: "Check your email for the magic link to login",
      });
    } else {
      const userNotFound = message === "User not found";

      const title = userNotFound ? "Account not found." : DEFAULT_ERROR_TITLE;
      const description = userNotFound
        ? "Please sign up for an account"
        : message;

      toast.error(title, {
        description,
      });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    form.setValue(name as keyof FormValues, value.trim(), {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          Send Magic Link
        </LoaderButton>
      </form>
    </Form>
  );
};

export default LoginForm;
