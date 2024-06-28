"use server";
import { cookies } from "next/headers";
import { LoginFormValues } from "@/components/auth/LoginForm";
import {
  getActionErrorResponse,
  getActionSuccessResponse,
} from "@/lib/response";
import { lucia, validateRequest } from ".";
import { getExistingUser } from "./utils";
import {
  deleteMagicLinkTokens,
  generateMagicLink,
  saveMagicLinkToken,
} from "./magic-link";

export const login = async (values: LoginFormValues) => {
  try {
    const email = values.email.trim().toLowerCase();
    const existingUser = await getExistingUser(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    await deleteMagicLinkTokens(existingUser.id);

    const { url, token, expiresAt } = await generateMagicLink(existingUser.id);
    await saveMagicLinkToken(existingUser.id, token, expiresAt);

    // TODO: Send email with magic link
    console.log(url);

    return getActionSuccessResponse("Email sent");
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
