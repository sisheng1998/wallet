"use server";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import { sendEmail, verifyEmail } from "@/email/utils";
import {
  getActionErrorResponse,
  getActionSuccessResponse,
} from "@/lib/response";
import { login, lucia, validateRequest } from ".";
import { createUser, getExistingUser } from "./utils";
import { generateMagicLink, saveMagicLinkToken } from "./magic-link";
import { deleteOTP, generateOTP, getExistingOTP, saveOTP } from "./otp";

export const sendMagicLink = async (email: string) => {
  try {
    const existingUser = await getExistingUser(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const { url, token, expiresAt } = await generateMagicLink(existingUser.id);
    await saveMagicLinkToken(existingUser.id, token, expiresAt);

    await sendEmail(existingUser.name, email, "Magic Link", url);

    return getActionSuccessResponse("Email sent");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};

export const sendOTP = async (email: string) => {
  try {
    const existingUser = await getExistingUser(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const { code, expiresAt } = generateOTP(6);
    await saveOTP(existingUser.id, code, expiresAt);

    await sendEmail(existingUser.name, email, "OTP", code);

    return getActionSuccessResponse("Email sent");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};

export const loginWithOTP = async (email: string, otp: string) => {
  try {
    const { userId, code } = await getExistingOTP(email);

    if (code !== otp) {
      throw new Error("Invalid OTP");
    }

    await deleteOTP(userId);

    await login(userId);
    return getActionSuccessResponse("Logged in");
  } catch (error) {
    return getActionErrorResponse(error);
  }
};

export const signUp = async (name: string, email: string) => {
  try {
    const existingUser = await getExistingUser(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    await verifyEmail(email);

    const userId = generateIdFromEntropySize(10);
    await createUser(userId, name, email);

    const { code, expiresAt } = generateOTP(6);
    await saveOTP(userId, code, expiresAt);

    await sendEmail(name, email, "OTP", code);

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
