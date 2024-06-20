import { Google, generateCodeVerifier, generateState } from "arctic";

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export const SETTINGS = {
  STATE_KEY: "google_oauth_state",
  CODE_VERIFIER_KEY: "google_oauth_code_verifier",
  CALLBACK_URL: "/api/oauth/google/callback",
};

export const getGoogleOAuthInfo = async (
  clientId: string,
  clientSecret: string,
  redirectURI: string,
) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const google = new Google(clientId, clientSecret, redirectURI);

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });

  return {
    url,
    state,
    codeVerifier,
  };
};

export const getGoogleTokens = async (
  clientId: string,
  clientSecret: string,
  redirectURI: string,
  code: string,
  codeVerifier: string,
) => {
  const google = new Google(clientId, clientSecret, redirectURI);
  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  return tokens;
};

export const getGoogleUser = async (
  accessToken: string,
): Promise<GoogleUser> => {
  const response = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const googleUser = (await response.json()) as GoogleUser;
  return googleUser;
};
