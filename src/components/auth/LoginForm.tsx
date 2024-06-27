"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { login } from "@/auth/actions";
import { DEFAULT_ERROR_TITLE } from "@/lib/response";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { success, message } = await login(values);

    if (success) {
      form.reset();

      toast({
        title: "Email sent!",
        description: "Check your email for the link to login",
      });
    } else {
      const userNotFound = message === "User not found";

      const title = userNotFound
        ? "No active account found"
        : DEFAULT_ERROR_TITLE;
      const description = userNotFound
        ? "Please sign up for an account"
        : message;

      toast({
        variant: "destructive",
        title,
        description,
      });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    form.setValue(name as keyof LoginFormValues, value.trim(), {
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

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
