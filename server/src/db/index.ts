import { Pool } from "pg";

const pool = new Pool();

export default {
	query: async (text: string, params?: any[]) => {
		const start = Date.now();
		const res = await pool.query(text, params);

		console.log(
			`executed query "${text}" in ${Date.now() - start}ms: returned ${
				res.rowCount
			} row(s)`
		);

		return res;
	}
};
