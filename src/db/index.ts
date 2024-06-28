import { drizzle } from "drizzle-orm/d1";
import env from "@/lib/env";
import * as schema from "./schema";
import { Logger } from "./utils";

const getDB = () => {
  const db = drizzle(env.DB, {
    schema,
    logger: process.env.NODE_ENV === "development" && new Logger(),
  });

  return db;
};

export const db = getDB();
