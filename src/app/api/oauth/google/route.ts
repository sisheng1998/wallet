import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import env from "@/lib/env";
import { SETTINGS, getGoogleOAuthInfo } from "@/lib/auth/google";
import { COOKIE_OPTIONS } from "@/lib/auth/cookie";
import { getErrorResponse, getSuccessResponse } from "@/lib/response";

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

    const response = getSuccessResponse({ url });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response = getErrorResponse(error);
    return NextResponse.json(response, { status: 500 });
  }
};
