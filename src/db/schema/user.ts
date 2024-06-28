import { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { lower } from "../utils";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  }),
);

export type DatabaseUserAttributes = Omit<InferSelectModel<typeof users>, "id">;
