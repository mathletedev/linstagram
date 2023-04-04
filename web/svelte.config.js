import adapter from "@bun-community/sveltekit-adapter-bun";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter({ dynamic_origin: true }) }
};

export default config;
