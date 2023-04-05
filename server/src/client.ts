import { Client } from "pg";

export const client = new Client({
	host: Bun.env.PG_HOST,
	port: parseInt(Bun.env.PG_PORT ?? "5432"),
	database: Bun.env.PG_DATABASE,
	user: Bun.env.PG_USER,
	password: Bun.env.PG_PASSWORD
});
