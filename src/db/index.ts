import { drizzle } from "drizzle-orm/d1";
import ENV from "@/lib/env";
import * as schema from "./schema";

const getDB = () => {
  const db = drizzle(ENV.DB, {
    schema,
    logger: process.env.NODE_ENV === "development",
  });

  return db;
};

export const db = getDB();
