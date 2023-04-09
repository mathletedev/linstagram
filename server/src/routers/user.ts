import z from "zod";

import db from "../db";
import hash from "../lib/hash";
import { procedure, router } from "../lib/trpc";

export const userRouter = router({
	list: procedure.query(async () => {
		const res = await db.query("SELECT * FROM users;");
		return res.rows;
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		const res = await db.query("SELECT * FROM users WHERE id = $1;", [input]);
		return res.rows[0];
	}),
	create: procedure
		.input(
			z.object({
				username: z.string(),
				email: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			await db.query(
				"INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
				[input.username, input.email, hash(input.password)]
			);
		}),
	login: procedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.query(async ({ input }) => {
			const res = await db.query(
				"SELECT email FROM USERS WHERE username = $1 AND password = $2;",
				[input.username, hash(input.password)]
			);
			return res.rows[0].email;
		})
});
