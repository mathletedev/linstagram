export type { AppRouter } from "./router";

import * as adapter from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application } from "express";

import { client } from "./client";
import { appRouter } from "./router";

const app: Application = express();

const createContext = ({}: adapter.CreateExpressContextOptions) => ({});

app.use(express.json());
app.use(cors());
app.use(
	"/",
	adapter.createExpressMiddleware({
		router: appRouter,
		createContext
	})
);

app.listen(Bun.env.PORT, () => {
	console.log(`Server running on port ${Bun.env.PORT}!`);
});

try {
	await client.connect();
	console.log(
		`Connected to PostgreSQL @ ${Bun.env.PG_HOST}:${Bun.env.PG_PORT}`
	);
} catch (err) {
	console.error(err);
}
