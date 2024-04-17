// Imports
// ========================================================
import Database from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from "dotenv";
import * as schema from "./schema";

// Config
// ========================================================
config();

// Exports
// ========================================================
export const db = drizzle(
  Database(`${process.env.DATABASE_URL}`),
  { schema }
);