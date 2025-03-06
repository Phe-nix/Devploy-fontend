<script lang="ts">
	// shadcn-svelte
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	// import components
	import SelectDatabase from '$lib/components/customs/databases/new/select-database.svelte';
	import { goto } from '$app/navigation';
	import ConfigDatabase from '$lib/components/customs/databases/new/config-database.svelte';
	import type { PageData } from './$types';

	let createState = $state<'select' | 'config'>('select');

	let nowSelectDB = $state('');

    let { data } : {data: PageData} = $props();
</script>

<div class="py-2 flex flex-col">
	<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		Let build something new.
	</h2>
	<p class="text-muted-foreground text-sm">to deploy service</p>
</div>
<div class="py-4">
	<Card.Root>
		{#if createState === 'select'}
			<Card.Header>
				<Card.Title>Databases</Card.Title>
				<Card.Description>Select databases for deployment</Card.Description>
			</Card.Header>
			<Card.Content>
				<SelectDatabase bind:db={nowSelectDB} bind:nowState={createState}/>
			</Card.Content>
		{:else if createState === 'config'}
			<Card.Header>
				<Card.Title>Config database</Card.Title>
				<Card.Description>Fill form for config your database to deployment.</Card.Description>
			</Card.Header>
			<Card.Content>
                <ConfigDatabase {data} bind:nowState={createState}/>
			</Card.Content>
		{/if}
	</Card.Root>
</div>
