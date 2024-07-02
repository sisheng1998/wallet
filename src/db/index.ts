import { drizzle } from "drizzle-orm/d1"

import * as schema from "@/db/schema"
import { Logger } from "@/db/utils"
import env from "@/lib/env"

const getDB = () => {
  const db = drizzle(env.DB, {
    schema,
    logger: process.env.NODE_ENV === "development" && new Logger(),
  })

  return db
}

export const db = getDB()
