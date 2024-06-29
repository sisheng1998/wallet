import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import env from "@/lib/env";
import { getUrlWithError } from "@/lib/response";
import { login } from "@/lib/auth";
import {
  createUserAndOAuthAccount,
  getExistingOAuthAccount,
  getExistingUser,
  linkOAuthAccountToUser,
} from "@/lib/auth/utils";
import { SETTINGS, getGoogleTokens, getGoogleUser } from "@/lib/auth/google";

const PROVIDER_ID = "google";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const savedState = cookies().get(SETTINGS.STATE_KEY)?.value;
    const codeVerifier = cookies().get(SETTINGS.CODE_VERIFIER_KEY)?.value;

    cookies().delete(SETTINGS.STATE_KEY);
    cookies().delete(SETTINGS.CODE_VERIFIER_KEY);

    if (!code || !state || !savedState || !codeVerifier || state !== savedState)
      throw new Error("Invalid state or code");

    const { accessToken } = await getGoogleTokens(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      BASE_URL + SETTINGS.CALLBACK_URL,
      code,
      codeVerifier,
    );

    const {
      sub: providerUserId,
      name,
      email,
    } = await getGoogleUser(accessToken);

    const existingOAuthAccount = await getExistingOAuthAccount(
      PROVIDER_ID,
      providerUserId,
    );

    // If the user already has an OAuth account, log them in
    if (existingOAuthAccount) {
      return await login(existingOAuthAccount.userId, BASE_URL);
    }

    const existingUser = await getExistingUser(email);

    // If the user already exists, link the OAuth account and log them in
    if (existingUser) {
      await linkOAuthAccountToUser(
        existingUser.id,
        PROVIDER_ID,
        providerUserId,
      );

      return await login(existingUser.id, BASE_URL);
    }

    // Otherwise, create a new user and log them in
    const userId = generateIdFromEntropySize(10);

    await createUserAndOAuthAccount(
      userId,
      name,
      email,
      PROVIDER_ID,
      providerUserId,
    );

    return await login(userId, BASE_URL);
  } catch (error) {
    const url = getUrlWithError(BASE_URL, "/login", error);
    return NextResponse.redirect(url);
  }
};
