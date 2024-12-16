import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

(async () => {
    await migrate(db, { migrationsFolder: "drizzle" });
})()
