<script lang="ts">
	// import shadcn-svelte

	// SVG Icons
	import { PackageX } from 'lucide-svelte';
	import { Computer } from 'lucide-svelte';

	let type = $props();
</script>

{#if type.type == 'database'}
	<div class="flex flex-col items-center justify-center space-y-2 h-[25em] xl:h-[34em] md:h-[28em]">
		<div class="border bg-card text-card-foreground p-3 rounded-lg shadow-xl">
			<PackageX class="size-8" />
		</div>
		<div class="text-lg font-semibold">You don't have any database.</div>
		<p class="text-sm text-muted-foreground">Let start database and create something new.</p>
	</div>
{:else if type.type == 'service'}
	<div class="flex flex-col items-center justify-center space-y-2 h-[25em] xl:h-[34em] md:h-[28em]">
		<div class="border bg-card text-card-foreground p-3 rounded-lg shadow-xl">
			<Computer class="size-8" />
		</div>
		<div class="text-lg font-semibold">You don't have any service.</div>
		<p class="text-sm text-muted-foreground">Let start service and create something new.</p>
	</div>
{/if}
