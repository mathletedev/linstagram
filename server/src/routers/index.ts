import { router } from "../lib/trpc";
import { helloRouter } from "./hello";
import { userRouter } from "./user";

export const appRouter = router({
	user: userRouter,
	hello: helloRouter
});

export type AppRouter = typeof appRouter;
