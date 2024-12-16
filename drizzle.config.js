import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config()

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schemas.ts",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL ?? "",
	},
});
