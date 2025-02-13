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

	// compo
	// import EditServices from "./applications/edit-services.svelte";
	// import AlertDelete from "./applications/alert-delete.svelte";

	let service = $props();
</script>

<div class="relative">
	<Popover.Root>
		<Popover.Trigger class="absolute z-50 top-0 right-0 p-2 hover:bg-zinc-900 rounded-lg">
			<Ellipsis />
		</Popover.Trigger>
		<Popover.Content class="w-28">
			<div class="flex flex-col items-center text-center z-40">
				<!-- <EditServices />
          <AlertDelete/> -->
			</div>
		</Popover.Content>
	</Popover.Root>
	<button class="z-0" onclick={() => {}}>
		<div
			class="transition duration-300 hover:ring-zinc-600 hover:ring-1 p-6 max-w-xs w-80 border bg-card text-card-foreground shadow-sm rounded-lg relative"
		>
			<div class="flex space-x-5 items-center">
				<Avatar.Root>
					<Avatar.Image src={service.img} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col items-start space-y-2">
					<h1 class="text-xl font-bold">{service.name}</h1>
					<p class="text-sm text-muted-foreground">
						Create at {service.time} minutes ago
					</p>
				</div>
			</div>
			<div class="mt-4 text-left">
				<a
					href={'https://github.com/' + service.linkGit}
					class={badgeVariants({ variant: 'default' })}
				>
					<div class="p-1 flex items-center space-x-2">
						<Github class="size-5" />
						<p>{service.linkGit}</p>
					</div>
				</a>
			</div>
		</div>
	</button>
</div>
