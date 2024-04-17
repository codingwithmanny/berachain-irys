// Imports
// ========================================================
import { type Config } from "drizzle-kit";
import { config } from "dotenv";

// Config
// ========================================================
config();

// Exports
// ========================================================
export default {
  schema: "./server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}`,
  },
  tablesFilter: [`${process.env.DATABASE_PREFIX}_*`],
  out: "./drizzle",
} satisfies Config;