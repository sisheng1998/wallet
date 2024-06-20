import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  expiresAt: integer("expires_at").notNull(),
});
