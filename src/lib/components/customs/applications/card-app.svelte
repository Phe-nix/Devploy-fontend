<script lang="ts">
	// import shadcn-svelte
	import * as Popover from '$lib/components/ui/popover';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { badgeVariants } from '$lib/components/ui/badge';

	// SVG Icons
	import { Package } from 'lucide-svelte';
	import { Ellipsis } from 'lucide-svelte';
	import { Github } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// compo
	// import EditServices from "./applications/edit-services.svelte";
	// import AlertDelete from "./applications/alert-delete.svelte";

	let { service, info } = $props();
</script>

<div class="relative">
	<button
		class="z-0"
		onclick={() => {
			goto(`/${$page.params.workspaceSlug}/application/${service.id}/info`);
		}}
	>
		<div
			class="transition duration-300 hover:shadow-xl hover:ring-1 p-6 max-w-xs w-80 border bg-card text-card-foreground shadow-sm rounded-lg"
		>
			<div class="flex space-x-5 items-center z-10">
				<Avatar.Root>
					<Avatar.Image src={`https://github.com/${service.buildPack}.png`} />
					<Avatar.Fallback>?</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col items-start space-y-2">
					<div class="flex items-center gap-x-2">
						<h1 class="text-xl font-bold">{service.name}</h1>
						{#if service.status == 'inProgress'}
							<div class="p-1 rounded bg-orange-500"></div>
						{:else if service.status == 'Deployed'}
							<div class="p-1 rounded bg-green-500"></div>
						{:else if service.status == 'Failed'}
							<div class="p-1 rounded bg-red-500"></div>
						{:else}
							<div class="p-1 rounded bg-gray-500"></div>
						{/if}
					</div>
					<!-- <p class="text-sm text-muted-foreground">
						Create at {service.time} minutes ago
					</p> -->
				</div>
			</div>
			<div class="mt-4 text-left">
				<a href={service.gitHub} class={badgeVariants({ variant: 'default' })}>
					<div class="p-1 flex items-center space-x-2">
						<Github class="size-5" />
						<p>{service.name}</p>
					</div>
				</a>
			</div>
		</div>
	</button>
</div>
