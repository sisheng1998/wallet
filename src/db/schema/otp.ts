import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { users } from "@/db/schema/user"

export const OTPs = sqliteTable("otps", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  code: text("code").notNull(),
  expiresAt: integer("expires_at").notNull(),
})
