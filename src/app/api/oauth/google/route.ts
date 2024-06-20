import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import env from "@/lib/env";
import { SETTINGS, getGoogleOAuthInfo } from "@/auth/google";
import { COOKIE_OPTIONS } from "@/auth/cookie";
import { getUrlWithError } from "@/lib/error";

export const GET = async (): Promise<NextResponse> => {
  const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

  try {
    const { url, state, codeVerifier } = await getGoogleOAuthInfo(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      BASE_URL + SETTINGS.CALLBACK_URL,
    );

    cookies().set(SETTINGS.STATE_KEY, state, COOKIE_OPTIONS);
    cookies().set(SETTINGS.CODE_VERIFIER_KEY, codeVerifier, COOKIE_OPTIONS);

    return NextResponse.redirect(url);
  } catch (error) {
    const url = getUrlWithError(BASE_URL, "/login", error);
    return NextResponse.redirect(url);
  }
};
