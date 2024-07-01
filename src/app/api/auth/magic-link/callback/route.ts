import { NextRequest, NextResponse } from "next/server";
import env from "@/lib/env";
import { getUrlWithError } from "@/lib/response";
import { login } from "@/lib/auth";
import {
  deleteMagicLinkToken,
  getExistingMagicLinkToken,
  getUserId,
} from "@/lib/auth/magic-link";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { BASE_URL } = env;

  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const token = searchParams.get("token");

    if (!token) throw new Error("Missing token");

    const userId = await getUserId(token);
    const existingToken = await getExistingMagicLinkToken(userId);

    if (!existingToken) throw new Error("Invalid token");

    await deleteMagicLinkToken(userId);

    await login(userId);
    return NextResponse.redirect(BASE_URL);
  } catch (error) {
    const url = getUrlWithError(BASE_URL, "/login", error);
    return NextResponse.redirect(url);
  }
};
