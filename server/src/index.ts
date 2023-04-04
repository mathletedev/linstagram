export type { AppRouter } from "./router";

import * as adapter from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application } from "express";

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

app.listen(8080, () => {
	console.log("Server running on port 8080!");
});