export type { AppRouter } from "./routers";

import * as adapter from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { expressHandler } from "trpc-playground/handlers/express";

import { appRouter } from "./routers";

(async () => {
	const app = express();

	app.use(express.json());
	app.use(cors());
	app.use(
		"/api",
		adapter.createExpressMiddleware({
			router: appRouter,
			createContext: () => ({})
		})
	);
	app.use(
		"/playground",
		await expressHandler({
			trpcApiEndpoint: "/api",
			playgroundEndpoint: "/playground",
			router: appRouter,
			renderOptions: {
				cdnUrl: "https://cdn.jsdelivr.net/npm"
			}
		})
	);

	app.listen(Bun.env.PORT, () => {
		console.log(`server started @ http://localhost:${Bun.env.PORT}/api`);
		console.log(
			`playground started @ http://localhost:${Bun.env.PORT}/playground`
		);
	});
})();
