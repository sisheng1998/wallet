import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { magicLinks } from "@/db/schema";
import env from "@/lib/env";

const SETTINGS = {
  CALLBACK_URL: "/api/auth/magic-link/callback",
};

const getKey = (secret: string) => new TextEncoder().encode(secret);

export const generateMagicLink = async (
  userId: string,
): Promise<{ url: string; token: string; expiresAt: number }> => {
  const { BASE_URL, API_TOKEN } = env;

  const key = getKey(API_TOKEN);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  const token = await new SignJWT({
    userId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(expiresAt))
    .sign(key);

  return {
    url: BASE_URL + SETTINGS.CALLBACK_URL + `?token=${token}`,
    token,
    expiresAt,
  };
};

export const getUserId = async (token: string): Promise<string> => {
  try {
    const { API_TOKEN } = env;

    const key = getKey(API_TOKEN);

    const {
      payload: { userId },
    } = await jwtVerify<{ userId: string }>(token, key);

    return userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const saveMagicLinkToken = async (
  userId: string,
  token: string,
  expiresAt: number,
) =>
  await db.insert(magicLinks).values({
    userId,
    token,
    expiresAt,
  });

export const getExistingMagicLinkToken = async (token: string) =>
  await db.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

export const deleteMagicLinkTokens = async (userId: string) =>
  await db.delete(magicLinks).where(eq(magicLinks.userId, userId));
