import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextURL } from "next/dist/server/web/next-url";
import { Lucia } from "lucia";
import adapter from "./adapter";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export const login = async (
  userId: string,
  url: string | NextURL | URL,
): Promise<NextResponse> => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return NextResponse.redirect(url);
};
