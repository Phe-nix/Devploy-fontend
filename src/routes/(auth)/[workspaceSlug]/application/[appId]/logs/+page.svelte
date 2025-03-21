<script lang="ts">
	import type { PageData } from '../info/$types';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { PUBLIC_BASE_API } from '$env/static/public';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let logs = $state<String[]>([])

	$effect(() => {
		const ws = new WebSocket(`${PUBLIC_BASE_API}/log/build/${data.appInfo.id}`);
		ws.onmessage = (event) => {
			logs = String(event.data).split('\n')
		}
	})
</script>

<div class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Application Build Logs</h3>
	<ScrollArea class="h-96">
		<div class="py-5 px-4 rounded border shadow w-full dark:bg-zinc-900 bg-zinc-100 dark:text-zinc-100 text-zinc-900">
			<p>Application logs....</p>
			{#each logs as log}
				<p class="dark:hover:bg-slate-500 hover:bg-slate-300">{log}</p>
			{/each}
		</div>
	</ScrollArea>
</div>
