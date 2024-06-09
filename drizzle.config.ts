import fs from "fs";
import path from "path";
import { defineConfig } from "drizzle-kit";

const getLocalD1DB = () => {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (error) {
    console.log(
      error instanceof Error
        ? `Error: ${error.message}`
        : "An unknown error occurred",
    );
  }
};

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema/index.ts",
  out: "./migrations",
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CF_ACCOUNT_ID,
          databaseId: process.env.CF_D1_DATABASE_ID,
          token: process.env.CF_D1_API_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1DB(),
        },
      }),
});
