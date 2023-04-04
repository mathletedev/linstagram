<script lang="ts">
	import { trpc } from "$lib/client";

	let greeting = "Press the button to load data...";
	let loading = false;
	const loadData = async () => {
		loading = true;
		greeting = await trpc.hello.query();
		loading = false;
	}
</script>

<h1 class="text-xl font-bold underline">
	Hello, world!
</h1>

<h4>Loading data in<br /><code>+page.svelte</code></h4>

<a href="#load" role="button" aria-busy={loading} on:click|preventDefault={loadData}>Load</a>
<p>{greeting}</p>
