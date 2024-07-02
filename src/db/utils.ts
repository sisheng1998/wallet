import { Logger as DrizzleLogger, SQL, sql } from "drizzle-orm"
import { AnySQLiteColumn } from "drizzle-orm/sqlite-core"

export const lower = (text: AnySQLiteColumn): SQL => sql`lower(${text})`

export class Logger implements DrizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    console.log(
      "[Query]:",
      query,
      "\n--params",
      `[${params.map((p) => JSON.stringify(p)).join(", ")}]`
    )
  }
}
