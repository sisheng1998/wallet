import { and, eq } from "drizzle-orm";
import { oauthAccounts, users } from "@/db/schema";
import { db } from "@/db";

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
    where: eq(users.email, email),
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
      email,
    }),
    db.insert(oauthAccounts).values({
      providerId,
      providerUserId,
      userId,
    }),
  ]);