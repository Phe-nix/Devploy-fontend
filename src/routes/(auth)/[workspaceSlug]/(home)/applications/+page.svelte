<script lang="ts">
	// shadcn-svelte
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import EmtpyApp from '$lib/components/customs/applications/emtpy-app.svelte';

	// compoente
	import CardApp from '$lib/components/customs/applications/card-app.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let applications = $state(data.info.Appication);
	let search = $state();
</script>

<Card.Root>
	<Card.Header>
		<form class="flex w-full max-w-5xl mx-auto items-center space-x-2">
			<Input
				class="shadow-lg p-4"
				type="text"
				placeholder="🔍 Search something..."
				bind:value={search}
			/>
		</form>
	</Card.Header>
	<Card.Content>
		{#if applications == ''}
			<EmtpyApp type="service" />
		{:else}
			<div class="my-2">
				<h2
					class="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
				>
					Applications ({applications.length})
				</h2>
				<ScrollArea class="w-fit h-[25em] xl:h-[34em] md:h-[28em]">
					<div class="flex flex-row gap-3 flex-wrap items-center justify-center">
						{#each applications as service}
							<CardApp {service} info={data}/>
						{/each}
					</div>
				</ScrollArea>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
