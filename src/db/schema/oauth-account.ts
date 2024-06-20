import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const oauthAccounts = sqliteTable(
  "oauth_accounts",
  {
    providerId: text("provider_id"),
    providerUserId: text("provider_user_id"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.providerId, table.providerUserId],
    }),
  }),
);
