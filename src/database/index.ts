import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1
});

export const db = drizzle({ client: pool, schema });
