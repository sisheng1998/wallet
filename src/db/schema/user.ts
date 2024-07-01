import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { lower } from "../utils";
import { OTPs } from "./otp";

export type DatabaseUserAttributes = Omit<InferSelectModel<typeof users>, "id">;

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

export const userRelations = relations(users, ({ one }) => ({
  otp: one(OTPs, {
    fields: [users.id],
    references: [OTPs.userId],
  }),
}));
