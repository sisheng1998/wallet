import { SQL, sql } from "drizzle-orm";
import { AnySQLiteColumn } from "drizzle-orm/sqlite-core";

export const lower = (text: AnySQLiteColumn): SQL => sql`lower(${text})`;
