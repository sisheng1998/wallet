import { SignJWT, jwtVerify } from "jose";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { magicLinks } from "@/db/schema";
import env from "@/lib/env";
import { VALIDITY_DURATION, getCurrentUnixTimestamp } from "./utils";

const SETTINGS = {
  CALLBACK_URL: "/api/auth/magic-link/callback",
};

const getKey = (secret: string) => new TextEncoder().encode(secret);

export const generateMagicLink = async (
  userId: string,
): Promise<{ url: string; token: string; expiresAt: number }> => {
  const { BASE_URL, API_TOKEN } = env;

  const key = getKey(API_TOKEN);
  const expiresAt = getCurrentUnixTimestamp() + VALIDITY_DURATION;

  const token = await new SignJWT({
    userId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
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
  await db
    .insert(magicLinks)
    .values({
      userId,
      token,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.userId,
      set: {
        token,
        expiresAt,
      },
    });

export const getExistingMagicLinkToken = async (userId: string) => {
  const currentTimestamp = getCurrentUnixTimestamp();

  const result = await db.query.magicLinks.findFirst({
    columns: {
      token: true,
    },
    where: and(
      eq(magicLinks.userId, userId),
      gt(magicLinks.expiresAt, currentTimestamp),
    ),
  });

  return result?.token;
};

export const deleteMagicLinkToken = async (userId: string) =>
  await db.delete(magicLinks).where(eq(magicLinks.userId, userId));
