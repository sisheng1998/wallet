import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schema from "./schema";

const getDB = () => {
  const { env } = getRequestContext();
  const db = drizzle(env.DB, { schema, logger: true });
  return db;
};

export const db = getDB();
