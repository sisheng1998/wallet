import { NextRequest, NextResponse } from "next/server";
import env from "@/lib/env";
import { getUrlWithError } from "@/lib/response";
import { login } from "@/auth";
import {
  deleteMagicLinkTokens,
  getExistingMagicLinkToken,
  getUserId,
} from "@/auth/magic-link";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { BASE_URL } = env;

  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const token = searchParams.get("token");

    if (!token) throw new Error("Missing token");

    const userId = await getUserId(token);
    const existingToken = await getExistingMagicLinkToken(token);

    if (!existingToken) throw new Error("Invalid token");

    await deleteMagicLinkTokens(userId);

    return await login(userId, BASE_URL);
  } catch (error) {
    const url = getUrlWithError(BASE_URL, "/login", error);
    return NextResponse.redirect(url);
  }
};
