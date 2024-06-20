import { getRequestContext } from "@cloudflare/next-on-pages";

const ENV =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env
    : (process.env as unknown as CloudflareEnv);

export default ENV;
