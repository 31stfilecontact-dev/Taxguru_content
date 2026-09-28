import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

export const isDbAvailable = Boolean(process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.warn(
    "[Notice] DATABASE_URL is not set. 31stFile Content Hub is running in zero-config mode (Postgres is optional for article curation and post generation).",
  );
}

export const pool = isDbAvailable
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : (null as unknown as pg.Pool);

export const db =
  isDbAvailable && pool
    ? drizzle(pool, { schema })
    : (null as unknown as ReturnType<typeof drizzle<typeof schema>>);

export * from "./schema";
