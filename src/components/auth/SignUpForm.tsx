"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUp } from "@/auth/actions";
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
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
});

export type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { success, message } = await signUp(values);

    if (success) {
      form.reset();

      toast.success("Account created!", {
        description: "Check your email for the magic link to login",
      });
    } else {
      const userExists = message === "User already exists";

      const title = userExists
        ? "Account already exists."
        : DEFAULT_ERROR_TITLE;
      const description = userExists ? "Please login instead" : message;

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
  );
};

export default SignUpForm;
