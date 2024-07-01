import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { oauthAccounts, users } from "@/db/schema";
import { lower } from "@/db/utils";

export const VALIDITY_DURATION = 5 * 60; // 5 minutes

export const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);

export const getExistingOAuthAccount = async (
  providerId: string,
  providerUserId: string,
) =>
  await db.query.oauthAccounts.findFirst({
    where: and(
      eq(oauthAccounts.providerId, providerId),
      eq(oauthAccounts.providerUserId, providerUserId),
    ),
  });

export const getExistingUser = async (email: string) =>
  await db.query.users.findFirst({
    where: eq(lower(users.email), email.trim().toLowerCase()),
  });

export const linkOAuthAccountToUser = async (
  userId: string,
  providerId: string,
  providerUserId: string,
) =>
  await db.insert(oauthAccounts).values({
    providerId,
    providerUserId,
    userId,
  });

export const createUserAndOAuthAccount = async (
  userId: string,
  name: string,
  email: string,
  providerId: string,
  providerUserId: string,
) =>
  await db.batch([
    db.insert(users).values({
      id: userId,
      name,
      email: email.trim().toLowerCase(),
    }),
    db.insert(oauthAccounts).values({
      providerId,
      providerUserId,
      userId,
    }),
  ]);

export const createUser = async (userId: string, name: string, email: string) =>
  await db.insert(users).values({
    id: userId,
    name,
    email: email.trim().toLowerCase(),
  });
