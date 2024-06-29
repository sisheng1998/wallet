"use server";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import { FormValues as LoginFormValues } from "@/components/auth/LoginForm";
import { FormValues as SignUpFormValues } from "@/components/auth/SignUpForm";
import {
  getActionErrorResponse,
  getActionSuccessResponse,
} from "@/lib/response";
import { lucia, validateRequest } from ".";
import { createUser, getExistingUser } from "./utils";
import {
  deleteMagicLinkTokens,
  generateMagicLink,
  saveMagicLinkToken,
} from "./magic-link";
import { sendEmail, verifyEmail } from "@/email/action";

export const sendMagicLink = async (values: LoginFormValues) => {
  try {
    const email = values.email.trim().toLowerCase();
    const existingUser = await getExistingUser(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    await deleteMagicLinkTokens(existingUser.id);

    const { url, token, expiresAt } = await generateMagicLink(existingUser.id);
    await saveMagicLinkToken(existingUser.id, token, expiresAt);

    await sendEmail(existingUser.name, email, "Magic Link", url);

    return getActionSuccessResponse("Email sent");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};

export const signUp = async (values: SignUpFormValues) => {
  try {
    const email = values.email.trim().toLowerCase();
    const existingUser = await getExistingUser(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const result = await verifyEmail(email);

    if (!result.success) {
      throw new Error(result.message);
    }

    const userId = generateIdFromEntropySize(10);
    await createUser(userId, values.name, email);

    const { url, token, expiresAt } = await generateMagicLink(userId);
    await saveMagicLinkToken(userId, token, expiresAt);

    await sendEmail(values.name, email, "Magic Link", url);

    return getActionSuccessResponse("Account created");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};

export const logout = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new Error("No active session found");
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return getActionSuccessResponse("Logged out");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};
