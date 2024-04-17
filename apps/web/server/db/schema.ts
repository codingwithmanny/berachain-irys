// Imports
// ========================================================
import {
  date,
  text,
  pgTableCreator,
  uuid,
} from "drizzle-orm/pg-core";
import { config } from "dotenv";

// Config
// ========================================================
config();
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${process.env.DATABASE_PREFIX}_${name}`);

// Tables
// ========================================================
export const holders = createTable("holders", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  walletAddress: text("walletAddress").notNull(),
  nftId: text("nftId").notNull(),
  bHoney: text("bHoney"),
  mutablelUrl: text("mutableUrl").notNull(),
  jobId: text("jobId"), // Future implementation of a cron service
  createdAt: date("createdAt").defaultNow(),
  updatedAt: date("updatedAt").defaultNow(),
});