<script lang="ts">
	import { PUBLIC_BASE_API } from '$env/static/public';
	import type { PageProps } from './$types';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	let { data }: PageProps = $props();

	let status = $state(data.appInfo.status || '');

	let functionOut = $state<string[]>([]);

	$effect(() => {
		const statusLog = new WebSocket(`${PUBLIC_BASE_API}/application/${data.appInfo.id}/status`);
		statusLog.onmessage = (event) => {
			console.log(event.data);
			status = String(event.data);
		};

		if (status === 'Deployed') {
			const functionLog = new WebSocket(`http://localhost:3000/log/func/${data.appInfo.id}`);
			functionLog.onmessage = (event) => {
				console.log(event.data);
				functionOut = String(event.data).split('\n');
			};
		} else {
			functionOut = [];
		}
	});
</script>

<div class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Application Function Logs</h3>
	<ScrollArea class="h-96">
		<div
			class="py-5 px-4 rounded border shadow w-full dark:bg-zinc-900 bg-zinc-100 dark:text-zinc-100 text-zinc-900"
		>
			{#each functionOut as log}
				<p class="dark:hover:bg-slate-500 hover:bg-slate-300">{log}</p>
			{/each}
		</div>
	</ScrollArea>
</div>
