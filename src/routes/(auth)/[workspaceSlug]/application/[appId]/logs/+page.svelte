<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<div class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Application Build Logs</h3>
	<div class="py-10 px-4 rounded border shadow w-full dark:bg-zinc-900 bg-zinc-100 text-zinc-100">
        <p>Application logs....</p>
		{#each data.appInfo.logs as log}
			<p class="hover:bg-slate-100">{log}</p>
		{/each}
	</div>
</div>
