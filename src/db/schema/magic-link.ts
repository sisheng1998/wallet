import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const magicLinks = sqliteTable("magic_links", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  token: text("token").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
